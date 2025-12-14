// import { FaShieldAlt, FaClock, FaBus, FaHeadset } from "react-icons/fa";

// const WhyChooseUs = () => {
//     const features = [
//         {
//             id: 1,
//             icon: <FaShieldAlt />,
//             title: "Safe & Secure",
//             desc: "Verified operators and secure payment gateways ensure a worry-free journey."
//         },
//         {
//             id: 2,
//             icon: <FaClock />,
//             title: "On-Time Service",
//             desc: "We value your time. Our partners are committed to punctuality and strict schedules."
//         },
//         {
//             id: 3,
//             icon: <FaBus />,
//             title: "Premium Comfort",
//             desc: "Enjoy AC, extra legroom, and modern amenities for a relaxing travel experience."
//         },
//         {
//             id: 4,
//             icon: <FaHeadset />,
//             title: "24/7 Support",
//             desc: "Our dedicated customer support team is here to assist you anytime, anywhere."
//         }
//     ];

//     return (
//         <div className="py-20 bg-white font-poppins">
//             <div className="max-w-7xl mx-auto px-4">
//                 {/* Header */}
//                 <div className="text-center mb-16">
//                     <h2 className="text-3xl md:text-4xl font-bold text-[#1e3a8a] mb-4">
//                         Why Choose TicketBari?
//                     </h2>
//                     <p className="text-slate-500 max-w-2xl mx-auto">
//                         We are redefining inter-district travel with technology, comfort, and reliability.
//                     </p>
//                 </div>

//                 {/* Grid */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
//                     {features.map((item) => (
//                         <div 
//                             key={item.id} 
//                             className="p-8 border border-gray-100 rounded-2xl hover:shadow-xl transition-all duration-300 group hover:-translate-y-2 bg-slate-50 hover:bg-white"
//                         >
//                             <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-3xl text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
//                                 {item.icon}
//                             </div>
//                             <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-[#1e3a8a]">
//                                 {item.title}
//                             </h3>
//                             <p className="text-slate-500 text-sm leading-relaxed">
//                                 {item.desc}
//                             </p>
//                         </div>
//                     ))}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default WhyChooseUs;

import { FaShieldAlt, FaClock, FaBus, FaHeadset } from "react-icons/fa";

const WhyChooseUs = () => {
    // 1. Updated Data: Added content for the "back" side of the card
    const features = [
        {
            id: 1,
            icon: <FaShieldAlt />,
            frontTitle: "Safe & Secure",
            // The front description is shorter now to encourage flipping
            frontDesc: "Verified operators and secure payments.", 
            // New content for the back
            backTitle: "Our Safety Commitment",
            backDesc: "We conduct rigorous background checks on all operator partners. Our payment gateways use 256-bit SSL encryption to ensure your financial data never falls into the wrong hands. Travel with peace of mind."
        },
        {
            id: 2,
            icon: <FaClock />,
            frontTitle: "On-Time Service",
            frontDesc: "We value your time with strict schedules.",
            backTitle: "Punctuality Promise",
            backDesc: "We track our bus partners closely. While traffic is unpredictable, we only partner with operators holding a 95%+ on-time departure record. We respect your schedule and strive to keep delays to an absolute minimum."
        },
        {
            id: 3,
            icon: <FaBus />,
            frontTitle: "Premium Comfort",
            frontDesc: "Enjoy AC, extra legroom, and modern amenities.",
            backTitle: "Travel in Luxury",
            backDesc: "Forget cramped journeys. Our premium partners offer reclining seats, ample legroom, onboard Wi-Fi, charging ports, and clean, air-conditioned environments for maximum relaxation during your trip."
        },
        {
            id: 4,
            icon: <FaHeadset />,
            frontTitle: "24/7 Support",
            frontDesc: "Our support team is here to assist you anytime.",
            backTitle: "Always Here For You",
            backDesc: "Stuck at a terminal at 2 AM? Having booking issues? Our dedicated human support team is available via phone, chat, and email 24 hours a day, 7 days a week. We never leave you stranded."
        }
    ];

    return (
        <div className="py-20 bg-white font-poppins">
            <div className="max-w-7xl mx-auto px-4">
                {/* Header */}
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-[#1e3a8a] mb-4">
                        Why Choose TicketBari?
                    </h2>
                    <p className="text-slate-500 max-w-2xl mx-auto">
                        Hover over the cards below to see how we are redefining your inter-district travel experience.
                    </p>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((item) => (
                        // 2. The Flip Card Container (The 'group' for hover state)
                        // Need a defined height (e.g., h-[320px]) for absolute positioning to work.
                        <div 
                            key={item.id} 
                            className="group h-[320px] [perspective:1000px]"
                        >
                            {/* 3. The Inner Wrapper that actually rotates */}
                            <div className="relative h-full w-full transition-all duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                                
                                {/* 4. The FRONT Face */}
                                <div className="absolute inset-0 h-full w-full rounded-2xl p-8 bg-slate-50 border border-blue-100 flex flex-col items-center justify-center text-center [backface-visibility:hidden]">
                                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-3xl text-primary mb-6">
                                        {item.icon}
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-800 mb-3 text-[#1e3a8a]">
                                        {item.frontTitle}
                                    </h3>
                                    <p className="text-slate-500 text-sm leading-relaxed">
                                        {item.frontDesc}
                                    </p>
                                    <span className="text-primary text-xs font-bold mt-4 uppercase tracking-widest">Hover for details</span>
                                </div>

                                {/* 5. The BACK Face */}
                                {/* Notice: rotate-y-180 is applied initially so it faces backwards. 
                                    When flipped, it becomes straight text. */}
                                <div className="absolute inset-0 h-full w-full rounded-2xl p-8 bg-[#1e3a8a] text-white flex flex-col items-center justify-center text-center [transform:rotateY(180deg)] [backface-visibility:hidden]">
                                    <h3 className="text-xl font-bold mb-4">
                                        {item.backTitle}
                                    </h3>
                                    <p className="text-blue-100 text-sm leading-relaxed">
                                        {item.backDesc}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default WhyChooseUs;
