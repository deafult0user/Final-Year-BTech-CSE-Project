"use client";
import React, { useState } from 'react';
import {Dialog, DialogClose, DialogContent,DialogDescription,DialogHeader, DialogTitle,} from '@/components/ui/dialog';
import { LoaderPinwheel } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { chatSession } from '@/utils/GeminiAiModel';
import { db } from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

function AddNewInterview() {
    const [openDialog, setOpenDialog] = useState(false);
    const [JobPosition, setJobPosition] = useState();
    const [JobDesc, setJobDesc] = useState();
    const [JobExp, setJobExp] = useState();
    const [Level, setLevel] = useState('');
    const [loading, setLoading] = useState(false);
    const { user } = useUser();
    const router = useRouter();

    const onSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();
        // console.log(Level)
        const InputPrompt = `Job Position:${JobPosition}, Job Description: ${JobDesc}, Years of Experience: ${JobExp}, Based on this information, please generate ${process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT} interview questions with answers in JSON format at difficulty level: ${Level}`;
        const result = await chatSession.sendMessage(InputPrompt);
        const MockJsonResponse = (result.response.text()).replace('```json', '').replace('```', '');
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

        if (response) {
            setOpenDialog(false);
            router.push('/dashboard/interview/' + response[0]?.mockId);
        }
    };

    return (
        <div>
            <motion.div
                initial={{ scale: 1, opacity: 0.9 }}
                whileHover={{ scale: 1.1, opacity: 1 }}
                whileTap={{ scale: 0.95 }}
                className="p-6 w-full max-w-md mx-auto my-6 rounded-lg bg-blue-500 shadow-lg hover:shadow-xl cursor-pointer"
                onClick={() => setOpenDialog(true)}
            >
                <h2 className="text-white text-lg font-bold text-center">+ Add Job Profile</h2>
            </motion.div>

            <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                <DialogContent className="max-w-3xl p-10 rounded-xl bg-white shadow-2xl">
                    <DialogHeader>
                        <DialogTitle className="text-3xl font-semibold text-gray-800">Add Your Job Details</DialogTitle>
                        <DialogClose />
                    </DialogHeader>

                    <DialogDescription>
                        <form onSubmit={onSubmit} className="space-y-8">
                            <div>
                                <Label className="text-lg text-gray-700">Job Position</Label>
                                <Input
                                    placeholder="e.g., Software Engineer"
                                    required
                                    className="mt-2"
                                    onChange={(e) => setJobPosition(e.target.value)}
                                />
                            </div>

                            <div>
                                <Label className="text-lg text-gray-700">Job Description</Label>
                                <Textarea
                                    placeholder="Brief description of your job role"
                                    required
                                    rows={5}
                                    className="mt-2"
                                    onChange={(e) => setJobDesc(e.target.value)}
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <Label className="text-lg text-gray-700">Years of Experience</Label>
                                    <Input
                                        placeholder="e.g., 2"
                                        min="0"
                                        max="20"
                                        type="number"
                                        required
                                        className="mt-2"
                                        onChange={(e) => setJobExp(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <Label className="text-lg text-gray-700 mb-2">Difficulty Level</Label>
                                    <Select onValueChange={(val) => setLevel(val)}>
                                        <SelectTrigger className="mt-2">
                                            <SelectValue placeholder="Select difficulty" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="easy">Easy</SelectItem>
                                            <SelectItem value="medium">Medium</SelectItem>
                                            <SelectItem value="high">High</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            <div className="flex justify-end">
                                <Button
                                    type="submit"
                                    disabled={loading}
                                    className="px-8 py-3 bg-teal-600 text-white rounded-xl hover:bg-teal-700 transition-all"
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