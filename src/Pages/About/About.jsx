// import { FaShieldAlt, FaUsers, FaHistory } from "react-icons/fa";

// const About = () => {
//     return (
//         <div className="bg-base-100 pb-20">
//             {/* Hero Section */}
//             <div className="hero h-64 bg-base-200">
//                 <div className="hero-content text-center">
//                     <div className="max-w-md">
//                         <h1 className="text-5xl font-bold">About Us</h1>
//                         <p className="py-6">Simplifying travel for everyone, everywhere.</p>
//                     </div>
//                 </div>
//             </div>

//             <div className="max-w-7xl mx-auto px-4 mt-16">
//                 {/* Our Story */}
//                 <div className="flex flex-col lg:flex-row gap-10 items-center mb-20">
//                     <div className="flex-1">
//                         <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2671&auto=format&fit=crop" 
//                              className="rounded-lg shadow-2xl w-full" alt="Team working" />
//                     </div>
//                     <div className="flex-1">
//                         <h2 className="text-3xl font-bold mb-4">Our Story</h2>
//                         <p className="text-gray-600 mb-4">
//                             Founded in 2025, TicketBari started with a simple mission: to make travel booking painless. We realized that people were wasting hours standing in lines or visiting multiple websites just to plan a simple trip.
//                         </p>
//                         <p className="text-gray-600">
//                             Today, we connect thousands of travelers with hundreds of bus, train, and launch operators across the country. Our platform is built on trust, transparency, and technology.
//                         </p>
//                     </div>
//                 </div>

//                 {/* Stats Section */}
//                 <div className="stats shadow w-full text-center mb-20 bg-base-100 border">
//                     <div className="stat">
//                         <div className="stat-figure text-primary">
//                             <FaUsers className="text-3xl" />
//                         </div>
//                         <div className="stat-title">Happy Users</div>
//                         <div className="stat-value text-primary">50K+</div>
//                         <div className="stat-desc">Growing everyday</div>
//                     </div>
//                     <div className="stat">
//                         <div className="stat-figure text-secondary">
//                             <FaShieldAlt className="text-3xl" />
//                         </div>
//                         <div className="stat-title">Secure Transactions</div>
//                         <div className="stat-value text-secondary">100%</div>
//                         <div className="stat-desc">Bank-grade security</div>
//                     </div>
//                     <div className="stat">
//                         <div className="stat-figure text-accent">
//                             <FaHistory className="text-3xl" />
//                         </div>
//                         <div className="stat-title">Years of Service</div>
//                         <div className="stat-value text-accent">5+</div>
//                         <div className="stat-desc">Dedicated to you</div>
//                     </div>
//                 </div>

//                 {/* Mission */}
//                 <div className="text-center max-w-3xl mx-auto">
//                     <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
//                     <p className="text-lg text-gray-500">
//                         "To empower travelers by providing a seamless, secure, and one-stop solution for all their transportation needs, bridging the gap between passengers and operators."
//                     </p>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default About;

import { FaShieldAlt, FaUsers, FaHistory } from "react-icons/fa";

const About = () => {
    return (
        <div className="bg-base-200 min-h-screen">
            
            {/* 1. Professional Gradient Hero Section */}
            <div className="relative bg-gradient-to-r from-[#1e3a8a] to-[#2563EB] text-white py-24">
                <div className="absolute inset-0 bg-black opacity-20"></div> {/* Dark overlay for depth */}
                <div className="relative max-w-7xl mx-auto px-4 text-center">
                    <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#93c5fd] to-[#3b82f6]">About TicketBari</h1>
                    <p className="text-xl md:text-2xl text-blue-100 max-w-2xl mx-auto font-light">
                        Revolutionizing the way Bangladesh travels. Simple, Secure, and Fast.
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 -mt-10 relative z-10 pb-20">
                
                {/* 2. Floating Stats Cards (Modern Design Pattern) */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24">
                    {/* Stat 1 */}
                    <div className="bg-base-100 p-8 rounded-xl shadow-card text-center hover:-translate-y-2 transition-transform duration-300">
                        <div className="w-16 h-16 mx-auto bg-blue-50 rounded-full flex items-center justify-center mb-4">
                            <FaUsers className="text-3xl text-primary" />
                        </div>
                        <h3 className="text-4xl font-bold text-[#1e3a8a] mb-1">50K+</h3>
                        <p className="text-slate-500 font-medium">Happy Travelers</p>
                    </div>

                    {/* Stat 2 */}
                    <div className="bg-base-100 p-8 rounded-xl shadow-card text-center hover:-translate-y-2 transition-transform duration-300">
                        <div className="w-16 h-16 mx-auto bg-blue-50 rounded-full flex items-center justify-center mb-4">
                            <FaShieldAlt className="text-3xl text-primary" />
                        </div>
                        <h3 className="text-4xl font-bold text-[#1e3a8a] mb-1">100%</h3>
                        <p className="text-slate-500 font-medium">Secure Transactions</p>
                    </div>

                    {/* Stat 3 */}
                    <div className="bg-base-100 p-8 rounded-xl shadow-card text-center hover:-translate-y-2 transition-transform duration-300">
                        <div className="w-16 h-16 mx-auto bg-blue-50 rounded-full flex items-center justify-center mb-4">
                            <FaHistory className="text-3xl text-primary" />
                        </div>
                        <h3 className="text-4xl font-bold text-[#1e3a8a] mb-1">24/7</h3>
                        <p className="text-slate-500 font-medium">Customer Support</p>
                    </div>
                </div>

                {/* 3. Our Story Section (Clean Split Layout) */}
                <div className="bg-base-100 rounded-2xl shadow-sm overflow-hidden mb-20">
                    <div className="flex flex-col lg:flex-row">
                        {/* Image Side */}
                        <div className="lg:w-1/2 h-64 lg:h-auto relative">
                            <img 
                                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2671&auto=format&fit=crop" 
                                className="absolute inset-0 w-full h-full object-cover" 
                                alt="Our Team" 
                            />
                        </div>
                        
                        {/* Text Side */}
                        <div className="lg:w-1/2 p-10 lg:p-16 flex flex-col justify-center">
                            <h2 className="text-3xl font-bold text-[#1e3a8a] mb-6">Who We Are</h2>
                            <p className="text-slate-600 leading-relaxed mb-6 text-lg">
                                Founded in 2025, TicketBari started with a simple mission: to make travel booking painless. We realized that people were wasting hours standing in lines or visiting multiple websites just to plan a simple trip.
                            </p>
                            <p className="text-slate-600 leading-relaxed text-lg">
                                Today, we connect thousands of travelers with hundreds of bus, train, and launch operators across the country. Our platform is built on <strong>trust</strong>, <strong>transparency</strong>, and <strong>technology</strong>.
                            </p>
                        </div>
                    </div>
                </div>

                {/* 4. Mission Statement (Minimalist Center) */}
                <div className="text-center max-w-4xl mx-auto py-10">
                    <h2 className="text-sm font-bold text-primary uppercase tracking-widest mb-3">Our Mission</h2>
                    <h3 className="text-3xl md:text-4xl font-bold text-[#1e3a8a] leading-tight">
                        "To empower travelers by providing a seamless, secure, and one-stop solution for all their transportation needs."
                    </h3>
                </div>

            </div>
        </div>
    );
};

export default About;