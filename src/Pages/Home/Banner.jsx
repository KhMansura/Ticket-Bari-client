// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Autoplay, Pagination, Navigation, EffectFade } from 'swiper/modules';
// import { Link } from 'react-router-dom';

// // Import Swiper styles
// import 'swiper/css';
// import 'swiper/css/pagination';
// import 'swiper/css/navigation';
// import 'swiper/css/effect-fade';

// const Banner = () => {
//     return (
//         <div className="w-full h-[500px] md:h-[600px]">
//             <Swiper
//                 spaceBetween={30}
//                 effect={'fade'}
//                 centeredSlides={true}
//                 autoplay={{
//                     delay: 5000,
//                     disableOnInteraction: false,
//                 }}
//                 pagination={{
//                     clickable: true,
//                 }}
//                 navigation={true}
//                 modules={[Autoplay, Pagination, Navigation, EffectFade]}
//                 className="mySwiper h-full"
//             >
//                 {/* --- SLIDE 1: BOOKING (Premium Bus Image) --- */}
//                 <SwiperSlide>
//                     <div className="hero h-full" style={{backgroundImage: 'url(https://images.unsplash.com/photo-1570125909232-eb2b9b1de9e9?q=80&w=2070&auto=format&fit=crop)'}}>
//                         <div className="hero-overlay bg-black bg-opacity-60"></div>
//                         <div className="hero-content text-center text-neutral-content">
//                             <div className="max-w-md">
//                                 <h1 className="mb-5 text-5xl font-bold text-white">Safe Journey</h1>
//                                 <p className="mb-5 text-lg">Experience the most comfortable bus rides across the country with premium amenities.</p>
                                
//                                 <Link to="/all-tickets">
//                                     <button className="btn btn-primary border-none text-white px-8">Book Now</button>
//                                 </Link>
//                             </div>
//                         </div>
//                     </div>
//                 </SwiperSlide>

//                 {/* --- SLIDE 2: ROUTES (Scenic Road Map Image) --- */}
//                 <SwiperSlide>
//                     <div className="hero h-full" style={{backgroundImage: 'url(https://images.unsplash.com/photo-1476900966801-480984725660?q=80&w=2070&auto=format&fit=crop)'}}>
//                         <div className="hero-overlay bg-black bg-opacity-50"></div>
//                         <div className="hero-content text-center text-neutral-content">
//                             <div className="max-w-md">
//                                 <h1 className="mb-5 text-5xl font-bold text-white">Explore Routes</h1>
//                                 <p className="mb-5 text-lg">From city highways to scenic country roads, we cover over 50+ destinations nationwide.</p>
                                
//                                 {/* Navigate to a relevant Routes page */}
//                                 <Link to="/routes">
//                                     <button className="btn btn-accent text-white px-8">See Routes</button>
//                                 </Link>
//                             </div>
//                         </div>
//                     </div>
//                 </SwiperSlide>

//                 {/* --- SLIDE 3: SUPPORT (Customer Service Image) --- */}
//                 <SwiperSlide>
//                     <div className="hero h-full" style={{backgroundImage: 'url(https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2032&auto=format&fit=crop)'}}>
//                         <div className="hero-overlay bg-black bg-opacity-60"></div>
//                         <div className="hero-content text-center text-neutral-content">
//                             <div className="max-w-md">
//                                 <h1 className="mb-5 text-5xl font-bold text-white">24/7 Support</h1>
//                                 <p className="mb-5 text-lg">Have a question? Our support team is here to help you with your booking needs, anytime.</p>
                                
//                                 <Link to="/contact">
//                                     <button className="btn btn-secondary text-white px-8">Contact Us</button>
//                                 </Link>
//                             </div>
//                         </div>
//                     </div>
//                 </SwiperSlide>
//             </Swiper>
//         </div>
//     );
// };

// export default Banner;
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Autoplay, Pagination, Navigation, EffectFade } from 'swiper/modules';
// import { Link } from 'react-router-dom';

// // Import Swiper styles
// import 'swiper/css';
// import 'swiper/css/pagination';
// import 'swiper/css/navigation';
// import 'swiper/css/effect-fade';

// const Banner = () => {
//     // Standard styling to ensure background images cover the area properly
//     const backgroundStyle = {
//         backgroundSize: 'cover',
//         backgroundPosition: 'center center',
//         backgroundRepeat: 'no-repeat'
//     };

//     return (
//         // Ensure the parent container has defined height
//         <div className="w-full h-[500px] md:h-[600px]">
//             <Swiper
//                 spaceBetween={30}
//                 effect={'fade'}
//                 centeredSlides={true}
//                 autoplay={{
//                     delay: 5000,
//                     disableOnInteraction: false,
//                 }}
//                 pagination={{
//                     clickable: true,
//                 }}
//                 navigation={true}
//                 modules={[Autoplay, Pagination, Navigation, EffectFade]}
//                 className="mySwiper h-full"
//             >
//                 {/* --- SLIDE 1: BOOKING (Modern Bus Image) --- */}
//                 <SwiperSlide>
//                     <div 
//                         className="hero h-full" 
//                         style={{
//                             ...backgroundStyle,
//                             backgroundImage: 'url(https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=2069&auto=format&fit=crop)'
//                         }}
//                     >
//                         <div className="hero-overlay bg-black bg-opacity-60"></div>
//                         <div className="hero-content text-center text-neutral-content">
//                             <div className="max-w-md">
//                                 <h1 className="mb-5 text-5xl font-bold text-white">Safe Journey</h1>
//                                 <p className="mb-5 text-lg">Experience the most comfortable bus rides across the country with premium amenities.</p>
                                
