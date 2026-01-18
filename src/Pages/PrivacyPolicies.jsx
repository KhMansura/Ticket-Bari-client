import React from 'react';
import { FaShieldAlt, FaFileContract, FaLock, FaClipboardCheck, FaUserSecret, FaServer } from 'react-icons/fa';

const PrivacyPolicies = () => {
return (
        <div className="bg-base-200 min-h-screen font-poppins">
            
            {/* 1. Hero Section (Matching About Page) */}
            <div className="relative bg-gradient-to-r from-[#1e3a8a] to-[#2563EB] text-white py-24">
                <div className="absolute inset-0 bg-black opacity-20"></div>
                <div className="relative max-w-7xl mx-auto px-4 text-center">
                    <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#93c5fd] to-[#3b82f6]">
                        Privacy Policy
                    </h1>
                    <p className="text-xl md:text-2xl text-blue-100 max-w-2xl mx-auto font-light">
                        Your trust is our priority. Learn how we protect and manage your data at TicketBari.
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 -mt-10 relative z-10 pb-20">
                
                {/* 2. Floating Privacy Pillars */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24">
                    <div className="bg-base-100 p-8 rounded-xl shadow-card text-center hover:-translate-y-2 transition-transform duration-300 border-b-4 border-primary">
                        <div className="w-16 h-16 mx-auto bg-blue-50 rounded-full flex items-center justify-center mb-4">
                            <FaLock className="text-3xl text-primary" />
                        </div>
                        <h3 className="text-xl font-bold text-[#1e3a8a] mb-1">Data Security</h3>
                        <p className="text-slate-500 text-sm">End-to-end encryption for all transactions.</p>
                    </div>

                    <div className="bg-base-100 p-8 rounded-xl shadow-card text-center hover:-translate-y-2 transition-transform duration-300 border-b-4 border-primary">
                        <div className="w-16 h-16 mx-auto bg-blue-50 rounded-full flex items-center justify-center mb-4">
                            <FaUserSecret className="text-3xl text-primary" />
                        </div>
                        <h3 className="text-xl font-bold text-[#1e3a8a] mb-1">Privacy First</h3>
                        <p className="text-slate-500 text-sm">We never sell your data to third parties.</p>
                    </div>

                    <div className="bg-base-100 p-8 rounded-xl shadow-card text-center hover:-translate-y-2 transition-transform duration-300 border-b-4 border-primary">
                        <div className="w-16 h-16 mx-auto bg-blue-50 rounded-full flex items-center justify-center mb-4">
                            <FaClipboardCheck className="text-3xl text-primary" />
                        </div>
                        <h3 className="text-xl font-bold text-[#1e3a8a] mb-1">Transparency</h3>
                        <p className="text-slate-500 text-sm">Clear and open data management policies.</p>
                    </div>
                </div>

                {/* 3. Detailed Policy Content */}
                <div className="bg-base-100 rounded-2xl shadow-sm overflow-hidden mb-20">
                    <div className="flex flex-col lg:flex-row">
                        {/* Illustration Side */}
                        <div className="lg:w-1/3 bg-slate-50 p-12 flex items-center justify-center border-r border-base-200">
                           <div className="text-center">
                                <FaServer className="text-9xl text-slate-200 mb-6 mx-auto" />
                                <h4 className="text-slate-400 font-bold uppercase tracking-widest text-xs">Secure Storage</h4>
                           </div>
                        </div>
                        
                        {/* Text Side */}
                        <div className="lg:w-2/3 p-10 lg:p-16">
                            <h2 className="text-3xl font-bold text-[#1e3a8a] mb-8">Data Collection & Usage</h2>
                            
                            <div className="space-y-8">
                                <div>
                                    <h4 className="text-lg font-bold text-primary mb-2">1. Information We Collect</h4>
                                    <p className="text-slate-600 leading-relaxed">
                                        We collect information you provide directly to us, such as your name, email address, phone number, and booking preferences when you register an account or book a ticket.
                                    </p>
                                </div>

                                <div>
                                    <h4 className="text-lg font-bold text-primary mb-2">2. How We Use Your Data</h4>
                                    <p className="text-slate-600 leading-relaxed">
                                        Your data is used to process bookings, send confirmations via email, and provide customer support. We also use it to improve our platform’s user experience.
                                    </p>
                                </div>

                                <div>
                                    <h4 className="text-lg font-bold text-primary mb-2">3. Payment Security</h4>
                                    <p className="text-slate-600 leading-relaxed">
                                        All payment processing is handled through secure providers (like Stripe). TicketBari does not store your full credit card details on our local servers.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 4. Contact for Privacy */}
                <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-2xl p-10 text-center text-white">
                    <h3 className="text-2xl font-bold mb-4">Have questions about your privacy?</h3>
                    <p className="text-slate-400 mb-6">If you have any questions about this Privacy Policy, please contact us at privacy@ticketbari.com</p>
                    <button className="btn btn-primary px-8">Contact Privacy Team</button>
                </div>

            </div>
        </div>
    );
};

export default PrivacyPolicies;