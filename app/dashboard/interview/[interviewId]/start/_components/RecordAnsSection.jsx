"use client";
import { Button } from '@/components/ui/button';
import { Disc2Icon, MicIcon, SaveIcon, WebcamIcon } from 'lucide-react';
import React, { useEffect, useState, useRef } from 'react';
import Webcam from 'react-webcam';
import { chatSession } from '@/utils/GeminiAiModel';
import { UserAnswer } from '@/utils/schema';
import { useUser } from '@clerk/nextjs';
import moment from 'moment';
import { db } from '@/utils/db';
import { Toaster } from '@/components/ui/sonner';

function RecordAnsSection({ mockInterviewQuestion, activeQuestionIndex, interviewData }) {
    const [userAnswer, setUserAnswer] = useState('');
    const [isRecording, setIsRecording] = useState(false);
    const recognitionRef = useRef(null);
    const { user } = useUser();

    useEffect(() => {
        return () => {
            if (recognitionRef.current) {
                recognitionRef.current.stop();
            }
        };
    }, []);

    const startRecording = () => {
        setIsRecording(true);
        setUserAnswer('');
        recognitionRef.current = new window.webkitSpeechRecognition();
        recognitionRef.current.continuous = true;
        recognitionRef.current.interimResults = true;
        recognitionRef.current.lang = "en-US";
        recognitionRef.current.maxAlternatives = 3;

        recognitionRef.current.onresult = (event) => {
            let finalTranscript = '';
            for (let i = 0; i < event.results.length; i++) {
                if (event.results[i].isFinal) {
                    finalTranscript += event.results[i][0].transcript + ' ';
                }
            }
            setUserAnswer(finalTranscript.trim());
        };

        recognitionRef.current.start();
    };

    const stopRecording = () => {
        if (recognitionRef.current) {
            recognitionRef.current.stop();
        }
        setIsRecording(false);
    };

    const saveUserAnswer = async () => {
        stopRecording();
        if (userAnswer.trim().length < 10) {
            return;
        }

        try {
            const existingAnswer =  db
                .select()
                .from(UserAnswer)
                .where({
                    mockIdRef: interviewData?.mockId,
                    question: mockInterviewQuestion[activeQuestionIndex]?.question,
                    userEmail: user?.primaryEmailAddress?.emailAddress,
                });

            const feedbackPrompt = `
                Given the following:
                - Question: ${mockInterviewQuestion[activeQuestionIndex]?.question}
                - User Answer: ${userAnswer}
                
                Please evaluate the user's answer based on the question and provide:
                1. A numerical rating (1 to 5) under the field "rating".
                2. A concise feedback under the field "feedback" in 3 to 4 sentences.

                Format the response as a JSON object with the fields "rating" and "feedback".`;

            const feedbackResult = await chatSession.sendMessage(feedbackPrompt);
            const feedbackText = await feedbackResult.response.text();
            const cleanJson = feedbackText.replace('```json', '').replace('```', '').trim();

            let JsonFeedbackResp;
            try {
                JsonFeedbackResp = JSON.parse(cleanJson);
            } catch (error) {
                console.error("Error parsing feedback JSON:", error);
                return;
            }

            if (existingAnswer.length > 0) {
                await db.update(UserAnswer).set({
                    userAns: userAnswer,
                    feedback: JsonFeedbackResp.feedback,
                    rating: JsonFeedbackResp.rating,
                    createdAt: moment().format('DD-MM-yyyy'),
                }).where({ id: existingAnswer[0].id });
            } else {
                await db.insert(UserAnswer).values({
                    mockIdRef: interviewData?.mockId,
                    question: mockInterviewQuestion[activeQuestionIndex]?.question,
                    correctAns: mockInterviewQuestion[activeQuestionIndex]?.answer,
                    userAns: userAnswer,
                    feedback: JsonFeedbackResp.feedback,
                    rating: JsonFeedbackResp.rating,
                    userEmail: user?.primaryEmailAddress?.emailAddress,
                    createdAt: moment().format('DD-MM-yyyy'),
                });
            }
        } catch (error) {
            console.error("Error saving answer:", error);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center bg-gray-50 py-8 px-4">
            <Toaster />
            <h1 className="text-3xl font-bold text-gray-700 mb-3">Record Your Answer</h1>
            <div className="relative w-full max-w-lg bg-white rounded-lg shadow-md overflow-hidden">
                <div className="relative">
                    <Webcam mirrored style={{ width: "100%", height: "300px", objectFit: "cover" }} />
                    {isRecording && <div className="absolute top-4 left-4 h-4 w-4 bg-red-500 rounded-full animate-pulse"></div>}
                </div>
                <div className="p-4 bg-gray-100">
                    <textarea
                        readOnly
                        value={userAnswer}
                        placeholder="Your transcript will appear here..."
                        className="w-full p-3 bg-white border border-gray-300 rounded-md shadow-sm resize-none focus:ring focus:ring-blue-300"
                        rows="4"
                    ></textarea>
                </div>
            </div>
            <div className="mt-6 flex flex-col md:flex-row gap-4">
                <Button
                    className={`px-6 py-3 text-white rounded-md shadow transition-transform transform ${isRecording ? 'bg-red-500 hover:bg-red-600 scale-105' : 'bg-blue-500 hover:bg-blue-600 scale-100'}`}
                    onClick={isRecording ? stopRecording : startRecording}
                >
                    {isRecording ? (
                        <>
                            <Disc2Icon className="mr-2" />
                            Stop Recording
                        </>
                    ) : (
                        <>
                            <MicIcon className="mr-2" />
                            Start Recording
                        </>
                    )}
                </Button>
                <Button
                    className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-md shadow transition-transform transform hover:scale-105"
                    onClick={saveUserAnswer}
                >
                    <SaveIcon className="mr-2" />
                    Save Answer
                </Button>
            </div>
        </div>
    );
}

export default RecordAnsSection;
