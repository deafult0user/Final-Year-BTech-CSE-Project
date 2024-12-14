"use client";
import { Button } from '@/components/ui/button';
import { MicIcon, WebcamIcon } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import Webcam from 'react-webcam';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

function RecordAnsSection() {
    const [userAnswer, setUserAnswer] = useState('');
    const {
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition,
    } = useSpeechRecognition();

    if (!browserSupportsSpeechRecognition) {
        return <span>Browser doesn't support speech recognition.</span>;
    }

    // Handle transcript updates
    useEffect(() => {
        if (transcript) {
            setUserAnswer((prevAns) => prevAns + ' ' + transcript);
            resetTranscript(); // Clear transcript after appending
        }
    }, [transcript, resetTranscript]);

    // Restart listening if it stops unexpectedly
    useEffect(() => {
        if (!listening) {
            SpeechRecognition.startListening({ continuous: true });
        }
    }, [listening]);

    const toggleListening = () => {
        if (listening) {
            SpeechRecognition.stopListening();
        } else {
            SpeechRecognition.startListening({ continuous: true });
        }
    };

    return (
        <div className="flex flex-col items-center justify-center">
            <div className="flex flex-col mt-16 justify-center items-center bg-black rounded-lg p-5 relative">
                <WebcamIcon className="absolute h-36 w-36 text-gray-400 my-5 p-10 bg-gray-50 rounded-full border border-gray-200" />
                <Webcam
                    mirrored={true}
                    style={{
                        height: 300,
                        width: '100%',
                        zIndex: 10,
                    }}
                />
            </div>
            <div>
                <Button variant="outline" className="mt-10 mb-10" onClick={toggleListening}>
                    {listening ? (
                        <h2 className="bg-red-500 flex p-2 text-white">
                            <MicIcon /> Recording...
                        </h2>
                    ) : (
                        'Start Recording'
                    )}
                </Button>
            </div>
            <Button
                onClick={() => console.log(userAnswer)}
                className="bg-blue-500 text-white"
            >
                Show User Answer
            </Button>
        </div>
    );
}

export default RecordAnsSection;
