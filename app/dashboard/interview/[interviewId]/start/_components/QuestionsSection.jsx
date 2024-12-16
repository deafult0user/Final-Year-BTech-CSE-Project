import { Lightbulb, Volume2Icon } from 'lucide-react'
import React from 'react'

function QuestionsSection({ mockInterviewQuestion, activeQuestionIndex }) {
    const textToSpeech = (text)=>{
        if('speechSynthesis' in window){
            const speech = new SpeechSynthesisUtterance(text);
            window.speechSynthesis.speak(speech);
        }
        else{
            alert("Sorry, Technical Issues");
        }
    }


    return mockInterviewQuestion && (
        <div className='p-5 border rounded-lg my-10'>
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>

                {mockInterviewQuestion && mockInterviewQuestion.map((item, index) => (
                    <div key={index} className="my-4">
                        <h2 className={`p-2 border rounded-full text-xs md:text-sm text-center cursor-pointer 
                        ${activeQuestionIndex == index && 'bg-primary text-white'}`}
                        >Question {index + 1}:</h2>
                    </div>
                ))}
            </div>
            <h2 className='my-5 text-md text-lg  '>{mockInterviewQuestion[activeQuestionIndex]?.question}</h2>
            <Volume2Icon className='cursor-pointer' onClick={()=>{textToSpeech(mockInterviewQuestion[activeQuestionIndex]?.question)}} />
            <div className='border rounded-lg p-5 bg-blue-100 mt-20'>
                <h2 className='flex gap-2 items-center text-blue-700' >
                    <Lightbulb />
                    <strong>Note :</strong>
                </h2>
                <p className="text-blue-600 mt-3">
                    Click on <strong>Record Answer</strong> when you want to answer the question.
                </p>
                <p className="text-blue-600 mt-3">
                    At the end of the interview, we will provide feedback along with the correct answers for each question and your response to compare them.
                </p>
            </div>
        </div>
    )
}

export default QuestionsSection