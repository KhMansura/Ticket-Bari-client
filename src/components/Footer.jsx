// import { FaFacebook, FaInstagram, FaStripe, FaCcVisa, FaCcMastercard, FaBus } from "react-icons/fa";
// import { FaXTwitter } from "react-icons/fa6";
// import { Link } from "react-router";

// const Footer = () => {
//     return (
//         <footer className="bg-neutral text-neutral-content pt-10">
//             <div className="footer max-w-7xl mx-auto px-4 pb-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
//                 {/* Column 1: Logo & Desc */}
//                 <aside>
//                     <div className="flex items-center gap-2 text-2xl font-bold mb-2">
//                          <FaBus /> TicketBari
//                     </div>
//                     <p className="text-gray-400">
//                         Book bus, train, launch & flight <br /> tickets easily with us. <br />
//                         Your trusted travel partner since 2025.
//                     </p>
//                 </aside> 

//                 {/* Column 2: Quick Links */}
//                 <nav className="flex flex-col gap-2">
//                     <header className="footer-title text-white opacity-100">Quick Links</header> 
//                     <Link to="/" className="link link-hover">Home</Link>
//                     <Link to="/all-tickets" className="link link-hover">All Tickets</Link>
//                     <Link to="/about" className="link link-hover">About Us</Link>
//                     <Link to="/contact" className="link link-hover">Contact</Link>
//                 </nav> 

//                 {/* Column 3: Contact Info */}
//                 <nav className="flex flex-col gap-2">
//                     <header className="footer-title text-white opacity-100">Contact Us</header> 
//                     <p>Email: support@ticketbari.com</p>
//                     <p>Phone: +880 123 456 7890</p>
//                     <div className="flex gap-4 mt-2">
//                         <FaFacebook className="text-2xl cursor-pointer hover:text-blue-500"/>
//                         <FaXTwitter className="text-2xl cursor-pointer hover:text-blue-400"/>
//                         <FaInstagram className="text-2xl cursor-pointer hover:text-pink-500"/>
//                     </div>
//                 </nav> 

//                 {/* Column 4: Payment Methods */}
//                 <nav className="flex flex-col gap-2">
//                     <header className="footer-title text-white opacity-100">We Accept</header> 
//                     <div className="flex gap-4 text-4xl">
//                         <FaStripe className="text-blue-400" />
//                         <FaCcVisa />
//                         <FaCcMastercard />
//                     </div>
//                     <p className="text-xs text-gray-500 mt-2">Secured by Stripe</p>
//                 </nav>
//             </div>
            
//             {/* Bottom Bar */}
//             <div className="footer footer-center p-4 bg-base-300 text-base-content">
//                 <aside>
//                     <p>© 2025 TicketBari. All rights reserved.</p>
//                 </aside>
//             </div>
//         </footer>
//     );
// };

// export default Footer;
import { FaFacebook, FaInstagram, FaStripe, FaCcVisa, FaCcMastercard, FaBus } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Link } from "react-router-dom"; // Note: Changed 'react-router' to 'react-router-dom' for standard practice

const Footer = () => {
    return (
        <footer className="bg-neutral text-neutral-content border-t border-base-300">
            <div className="max-w-7xl mx-auto px-4 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                
                {/* Column 1: Brand & Desc */}
                <aside className="space-y-4">
                    <div className="flex items-center gap-2 text-3xl font-extrabold tracking-tight text-white">
                        <FaBus className="text-primary" /> 
                        <span>TicketBari</span>
                    </div>
                    <p className="text-gray-400 leading-relaxed text-sm">
                        Book bus, train, launch & flight <br /> tickets easily with us. <br />
                        <span className="text-gray-500 font-semibold">Your trusted travel partner since 2025.</span>
                    </p>
                </aside> 

                {/* Column 2: Quick Links */}
                <nav className="flex flex-col gap-3">
                    <header className="footer-title text-white opacity-100 text-lg tracking-widest mb-2">Quick Links</header> 
                    <Link to="/" className="link link-hover text-gray-400 hover:text-white transition-colors duration-300">Home</Link>
                    <Link to="/all-tickets" className="link link-hover text-gray-400 hover:text-white transition-colors duration-300">All Tickets</Link>
                    <Link to="/about" className="link link-hover text-gray-400 hover:text-white transition-colors duration-300">About Us</Link>
                    <Link to="/contact" className="link link-hover text-gray-400 hover:text-white transition-colors duration-300">Contact</Link>
                </nav> 

                {/* Column 3: Contact Info */}
                <nav className="flex flex-col gap-3">
                    <header className="footer-title text-white opacity-100 text-lg tracking-widest mb-2">Contact Us</header> 
                    <p className="text-gray-400 text-sm">Email: support@ticketbari.com</p>
                    <p className="text-gray-400 text-sm">Phone: +880 123 456 7890</p>
                    
                    <div className="flex gap-4 mt-4">
                        <a className="btn btn-sm btn-circle btn-ghost text-xl hover:bg-white hover:text-blue-600 transition-all border border-gray-700">
                            <FaFacebook />
                        </a>
                        <a className="btn btn-sm btn-circle btn-ghost text-xl hover:bg-white hover:text-black transition-all border border-gray-700">
                            <FaXTwitter />
                        </a>
                        <a className="btn btn-sm btn-circle btn-ghost text-xl hover:bg-white hover:text-pink-600 transition-all border border-gray-700">
                            <FaInstagram />
                        </a>
                    </div>
                </nav> 

                {/* Column 4: Payment Methods */}
                <nav className="flex flex-col gap-3">
                    <header className="footer-title text-white opacity-100 text-lg tracking-widest mb-2">We Accept</header> 
                    <div className="flex gap-4 text-4xl items-center">
                        <FaStripe className="text-blue-400 hover:scale-110 transition-transform" />
                        <FaCcVisa className="text-white hover:scale-110 transition-transform" />
                        <FaCcMastercard className="text-red-500 hover:scale-110 transition-transform" />
                    </div>
                    <p className="text-xs text-gray-500 mt-2 tracking-wide">100% Secured Payment Gateway</p>
                </nav>
            </div>
            
            {/* Bottom Bar (Clean Divider Style) */}
            <div className="border-t border-gray-800 bg-neutral/50 p-6 text-center text-sm text-gray-500">
                <p>&copy; {new Date().getFullYear()} TicketBari. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;