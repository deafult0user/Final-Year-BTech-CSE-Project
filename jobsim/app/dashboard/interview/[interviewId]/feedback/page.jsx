"use client"
import { db } from '@/utils/db'
import { UserAnswer } from '@/utils/schema'
import { eq } from 'drizzle-orm'
import React, { useEffect, useState } from 'react';
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { LucideChevronsUpDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';


function Feedback({ params: paramsPromise }) {
    const params = React.use(paramsPromise);
    const [feedbackList, seFeedbackList] = useState([]);
    const router = useRouter();

    useEffect(() => {
        GetFeedback();
    }, [])

    const GetFeedback = async () => {
        const result = await db.select().from(UserAnswer).where(eq(UserAnswer.mockIdRef, params.interviewId)).orderBy(UserAnswer.id);
        console.log(result)
        seFeedbackList(result)

    }


    return (
        <div className='p-10'>

            {feedbackList?.length == 0 ?
                <h2 className='font-bold text-2xl text-gray-500'>No Interview Record Found</h2> :
                <>
                    <h2 className='text-3xl font-bold text-green-500'>Congratulations</h2>
                    <h2 className='text-2xl font-bold'>Here is your Interview Feedback</h2>
                    <h2 className='text-lg text-blue-500 my-3'>Your overall Interview Rating is <strong>7/10</strong></h2>

                    <h2 className='text-sm text-gray-500'>Find below the interview questions with correct answer, your answer and feedback for improvement.</h2>
                    {feedbackList && feedbackList.map((item, index) => (
                        <Collapsible key={index} className=''>
                            <CollapsibleTrigger className='p-2 bg-secondary rounded-lg my-2 text-left flex justify-between gap-7 w-full'>{item.question} <LucideChevronsUpDown className='h-5 w-5' /> </CollapsibleTrigger>
                            <CollapsibleContent>
                                <h2 className='p-2 bg-red-500 border rounded-lg my-2 '><strong>User Answer:</strong> {item.userAns}</h2>
                                <h2 className='p-2 bg-blue-500 border rounded-lg my-2 '><strong>Correct Answer:</strong> {item.correctAns}</h2>
                                <h2 className='p-2 bg-yellow-300 border rounded-lg my-2 '><strong>Rating:</strong> {item.rating}</h2>
                                <h2 className='p-2 bg-green-500 border rounded-lg my-2 '><strong>Feedback:</strong> {item.feedback}</h2>
                            </CollapsibleContent>
                        </Collapsible>

                    ))}
                </>
            }

            <Button onClick={() => router.replace('/dashboard')}>Go Home</Button>
        </div>
    )
}

export default Feedback