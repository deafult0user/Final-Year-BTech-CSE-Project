"use client"
import { db } from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import React, { useEffect, useState } from 'react'
import QuestionsSection from './_components/QuestionsSection';
import RecordAnsSection from './_components/RecordAnsSection';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

function StartInterview({ params: paramsPromise }) {
    const params = React.use(paramsPromise);
    const [interviewData, setinterviewData] = useState();
    const [mockInterviewQuestion, setmockInterviewQuestion] = useState();
    const [activeQuestionIndex, setactiveQuestionIndex] = useState(0);

    useEffect(() => {
        GetInterviewDetails();
    }, [])

    const GetInterviewDetails = async () => {
        const result = await db.select().from(MockInterview).where(eq(MockInterview.mockId, params.interviewId));

        const jsonMockResponse = JSON.parse(result[0].jsonMockResp);
        // console.log(jsonMockResponse);
        setmockInterviewQuestion(jsonMockResponse);
        setinterviewData(result[0]);
    };

    return (
        <div>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
                {/* Questions */}
                <QuestionsSection 
                mockInterviewQuestion={mockInterviewQuestion}
                activeQuestionIndex={activeQuestionIndex} />


                {/* Video Audio Recording  */}
                <RecordAnsSection 
                mockInterviewQuestion={mockInterviewQuestion}
                activeQuestionIndex={activeQuestionIndex}
                interviewData={interviewData}/>

            </div>
            <div className='flex justify-end gap-6'>
            {activeQuestionIndex>0 && 
            <Button onClick={()=>{
                setactiveQuestionIndex(activeQuestionIndex-1)
            }}>Previous Question</Button>}
            {activeQuestionIndex!=mockInterviewQuestion?.length-1 && 
            <Button onClick={()=>{
                setactiveQuestionIndex(activeQuestionIndex+1)
            }}>Next Question</Button>}
            <Link href={'/dashboard/interview/'+params.interviewId+'/feedback'}>
            {activeQuestionIndex==mockInterviewQuestion?.length-1 && 
            <Button>End Interview</Button>}
            </Link>
            </div>
        </div>
    )
}

export default StartInterview