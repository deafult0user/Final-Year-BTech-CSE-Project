"use client";
import React, { useState, useEffect, useRef } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from './ui/scroll-area';
import { X, MessageCircle, ChevronDown, Send, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useChat } from '@ai-sdk/react';
import { Input } from './ui/input';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const Chatbot = () => {
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [showChatIcon, setShowChatIcon] = useState(false);
    const messagesEndRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            setShowChatIcon(true);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleChat = () => setIsChatOpen(!isChatOpen);
    const scrollToBottom = () => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });

    const { messages, input, handleInputChange, handleSubmit, isLoading, stop, reload, error } = useChat({
        api: '/api/gemini',
        onResponse: scrollToBottom,
    });

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    return (
        <div>
            <AnimatePresence>
                {showChatIcon && (
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 50 }}
                        transition={{ duration: 0.2 }}
                        className='fixed bottom-6 right-6 z-50'
                    >
                        
                        <Button
                            onClick={toggleChat}
                            size='icon'
                            className='animate-spin rounded-full p-7 shadow-2xl bg-blue-950 hover:scale-105 transition-transform'
                        >
                            {isChatOpen ? <ChevronDown className='size-12' /> : <MessageCircle className='size-1' />}
                        </Button>
                        
                    </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {isChatOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.2 }}
                        className='fixed bottom-24 right-6 z-50 w-[90%] md:w-[420px] lg:w-[450px]'
                    >
                        <Card className='border shadow-xl rounded-xl bg-white/45 backdrop-blur-lg'>
                            <CardHeader className='flex flex-row items-center justify-between bg-gradient-to-r from-black to-blue-950 text-white rounded-t-xl p-4'>
                                <CardTitle className='text-lg font-semibold align-centre'>JOBSim Chatbot</CardTitle>
                                <Button
                                    onClick={toggleChat}
                                    size='sm'
                                    variant='ghost'
                                    className='text-white hover:bg-white rounded-full'
                                >
                                    <X className='size-5' />
                                </Button>
                            </CardHeader>
                            <CardContent className='p-4'>
                                <ScrollArea className='h-[320px] pr-4 flex flex-col-reverse'>
                                    {messages.map((message, index) => (
                                        <div key={index} className={`mb-3 flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                                            <div
                                                className={`p-3 max-w-[80%] rounded-lg shadow-md text-sm transition-all duration-200 ${message.role === "user" ?
                                                    'bg-blue-900 text-white rounded-br-none' :
                                                    'bg-white text-gray-900 rounded-bl-none'}`}
                                            >
                                                <ReactMarkdown children={message.content} remarkPlugins={[remarkGfm]} />
                                            </div>
                                        </div>
                                    ))}
                                    {isLoading && (
                                        <div className='flex justify-center gap-3 my-4'>
                                            <Loader2 className='animate-spin h-5 w-5 text-blue-600' />
                                            <button className='underline text-sm' type='button' onClick={() => stop()}>
                                                Stop
                                            </button>
                                        </div>
                                    )}
                                    {error && (
                                        <div className='flex justify-center gap-3 my-4 text-red-600'>
                                            <div>An error occurred. Please try again.</div>
                                            <button className='underline text-sm' type='button' onClick={() => reload()}>
                                                Retry
                                            </button>
                                        </div>
                                    )}
                                    <div ref={messagesEndRef} />
                                </ScrollArea>
                            </CardContent>
                            <CardFooter className='border-t rounded-xl bg-gray-100 p-3'>
                                <form onSubmit={handleSubmit} className='flex w-full items-center space-x-2'>
                                    <Input value={input} onChange={handleInputChange} className='flex-1 text-sm' placeholder='Type a message...' />
                                    <Button type='submit' className='size-9' disabled={isLoading} size='icon'>
                                        <Send className='size-4' />
                                    </Button>
                                </form>
                            </CardFooter>
                        </Card>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Chatbot;