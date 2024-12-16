// "use client"
// import { db } from '@/utils/db'
// import { UserAnswer } from '@/utils/schema'
// import { eq } from 'drizzle-orm'
// import React, { useEffect, useState } from 'react';
// import {
//     Collapsible,
//     CollapsibleContent,
//     CollapsibleTrigger,
// } from "@/components/ui/collapsible";
// import { LucideChevronsUpDown } from 'lucide-react';
// import { Button } from '@/components/ui/button';
// import { useRouter } from 'next/navigation';


// function Feedback({ params: paramsPromise }) {
//     const params = React.use(paramsPromise);
//     const [feedbackList, seFeedbackList] = useState([]);
//     const router = useRouter();

//     useEffect(() => {
//         GetFeedback();
//     }, [])

//     const GetFeedback = async () => {
//         const result = await db.select().from(UserAnswer).where(eq(UserAnswer.mockIdRef, params.interviewId)).orderBy(UserAnswer.id);
//         console.log(result)
//         seFeedbackList(result)

//     }


//     return (
//         <div className='p-10'>

//             {feedbackList?.length == 0 ?
//                 <h2 className='font-bold text-2xl text-gray-500'>No Interview Record Found</h2> :
//                 <>
//                     <h2 className='text-3xl font-bold text-green-500'>Congratulations</h2>
//                     <h2 className='text-2xl font-bold'>Here is your Interview Feedback</h2>
//                     <h2 className='text-lg text-blue-500 my-3'>Your overall Interview Rating is <strong>7/10</strong></h2>

//                     <h2 className='text-sm text-gray-500'>Find below the interview questions with correct answer, your answer and feedback for improvement.</h2>
//                     {feedbackList && feedbackList.map((item, index) => (
//                         <Collapsible key={index} className=''>
//                             <CollapsibleTrigger className='p-2 bg-secondary rounded-lg my-2 text-left flex justify-between gap-7 w-full'>{item.question} <LucideChevronsUpDown className='h-5 w-5' /> </CollapsibleTrigger>
//                             <CollapsibleContent>
//                                 <h2 className='p-2 bg-red-500 border rounded-lg my-2 '><strong>User Answer:</strong> {item.userAns}</h2>
//                                 <h2 className='p-2 bg-blue-500 border rounded-lg my-2 '><strong>Correct Answer:</strong> {item.correctAns}</h2>
//                                 <h2 className='p-2 bg-yellow-300 border rounded-lg my-2 '><strong>Rating:</strong> {item.rating}</h2>
//                                 <h2 className='p-2 bg-green-500 border rounded-lg my-2 '><strong>Feedback:</strong> {item.feedback}</h2>
//                             </CollapsibleContent>
//                         </Collapsible>

//                     ))}
//                 </>
//             }

//             <Button onClick={() => router.replace('/dashboard')}>Go Home</Button>
//         </div>
//     )
// }

// export default Feedback

"use client"
import { db } from '@/utils/db';
import { UserAnswer } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from '@/components/ui/collapsible';

function Feedback({ params: paramsPromise }) {
    const params = React.use(paramsPromise);
    const [feedbackList, setFeedbackList] = useState([]);
    const [overallRating, setOverallRating] = useState(0);
    const router = useRouter();

    useEffect(() => {
        fetchFeedback();
    }, []);

    const fetchFeedback = async () => {
        const result = await db
            .select()
            .from(UserAnswer)
            .where(eq(UserAnswer.mockIdRef, params.interviewId))
            .orderBy(UserAnswer.id);
        setFeedbackList(result);
        calculateOverallRating(result);
    };

    const calculateOverallRating = (feedback) => {
        if (!feedback || feedback.length === 0) {
            setOverallRating(0); // Default to 0 if no feedback
            return;
        }

        const totalRating = feedback.reduce((sum, item) => sum + (item.rating || 0), 0);
        // const averageRating = totalRating / feedback.length;
        setOverallRating(Math.round(averageRating * 10) / 10000); // Rounded to one decimal place
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex flex-col items-center justify-center py-10 px-6">
            {feedbackList.length === 0 ? (
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center"
                >
                    <h2 className="font-extrabold text-4xl text-gray-500">No Interview Record Found</h2>
                </motion.div>
            ) : (
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center"
                >
                    <h2 className="text-5xl font-extrabold text-green-600 animate-pulse mb-4">Congratulations!</h2>
                    <h3 className="text-2xl font-semibold text-gray-700 mb-4">
                        Here's Your Interview Feedback
                    </h3>
                    <p className="text-lg text-blue-600 mb-8">
                        Your Overall Interview Rating is <strong>{overallRating}/10</strong>
                    </p>

                    <div className="space-y-6 w-full max-w-4xl">
                        {feedbackList.map((item, index) => (
                            <Collapsible key={index} className="border border-gray-300 rounded-lg shadow-md">
                                <CollapsibleTrigger className="flex justify-between items-center p-4 bg-white rounded-t-lg cursor-pointer text-left">
                                    <h2 className="font-bold text-xl text-gray-800">{`Q${index + 1}: ${item.question}`}</h2>
                                    <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"></path>
                                    </svg>
                                </CollapsibleTrigger>
                                <CollapsibleContent className="bg-gray-50 p-4">
                                    <div className="space-y-4">
                                        <div className="bg-red-100 p-3 rounded-lg">
                                            <strong className="text-red-500">User Answer:</strong> {item.userAns}
                                        </div>
                                        <div className="bg-blue-100 p-3 rounded-lg">
                                            <strong className="text-blue-500">Correct Answer:</strong> {item.correctAns}
                                        </div>
                                        <div className="bg-yellow-100 p-3 rounded-lg">
                                            <strong className="text-yellow-500">Rating:</strong> {item.rating}
                                        </div>
                                        <div className="bg-green-100 p-3 rounded-lg">
                                            <strong className="text-green-500">Feedback:</strong> {item.feedback}
                                        </div>
                                    </div>
                                </CollapsibleContent>
                            </Collapsible>
                        ))}
                    </div>
                </motion.div>
            )}

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-10"
            >
                <Button 
                    className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-green-500 hover:to-blue-500 text-white px-6 py-3 rounded-lg font-semibold text-lg shadow-lg"
                    onClick={() => router.replace('/dashboard')}
                >
                    Go to Dashboard
                </Button>
            </motion.div>
        </div>
    );
}

