// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Autoplay } from 'swiper/modules';
// import 'swiper/css';

// const Partners = () => {
//     const companies = [
//         // 1. Bangladesh Railway (Train)
//         { 
//             id: 1, 
//             name: "Bangladesh Railway", 
//             logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Bangladesh_Railway_Logo.svg/1200px-Bangladesh_Railway_Logo.svg.png" 
//         },
//         // 2. Biman Bangladesh (Plane)
//         { 
//             id: 2, 
//             name: "Biman Bangladesh", 
//             logo: "https://upload.wikimedia.org/wikipedia/en/thumb/9/94/Biman_Bangladesh_Airlines_logo.svg/1200px-Biman_Bangladesh_Airlines_logo.svg.png" 
//         },
//         // 3. Volvo (Premium Bus Fleet)
//         { 
//             id: 3, 
//             name: "Volvo Buses", 
//             logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Volvo-Iron-Mark-Black.svg/2560px-Volvo-Iron-Mark-Black.svg.png" 
//         },
//         // 4. US-Bangla Airlines (Plane)
//         { 
//             id: 4, 
//             name: "US-Bangla Airlines", 
//             logo: "https://upload.wikimedia.org/wikipedia/en/thumb/4/48/US-Bangla_Airlines_logo.svg/1200px-US-Bangla_Airlines_logo.svg.png" 
//         },
//         // 5. Scania (Premium Bus Fleet)
//         { 
//             id: 5, 
//             name: "Scania", 
//             logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Scania_Logo.svg/2560px-Scania_Logo.svg.png" 
//         },
//         // 6. Novoair (Plane)
//         { 
//             id: 6, 
//             name: "Novoair", 
//             logo: "https://upload.wikimedia.org/wikipedia/en/thumb/e/e0/Novoair_logo.svg/1200px-Novoair_logo.svg.png" 
//         },
//         // 7. Hyundai (Bus/Train)
//         { 
//             id: 7, 
//             name: "Hyundai", 
//             logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Hyundai_Motor_Company_logo.svg/2560px-Hyundai_Motor_Company_logo.svg.png" 
//         },
//     ];

//     return (
//         <div className="max-w-7xl mx-auto px-4 py-16 bg-base-100">
//             {/* Header Section */}
//             <div className="text-center mb-10">
//                 <h2 className="text-3xl font-bold text-primary">Our Travel Partners</h2>
//                 <p className="text-gray-500 mt-2">Book tickets from the country's top transport operators</p>
//             </div>

//             {/* Logo Slider */}
//             <Swiper
//                 slidesPerView={2}
//                 spaceBetween={30}
//                 loop={true}
//                 autoplay={{
//                     delay: 2000,
//                     disableOnInteraction: false,
//                 }}
//                 breakpoints={{
//                     640: {
//                         slidesPerView: 3,
//                         spaceBetween: 40,
//                     },
//                     768: {
//                         slidesPerView: 4,
//                         spaceBetween: 50,
//                     },
//                     1024: {
//                         slidesPerView: 5,
//                         spaceBetween: 50,
//                     },
//                 }}
//                 modules={[Autoplay]}
//                 className="mySwiper flex items-center"
//             >
//                 {companies.map((company) => (
//                     <SwiperSlide key={company.id} className="flex items-center justify-center py-4">
//                         {/* Grayscale to Color on Hover Effect */}
//                         <div 
//                             className="w-36 h-24 flex items-center justify-center opacity-60 hover:opacity-100 grayscale hover:grayscale-0 transition-all duration-300 cursor-pointer"
//                             title={company.name}
//                         >
//                             <img 
//                                 src={company.logo} 
//                                 alt={company.name} 
//                                 className="max-w-full max-h-full object-contain p-2" 
//                             />
//                         </div>
//                     </SwiperSlide>
//                 ))}
//             </Swiper>
//         </div>
//     );
// };

// export default Partners;
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Autoplay } from 'swiper/modules';
// import 'swiper/css';

