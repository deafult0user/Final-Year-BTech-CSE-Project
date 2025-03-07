"use client"
import React, { useState } from 'react';
import { IoCloseOutline } from "react-icons/io5";
import { Button } from '@/components/ui/button';
import Header from '../dashboard/_components/Header';
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
        <>
        <ClerkProvider>
            {/* <Header /> */}
            <div className="p-8 max-w-7xl mx-auto flex gap-8">
                <div className="flex-1 bg-white p-8 rounded-lg shadow-md space-y-6">
                    <h1 className="text-4xl font-bold mb-6 text-gray-800">Check Your ATS Score</h1>

                    {['jobDescription', 'fullName', 'aboutMe'].map((field) => (
                        <div key={field} className="space-y-2">
                            <label className="block text-lg font-medium text-gray-600 capitalize">{field.replace(/([A-Z])/g, ' $1')}</label>
                            <textarea
                                name={field}
                                placeholder={`Enter ${field}`}
                                value={formData[field]}
                                onChange={handleChange}
                                className="w-full p-3 border rounded-md focus:ring-2 focus:ring-indigo-400 bg-gray-50"
                            />
                        </div>
                    ))}

                    <div className="space-y-4">
                        <label className="block text-lg font-medium text-gray-600">Add Skills, Work Experience, Education, or Certifications</label>
                        <div className="flex gap-2">
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
                            <Button onClick={handleAddItem} className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-4 py-2 rounded-md">
                                Add
                            </Button>
                        </div>
                    </div>

                    {['skills', 'workExp', 'education', 'certifications'].map((field) => (
                        <div key={field} className="space-y-2">
                            <h2 className="text-2xl font-semibold capitalize text-gray-700">{field}</h2>
                            <div className="flex flex-wrap gap-2">
                                {formData[field].map((item, index) => (
                                    <div key={index} className="flex items-center gap-1 bg-indigo-100 text-indigo-700 p-2 rounded-md">
                                        {item}
                                        <IoCloseOutline className="cursor-pointer hover:text-red-500" onClick={() => handleRemoveItem(field, index)} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}

                    <Button onClick={getATSscore} className="w-full py-4 bg-gradient-to-b from-blue-500 to-blue-400 text-white font-bold rounded-md shadow-md hover:shadow-xl transition">
                        Calculate ATS Score
                    </Button>
                </div>

                {ATSscore && (
                    <div className="w-1/3 bg-gradient-to-b from-indigo-500 to-purple-500 p-6 rounded-lg shadow-lg space-y-6 text-white flex flex-col justify-center items-center">
                        <h1 className="text-5xl font-extrabold">{ATSscore}%</h1>
                        <p className="text-xl">Your ATS Score</p>
                        <Button onClick={() => setATSscore("")} className="bg-white text-indigo-500 w-full py-2 rounded-md font-bold">
                            Check Again
                        </Button>
                    </div>
                )}
            </div>
            </ClerkProvider>
        </>
    );

};

export default Page;
