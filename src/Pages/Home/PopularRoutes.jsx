import { useNavigate } from "react-router-dom";
import { FaStar, FaMapMarkerAlt, FaArrowRight, FaClock } from "react-icons/fa";

const PopularRoutes = () => {
    const navigate = useNavigate();

    // Static Data for "Popular" look
    const routes = [
        {
            id: 1,
            from: "Dhaka",
            to: "Cox's Bazar",
            price: 1200,
            rating: 4.9,
            time: "8h 30m",
            badge: "Best Seller",
            image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=600&auto=format&fit=crop" // Bus image
        },
        {
            id: 2,
            from: "Dhaka",
            to: "Sylhet",
            price: 850,
            rating: 4.8,
            time: "5h 15m",
            badge: "Hot Deal",
            image: "https://images.unsplash.com/photo-1620626379532-628d05260f86?q=80&w=600&auto=format&fit=crop" // Nature image
        },
        {
            id: 3,
            from: "Chittagong",
            to: "Dhaka",
            price: 950,
            rating: 4.7,
            time: "6h 00m",
            badge: null,
            image: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?q=80&w=600&auto=format&fit=crop" // Bus/Road image
        },
        {
            id: 4,
            from: "Dhaka",
            to: "Khulna",
            price: 700,
            rating: 4.6,
            time: "4h 45m",
            badge: "Selling Fast",
            image: "https://images.unsplash.com/photo-1494515855673-b411c78e19f5?q=80&w=600&auto=format&fit=crop" // Travel image
        }
    ];

    return (
        <div className="py-20 bg-base-200 font-poppins">
            <div className="max-w-7xl mx-auto px-4">
                
                {/* Header with View All Button */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
                    <div className="text-center md:text-left">
                        <h2 className="text-3xl md:text-4xl font-bold text-[#1e3a8a] mb-2">
                            Popular Routes 🌟
                        </h2>
                        <p className="text-slate-500">Top-rated destinations loved by our travelers.</p>
                    </div>
                    
                    <button 
                        onClick={() => navigate('/routes')}
                        className="btn btn-outline border-blue-200 text-[#1e3a8a] hover:bg-[#1e3a8a] hover:text-white hover:border-[#1e3a8a] transition-all"
                    >
                        View All Routes <FaArrowRight />
                    </button>
                </div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {routes.map((route) => (
                        <div 
                            key={route.id} 
                            className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group cursor-pointer border border-gray-100"
                            onClick={() => navigate('/routes')} // Click card to go to Routes page
                        >
                            {/* Image Section */}
                            <div className="relative h-48 overflow-hidden">
                                <img 
                                    src={route.image} 
                                    alt={`${route.from} to ${route.to}`} 
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                                {/* Overlay Gradient */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                
                                {/* Badge */}
                                {route.badge && (
                                    <div className="absolute top-3 right-3 bg-red-500 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-lg">
                                        {route.badge}
                                    </div>
                                )}

                                {/* Price Tag */}
                                <div className="absolute bottom-3 right-3 bg-white text-[#1e3a8a] font-bold px-3 py-1 rounded-lg text-sm shadow-lg">
                                    From ${route.price}
                                </div>
                            </div>

                            {/* Content Section */}
                            <div className="p-5">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="font-bold text-lg text-gray-800 line-clamp-1">
                                        {route.from} ➝ {route.to}
                                    </h3>
                                </div>

                                {/* Meta Info */}
                                <div className="flex items-center gap-4 text-xs text-slate-500 mb-4 border-b border-gray-100 pb-4">
                                    <span className="flex items-center gap-1">
                                        <FaClock className="text-blue-400" /> {route.time}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <FaStar className="text-amber-400" /> {route.rating}
                                    </span>
                                </div>

                                {/* Action */}
                                <div className="flex items-center justify-between">
                                    <span className="text-xs text-slate-400 font-medium">Non-Stop</span>
                                    <span className="text-primary text-sm font-bold flex items-center gap-1 group-hover:gap-2 transition-all">
                                        Book Now <FaArrowRight />
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PopularRoutes;