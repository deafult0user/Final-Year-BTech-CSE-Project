// import { Button } from '@/components/ui/button'
// import { useRouter } from 'next/navigation'
// import React from 'react'

// function InterviewItemCard({interview}) {
//     const router = useRouter();
//     const onStart=()=>{
//         router.push('dashboard/interview/'+interview?.mockId)
//     }

//     const onFeedback = ()=>{
//         router.push('dashboard/interview/'+interview?.mockId+'/feedback')
//     }

//   return (
//     <div className='border shadow-sm rounded-lg p-3'>
//         <h2 className='font-bold text-primary'>{interview?.jobPosition}</h2>
//         <h2 className='text-sm text-gray-600'>{interview?.jobExperience} Years of Experience</h2>
//         <h2 className='text-xs text-gray-400'>Created At: {interview?.createdAt}</h2>
//         <div className='flex justify-between mt-2 gap-5'>
//             <Button size="sm" variant="outline" className='w-full' onClick={onFeedback}>Feedback</Button>
//             <Button size="sm" variant="outline" className='w-full' onClick={onStart}>Start</Button>
//         </div>
//     </div>
//   ) 
// }

// export default InterviewItemCard


import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import React from 'react';
import { motion } from 'framer-motion';

function InterviewItemCard({ interview }) {
    const router = useRouter();

    const onStart = () => {
        router.push('dashboard/interview/' + interview?.mockId);
    };

    const onFeedback = () => {
        router.push('dashboard/interview/' + interview?.mockId + '/feedback');
    };

    return (
        <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-5 bg-gradient-to-bl from-pink-200 via-pink-100 to-yellow-100 shadow-lg rounded-lg border border-gray-200"
        >
            <h2 className="font-bold text-lg text-gray-800">{interview?.jobPosition}</h2>
            <p className="text-sm text-gray-600">{interview?.jobExperience} Years of Experience</p>
            <p className="text-xs text-gray-400">Created At: {interview?.createdAt}</p>
            <div className="flex justify-between mt-4 gap-3">
                <motion.button
                    whileHover={{ backgroundColor: '#f0f0f0' }}
                    onClick={onFeedback}
                    className="w-full py-2 bg-gray-100 text-gray-800 rounded-md border border-gray-300 text-sm font-medium hover:shadow"
                >
                    Feedback
                </motion.button>
                <motion.button
                    whileHover={{ backgroundColor: '#e5f6ff' }}
                    onClick={onStart}
                    className="w-full py-2 bg-blue-100 text-blue-800 rounded-md border border-blue-300 text-sm font-medium hover:shadow"
                >
                    Start
                </motion.button>
            </div>
        </motion.div>
    );
}

export default InterviewItemCard;
