import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation, EffectFade } from 'swiper/modules';
import { Link } from 'react-router-dom';
// import busImg from '../../assets/bus.png';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';
import mapImg from '/public/assets/Etihad-Airways-flight-destination-map.png';
import supportImg from '/public/contact.jpg';

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
                            src={mapImg} 
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
                            src={supportImg}
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