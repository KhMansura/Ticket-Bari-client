import { FaShieldAlt, FaUsers, FaHistory } from "react-icons/fa";

const About = () => {
    return (
        <div className="bg-base-100 pb-20">
            {/* Hero Section */}
            <div className="hero h-64 bg-base-200">
                <div className="hero-content text-center">
                    <div className="max-w-md">
                        <h1 className="text-5xl font-bold">About Us</h1>
                        <p className="py-6">Simplifying travel for everyone, everywhere.</p>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 mt-16">
                {/* Our Story */}
                <div className="flex flex-col lg:flex-row gap-10 items-center mb-20">
                    <div className="flex-1">
                        <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2671&auto=format&fit=crop" 
                             className="rounded-lg shadow-2xl w-full" alt="Team working" />
                    </div>
                    <div className="flex-1">
                        <h2 className="text-3xl font-bold mb-4">Our Story</h2>
                        <p className="text-gray-600 mb-4">
                            Founded in 2025, TicketBari started with a simple mission: to make travel booking painless. We realized that people were wasting hours standing in lines or visiting multiple websites just to plan a simple trip.
                        </p>
                        <p className="text-gray-600">
                            Today, we connect thousands of travelers with hundreds of bus, train, and launch operators across the country. Our platform is built on trust, transparency, and technology.
                        </p>
                    </div>
                </div>

                {/* Stats Section */}
                <div className="stats shadow w-full text-center mb-20 bg-base-100 border">
                    <div className="stat">
                        <div className="stat-figure text-primary">
                            <FaUsers className="text-3xl" />
                        </div>
                        <div className="stat-title">Happy Users</div>
                        <div className="stat-value text-primary">50K+</div>
                        <div className="stat-desc">Growing everyday</div>
                    </div>
                    <div className="stat">
                        <div className="stat-figure text-secondary">
                            <FaShieldAlt className="text-3xl" />
                        </div>
                        <div className="stat-title">Secure Transactions</div>
                        <div className="stat-value text-secondary">100%</div>
                        <div className="stat-desc">Bank-grade security</div>
                    </div>
                    <div className="stat">
                        <div className="stat-figure text-accent">
                            <FaHistory className="text-3xl" />
                        </div>
                        <div className="stat-title">Years of Service</div>
                        <div className="stat-value text-accent">5+</div>
                        <div className="stat-desc">Dedicated to you</div>
                    </div>
                </div>

                {/* Mission */}
                <div className="text-center max-w-3xl mx-auto">
                    <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
                    <p className="text-lg text-gray-500">
                        "To empower travelers by providing a seamless, secure, and one-stop solution for all their transportation needs, bridging the gap between passengers and operators."
                    </p>
                </div>
            </div>
        </div>
    );
};

export default About;