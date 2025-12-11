// import { Link } from "react-router-dom";

// const Routes = () => {
//     // Mock Data for Popular Routes
//     const popularRoutes = [
//         {
//             id: 1,
//             from: "Dhaka",
//             to: "Chittagong",
//             image: "https://i.ibb.co.com/wFkMDP0F/images.jpg", // Chittagong/Hill View
//             desc: "Enjoy the scenic beauty of the port city and hills."
//         },
//         {
//             id: 2,
//             from: "Dhaka",
//             to: "Cox's Bazar",
//             image: "https://images.unsplash.com/photo-1608958435020-e8a7109ba809?q=80&w=2070&auto=format&fit=crop", // Beach
//             desc: "Relax on the world's longest natural sea beach."
//         },
//         {
//             id: 3,
//             from: "Dhaka",
//             to: "Sylhet",
//             image: "https://i.ibb.co.com/WNWTk3h1/images.jpg", // Tea Garden
//             desc: "Experience the greenery of tea gardens and waterfalls."
//         },
//         {
//             id: 4,
//             from: "Dhaka",
//             to: "Khulna",
//             image: "https://i.ibb.co.com/6dTHyjc/images.jpg", // Sundarbans vibe
//             desc: "Gateway to the Sundarbans mangrove forest."
//         },
//         {
//             id: 5,
//             from: "Dhaka",
//             to: "Rajshahi",
//             image: "https://i.ibb.co.com/CsHhp01R/images.jpg", // Historic/Green
//             desc: "Visit the city of silk and mangoes on the Padma river."
//         },
//         {
//             id: 6,
//             from: "Dhaka",
//             to: "Barisal",
//             image: "https://i.ibb.co.com/RkGpYczc/images.jpg", // River/Boat
//             desc: "Explore the Venice of Bengal and its floating markets."
//         }
//     ];

//     return (
//         <div className="max-w-7xl mx-auto px-4 py-10">
//             {/* Header Section */}
//             <div className="text-center mb-12">
//                 <h2 className="text-4xl font-bold text-primary mb-4">Popular Destinations</h2>
//                 <p className="text-gray-600 max-w-2xl mx-auto">
//                     Discover the most traveled routes across the country. Whether you seek mountains, beaches, or forests, we have a ride for you.
//                 </p>
//             </div>

//             {/* Grid Section */}
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//                 {popularRoutes.map((route) => (
//                     <div key={route.id} className="card bg-base-100 shadow-xl border hover:shadow-2xl transition-all duration-300">
//                         <figure className="h-48 relative overflow-hidden">
//                             <img 
//                                 src={route.image} 
//                                 alt={route.to} 
//                                 className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500"
//                             />
//                             <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
//                                 <span className="text-white font-bold text-lg">Explore {route.to}</span>
//                             </div>
//                         </figure>
//                         <div className="card-body">
//                             <h2 className="card-title text-2xl">
//                                 {route.from} ➝ {route.to}
//                             </h2>
//                             <p className="text-gray-500">{route.desc}</p>
                            
//                             <div className="card-actions justify-end mt-4">
//                                 <Link to="/all-tickets" className="w-full">
//                                     <button className="btn btn-primary w-full text-white">
//                                         Find Tickets
//                                     </button>
//                                 </Link>
//                             </div>
//                         </div>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default Routes;

import { Link } from "react-router-dom";
import { FaMapMarkerAlt, FaArrowRight } from "react-icons/fa";

const Routes = () => {
    // Mock Data for Popular Routes
    const popularRoutes = [
        {
            id: 1,
            from: "Dhaka",
            to: "Chittagong",
            image: "https://i.ibb.co.com/wFkMDP0F/images.jpg", // Chittagong/Hill View
            desc: "Enjoy the scenic beauty of the port city and hills."
        },
        {
            id: 2,
            from: "Dhaka",
            to: "Cox's Bazar",
            image: "https://images.unsplash.com/photo-1608958435020-e8a7109ba809?q=80&w=2070&auto=format&fit=crop", // Beach
            desc: "Relax on the world's longest natural sea beach."
        },
        {
            id: 3,
            from: "Dhaka",
            to: "Sylhet",
            image: "https://i.ibb.co.com/WNWTk3h1/images.jpg", // Tea Garden
            desc: "Experience the greenery of tea gardens and waterfalls."
        },
        {
            id: 4,
            from: "Dhaka",
            to: "Khulna",
            image: "https://i.ibb.co.com/6dTHyjc/images.jpg", // Sundarbans vibe
            desc: "Gateway to the Sundarbans mangrove forest."
        },
        {
            id: 5,
            from: "Dhaka",
            to: "Rajshahi",
            image: "https://i.ibb.co.com/CsHhp01R/images.jpg", // Historic/Green
            desc: "Visit the city of silk and mangoes on the Padma river."
        },
        {
            id: 6,
            from: "Dhaka",
            to: "Barisal",
            image: "https://i.ibb.co.com/RkGpYczc/images.jpg", // River/Boat
            desc: "Explore the Venice of Bengal and its floating markets."
        }
    ];

    return (
        <div className="bg-base-200 min-h-screen pb-20 font-poppins">
            
            {/* 1. Professional Gradient Header */}
            <div className="relative bg-gradient-to-r from-[#1e3a8a] to-[#2563EB] py-20 text-center text-white mb-10">
                <div className="absolute inset-0 bg-black opacity-10"></div>
                <div className="relative z-10 max-w-4xl mx-auto px-4">
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-white">Popular Destinations</h1>
                    <p className="text-blue-100 text-lg max-w-2xl mx-auto font-light">
                        Discover the most traveled routes across Bangladesh. Whether you seek mountains, beaches, or forests, we have a ride for you.
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 -mt-16 relative z-20">
                
                {/* 2. Grid Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {popularRoutes.map((route) => (
                        <div key={route.id} className="card bg-base-100 shadow-card hover:shadow-2xl transition-all duration-300 border border-gray-100 group overflow-hidden h-full flex flex-col">
                            
                            {/* Image with Overlay Effect */}
                            <figure className="h-56 relative overflow-hidden">
                                <img 
                                    src={route.image} 
                                    alt={route.to} 
                                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
                                    <h3 className="text-white text-2xl font-bold translate-y-2 group-hover:translate-y-0 transition-transform duration-300 flex items-center gap-2">
                                        <FaMapMarkerAlt className="text-primary text-lg" /> {route.to}
                                    </h3>
                                </div>
                            </figure>

                            {/* Content Body */}
                            <div className="card-body p-6 flex flex-col flex-grow">
                                <div className="flex items-center gap-2 text-sm font-semibold text-slate-400 uppercase tracking-wide mb-2">
                                    <span>{route.from}</span>
                                    <FaArrowRight className="text-primary" />
                                    <span>{route.to}</span>
                                </div>
                                
                                <p className="text-slate-600 mb-6 flex-grow leading-relaxed">
                                    {route.desc}
                                </p>
                                
                                {/* Button - Sticks to Bottom */}
                                <div className="card-actions mt-auto">
                                    <Link to="/all-tickets" className="w-full">
                                        <button className="btn btn-outline btn-primary w-full group-hover:bg-primary group-hover:text-white transition-colors duration-300 flex items-center justify-center gap-2">
                                            Find Tickets <FaArrowRight className="text-sm" />
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Routes;