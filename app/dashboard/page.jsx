"use client"

import { UserButton, useUser } from '@clerk/nextjs';
import React from 'react';
import AddNewInterview from './_components/AddNewInterview';
import InterviewList from './_components/InterviewList';
import Chatbot from '@/components/Chatbot';
import Header from './_components/Header';
import Footer from '@/components/Footer';


function Dashboard() {
  const { user } = useUser();
  return (
    <>
    <Header/>
    <div className="p-10 bg-gray-50 min-h-screen">
      {/* Header Section */}
      <div className="flex flex-col justify-between  mb-10">
      {/* <span className="text-white font-semibold">Hi, {user?.firstName}!</span> */}
        <h1 className="text-3xl font-extrabold text-blue-900"> Dashboard</h1>
        <h2 className="text-2xl font-bold text-blue-900">Hi, {user?.fullName} !</h2>
      </div>

      {/* Create New Mock Interview Section */}
      <div className="bg-white shadow-sm rounded-lg p-6 mb-10">
        <h2 className="text-xl font-semibold text-black mb-4">
          Create and Start Your Mock Interview
        </h2>
        <AddNewInterview />
      </div>

      {/* Previous Interview List */}
      <div className="bg-white shadow-sm rounded-lg p-6">
        <h2 className="text-xl font-semibold text-black mb-4">
          Previous Interviews
        </h2>
        <InterviewList />
      </div>
      {/* <Chatbot/> */}
      <Chatbot/>
    </div>
    <Footer/></>
  );
}

export default Dashboard;
