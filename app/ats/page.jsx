"use client"
import React, { useState } from 'react';
import { IoCloseOutline } from "react-icons/io5";
import { Button } from '@/components/ui/button';
import { chatSession } from '@/utils/GeminiAiModel';
import { ClerkProvider } from '@clerk/nextjs';

const Page = () => {
    const [formData, setFormData] = useState({
        jobDescription: "",
        fullName: "",
        aboutMe: "",
        skills: [],
        workExp: [],
        education: [],
        certifications: []
    });
    const [newItem, setNewItem] = useState({ field: '', value: '' });
    const [ATSscore, setATSscore] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleAddItem = () => {
        if (newItem.value.trim() !== "") {
            setFormData({
                ...formData,
                [newItem.field]: [...formData[newItem.field], newItem.value]
            });
            setNewItem({ field: '', value: '' });
        }
    };

    const handleRemoveItem = (field, index) => {
        setFormData({
            ...formData,
            [field]: formData[field].filter((_, i) => i !== index)
        });
    };

    const getATSscore = async () => {
        const tempPrompt = `Suppose ATS score in % is X% for someone with the following information: ${JSON.stringify(formData)}. So, if I ask "What is the estimated ATS score based on the above info," then just give me the exact value of X, nothing else.`;
        const result = await chatSession.sendMessage(tempPrompt);
        const ATSscore = (await result.response.text()).replace('```', '').trim();
        setATSscore(ATSscore);
    };

    return (
        <ClerkProvider>
            <div className="min-h-screen bg-gray-100 flex flex-col items-center py-12 px-6">
                <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-4xl">
                    <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">ATS Score Checker</h1>
                    <div className="grid gap-6">
                        {['jobDescription', 'fullName', 'aboutMe'].map((field) => (
                            <div key={field}>
                                <label className="block text-lg font-semibold text-gray-700 capitalize">{field.replace(/([A-Z])/g, ' $1')}</label>
                                <textarea
                                    name={field}
                                    placeholder={`Enter ${field}`}
                                    value={formData[field]}
                                    onChange={handleChange}
                                    className="w-full p-3 border rounded-md focus:ring-2 focus:ring-indigo-400 bg-gray-50"
                                />
                            </div>
                        ))}
                        <div>
                            <label className="block text-lg font-semibold text-gray-700">Add Skills, Experience, Education, or Certifications</label>
                            <div className="flex gap-2 mt-2">
                                <select
                                    value={newItem.field}
                                    onChange={(e) => setNewItem({ ...newItem, field: e.target.value })}
                                    className="p-3 border rounded-md bg-gray-50"
                                >
                                    <option value="">Select Field</option>
                                    {['skills', 'workExp', 'education', 'certifications'].map((field) => (
                                        <option key={field} value={field}>{field}</option>
                                    ))}
                                </select>
                                <input
                                    placeholder="Add item"
                                    value={newItem.value}
                                    onChange={(e) => setNewItem({ ...newItem, value: e.target.value })}
                                    className="flex-grow p-3 border rounded-md bg-gray-50"
                                />
                                <Button onClick={handleAddItem} className="bg-indigo-600 text-white px-4 py-2 rounded-md">
                                    Add
                                </Button>
                            </div>
                        </div>
                        {['skills', 'workExp', 'education', 'certifications'].map((field) => (
                            <div key={field}>
                                <h2 className="text-lg font-semibold text-gray-700 capitalize mb-2">{field}</h2>
                                <div className="flex flex-wrap gap-2">
                                    {formData[field].map((item, index) => (
                                        <div key={index} className="flex items-center gap-1 bg-gray-200 text-gray-800 px-3 py-1 rounded-md">
                                            {item}
                                            <IoCloseOutline className="cursor-pointer hover:text-red-500" onClick={() => handleRemoveItem(field, index)} />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                        <Button onClick={getATSscore} className="w-full py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition">
                            Calculate ATS Score
                        </Button>
                    </div>
                </div>
                {ATSscore && (
                    <div className="mt-6 bg-gradient-to-b from-blue-500 to-blue-400 p-6 rounded-lg shadow-lg text-white text-center w-full max-w-md">
                        <h1 className="text-5xl font-bold">{ATSscore}%</h1>
                        <p className="text-xl mt-2">Your ATS Score</p>
                        <Button onClick={() => setATSscore("")} className="mt-4 bg-white text-blue-600 w-full py-2 rounded-md font-semibold">
                            Check Again
                        </Button>
                    </div>
                )}
            </div>
        </ClerkProvider>
    );
};

export default Page;