// const Partners = () => {
//     // Real Logos from your screenshot (Wikimedia Commons Sources)
//     const companies = [
//         { 
//             id: 1, 
//             name: "Biman Bangladesh", 
//             logo: "https://i.ibb.co.com/fVbDzj2j/668e566f847a2841c9ada814.png" 
//         },
//         { 
//             id: 2, 
//             name: "US-Bangla Airlines", 
//             logo: "https://i.ibb.co.com/HL2PZc60/669690c41c244cd0873e5e8d.png" 
//         },
//         { 
//             id: 3, 
//             name: "NOVOAIR", 
//             logo: "https://i.ibb.co.com/b5vvCDKm/669e590474ab2dd97b14a574.png" 
//         },
//         { 
//             id: 4, 
//             name: "Emirates", 
//             logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Emirates_logo.svg/1200px-Emirates_logo.svg.png" 
//         },
//         { 
//             id: 5, 
//             name: "Qatar Airways", 
//             logo: "https://upload.wikimedia.org/wikipedia/en/thumb/9/9b/Qatar_Airways_Logo.svg/1200px-Qatar_Airways_Logo.svg.png" 
//         },
//         { 
//             id: 6, 
//             name: "Singapore Airlines", 
//             logo: "https://i.ibb.co.com/0TMGLB1/668e6937847a2841c9ada865.png" 
//         },
//         { 
//             id: 7, 
//             name: "Turkish Airlines", 
//             logo: "https://i.ibb.co.com/7xqv0Qx1/668e6b38847a2841c9ada876.png" 
//         },
//         { 
//             id: 8, 
//             name: "AirAsia", 
//             logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/AirAsia_New_Logo.svg/1200px-AirAsia_New_Logo.svg.png" 
//         },
//         { 
//             id: 9, 
//             name: "Saudia", 
//             logo: "https://i.ibb.co.com/8gWS0WSy/668e68ec847a2841c9ada864.png" 
//         },
//         { 
//             id: 10, 
//             name: "Malaysia Airlines", 
//             logo: "https://i.ibb.co.com/yFXgxgyx/587b51ad44060909aa603a8f.png" 
//         }
//     ];

//     return (
//         <div className="max-w-7xl mx-auto px-4 py-16 bg-base-100">
//             {/* Header Section */}
//             <div className="text-center mb-10">
//                 <h2 className="text-3xl font-bold text-primary">Our Airline Partners</h2>
//                 <p className="text-gray-500 mt-2">Fly with the world's most trusted airlines</p>
//             </div>

//             {/* Logo Slider */}
//             <Swiper
//                 slidesPerView={2}
//                 spaceBetween={30}
//                 loop={true}
//                 autoplay={{
//                     delay: 2000,
//                     disableOnInteraction: false,
//                 }}
//                 breakpoints={{
//                     640: {
//                         slidesPerView: 3,
//                         spaceBetween: 40,
//                     },
//                     768: {
//                         slidesPerView: 4,
//                         spaceBetween: 50,
//                     },
//                     1024: {
//                         slidesPerView: 5,
//                         spaceBetween: 50,
//                     },
//                 }}
//                 modules={[Autoplay]}
//                 className="mySwiper flex items-center"
//             >
//                 {companies.map((company) => (
//                     <SwiperSlide key={company.id} className="flex items-center justify-center py-4">
//                         {/* Container for Logo */}
//                         <div 
//                             className="w-40 h-24 flex items-center justify-center opacity-70 hover:opacity-100 grayscale hover:grayscale-0 transition-all duration-300 cursor-pointer"
//                             title={company.name}
//                         >
//                             <img 
//                                 src={company.logo} 
//                                 alt={company.name} 
//                                 className="max-w-full max-h-full object-contain p-2" 
//                             />
//                         </div>
//                     </SwiperSlide>
//                 ))}
//             </Swiper>
//         </div>
//     );
// };

// export default Partners;
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';

