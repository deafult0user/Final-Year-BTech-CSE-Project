"use client";
import { Button } from "@/components/ui/button";
import {
  Disc2Icon,
  MicIcon,
  SaveIcon,
  WebcamIcon,
} from "lucide-react";
import React, { useEffect, useState, useRef } from "react";
import Webcam from "react-webcam";
import { chatSession } from "@/utils/GeminiAiModel";
import { UserAnswer } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import moment from "moment";
import { db } from "@/utils/db";
import { Toaster } from "@/components/ui/sonner";
import { eq, and } from "drizzle-orm";
import { toast } from "sonner";

function RecordAnsSection({ mockInterviewQuestion, activeQuestionIndex, interviewData }) {
  const [userAnswer, setUserAnswer] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [showCam, setShowCam] = useState(true);
  const recognitionRef = useRef(null);
  const { user } = useUser();

  useEffect(() => {
    return () => {
      if (recognitionRef.current) recognitionRef.current.stop();
    };
  }, []);

  const startRecording = () => {
    setIsRecording(true);
    setUserAnswer("");
    recognitionRef.current = new window.webkitSpeechRecognition();
    recognitionRef.current.continuous = true;
    recognitionRef.current.interimResults = true;
    recognitionRef.current.lang = "en-US";

    recognitionRef.current.onresult = (event) => {
      let finalTranscript = "";
      for (let i = 0; i < event.results.length; i++) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript + " ";
        }
      }
      setUserAnswer(finalTranscript.trim());
    };

    recognitionRef.current.start();
  };

  const stopRecording = () => {
    if (recognitionRef.current) recognitionRef.current.stop();
    setIsRecording(false);
  };

  const saveUserAnswer = async () => {
    stopRecording();

    if (userAnswer.trim().length < 10) {
      setTimeout(() => toast.warning("Answer too short! Try again."), 0);
      return;
    }

    try {
      const existingAnswer = await db
        .select()
        .from(UserAnswer)
        .where(
          and(
            eq(UserAnswer.mockIdRef, interviewData?.mockId),
            eq(UserAnswer.question, mockInterviewQuestion[activeQuestionIndex]?.question),
            eq(UserAnswer.userEmail, user?.primaryEmailAddress?.emailAddress)
          )
        );

      const feedbackPrompt = `
        Given the following:
        - Question: ${mockInterviewQuestion[activeQuestionIndex]?.question}
        - User Answer: ${userAnswer}
        - Difficulty Level: ${interviewData?.difficultyLevel}

        Please evaluate the user's answer (by comparing the important keywords from correct answer) based on the question and difficulty level also provide:
        1. A numerical rating (1 to 10) under the field "rating".
        2. A concise feedback under the field "feedback" in 1 to 2 sentences.

        Format the response as a JSON object with the fields "rating" and "feedback".
      `;
      const feedbackResult = await chatSession.sendMessage(feedbackPrompt);
      const feedbackText = await feedbackResult.response.text();
      const cleanJson = feedbackText.replace(/```json|```/g, "").trim();
      // console.log(cleanJson)
      let JsonFeedbackResp;
      try {
        JsonFeedbackResp = JSON.parse(cleanJson);
        if (!JsonFeedbackResp?.feedback || !JsonFeedbackResp?.rating) throw new Error();
      } catch {
        console.error("Invalid AI feedback:", feedbackText);
        setTimeout(() => toast.error("AI feedback could not be parsed."), 0);
        return;
      }

      if (existingAnswer.length > 0) {
        await db.update(UserAnswer).set({
          userAns: userAnswer,
          feedback: JsonFeedbackResp.feedback,
          rating: JsonFeedbackResp.rating,
          createdAt: moment().format("DD-MM-yyyy"),
        }).where(eq(UserAnswer.id, existingAnswer[0].id));
      } else {
        await db.insert(UserAnswer).values({
          mockIdRef: interviewData?.mockId,
          question: mockInterviewQuestion[activeQuestionIndex]?.question,
          correctAns: mockInterviewQuestion[activeQuestionIndex]?.answer,
          userAns: userAnswer,
          feedback: JsonFeedbackResp.feedback,
          rating: JsonFeedbackResp.rating,
          userEmail: user?.primaryEmailAddress?.emailAddress,
          createdAt: moment().format("DD-MM-yyyy"),
        });
      }

      setTimeout(() => toast.success("Answer saved and evaluated!"), 0);
    } catch (error) {
      console.error("Error saving answer:", error);
      setTimeout(() => toast.error("Error saving your answer."), 0);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center py-10 px-4">
      <Toaster />
      <div className="w-full max-w-3xl rounded-2xl overflow-hidden shadow-lg bg-white">
        {showCam && (
          <div className="relative">
          {showCam ? (
            <Webcam
              mirrored
              className="w-full h-[350px] object-cover rounded-t-2xl align-middle"
            />
          ) : (
            
            <img
              src="/dummy.jpg"
              alt="Camera Off"
              className="w-full h-[350px] object-cover rounded-t-2xl align-middle mb-48"
            />
          )}
          {isRecording && showCam && (
            <div className="absolute top-4 left-4 h-4 w-4 bg-red-500 rounded-full animate-pulse border-2 border-white" />
          )}
        </div>
        
        )}
        <div className="p-3 bg-gray-100">
          <textarea
            readOnly
            value={userAnswer}
            placeholder="Your transcript will appear here..."
            className="w-full p-3 bg-white border border-gray-300 rounded-md shadow-sm resize-none text-sm focus:ring focus:ring-blue-300"
            rows="3"
          />
        </div>
      </div>

      <div className="mt-6 flex flex-wrap gap-4 justify-center">
        <Button
          onClick={isRecording ? stopRecording : startRecording}
          className={`px-6 py-3 text-white rounded-xl font-medium shadow transition-all duration-300 flex items-center gap-2
            ${isRecording ? "bg-red-500 hover:bg-red-600 scale-105" : "bg-blue-600 hover:bg-blue-700"}
          `}
        >
          {isRecording ? <Disc2Icon size={18} /> : <MicIcon size={18} />}
          {isRecording ? "Stop Recording" : "Start Recording"}
        </Button>

        <Button
          onClick={saveUserAnswer}
          className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-xl shadow font-medium flex items-center gap-2 transition-transform hover:scale-105"
        >
          <SaveIcon size={18} />
          Save Answer
        </Button>

        <Button
          onClick={() => setShowCam(!showCam)}
          className="px-6 py-3 bg-gray-500 hover:bg-gray-600 text-white rounded-xl shadow font-medium flex items-center gap-2 transition-transform hover:scale-105"
        >
          <WebcamIcon size={18} />
          {showCam ? "Turn Off Camera" : "Turn On Camera"}
        </Button>
      </div>
    </div>
  );
}

export default RecordAnsSection;
