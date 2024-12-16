import React from 'react';
import Header from '../dashboard/_components/Header';

function Upgrade() {
    return (
        <>
        <Header/>
        <div className=" max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
            <div className="justify-center grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 md:gap-12">
                {/* Free Plan */}
                <div className="bg-white rounded-2xl border border-gray-200 shadow-lg transform transition-transform hover:scale-105 hover:shadow-xl duration-300">
                    <div className="p-6 sm:px-8 animate__animated animate__fadeIn">
                        <h2 className="text-2xl font-semibold text-gray-800">Free Plan</h2>
                        <p className="mt-2 text-gray-600">Access basic features of our AI-powered mock interviews.</p>
                        <p className="mt-4">
                            <strong className="text-3xl font-bold text-indigo-600">Free</strong>
                        </p>
                        <button className="mt-4 w-full py-3 text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-all duration-300">
                            Get Started
                        </button>
                    </div>

                    <div className="p-6 sm:px-8">
                        <p className="text-xl font-medium text-gray-800">What's included:</p>
                        <ul className="mt-3 space-y-3 text-gray-700">
                            <li className="flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 text-indigo-600">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                </svg>
                                <span>1 User</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 text-indigo-600">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                </svg>
                                <span>5 Mock Interviews</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 text-indigo-600">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                </svg>
                                <span>Email Support</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Monthly Plan */}
                <div className="bg-white rounded-2xl border border-gray-200 shadow-lg transform transition-transform hover:scale-105 hover:shadow-xl duration-300">
                    <div className="p-6 sm:px-8 animate__animated animate__fadeIn animate__delay-1s">
                        <h2 className="text-2xl font-semibold text-gray-800">Monthly Plan</h2>
                        <p className="mt-2 text-gray-600">Unlock additional features and premium AI interactions.</p>
                        <p className="mt-4">
                            <strong className="text-3xl font-bold text-indigo-600">₹50</strong>
                            <span className="text-sm font-medium text-gray-700">/month</span>
                        </p>
                        <button className="mt-4 w-full py-3 text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-all duration-300">
                            Get Started
                        </button>
                    </div>

                    <div className="p-6 sm:px-8">
                        <p className="text-xl font-medium text-gray-800">What's included:</p>
                        <ul className="mt-3 space-y-3 text-gray-700">
                            <li className="flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 text-indigo-600">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                </svg>
                                <span>5 Users</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 text-indigo-600">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                </svg>
                                <span>Unlimited Mock Interviews</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 text-indigo-600">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                </svg>
                                <span>Priority Email Support</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Yearly Plan */}
                <div className="bg-white rounded-2xl border border-gray-200 shadow-lg transform transition-transform hover:scale-105 hover:shadow-xl duration-300">
                    <div className="p-6 sm:px-8 animate__animated animate__fadeIn animate__delay-2s">
                        <h2 className="text-2xl font-semibold text-gray-800">Yearly Plan</h2>
                        <p className="mt-2 text-gray-600">Get the best value with the yearly subscription!</p>
                        <p className="mt-4">
                            <strong className="text-3xl font-bold text-indigo-600">₹500</strong>
                            <span className="text-sm font-medium text-gray-700">/year</span>
                        </p>
                        <button className="mt-4 w-full py-3 text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-all duration-300">
                            Get Started
                        </button>
                    </div>

                    <div className="p-6 sm:px-8">
                        <p className="text-xl font-medium text-gray-800">What's included:</p>
                        <ul className="mt-3 space-y-3 text-gray-700">
                            <li className="flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 text-indigo-600">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                </svg>
                                <span>Unlimited Users</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 text-indigo-600">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                </svg>
                                <span>Priority Mock Interviews</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 text-indigo-600">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                </svg>
                                <span>24/7 Support</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}

export default Upgrade