// export default Feedback;



// "use client"
// import { db } from '@/utils/db';
// import { UserAnswer } from '@/utils/schema';
// import { eq } from 'drizzle-orm';
// import React, { useEffect, useState } from 'react';
// import { motion } from 'framer-motion';
// import { Button } from '@/components/ui/button';
// import { useRouter } from 'next/navigation';
// import {
//     Collapsible,
//     CollapsibleContent,
//     CollapsibleTrigger,
// } from '@/components/ui/collapsible';
// // import { Collapsible } from '@/components/ui/collapsible';
// import { LucideChevronsUpDown } from 'lucide-react';

// function Feedback({ params: paramsPromise }) {
//     const params = React.use(paramsPromise);
//     const [feedbackList, setFeedbackList] = useState([]);
//     const router = useRouter();

//     useEffect(() => {
//         fetchFeedback();
//     }, []);

//     const fetchFeedback = async () => {
//         const result = await db
//             .select()
//             .from(UserAnswer)
//             .where(eq(UserAnswer.mockIdRef, params.interviewId))
//             .orderBy(UserAnswer.id);
//         setFeedbackList(result);
//     };

//     return (
//         <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex flex-col items-center justify-center py-10 px-6">
//             {feedbackList.length === 0 ? (
//                 <motion.div
//                     initial={{ opacity: 0, y: 50 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     className="text-center"
//                 >
//                     <h2 className="font-extrabold text-4xl text-gray-500">No Interview Record Found</h2>
//                 </motion.div>
//             ) : (
//                 <motion.div
//                     initial={{ opacity: 0, scale: 0.8 }}
//                     animate={{ opacity: 1, scale: 1 }}
//                     className="text-center"
//                 >"sdsdsdd"
//                     <h2 className="text-5xl font-extrabold text-green-600 animate-pulse mb-4">Congratulations!</h2>
//                     <h3 className="text-2xl font-semibold text-gray-700 mb-4">
//                         Here's Your Interview Feedback
//                     </h3>
//                     <p className="text-lg text-blue-600 mb-8">
//                         Your Overall Interview Rating is <strong>7/10</strong>
//                     </p>

//                     <div className="grid grid-rows-1 md:grid-rows-2 lg:grid-rows-3 gap-8">
//                         {feedbackList.map((item, index) => (
//                             <motion.div
//                                 key={index}
//                                 initial={{ opacity: 0, y: 30 }}
//                                 whileInView={{ opacity: 1, y: 0 }}
//                                 viewport={{ once: true }}
//                                 transition={{ delay: 0.1 * index, duration: 0.3 }}
//                                 className="relative overflow-hidden bg-white shadow-lg rounded-xl border border-gray-200 transform transition-transform hover:scale-105"
//                             >
//                                 <Collapsible>
//                                 <CollapsibleTrigger className='p-2 bg-secondary rounded-lg my-2 text-left flex justify-between gap-7 w-full'>{item.question} <LucideChevronsUpDown className='h-5 w-5' /> </CollapsibleTrigger>
//                                 <CollapsibleContent>
//                                 <div className="p-6 space-y-4">
//                                     <h2 className="font-bold text-xl text-gray-800 mb-4">{item.question}</h2>
//                                     <div className="flex flex-col">
//                                         <div className="flex items-start gap-2 bg-red-100 p-3 rounded-lg">
//                                             <span className="text-red-500 font-semibold">User Answer:</span> 
//                                             <p>{item.userAns}</p>
//                                         </div>
//                                         <div className="flex items-start gap-2 bg-blue-100 p-3 rounded-lg">
//                                             <span className="text-blue-500 font-semibold">Correct Answer:</span> 
//                                             <p>{item.correctAns}</p>
//                                         </div>
//                                     </div>
//                                     <div className="flex justify-between items-center">
//                                         <div className="bg-yellow-100 px-4 py-2 rounded-full text-yellow-700 font-bold text-sm">Rating: {item.rating}</div>
//                                         <div className="bg-green-100 px-4 py-2 rounded-full text-green-700 font-bold text-sm">Feedback: {item.feedback}</div>
//                                     </div>
//                                 </div>
//                                 <div className="absolute top-0 right-0 bg-gradient-to-tr from-blue-500 to-green-500 text-white p-2 rounded-bl-xl text-sm font-bold">
//                                     Q{index + 1}
//                                 </div>
//                                 </CollapsibleContent>
//                                 </Collapsible>
//                             </motion.div>
//                         ))}
//                     </div>
//                 </motion.div>
//             )}

//             <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 0.5 }}
//                 className="mt-10"
//             >
//                 <Button 
//                     className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-green-500 hover:to-blue-500 text-white px-6 py-3 rounded-lg font-semibold text-lg shadow-lg"
//                     onClick={() => router.replace('/dashboard')}
//                 >
//                     Go to Dashboard
//                 </Button>
//             </motion.div>
//         </div>
//     );
// }





export default Feedback;