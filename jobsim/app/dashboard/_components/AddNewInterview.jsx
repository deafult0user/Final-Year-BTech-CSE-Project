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
        setjsonResp(MockJsonResponse);   //string format
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
            <div className='p-8 border-2 border-dashed border-gray-300 rounded-2xl bg-white shadow-md hover:shadow-2xl hover:scale-105 cursor-pointer transition-all ' onClick={() => setOpenDialog(true)}>
                <h2 className='font-bold text-lg text-center text-gray-700'>+ Add New</h2>
            </div>
            <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                <DialogContent className="max-w-2xl p-8 rounded-lg shadow-lg bg-white">
                    <DialogHeader className="mb-6">
                        <DialogTitle className="text-3xl font-semibold text-gray-800">
                            Tell us more about your job profile
                        </DialogTitle>
                        <DialogClose className="absolute right-4 top-4 p-2 rounded-full bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500">
                            <X className="h-5 w-5 text-gray-700" />
                            <span className="sr-only">Close</span>
                        </DialogClose>
                    </DialogHeader>


                    <DialogDescription>
                        <div className="space-y-6">
                            <form onSubmit={onSubmit}>

                                <div>
                                    <Label className="block text-lg font-medium text-gray-700 mb-2">
                                        Job Position
                                    </Label>
                                    <Input
                                        placeholder="Enter your job title (e.g., Software Engineer)"
                                        required
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        onChange={(event) => setJobPosition(event.target.value)}
                                    />
                                </div>


                                <div>
                                    <Label className="block text-lg font-medium text-gray-700 mb-2">
                                        Job Description
                                    </Label>
                                    <Textarea
                                        placeholder="Provide a brief description of your job role"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                                        required
                                        rows={4}
                                        onChange={(event) => setJobDesc(event.target.value)}
                                    />
                                </div>


                                <div>
                                    <Label className="block text-lg font-medium text-gray-700 mb-2">
                                        Years of Experience
                                    </Label>
                                    <Input
                                        placeholder="Enter your years of experience (e.g., 2)"
                                        min="0"
                                        max="20"
                                        type="number"
                                        required
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        onChange={(event) => setJobExp(event.target.value)}
                                    />
                                </div>

                                {/* Submit Button */}
                                <div className="flex justify-end">
                                    <Button
                                        type="submit"
                                        disabled={loading}
                                        className="mt-7 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-500 focus:outline-none transition-all"
                                    >
                                        {loading ?
                                            <>
                                                <LoaderPinwheel className='animate-spin' />
                                            </>
                                            : 'Submit'
                                        }
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </DialogDescription>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default AddNewInterview;
