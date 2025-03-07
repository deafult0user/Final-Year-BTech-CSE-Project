"use client";
import React, { useState } from 'react'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { LoaderPinwheel, X } from 'lucide-react';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from '@/components/ui/label'
import { Textarea } from "@/components/ui/textarea"
import { chatSession } from "@/utils/GeminiAiModel";
import { db } from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import { v4 as uuidv4 } from 'uuid';

import moment from 'moment';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { motion, MotionConfig } from 'framer-motion';


function AddNewInterview() {
    const [openDialog, setOpenDialog] = useState(false)
    const [JobPosition, setJobPosition] = useState()
    const [JobDesc, setJobDesc] = useState()
    const [JobExp, setJobExp] = useState()
    const [loading, setLoading] = useState(false);
    const [jsonResp, setjsonResp] = useState([]);
    const { user } = useUser();
    const router = useRouter();

    const onSubmit = async (e) => {
        setLoading(true)
        e.preventDefault();

        // console.log(JobDesc, JobPosition, JobExp);

        const InputPrompt = `Job Position:${JobPosition}, Job Description: ${JobDesc}, Years of Experience: ${JobExp}, Based on this information, please generate ${process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT} interview questions with answers in JSON format.`;
        const result = await chatSession.sendMessage(InputPrompt);
        const MockJsonResponse = (result.response.text()).replace('```json', '').replace('```', '');
        // console.log(JSON.parse(MockJsonResponse));  
        setjsonResp(MockJsonResponse); 
        console.log(MockJsonResponse)  //string format
        setLoading(false);
        const response = await db.insert(MockInterview).values({
            mockId: uuidv4(),
            jsonMockResp: MockJsonResponse,
            jobPosition: JobPosition,
            jobDesc: JobDesc,
            jobExperience: JobExp,
            createdBy: user?.primaryEmailAddress?.emailAddress,
            createdAt: moment().format('DD-MM-yyyy')
        }).returning({ mockId: MockInterview.mockId });
        // console.log("Inserted Id:",response);
        if (response) {
            setOpenDialog(false);
            router.push('/dashboard/interview/' + response[0]?.mockId);
        }

    }
    return (
        <div>
            <motion.div 
                initial={{ scale: 1, opacity: 0.8 }}
                whileHover={{ scale: 1.05, opacity: 1 }}
                whileTap={{ scale: 0.98 }}
                className="p-6 w-full rounded-lg bg-blue-500 shadow-lg hover:shadow-xl cursor-pointer transition-transform"
                onClick={() => setOpenDialog(true)}
            >
                <h2 className="font-bold text-lg text-center text-white">+ Add Your Details</h2>
            </motion.div>

            <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                <DialogContent className="max-w-2xl p-8 rounded-lg bg-white shadow-md">
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-semibold text-gray-800 mb-2">
                            Tell us more about your job profile
                        </DialogTitle>
                        <DialogClose />
                    </DialogHeader>

                    <DialogDescription>
                        <form onSubmit={onSubmit} className="space-y-6">
                            <div>
                                <Label className="text-lg text-gray-700">Job Position</Label>
                                <Input
                                    placeholder="e.g., Software Engineer"
                                    required
                                    className="mt-1"
                                    onChange={(e) => setJobPosition(e.target.value)}
                                />
                            </div>

                            <div>
                                <Label className="text-lg text-gray-700">Job Description</Label>
                                <Textarea
                                    placeholder="Brief description of your job role"
                                    required
                                    rows={4}
                                    className="mt-1"
                                    onChange={(e) => setJobDesc(e.target.value)}
                                />
                            </div>

                            <div>
                                <Label className="text-lg text-gray-700">Years of Experience</Label>
                                <Input
                                    placeholder="e.g., 2"
                                    min="0"
                                    max="20"
                                    type="number"
                                    required
                                    className="mt-1"
                                    onChange={(e) => setJobExp(e.target.value)}
                                />
                            </div>

                            <div className="flex justify-end">
                                <Button
                                    type="submit"
                                    disabled={loading}
                                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all"
                                >
                                    {loading ? <LoaderPinwheel className='animate-spin' /> : 'Submit'}
                                </Button>
                            </div>
                        </form>
                    </DialogDescription>
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default AddNewInterview;