//                                 <Link to="/all-tickets">
//                                     <button className="btn btn-primary border-none text-white px-8">Book Now</button>
//                                 </Link>
//                             </div>
//                         </div>
//                     </div>
//                 </SwiperSlide>

//                 {/* --- SLIDE 2: ROUTES (Scenic Highway Image) --- */}
//                 <SwiperSlide>
//                     <div 
//                         className="hero h-full" 
//                         style={{
//                             ...backgroundStyle,
//                             backgroundImage: 'url(https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=2070&auto=format&fit=crop)'
//                         }}
//                     >
//                         <div className="hero-overlay bg-black bg-opacity-50"></div>
//                         <div className="hero-content text-center text-neutral-content">
//                             <div className="max-w-md">
//                                 <h1 className="mb-5 text-5xl font-bold text-white">Explore Routes</h1>
//                                 <p className="mb-5 text-lg">From city highways to scenic country roads, we cover over 50+ destinations nationwide.</p>
                                
//                                 <Link to="/routes">
//                                     <button className="btn btn-accent text-white px-8">See Routes</button>
//                                 </Link>
//                             </div>
//                         </div>
//                     </div>
//                 </SwiperSlide>

//                 {/* --- SLIDE 3: SUPPORT (Customer Service Image) --- */}
//                 <SwiperSlide>
//                     <div 
//                         className="hero h-full" 
//                         style={{
//                             ...backgroundStyle,
//                             backgroundImage: 'url(https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=2070&auto=format&fit=crop)'
//                         }}
//                     >
//                         <div className="hero-overlay bg-black bg-opacity-60"></div>
//                         <div className="hero-content text-center text-neutral-content">
//                             <div className="max-w-md">
//                                 <h1 className="mb-5 text-5xl font-bold text-white">24/7 Support</h1>
//                                 <p className="mb-5 text-lg">Have a question? Our support team is here to help you with your booking needs, anytime.</p>
                                
//                                 <Link to="/contact">
//                                     <button className="btn btn-secondary text-white px-8">Contact Us</button>
//                                 </Link>
//                             </div>
//                         </div>
//                     </div>
//                 </SwiperSlide>
//             </Swiper>
//         </div>
//     );
// };

// export default Banner;
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation, EffectFade } from 'swiper/modules';
import { Link } from 'react-router-dom';
// import busImg from '../../assets/bus.png';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';

const Banner = () => {
    return (
        <div className="w-full h-[500px] md:h-[600px]">
            <Swiper
                spaceBetween={30}
                effect={'fade'}
                centeredSlides={true}
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation, EffectFade]}
                className="mySwiper h-full"
            >
                {/* --- SLIDE 1 --- */}
                <SwiperSlide>
                    <div className="relative w-full h-full">
                        {/* LOCAL IMAGE 1 */}
                        <img 
                            src="https://i.ibb.co.com/CKGCctfM/photo-1544620347-c4fd4a3d5957.avif"
                            alt="Safe Journey" 
                            className="w-full h-full object-cover" 
                        />
                        {/* <div className="absolute inset-0 bg-black bg-opacity-50"></div> */}
                        <div className="absolute inset-0 flex items-center justify-center text-center text-white">
                            <div className="max-w-md px-4">
                                <h1 className="mb-5 text-4xl md:text-5xl font-bold">Safe Journey</h1>
                                <p className="mb-5 text-lg">Experience the most comfortable bus rides with premium amenities.</p>
                                <Link to="/all-tickets">
                                    <button className="btn btn-primary border-none text-white px-8">Book Now</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>

                {/* --- SLIDE 2 --- */}
                <SwiperSlide>
                    <div className="relative w-full h-full">
                         {/* LOCAL IMAGE 2 */}
                        <img 
                            src="/public/assets/Routes.jpg" 
                            alt="Routes" 
                            className="w-full h-full object-cover" 
                        />
                        {/* <div className="absolute inset-0 bg-black bg-opacity-50"></div> */}
                        <div className="absolute inset-0 flex items-center justify-center text-center text-white">
                            <div className="max-w-md px-4">
                                <h1 className="mb-5 text-4xl md:text-5xl font-bold">Explore Routes</h1>
                                <p className="mb-5 text-lg">We cover over 50+ destinations nationwide.</p>
                                <Link to="/routes">
                                    <button className="btn btn-accent text-white px-8">See Routes</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>

                {/* --- SLIDE 3 --- */}
                <SwiperSlide>
                    <div className="relative w-full h-full">
                         {/* LOCAL IMAGE 3 */}
                        <img 
                            src="/public/contact.jpg" 
                            alt="Support" 
                            className="w-full h-full object-cover" 
                        />
                        {/* <div className="absolute inset-0 bg-black bg-opacity-50"></div> */}
                        <div className="absolute inset-0 flex items-center justify-center text-center text-white">
                            <div className="max-w-md px-4">
                                <h1 className="mb-5 text-4xl md:text-5xl font-bold">24/7 Support</h1>
                                <p className="mb-5 text-lg">Our team is here to help you anytime, anywhere.</p>
                                <Link to="/contact">
                                    <button className="btn btn-secondary text-white px-8">Contact Us</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
            </Swiper>
        </div>
    );
};

export default Banner;