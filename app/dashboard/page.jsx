"use client"

import { UserButton } from '@clerk/nextjs';
import React from 'react';
import AddNewInterview from './_components/AddNewInterview';
import InterviewList from './_components/InterviewList';
import { motion, MotionConfig } from 'framer-motion';

function Dashboard() {
  return (
    <div className="p-10 bg-gray-50 min-h-screen">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-3xl font-semibold text-blue-900">Dashboard</h1>
      </div>

      {/* Create New Mock Interview Section */}
      <div className="bg-white shadow-sm rounded-lg p-6 mb-10">
        <h2 className="text-2xl font-medium text-blue-900 mb-4">
          Create and Start Your Mock Interview
        </h2>
        <AddNewInterview />
      </div>

      {/* Previous Interview List */}
      <div className="bg-white shadow-sm rounded-lg p-6">
        <h2 className="text-2xl font-medium text-blue-900 mb-4">
          Previous Interviews
        </h2>
        <InterviewList />
      </div>
      {/* <Chatbot/> */}
      
    </div>
  );
}

export default Dashboard;
