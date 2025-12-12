// import { useEffect, useState } from "react";
// import TicketCard from "../../components/TicketCard";
// import axios from "axios";
// import Swal from "sweetalert2";
// import { useNavigate } from "react-router";
// import Banner from "./Banner";
// import Partners from "./Partners/Partners";

// // 1. IMPORT SWIPER & MODULES
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { EffectCoverflow, Pagination, Autoplay } from 'swiper/modules';

// // 2. IMPORT SWIPER STYLES
// import 'swiper/css';
// import 'swiper/css/effect-coverflow';
// import 'swiper/css/pagination';

// const Home = () => {
//   const [latestTickets, setLatestTickets] = useState([]);
//   const [advertisedTickets, setAdvertisedTickets] = useState([]);
//   const navigate = useNavigate();

//   const handleSubscribe = () => {
//       // Show success alert first, then redirect
//       Swal.fire({
//           title: "Subscribed!",
//           text: "Thank you for joining us.",
//           icon: "success",
//           timer: 1500,
//           showConfirmButton: false
//       }).then(() => {
//           // Redirect to the new success page
//           navigate("/subscription-success");
//       });
//     }
  
//   useEffect(() => {
//     // Ensure your server has this route: app.get('/tickets/latest', ...)
//     axios.get('https://ticket-bari-server.vercel.app/tickets') 
//       .then(res => {
//         const approved = res.data.filter(t => t.verificationStatus === 'approved');
//         setLatestTickets(approved.slice(0, 6)); 
//       });
      
//       axios.get('https://ticket-bari-server.vercel.app/tickets/advertised')
//         .then(res => setAdvertisedTickets(res.data));
//   }, []);

//   return (
//     <div className="overflow-x-hidden">
//       {/* 1. Hero Banner */}
//       <Banner></Banner>

