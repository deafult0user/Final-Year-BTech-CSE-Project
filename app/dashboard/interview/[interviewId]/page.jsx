"use client";

import { Button } from '@/components/ui/button';
import { db } from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import { Fullscreen, Lightbulb, WebcamIcon } from 'lucide-react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import Webcam from 'react-webcam';

function Interview({ params: paramsPromise }) {
    const params = React.use(paramsPromise);
    const [interviewData, setinterviewData] = useState({
        jobPosition: '...',
        jobDesc: '...',
        jobExperience: '...'
    });

    const [webcamEnable, setwebcamEnable] = useState(false);

    useEffect(() => {
        // console.log(params.interviewId);
        GetInterviewDetails();
    }, [])

    const GetInterviewDetails = async () => {
        try {
            const result = await db.select().from(MockInterview).where(eq(MockInterview.mockId, params.interviewId));
            if (result.length > 0) {
                setinterviewData(result[0]);
            } else {
                console.error("No data found for the given interview ID.");
            }
        } catch (error) {
            console.error("Error fetching interview details:", error);
        }
    };
    return (

        <div className=" bg-gradient-to-b from-white to-gray-100 flex flex-col items-center py-10 px-5">

            <div className="text-center mb-10">
                <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-4">
                    Let's Get Started
                </h2>
                <p className="text-lg text-gray-600">
                    Begin your journey with our AI-powered mock interview system.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl w-full">

                <div className="flex flex-col gap-5">
                    <div className="bg-white shadow-lg rounded-xl p-6 border border-gray-200">
                        {interviewData ? (
                            <>
                                <h2 className="text-lg font-medium text-gray-700">
                                    <strong>Position of Job applied:</strong> {interviewData.jobPosition}
                                </h2>
                                <h2 className="text-lg font-medium text-gray-700">
                                    <strong>Applied Job Description:</strong> {interviewData.jobDesc}
                                </h2>
                                <h2 className="text-lg font-medium text-gray-700">
                                    <strong>Years of Experience:</strong> {interviewData.jobExperience}
                                </h2>
                            </>
                        ) : (
                            <p className="text-gray-500">Loading interview details...</p>
                        )}
                    </div>

                    <div className="p-6 bg-yellow-50 border border-yellow-300 rounded-xl shadow-md">
                        <h2 className="flex items-center text-yellow-600 font-semibold text-lg gap-2">
                            <Lightbulb /> Information
                        </h2>
                        <p className="text-yellow-600 mt-3 text-sm">
                            <strong>Enable the webcam and microphone to start your AI-Generated Mock Interview.</strong>
                        </p>
                        <ul className="list-disc ml-5 mt-2 text-yellow-600 text-sm">
                            <li>The interview includes {process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT} questions that you can answer.</li>
                            <li>At the end, you will receive a report based on your responses.</li>
                        </ul>
                        <p className="text-yellow-600 mt-4 text-sm">
                            <strong>Note:</strong>
                        </p>
                        <ul className="list-disc ml-5 mt-2 text-yellow-600 text-sm">
                            <li>We never record your video.</li>
                            <li>Webcam access can be disabled at any time if you wish.</li>
                        </ul>
                    </div>
                </div>

                <div className="flex flex-col items-center justify-center bg-white shadow-lg rounded-xl p-6 border border-gray-200">
                    {webcamEnable ? (
                        <>
                            <Webcam
                                audio={true}
                                onUserMedia={() => setwebcamEnable(true)}
                                onUserMediaError={() => setwebcamEnable(false)}
                                className="rounded-lg shadow-lg"
                                style={{ height: 300, width: 300 }}
                                mirrored={true}
                            />
                            <Button
                                variant="ghost"
                                className="w-full mt-5 bg-blue-900 text-white font-medium py-2 px-4 rounded-lg shadow hover:opacity-90"
                                onClick={() => setwebcamEnable(false)}
                            >
                                Disable Webcam and Microphone
                            </Button>
                        </>
                    ) : (
                        <>
                            <WebcamIcon className="h-36 w-36 text-black my-5 p-10 bg-gray-300 rounded-full border border-gray-200" />
                            <Button
                                variant="ghost"
                                className="w-full mt-5 bg-blue-900 text-white font-medium py-2 px-4 rounded-lg shadow hover:opacity-90"
                                onClick={() => setwebcamEnable(true)}
                            >
                                Enable Webcam and Microphone
                            </Button>
                        </>
                    )}
                </div>
            </div>

            <div className="mt-5">
                <Link href={'/dashboard/interview/'+params.interviewId+'/start'}>
                <Button className="bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold py-2 px-6 rounded-lg shadow hover:opacity-90">
                    Start Interview
                </Button>
                </Link>
            </div>
        </div>
    );
}

export default Interview
