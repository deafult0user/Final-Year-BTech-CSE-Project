import { Lightbulb, Volume2Icon } from 'lucide-react';
import React from 'react';

function QuestionsSection({ mockInterviewQuestion, activeQuestionIndex, setActiveQuestionIndex }) {
    const textToSpeech = (text) => {
        if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel();
            const speech = new SpeechSynthesisUtterance(text);
            speech.lang = 'en-US';
            speech.rate = 0.9;
            speech.pitch = 10;
            window.speechSynthesis.speak(speech);
        } else {
            alert("Speech synthesis is not supported in your browser.");
        }
    };

    return mockInterviewQuestion && (
        <div className="p-6 md:p-8 border rounded-2xl shadow-sm bg-white my-10">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-8">
                {mockInterviewQuestion.map((item, index) => (
                    <button
                        key={index}
                        onClick={() => setActiveQuestionIndex(index)}
                        className={`w-full py-2 px-3 rounded-full text-xs md:text-sm transition-all duration-300 font-medium
                            ${activeQuestionIndex === index
                                ? 'bg-primary text-white shadow-md scale-105'
                                : 'bg-gray-100 hover:bg-gray-200 text-gray-800'}
                        `}
                    >
                        Ques {index + 1}
                    </button>
                ))}
            </div>

            <div className="flex items-start gap-3 mb-5">
                <h2 className="text-base md:text-lg font-semibold text-gray-800 flex-1">
                    {mockInterviewQuestion[activeQuestionIndex]?.question}
                </h2>
                <Volume2Icon
                    className="text-primary hover:text-primary/80 cursor-pointer transition-transform hover:scale-110"
                    onClick={() => {
                        textToSpeech(mockInterviewQuestion[activeQuestionIndex]?.question);
                    }}
                />
            </div>

            <div className="border rounded-xl p-5 bg-blue-50 mt-16">
                <h2 className="flex items-center gap-2 text-blue-700 text-base font-semibold">
                    <Lightbulb />
                    Note
                </h2>
                <div className="text-blue-600 text-sm mt-3 space-y-2">
                    <p>
                        Click on <strong>Record Answer</strong> when you're ready to answer the question.
                    </p>
                    <p>
                        After the interview, you'll receive AI-generated feedback along with ideal answers so you can compare and improve.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default QuestionsSection;


// import { Lightbulb, Volume2Icon } from 'lucide-react'
// import React from 'react'

// function QuestionsSection({ mockInterviewQuestion, activeQuestionIndex, setActiveQuestionIndex }) {
//     const textToSpeech = (text) => {
//         if ('speechSynthesis' in window) {
//             window.speechSynthesis.cancel(); // Prevent overlapping
//             const speech = new SpeechSynthesisUtterance(text);
//             speech.lang = 'en-US';
//             speech.rate = 0.95;
//             speech.pitch = 1;
//             window.speechSynthesis.speak(speech);
//         } else {
//             alert("Speech synthesis is not supported in your browser.");
//         }
//     }

//     return mockInterviewQuestion && (
//         <div className='p-5 border rounded-lg my-10'>
//             <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>

//                 {mockInterviewQuestion.map((item, index) => (
//                     <div key={index} className="my-4">
//                         <h2
//                             onClick={() => setActiveQuestionIndex(index)}
//                             className={`
//                                 p-2 border rounded-full text-xs md:text-sm text-center cursor-pointer 
//                                 transition-all duration-300
//                                 ${activeQuestionIndex === index 
//                                     ? 'bg-primary text-white scale-105 shadow-md' 
//                                     : 'hover:bg-gray-100'}
//                             `}
//                         >
//                             Question {index + 1}
//                         </h2>
//                     </div>
//                 ))}
//             </div>

//             <h2 className='my-5 text-md text-lg'>
//                 {mockInterviewQuestion[activeQuestionIndex]?.question}
//             </h2>
//             <Volume2Icon
//                 className='cursor-pointer'
//                 onClick={() => {
//                     textToSpeech(mockInterviewQuestion[activeQuestionIndex]?.question)
//                 }}
//             />

//             <div className='border rounded-lg p-5 bg-blue-100 mt-20'>
//                 <h2 className='flex gap-2 items-center text-blue-700'>
//                     <Lightbulb />
//                     <strong>Note :</strong>
//                 </h2>
//                 <p className="text-blue-600 mt-3">
//                     Click on <strong>Record Answer</strong> when you want to answer the question.
//                 </p>
//                 <p className="text-blue-600 mt-3">
//                     At the end of the interview, we will provide feedback along with the correct answers for each question and your response to compare them.
//                 </p>
//             </div>
//         </div>
//     )
// }

// export default QuestionsSection;
