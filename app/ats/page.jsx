"use client";
import React, { useState } from 'react';
import { IoCloseOutline } from "react-icons/io5";
import { Button } from '@/components/ui/button';
import { chatSession } from '@/utils/GeminiAiModel';
import { ClerkProvider } from '@clerk/nextjs';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const ATSCheckerPage = () => {
    const [resumeData, setResumeData] = useState({
        jobDescription: "",
        fullName: "",
        aboutMe: "",
        skills: [],
        workExperience: [],
        education: [],
        certifications: []
    });

    const [newEntry, setNewEntry] = useState({ section: '', value: '' });
    const [atsScore, setAtsScore] = useState("");

    const handleTextChange = (e) => {
        const { name, value } = e.target;
        setResumeData({ ...resumeData, [name]: value });
    };

    const handleAddEntry = () => {
        if (newEntry.section && newEntry.value.trim() !== "") {
            setResumeData({
                ...resumeData,
                [newEntry.section]: [...resumeData[newEntry.section], newEntry.value]
            });
            setNewEntry({ section: newEntry.section, value: '' }); // retain selected section
        }
    };

    const handleRemoveEntry = (section, index) => {
        setResumeData({
            ...resumeData,
            [section]: resumeData[section].filter((_, i) => i !== index)
        });
    };

    const calculateATSScore = async () => {
        const prompt = `Suppose ATS score in % is X% for someone with the following information: ${JSON.stringify(resumeData)}. So, if I ask "What is the estimated ATS score based on the above info," then just give me the exact value of X, nothing else.`;
        const result = await chatSession.sendMessage(prompt);
        const score = (await result.response.text()).replace('```', '').trim();
        setAtsScore(score);
    };

    const textFields = [
        { name: 'jobDescription', label: 'Job Description' },
        { name: 'fullName', label: 'Full Name' },
        { name: 'aboutMe', label: 'About Me' }
    ];

    const multiEntrySections = [
        { key: 'skills', label: 'Skills' },
        { key: 'workExperience', label: 'Work Experience' },
        { key: 'education', label: 'Education' },
        { key: 'certifications', label: 'Certifications' }
    ];

    return (
        <ClerkProvider>
            <Header />
            <div className="min-h-screen bg-gray-100 flex flex-col items-center py-12 px-6">
                
                <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-4xl">
                    <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">ATS Score Checker</h1>
                    <div className="grid gap-6">
                        {textFields.map(({ name, label }) => (
                            <div key={name}>
                                <label className="block text-lg font-semibold text-gray-700">{label}</label>
                                <textarea
                                    name={name}
                                    placeholder={`Enter ${label}`}
                                    value={resumeData[name]}
                                    onChange={handleTextChange}
                                    className="w-full p-3 border rounded-md focus:ring-2 focus:ring-indigo-400 bg-gray-50"
                                />
                            </div>
                        ))}

                        <div>
                            <label className="block text-lg font-semibold text-gray-700 mb-2">Add to Resume Sections</label>
                            <div className="flex gap-2">
                                <select
                                    value={newEntry.section}
                                    onChange={(e) => setNewEntry({ ...newEntry, section: e.target.value })}
                                    className="p-3 border rounded-md bg-gray-50"
                                >
                                    <option value="">Select Section</option>
                                    {multiEntrySections.map(({ key, label }) => (
                                        <option key={key} value={key}>{label}</option>
                                    ))}
                                </select>
                                <input
                                    placeholder="Enter item"
                                    value={newEntry.value}
                                    onChange={(e) => setNewEntry({ ...newEntry, value: e.target.value })}
                                    className="flex-grow p-3 border rounded-md bg-gray-50"
                                />
                                <Button onClick={handleAddEntry} className="bg-indigo-600 text-white px-4 py-2 rounded-md">
                                    Add
                                </Button>
                            </div>
                        </div>

                        {multiEntrySections.map(({ key, label }) => (
                            <div key={key}>
                                <h2 className="text-lg font-semibold text-gray-700 mb-2">{label}</h2>
                                <div className="flex flex-wrap gap-2">
                                    {resumeData[key].map((item, index) => (
                                        <div key={index} className="flex items-center gap-1 bg-gray-200 text-gray-800 px-3 py-1 rounded-md">
                                            {item}
                                            <IoCloseOutline className="cursor-pointer hover:text-red-500" onClick={() => handleRemoveEntry(key, index)} />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}

                        <Button onClick={calculateATSScore} className="w-full py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition">
                            Calculate ATS Score
                        </Button>
                        {atsScore && (
                    <div className="mb-6 bg-gradient-to-b from-blue-500 to-blue-400 p-6 rounded-lg shadow-lg text-white text-center w-full">
                        <h1 className="text-5xl font-bold">{atsScore}%</h1>
                        <p className="text-xl mt-2">Your ATS Score</p>
                        <Button onClick={() => setAtsScore("")} className="mt-4 bg-white text-blue-600 w-full py-2 rounded-md font-semibold">
                            Check Again
                        </Button>
                    </div>
                )}
                    </div>
                </div>
                
            </div>
            <Footer />
        </ClerkProvider>
    );
};

export default ATSCheckerPage;
