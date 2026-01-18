import { FaHeadset, FaQuestionCircle, FaBookOpen, FaSearch, FaChevronRight } from "react-icons/fa";

const Help = () => {
    const faqs = [
        { q: "How do I cancel a pending booking?", a: "You can cancel any 'Pending' booking directly from your User Dashboard. Once a vendor accepts it, cancellation is restricted." },
        { q: "Is my payment information secure?", a: "Yes, we use Stripe and industry-standard encryption. We never store your full card details on our servers." },
        { q: "How can I become a Vendor?", a: "Currently, admins assign roles. Please contact our support team if you want to list your transport services." }
    ];

    return (
        <div className="bg-base-200 min-h-screen font-poppins">
            
            {/* 1. Hero Section (Matching About/Privacy Branding) */}
            <div className="relative bg-gradient-to-r from-[#1e3a8a] to-[#2563EB] text-white py-24">
                <div className="absolute inset-0 bg-black opacity-20"></div>
                <div className="relative max-w-7xl mx-auto px-4 text-center">
                    <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#93c5fd] to-[#3b82f6]">
                        Help Center
                    </h1>
                    <p className="text-xl md:text-2xl text-blue-100 max-w-2xl mx-auto font-light mb-8">
                        Need assistance? We are here to help you move forward.
                    </p>
                    
                    {/* Search Bar in Hero */}
                    <div className="max-w-xl mx-auto relative group">
                        <FaSearch className="absolute left-4 top-4 text-gray-400 group-focus-within:text-primary transition-colors" />
                        <input 
                            type="text" 
                            placeholder="Search for articles or topics..." 
                            className="input input-lg w-full pl-12 rounded-xl text-slate-800 shadow-2xl focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 -mt-10 relative z-10 pb-20">
                
                {/* 2. Floating Support Categories */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24">
                    <div className="bg-base-100 p-8 rounded-xl shadow-card text-center hover:-translate-y-2 transition-transform duration-300 border-b-4 border-primary">
                        <div className="w-16 h-16 mx-auto bg-blue-50 rounded-full flex items-center justify-center mb-4">
                            <FaBookOpen className="text-3xl text-primary" />
                        </div>
                        <h3 className="text-xl font-bold text-[#1e3a8a] mb-1">Guides</h3>
                        <p className="text-slate-500 text-sm italic">Learn how to use TicketBari</p>
                    </div>

                    <div className="bg-base-100 p-8 rounded-xl shadow-card text-center hover:-translate-y-2 transition-transform duration-300 border-b-4 border-primary">
                        <div className="w-16 h-16 mx-auto bg-blue-50 rounded-full flex items-center justify-center mb-4">
                            <FaQuestionCircle className="text-3xl text-primary" />
                        </div>
                        <h3 className="text-xl font-bold text-[#1e3a8a] mb-1">FAQs</h3>
                        <p className="text-slate-500 text-sm italic">Quick answers to common questions</p>
                    </div>

                    <div className="bg-base-100 p-8 rounded-xl shadow-card text-center hover:-translate-y-2 transition-transform duration-300 border-b-4 border-primary">
                        <div className="w-16 h-16 mx-auto bg-blue-50 rounded-full flex items-center justify-center mb-4">
                            <FaHeadset className="text-3xl text-primary" />
                        </div>
                        <h3 className="text-xl font-bold text-[#1e3a8a] mb-1">Live Chat</h3>
                        <p className="text-slate-500 text-sm italic">Talk to a support agent</p>
                    </div>
                </div>

                {/* 3. FAQ Section using DaisyUI Collapse */}
                <div className="bg-base-100 rounded-2xl shadow-sm p-8 lg:p-16 mb-20">
                    <h2 className="text-3xl font-bold text-[#1e3a8a] mb-10 text-center">Frequently Asked Questions</h2>
                    
                    <div className="space-y-4 max-w-4xl mx-auto">
                        {faqs.map((faq, index) => (
                            <div key={index} className="collapse collapse-plus bg-slate-50 rounded-xl border border-slate-200">
                                <input type="radio" name="help-accordion" /> 
                                <div className="collapse-title text-lg font-bold text-[#1e3a8a]">
                                    {faq.q}
                                </div>
                                <div className="collapse-content text-slate-600"> 
                                    <p className="pt-2">{faq.a}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 4. Bottom Contact Banner (Matches Privacy Page) */}
                <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-2xl p-10 flex flex-col md:flex-row items-center justify-between text-white gap-6">
                    <div className="text-center md:text-left">
                        <h3 className="text-2xl font-bold mb-2">Still need help?</h3>
                        <p className="text-slate-400">Our support team is available 24/7 to assist you with your travels.</p>
                    </div>
                    <button className="btn btn-primary px-10 h-14 rounded-xl flex items-center gap-2">
                        Get In Touch <FaChevronRight />
                    </button>
                </div>

            </div>
        </div>
    );
};

export default Help;