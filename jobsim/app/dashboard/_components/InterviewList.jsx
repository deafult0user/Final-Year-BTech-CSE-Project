// "use client"
// import { db } from '@/utils/db';
// import { MockInterview } from '@/utils/schema';
// import { useUser } from '@clerk/nextjs'
// import { desc, eq } from 'drizzle-orm';
// import React, { useEffect, useState } from 'react'
// import InterviewItemCard from './InterviewItemCard';

// function InterviewList() {
//     const { user } = useUser();
//     const [interviewList, setInterviewList] = useState([]);

//     useEffect(()=>{
//         user && GetInterviewList();
//     },[user])

//     const GetInterviewList = async () => {
//         const result = await db.select().from(MockInterview)
//         .where(eq(MockInterview.createdBy, user?.primaryEmailAddress.emailAddress))
//         .orderBy(desc(MockInterview.id));
//         // console.log(result);
//         setInterviewList(result);
//     }
//     return (
//         <div>
//             <h2 className='mt-10'><strong>Previous Mock Interview Lists</strong></h2>

//             <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-3'>
//                 {interviewList&&interviewList.map((interview, index)=>(
//                     <InterviewItemCard 
//                     interview={interview}
//                     key={index} />
//                 ))} 
//             </div>
//         </div>
//     )
// }

// export default InterviewList



"use client";
import { db } from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import { useUser } from '@clerk/nextjs';
import { desc, eq } from 'drizzle-orm';
import React, { useEffect, useState } from 'react';
import InterviewItemCard from './InterviewItemCard';
import { motion } from 'framer-motion';

function InterviewList() {
    const { user } = useUser();
    const [interviewList, setInterviewList] = useState([]);

    useEffect(() => {
        user && GetInterviewList();
    }, [user]);

    const GetInterviewList = async () => {
        const result = await db
            .select()
            .from(MockInterview)
            .where(eq(MockInterview.createdBy, user?.primaryEmailAddress.emailAddress))
            .orderBy(desc(MockInterview.id));
        setInterviewList(result);
    };

    return (
        <div>
            <h2 className="mt-10 text-center text-2xl font-bold text-gray-700">Mock Interview History</h2>
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-5 px-4"
            >
                {interviewList &&
                    interviewList.map((interview, index) => (
                        <InterviewItemCard interview={interview} key={index} />
                    ))}
            </motion.div>
        </div>
    );
}

export default InterviewList;
