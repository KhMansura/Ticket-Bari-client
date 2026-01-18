import { FaQuoteLeft, FaStar } from "react-icons/fa";

const Testimonials = () => {
    const reviews = [
        { id: 1, name: "Anika Rahman", role: "Frequent Traveler", text: "TicketBari made my Eid vacation planning so easy. The seat selection feature is seamless!", img: "https://i.pravatar.cc/150?u=anika" },
        { id: 2, name: "Sajid Ahmed", role: "Business Traveler", text: "The best part is the instant confirmation. No more waiting in lines at the counter.", img: "https://i.pravatar.cc/150?u=sajid" },
        { id: 3, name: "Maria Khan", role: "Student", text: "I love the dark mode UI and how fast the site loads on my phone. Highly recommended!", img: "https://i.pravatar.cc/150?u=maria" }
    ];

    return (
        <div className="py-20 bg-base-200">
            <div className="max-w-7xl mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-3">What Our Travelers Say</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {reviews.map(rev => (
                        <div key={rev.id} className="bg-base-100 p-8 rounded-2xl shadow-card relative border border-base-300">
                            <FaQuoteLeft className="text-primary/10 text-5xl absolute top-4 right-4" />
                            <div className="flex gap-1 text-orange-400 mb-4">
                                <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
                            </div>
                            <p className="italic text-slate-600 mb-6">"{rev.text}"</p>
                            <div className="flex items-center gap-4">
                                <img src={rev.img} className="w-12 h-12 rounded-full border-2 border-primary" alt={rev.name} />
                                <div>
                                    <h4 className="font-bold">{rev.name}</h4>
                                    <p className="text-xs opacity-60">{rev.role}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
export default Testimonials;