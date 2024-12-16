// import { UserButton } from '@clerk/nextjs'
// import React from 'react'
// import AddNewInterview from './_components/AddNewInterview';
// import InterviewList from './_components/InterviewList';

// function Dashboard() {
//   return (
//     <div className='p-10'>
//       <h2 className='font-bold text-2xl'>Dashboard</h2>
//       <h2 className='mt-10'><strong>Create and Start your Mock Interview</strong></h2>

//       <div className='grid grid-cols-1 md:grid-cols-3 my-5'>
//         <AddNewInterview/>
//       </div>
//       {/* Previous Interview List */}
//       <InterviewList/>

    
//     </div>
//   )
// }

// export default Dashboard
"use client"

import { UserButton } from '@clerk/nextjs';
import React from 'react';
import AddNewInterview from './_components/AddNewInterview';
import InterviewList from './_components/InterviewList';
import { motion, MotionConfig } from 'framer-motion';

function Dashboard() {
  return (
    <div className="p-10">
      {/* Header Section */}
      <div className="flex justify-between items-center">
        <motion.h1
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className=" font-bold text-4xl text-gray-800"
        >
          Dashboard
        </motion.h1>
      </div>

      {/* Create New Mock Interview Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="mt-10"
      >
        <h2 className="text-xl text-center justify-center font-semibold text-gray-700">
          <strong>Create and Start Your Mock Interview</strong>
        </h2>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-4 my-5"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <AddNewInterview />
        </motion.div>
      </motion.div>

      {/* Previous Interview List */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <InterviewList />
      </motion.div>
    </div>
  );
}

export default Dashboard;