//             {/* 3. Latest Tickets Section */}
//       <div className="bg-gray-50 py-12">
//         <div className="max-w-7xl mx-auto px-4">
//             <h2 className="text-3xl font-bold text-center mb-8 ">Latest Tickets 🎟️</h2>
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {latestTickets.map(ticket => (
//                     <TicketCard key={ticket._id} ticket={ticket} />
//                 ))}
//             </div>
//         </div>
//       </div>

//       {/* 2. Advertisement Section (Admin Choice) - WITH COVERFLOW */}
//       {advertisedTickets.length > 0 && (
//         <div className="max-w-7xl mx-auto py-12 px-4 bg-yellow- rounded-xl my-10">
//           <h2 className="text-3xl font-bold text-center mb-8">Featured Trips 🌟</h2>
          
//           {/* REPLACED GRID WITH SWIPER COVERFLOW */}
//           <Swiper
//               effect={'coverflow'}
//               grabCursor={true}
//               centeredSlides={true}
//               slidesPerView={'auto'}
//               loop={true}
//               coverflowEffect={{
//                   rotate: 50,
//                   stretch: 0,
//                   depth: 100,
//                   modifier: 1,
//                   slideShadows: true,
//               }}
//               autoplay={{
//                   delay: 2500,
//                   disableOnInteraction: false,
//               }}
//               pagination={{ clickable: true }}
//               modules={[EffectCoverflow, Pagination, Autoplay]}
//               className="mySwiper w-full py-10"
//           >
//               {advertisedTickets.map(ticket => (
//                   // Width styling is important for coverflow effect
//                   <SwiperSlide key={ticket._id} className="w-[300px] md:w-[350px]">
//                       <TicketCard ticket={ticket} />
//                   </SwiperSlide>
//               ))}
//           </Swiper>
//         </div>
//       )}

//       <Partners></Partners>



//       {/* 4. Extra Section: Why Choose Us */}
//       <div className="py-12 text-center">
//         <h2 className="text-3xl font-bold mb-8">Why Choose Us?</h2>
//         <div className="flex flex-wrap justify-center gap-10">
//             <div className="w-60 p-4 border rounded shadow">
//                 <div className="text-4xl mb-2">🛡️</div>
//                 <h3 className="font-bold">Secure Payment</h3>
//             </div>
//             <div className="w-60 p-4 border rounded shadow">
//                 <div className="text-4xl mb-2">⚡</div>
//                 <h3 className="font-bold">Fast Booking</h3>
//             </div>
//             <div className="w-60 p-4 border rounded shadow">
//                 <div className="text-4xl mb-2">📞</div>
//                 <h3 className="font-bold">24/7 Support</h3>
//             </div>
//         </div>
        
//         {/* 5. Extra Section: Newsletter */}
//         <div className="bg-base-200 py-16 mt-12">
//           <div className="max-w-4xl mx-auto px-4 text-center">
//               <h2 className="text-3xl font-bold mb-4">Get Updates on New Routes! 📩</h2>
//               <p className="mb-6 text-gray-500">Subscribe to our newsletter to get the latest ticket offers and updates directly to your inbox.</p>
              
//               <div className="join w-full justify-center">
//                   <input className="input input-bordered join-item w-full max-w-xs" placeholder="Enter your email" />
//                   <button 
//                       onClick={handleSubscribe} 
//                       className="btn btn-primary join-item">
//                       Subscribe
//                   </button>
//               </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Home;

import { useEffect, useState } from "react";
import TicketCard from "../../components/TicketCard";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import Banner from "./Banner";
import Partners from "./Partners/Partners";

// 1. IMPORT ICONS FOR "WHY CHOOSE US"
import { FaShieldAlt, FaBolt, FaHeadset, FaPaperPlane, FaEnvelopeOpenText } from "react-icons/fa";

// 2. IMPORT SWIPER & MODULES
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, Autoplay } from 'swiper/modules';

// 3. IMPORT SWIPER STYLES
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

const Home = () => {
    const [latestTickets, setLatestTickets] = useState([]);
    const [advertisedTickets, setAdvertisedTickets] = useState([]);
    const navigate = useNavigate();

    const handleSubscribe = () => {
        Swal.fire({
            title: "Subscribed!",
            text: "Thank you for joining our newsletter.",
            icon: "success",
            timer: 1500,
            showConfirmButton: false,
            confirmButtonColor: "#2563EB"
        }).then(() => {
            navigate("/subscription-success");
        });
    }
  
    useEffect(() => {
        // Fetch Latest Approved Tickets
        axios.get('https://ticket-bari-server.vercel.app/tickets') 
            .then(res => {
                const approved = res.data.filter(t => t.verificationStatus === 'approved');
                setLatestTickets(approved.slice(0, 6)); 
            });
        
        // Fetch Advertised Tickets
        axios.get('https://ticket-bari-server.vercel.app/tickets/advertised')
            .then(res => setAdvertisedTickets(res.data));
    }, []);

    return (
        <div className="overflow-x-hidden font-poppins bg-base-100">
            
            {/* 1. Hero Banner */}
            <Banner />

            {/* 2. Latest Tickets Section */}
            <div className="bg-base-200 py-20">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-[#1e3a8a] mb-3">Latest Tickets 🎟️</h2>
                        <p className="text-slate-500">Freshly added routes for your next journey.</p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {latestTickets.map(ticket => (
                            <TicketCard key={ticket._id} ticket={ticket} />
                        ))}
                    </div>
                </div>
            </div>

            {/* 3. Featured Trips (Swiper Coverflow) */}
            {advertisedTickets.length > 0 && (
                <div className="py-20 bg-white relative">
                    <div className="max-w-7xl mx-auto px-4">
                        <div className="text-center mb-10">
                            <h2 className="text-3xl md:text-4xl font-bold text-[#1e3a8a] mb-3">Featured Trips 🌟</h2>
                            <p className="text-slate-500">Hand-picked destinations with special offers.</p>
                        </div>
                        
                        <Swiper
                            effect={'coverflow'}
                            grabCursor={true}
                            centeredSlides={true}
                            slidesPerView={'auto'}
                            loop={true}
                            coverflowEffect={{
                                rotate: 0,
                                stretch: 0,
                                depth: 100,
                                modifier: 2.5,
                                slideShadows: false, // Cleaner look without heavy shadows
                            }}
                            autoplay={{
                                delay: 3000,
                                disableOnInteraction: false,
                            }}
                            pagination={{ clickable: true, dynamicBullets: true }}
                            modules={[EffectCoverflow, Pagination, Autoplay]}
                            className="mySwiper w-full py-10"
                        >
                            {advertisedTickets.map(ticket => (
                                <SwiperSlide key={ticket._id} className="w-[300px] md:w-[380px]">
                                    <div className="transform transition-transform hover:scale-105 duration-300">
                                        <TicketCard ticket={ticket} />
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </div>
            )}

            {/* 4. Partners Section */}
            <div className="bg-base-200 py-10">
                <Partners />
            </div>

            {/* 5. Why Choose Us (Professional Cards) */}
            <div className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-[#1e3a8a] mb-12">Why Choose TicketBari?</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Card 1 */}
                        <div className="p-8 border border-gray-100 rounded-2xl shadow-card hover:-translate-y-2 transition-transform duration-300 bg-white">
                            <div className="w-16 h-16 mx-auto bg-blue-50 rounded-full flex items-center justify-center text-primary text-3xl mb-6">
                                <FaShieldAlt />
                            </div>
                            <h3 className="text-xl font-bold text-[#1e3a8a] mb-3">Secure Payment</h3>
                            <p className="text-slate-500 leading-relaxed">
                                We use bank-grade security to ensure your transactions are 100% safe and encrypted.
                            </p>
                        </div>

                        {/* Card 2 */}
                        <div className="p-8 border border-gray-100 rounded-2xl shadow-card hover:-translate-y-2 transition-transform duration-300 bg-white">
                            <div className="w-16 h-16 mx-auto bg-amber-50 rounded-full flex items-center justify-center text-amber-500 text-3xl mb-6">
                                <FaBolt />
                            </div>
                            <h3 className="text-xl font-bold text-[#1e3a8a] mb-3">Fast Booking</h3>
                            <p className="text-slate-500 leading-relaxed">
                                Book your tickets in less than 2 minutes. No queues, no hassle, just travel.
                            </p>
                        </div>

                        {/* Card 3 */}
                        <div className="p-8 border border-gray-100 rounded-2xl shadow-card hover:-translate-y-2 transition-transform duration-300 bg-white">
                            <div className="w-16 h-16 mx-auto bg-green-50 rounded-full flex items-center justify-center text-green-500 text-3xl mb-6">
                                <FaHeadset />
                            </div>
                            <h3 className="text-xl font-bold text-[#1e3a8a] mb-3">24/7 Support</h3>
                            <p className="text-slate-500 leading-relaxed">
                                Our dedicated support team is available round the clock to assist you with any issues.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

           {/* 6. Newsletter - REDESIGNED (Clean Light Gray to break the blue) */}
            <div className="bg-base-200 py-24 relative overflow-hidden">
                {/* Decorative Circle (Subtle) */}
                <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-blue-50 blur-3xl opacity-50"></div>
                
                <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
                    <div className="w-16 h-16 bg-white shadow-md rounded-full flex items-center justify-center mx-auto mb-6 text-[#1e3a8a] text-2xl">
                        <FaEnvelopeOpenText />
                    </div>
                    
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight text-[#1e3a8a]">
                        Stay in the Loop
                    </h2>
                    <p className="mb-10 text-slate-500 text-lg max-w-xl mx-auto">
                        Get exclusive offers, route updates, and travel tips delivered directly to your inbox. No spam, we promise.
                    </p>
                    
                    {/* Input Field - High Contrast against Gray Background */}
                    <div className="join w-full justify-center max-w-lg mx-auto shadow-xl bg-white rounded-full p-2 border border-white">
                        <input 
                            className="input w-full border-none focus:outline-none bg-transparent pl-6 text-gray-700 placeholder-gray-400" 
                            placeholder="Enter your email address" 
                        />
                        <button 
                            onClick={handleSubscribe} 
                            className="btn btn-primary rounded-full px-8 text-white hover:scale-105 transition-transform">
                            Subscribe
                        </button>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Home;