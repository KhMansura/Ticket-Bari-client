import { Link } from "react-router-dom";

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
        <div className="max-w-7xl mx-auto px-4 py-10">
            {/* Header Section */}
            <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-primary mb-4">Popular Destinations</h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                    Discover the most traveled routes across the country. Whether you seek mountains, beaches, or forests, we have a ride for you.
                </p>
            </div>

            {/* Grid Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {popularRoutes.map((route) => (
                    <div key={route.id} className="card bg-base-100 shadow-xl border hover:shadow-2xl transition-all duration-300">
                        <figure className="h-48 relative overflow-hidden">
                            <img 
                                src={route.image} 
                                alt={route.to} 
                                className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                                <span className="text-white font-bold text-lg">Explore {route.to}</span>
                            </div>
                        </figure>
                        <div className="card-body">
                            <h2 className="card-title text-2xl">
                                {route.from} ➝ {route.to}
                            </h2>
                            <p className="text-gray-500">{route.desc}</p>
                            
                            <div className="card-actions justify-end mt-4">
                                <Link to="/all-tickets" className="w-full">
                                    <button className="btn btn-primary w-full text-white">
                                        Find Tickets
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Routes;