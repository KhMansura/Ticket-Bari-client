import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import Swal from "sweetalert2";

const Contact = () => {

    const handleSubmit = (e) => {
        e.preventDefault();
        Swal.fire({
            title: "Message Sent!",
            text: "We will get back to you shortly.",
            icon: "success",
            confirmButtonColor: "#2563EB"
        });
        e.target.reset();
    }

    return (
        <div className="min-h-screen bg-base-200 pb-20">
            
            <div className="relative bg-gradient-to-r from-[#1e3a8a] to-[#2563EB] text-white py-24 text-center">
                <div className="absolute inset-0 bg-black opacity-10"></div> 
                <div className="relative z-10 max-w-4xl mx-auto px-4">
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[#93c5fd] to-[#3b82f6]">Contact Our Team</h1>
                    <p className="text-lg text-blue-100 max-w-2xl mx-auto font-light">
                        We are here to help. Reach out to us for any queries regarding your booking or travel plans.
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 -mt-10 relative z-20 grid grid-cols-1 lg:grid-cols-2 gap-8">
                
                {/* Left Column: Contact Info & Map */}
                <div className="space-y-8 animate-on-load delay-100">
                    
                    {/* Contact Info Card */}
                    <div className="bg-base-100 rounded-2xl shadow-card p-8 border border-gray-100">
                        <h2 className="text-2xl font-bold text-[#1e3a8a] mb-8">Get in Touch</h2>
                        
                        <div className="space-y-6">
                            {/* Phone */}
                            <div className="flex items-start gap-5 group cursor-pointer">
                                <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center text-primary text-xl transition-all duration-300 group-hover:bg-primary group-hover:text-white group-hover:scale-110 shadow-sm">
                                    <FaPhoneAlt />
                                </div>
                                <div>
                                    <h4 className="font-bold text-[#1e3a8a] text-lg">Phone</h4>
                                    <p className="text-slate-500 mt-1">+880 123 456 7890</p>
                                    <p className="text-xs text-slate-400">Mon-Fri 9am to 6pm</p>
                                </div>
                            </div>

                            {/* Email */}
                            <div className="flex items-start gap-5 group cursor-pointer">
                                <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center text-primary text-xl transition-all duration-300 group-hover:bg-primary group-hover:text-white group-hover:scale-110 shadow-sm">
                                    <FaEnvelope />
                                </div>
                                <div>
                                    <h4 className="font-bold text-[#1e3a8a] text-lg">Email</h4>
                                    <p className="text-slate-500 mt-1">support@ticketbari.com</p>
                                    <p className="text-xs text-slate-400">Online 24/7</p>
                                </div>
                            </div>

                            {/* Address */}
                            <div className="flex items-start gap-5 group cursor-pointer">
                                <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center text-primary text-xl transition-all duration-300 group-hover:bg-primary group-hover:text-white group-hover:scale-110 shadow-sm">
                                    <FaMapMarkerAlt />
                                </div>
                                <div>
                                    <h4 className="font-bold text-[#1e3a8a] text-lg">Headquarters</h4>
                                    <p className="text-slate-500 mt-1">123 Tech Avenue, Dhaka</p>
                                    <p className="text-xs text-slate-400">Bangladesh</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Styled Map */}
                    <div className="w-full h-80 bg-white rounded-2xl shadow-card overflow-hidden border border-gray-100 p-2">
                         <iframe 
                            title="map"
                            className="w-full h-full rounded-xl grayscale hover:grayscale-0 transition-all duration-700"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d233668.38703692693!2d90.27923991057244!3d23.780573258035957!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b8b087026b81%3A0x8fa563bbdd5904c2!2sDhaka!5e0!3m2!1sen!2sbd!4v1717357062456!5m2!1sen!2sbd" 
                            style={{border:0}} 
                            allowFullScreen="" 
                            loading="lazy">
                        </iframe>
                    </div>
                </div>

                {/* Right Column: Message Form */}
                <div className="bg-base-100 rounded-2xl shadow-card p-8 lg:p-10 border border-gray-100 animate-on-load delay-200">
                    <form onSubmit={handleSubmit} className="h-full flex flex-col justify-center">
                        <h2 className="text-3xl font-bold text-[#1e3a8a] mb-2">Send a Message</h2>
                        <p className="text-slate-500 mb-8">Have a question? Fill out the form below.</p>
                        
                        <div className="form-control mb-5">
                            <label className="label font-semibold text-[#1e3a8a]">Your Name</label>
                            <input type="text" placeholder="e.g. John Doe" className="input input-bordered w-full h-12 bg-base-200 focus:bg-white focus:border-primary transition-all duration-300 rounded-lg" required />
                        </div>

                        <div className="form-control mb-5">
                            <label className="label font-semibold text-[#1e3a8a]">Email Address</label>
                            <input type="email" placeholder="e.g. john@example.com" className="input input-bordered w-full h-12 bg-base-200 focus:bg-white focus:border-primary transition-all duration-300 rounded-lg" required />
                        </div>

                        <div className="form-control mb-5">
                            <label className="label font-semibold text-[#1e3a8a]">Subject</label>
                            <input type="text" placeholder="Booking / Refund / Inquiry" className="input input-bordered w-full h-12 bg-base-200 focus:bg-white focus:border-primary transition-all duration-300 rounded-lg" />
                        </div>

                        <div className="form-control mb-8">
                            <label className="label font-semibold text-[#1e3a8a]">Message</label>
                            <textarea className="textarea textarea-bordered h-40 bg-base-200 focus:bg-white focus:border-primary transition-all duration-300 rounded-lg resize-none text-base" placeholder="Write your message here..." required></textarea>
                        </div>

                        <button className="btn btn-primary w-full h-12 text-lg font-bold rounded-lg shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                            Send Message
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Contact;