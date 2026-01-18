
import TicketCard from "../../components/TicketCard";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import Banner from "./Banner";
import Partners from "./Partners/Partners";

// 1. IMPORT ICONS "WHY CHOOSE US"
import { FaShieldAlt, FaBolt, FaHeadset, FaPaperPlane, FaEnvelopeOpenText } from "react-icons/fa";

// 2. IMPORT SWIPER & MODULES
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, Autoplay } from 'swiper/modules';

// 3. IMPORT SWIPER STYLES
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import WhyChooseUs from "./WhyChooseUs";
import PopularRoutes from "./PopularRoutes";
import { useEffect, useState } from "react";
import StatsSection from "./StatsSection";
import Testimonials from "./Testimonials";
import FAQSection from "./FAQSection";
import TicketSkeleton from "../TicketSkeleton";

const Home = () => {
    const [latestTickets, setLatestTickets] = useState([]);
    const [advertisedTickets, setAdvertisedTickets] = useState([]);
    
    const [loading, setLoading] = useState(true);
    
    const navigate = useNavigate();
    useEffect(() => {
        // 2. FETCH DATA
        axios.get(`${import.meta.env.VITE_SERVER_URL}/tickets`) 
            .then(res => {
                const approved = res.data.filter(t => t.verificationStatus === 'approved');
                const newestFirst = [...approved].reverse();
                setLatestTickets(newestFirst.slice(0, 8)); // Showing 8 for a clean 2-row grid
            })
            .catch(err => console.error(err))
            // 3. STOP LOADING AFTER FETCH (SUCCESS OR ERROR)
            .finally(() => setLoading(false)); 
        
        // You can do the same for advertisedTickets if needed
    }, []);

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
        // console.log("MY SERVER URL:", import.meta.env.VITE_SERVER_URL);
        // Fetch Latest Approved Tickets
        axios.get(`${import.meta.env.VITE_SERVER_URL}/tickets`) 
            .then(res => {
                const approved = res.data.filter(t => t.verificationStatus === 'approved');
                const newestFirst = [...approved].reverse();
                setLatestTickets(newestFirst.slice(0, 8)); 
            });
        
        // Fetch Advertised Tickets
        axios.get(`${import.meta.env.VITE_SERVER_URL}/tickets/advertised`)
            .then(res => setAdvertisedTickets(res.data));
    }, []);

    return (
        <div className="overflow-x-hidden font-poppins bg-base-100">
            
            {/* 1. Hero Banner */}
            <Banner />

            {/* 2. Latest Tickets
            <div className="bg-base-200 py-20">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-[#1e3a8a] mb-3">Latest Tickets 🎟️</h2>
                        <p className="text-slate-500">Freshly added routes for your next journey.</p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {latestTickets.map(ticket => (
                            <TicketCard key={ticket._id} ticket={ticket} />
                        ))}
                    </div>
                </div>
            </div> */}
            {/* 2. Latest Tickets - UPDATED WITH SKELETON AND 4-COLUMN GRID */}
            <div className="bg-base-200 py-20">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-12">
                        {/* Using text-secondary for theme consistency */}
                        <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-3">Latest Tickets 🎟️</h2>
                        <p className="text-slate-500">Freshly added routes for your next journey.</p>
                    </div>
                    
                    {/* Skeleton logic: show 8 loaders or the actual cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {loading 
                            ? [...Array(8)].map((_, i) => <TicketSkeleton key={i} />) 
                            : latestTickets.map(ticket => (
                                <TicketCard key={ticket._id} ticket={ticket} />
                            ))
                        }
                    </div>
                </div>
            </div>

            {/* 3. Featured Trips */}
            {/* {advertisedTickets.length > 0 && (
                <div className="py-20 bg-white relative">
                    <div className="max-w-7xl mx-auto px-4">
                        <div className="text-center mb-10">
                            <h2 className="text-3xl md:text-4xl font-bold text-[#1e3a8a] mb-3">Featured Advertisements🌟</h2>
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
                                slideShadows: false,
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
            )} */}
            {/* 3. Featured Advertisements */}
{advertisedTickets.length > 0 || loading ? ( // Loading thakleo jeno section-ti show kore
    <div className="py-20 bg-white relative">
        <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-10">
                <h2 className="text-3xl md:text-4xl font-bold text-[#1e3a8a] mb-3">Featured Advertisements🌟</h2>
                <p className="text-slate-500">Hand-picked destinations with special offers.</p>
            </div>
            
            {/* Loader Condition */}
            {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {[...Array(4)].map((_, i) => <TicketSkeleton key={i} />)}
                </div>
            ) : (
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
                        slideShadows: false,
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
            )}
        </div>
    </div>
) : null}
            {/* 4. Popular Routes */}
            <PopularRoutes></PopularRoutes>
            {/* 5. stats */}
            <StatsSection></StatsSection>

            {/* 6. Partners Section */}
            <div className="bg-base-200 py-10">
                <Partners />
            </div>

            {/* 7. Why Choose Us */}
            <div className="section-container bg-base-100">
                <WhyChooseUs></WhyChooseUs>
            </div>
            {/* 8. Testimonials */}
            <Testimonials></Testimonials>
            {/* 9. FAQ Section */}
            <div className="section-container bg-base-100">
                <FAQSection></FAQSection>
            </div>

           {/* 10. Newsletter  */}
            <div className="bg-base-200 py-24 relative overflow-hidden">
                
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
                    
                    {/* Input Field */}
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