const Partners = () => {
    // Real Logos: Airlines + Bus + Train
    const companies = [
        // --- EXISTING AIRLINES (DO NOT CHANGE) ---
        { 
            id: 1, 
            name: "Biman Bangladesh", 
            logo: "https://i.ibb.co.com/fVbDzj2j/668e566f847a2841c9ada814.png" 
        },
        { 
            id: 2, 
            name: "US-Bangla Airlines", 
            logo: "https://i.ibb.co.com/HL2PZc60/669690c41c244cd0873e5e8d.png" 
        },
        { 
            id: 3, 
            name: "NOVOAIR", 
            logo: "https://i.ibb.co.com/b5vvCDKm/669e590474ab2dd97b14a574.png" 
        },
        { 
            id: 4, 
            name: "Emirates", 
            logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Emirates_logo.svg/1200px-Emirates_logo.svg.png" 
        },
        { 
            id: 5, 
            name: "Qatar Airways", 
            logo: "https://upload.wikimedia.org/wikipedia/en/thumb/9/9b/Qatar_Airways_Logo.svg/1200px-Qatar_Airways_Logo.svg.png" 
        },
        { 
            id: 6, 
            name: "Singapore Airlines", 
            logo: "https://i.ibb.co.com/0TMGLB1/668e6937847a2841c9ada865.png" 
        },
        { 
            id: 7, 
            name: "Turkish Airlines", 
            logo: "https://i.ibb.co.com/7xqv0Qx1/668e6b38847a2841c9ada876.png" 
        },
        { 
            id: 8, 
            name: "AirAsia", 
            logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/AirAsia_New_Logo.svg/1200px-AirAsia_New_Logo.svg.png" 
        },
        { 
            id: 9, 
            name: "Saudia", 
            logo: "https://i.ibb.co.com/8gWS0WSy/668e68ec847a2841c9ada864.png" 
        },
        { 
            id: 10, 
            name: "Malaysia Airlines", 
            logo: "https://i.ibb.co.com/yFXgxgyx/587b51ad44060909aa603a8f.png" 
        },

        // --- NEW BUS & TRAIN PARTNERS ---
        { 
            id: 11, 
            name: "Bangladesh Railway", 
            logo: "https://i.ibb.co.com/0Rtgczq3/bangladesh-railway-logo-png-seeklogo-349823.png" 
        },
        { 
            id: 12, 
            name: "Volvo (Bus Fleet)", 
            logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Volvo-Iron-Mark-Black.svg/2560px-Volvo-Iron-Mark-Black.svg.png" 
        },
        { 
            id: 13, 
            name: "Scania (Bus Fleet)", 
            logo: "https://i.ibb.co.com/4n6vCFrG/download.jpg" 
        },
        { 
            id: 14, 
            name: "Hino Motors", 
            logo: "https://i.ibb.co.com/tMg2H8NT/download.png" 
        },
        { 
            id: 15, 
            name: "Ashok Leyland", 
            logo: "https://i.ibb.co.com/Cp3jJ1Yq/download.png" 
        },
        { 
            id: 16, 
            name: "Hyundai", 
            logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Hyundai_Motor_Company_logo.svg/2560px-Hyundai_Motor_Company_logo.svg.png" 
        }
    ];

    return (
        <div className="max-w-7xl mx-auto px-4 py-16 bg-base-100">
            {/* Header Section */}
            <div className="text-center mb-10">
                <h2 className="text-3xl font-bold ">Our Travel Partners</h2>
                <p className="text-gray-500 mt-2">Proudly working with top Airlines, Bus Operators, and Bangladesh Railway</p>
            </div>

            {/* Logo Slider */}
            <Swiper
                slidesPerView={2}
                spaceBetween={30}
                loop={true}
                autoplay={{
                    delay: 2000,
                    disableOnInteraction: false,
                }}
                breakpoints={{
                    640: {
                        slidesPerView: 3,
                        spaceBetween: 40,
                    },
                    768: {
                        slidesPerView: 4,
                        spaceBetween: 50,
                    },
                    1024: {
                        slidesPerView: 5,
                        spaceBetween: 50,
                    },
                }}
                modules={[Autoplay]}
                className="mySwiper flex items-center"
            >
                {companies.map((company) => (
                    <SwiperSlide key={company.id} className="flex items-center justify-center py-4">
                        {/* Container for Logo */}
                        <div 
                            className="w-40 h-24 flex items-center justify-center opacity-70 hover:opacity-100 grayscale hover:grayscale-0 transition-all duration-300 cursor-pointer"
                            title={company.name}
                        >
                            <img 
                                src={company.logo} 
                                alt={company.name} 
                                className="max-w-full max-h-full object-contain p-2" 
                            />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default Partners;