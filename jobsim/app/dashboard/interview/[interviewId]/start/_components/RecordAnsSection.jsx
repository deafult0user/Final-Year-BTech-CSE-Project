"use client";
import { Button } from '@/components/ui/button';
import { Disc2Icon, MicIcon, SaveIcon, WebcamIcon } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import Webcam from 'react-webcam';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { toast } from 'sonner';
import { chatSession } from '@/utils/GeminiAiModel';

function RecordAnsSection({ mockInterviewQuestion, activeQuestionIndex }) {
    const [userAnswer, setUserAnswer] = useState('');
    const {
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition,
    } = useSpeechRecognition();

    if (!browserSupportsSpeechRecognition) {
        return (
            <div className="flex items-center justify-center h-screen">
                <span className="text-red-500 text-lg">
                    Your browser does not support speech recognition. Please try a different browser.
                </span>
            </div>
        );
    }

    useEffect(() => {
        if (transcript) {
            setUserAnswer((prevAns) => prevAns + ' ' + transcript);
            resetTranscript();
        }
    }, [transcript, resetTranscript]);

    const startRecording = () => {
        resetTranscript();
        setUserAnswer('');
        SpeechRecognition.startListening({ continuous: true });
        toast("Recording started. Speak your answer.", { position: "bottom-center" });
    };

    const stopRecording = () => {
        SpeechRecognition.stopListening();
        toast("Recording stopped.", { position: "bottom-center" });
    };

    const saveUserAnswer =  async() => {
        stopRecording();
        if (userAnswer.trim().length < 10) {
            toast.error('Answer must be at least 10 characters. Please try again.', {
                position: "bottom-center",
            });
            return;
        }
        toast.success('Answer saved successfully!', { position: "bottom-center" });
        console.log('Final Answer:', userAnswer);
        // const feedbackPrompt = "Question:"+mockInterviewQuestion[activeQuestionIndex]?.question+"User Answer: "+userAnswer
        // +", Depends on question and user answer please give us rating for answer and feedback as area of improvement in just 3 to 4 lines to improve it"+
        // "in JSON format with rating field and feedback field."
        const feedbackPrompt = `
                Given the following:
                - Question: ${mockInterviewQuestion[activeQuestionIndex]?.question}
                - User Answer: ${userAnswer}

                Please evaluate the user's answer based on the question and provide:
                1. A numerical rating (1 to 5) under the field "rating", where 1 is poor and 5 is excellent.
                2. A concise feedback under the field "feedback", highlighting areas of improvement in 3 to 4 sentences.

                Format the response as a JSON object with the fields "rating" and "feedback".`;
        const feedbackResult = await chatSession.sendMessage(feedbackPrompt);
        const MockJsonResponse = (feedbackResult.response.text()).replace('```json', '').replace('```', '');
        console.log(MockJsonResponse);
        // setjsonResp(MockJsonResponse);

    };

    return (
        <div className="flex flex-col items-center justify-center  bg-gray-50">
            {/* Header Section */}
            <h1 className="text-3xl font-bold text-gray-700 mb-3 ">Record Your Answer</h1>

            {/* Webcam and Controls */}
            <div className="relative w-full max-w-lg bg-white rounded-lg shadow-md overflow-hidden">
                <div className="relative">
                    <Webcam
                        mirrored
                        style={{ width: "100%", height: "300px", objectFit: "cover" }}
                    />
                    <WebcamIcon className="absolute top-4 left-4 h-10 w-10 text-gray-400 bg-gray-100 rounded-full p-2 shadow" />
                </div>

                {/* Transcript Display */}
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

            {/* Action Buttons */}
            <div className="mt-6 flex flex-col md:flex-row gap-4">
                <Button
                    className={`px-6 py-3 text-white rounded-md shadow ${listening ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600'
                        }`}
                    onClick={listening ? stopRecording : startRecording}
                >
                    {listening ? (
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
                    className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-md shadow"
                    onClick={saveUserAnswer}
                >
                    <SaveIcon className="mr-2" />
                    Save Answer
                </Button>
                <Button
                    className="px-6 py-3 bg-gray-500 hover:bg-gray-600 text-white rounded-md shadow"
                    onClick={() => alert(`User Answer: ${userAnswer}`)}
                >
                    Show Answer
                </Button>
            </div>
        </div>
    );
}

export default RecordAnsSection;
