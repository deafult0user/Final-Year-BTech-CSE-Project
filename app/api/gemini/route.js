import { streamText, Message } from 'ai';
import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { initialMessage } from '@/lib/data';

const google = createGoogleGenerativeAI({
    apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY || '',
});
export const runtime = 'edge';

const generateId = () => Math.random().toString(36).slice(2, 15);

const buildGoogleGenAIPrompt = (messages) => [
    {
        id: generateId(),
        role: 'system', // Ensure 'system' role is correctly set
        content: initialMessage.content,
    },
    ...messages.map((message) => ({
        id: message.id || generateId(),
        role: message.role,
        content: message.content,
    })),
    // console.log("Initial Message:", initialMessage.content)
];


export async function POST(request) {
    try {
        const { messages } = await request.json();
        const stream = await streamText({
            model: google('gemini-1.5-flash'),
            messages: buildGoogleGenAIPrompt(messages),
            temperature: 0.7,
        });
        return stream?.toDataStreamResponse();
    } catch (error) {
        console.error("Error in API call:", error);
        return new Response("Internal Server Error", { status: 500 });
    }
}
