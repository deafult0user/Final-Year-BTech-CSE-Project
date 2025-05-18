'use client';

import { db } from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import React, { useEffect, useState, use } from 'react';
import QuestionsSection from './_components/QuestionsSection';
import RecordAnsSection from './_components/RecordAnsSection';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

function StartInterview({ params: paramsPromise }) {
  const params = React.use(paramsPromise); // ✅ FIX: Unwrap param promise
  const [interviewData, setInterviewData] = useState();
  const [mockInterviewQuestion, setMockInterviewQuestion] = useState();
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});

  useEffect(() => {
    GetInterviewDetails();
  }, []);

  const GetInterviewDetails = async () => {
    const result = await db
      .select()
      .from(MockInterview)
      .where(eq(MockInterview.mockId, params.interviewId));

    const jsonMockResponse = JSON.parse(result[0].jsonMockResp);
    setMockInterviewQuestion(jsonMockResponse);
    setInterviewData(result[0]);
  };

  const saveAnswer = (index, text) => {
    setAnswers((prev) => ({ ...prev, [index]: text }));
  };

  if (!mockInterviewQuestion) {
    return (
      <div className="w-full h-[60vh] flex items-center justify-center text-gray-500 text-xl">
        Loading interview...
      </div>
    );
  }

  const totalQuestions = mockInterviewQuestion.length;
  const progress = ((activeQuestionIndex + 1) / totalQuestions) * 100;

  return (
    <div className="px-4 md:px-10 py-2">
      {/* Question Tracker */}
      <div className="text-m text-gray-600 mb-2 text-right">
        <strong>
        Question {activeQuestionIndex + 1} of {totalQuestions}
        </strong>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-2 bg-gray-200 rounded-full mb-6 overflow-hidden">
        <div
          className="h-full bg-primary transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 ">
        {/* Video/Audio Recording */}
        <RecordAnsSection
          mockInterviewQuestion={mockInterviewQuestion}
          activeQuestionIndex={activeQuestionIndex}
          interviewData={interviewData}
          saveAnswer={saveAnswer}
        />

        {/* Questions */}
        <QuestionsSection
          mockInterviewQuestion={mockInterviewQuestion}
          activeQuestionIndex={activeQuestionIndex}
          setActiveQuestionIndex={setActiveQuestionIndex}
        />
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-end gap-4 ">
        {activeQuestionIndex > 0 && (
          <Button
            variant="outline"
            onClick={() => setActiveQuestionIndex((i) => i - 1)}
          >
            Previous
          </Button>
        )}

        {activeQuestionIndex < totalQuestions - 1 ? (
          <Button onClick={() => setActiveQuestionIndex((i) => i + 1)}>
            Next
          </Button>
        ) : (
          <Link
            href={`/dashboard/interview/${params.interviewId}/feedback`}
            passHref
          >
            <Button>End Interview</Button>
          </Link>
        )}
      </div>
    </div>
  );
}

export default StartInterview;

