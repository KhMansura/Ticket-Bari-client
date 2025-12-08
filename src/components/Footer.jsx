import { FaFacebook, FaTwitter, FaInstagram, FaStripe, FaCcVisa, FaCcMastercard, FaBus } from "react-icons/fa";
import { Link } from "react-router";

const Footer = () => {
    return (
        <footer className="bg-neutral text-neutral-content pt-10">
            <div className="footer max-w-7xl mx-auto px-4 pb-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                {/* Column 1: Logo & Desc */}
                <aside>
                    <div className="flex items-center gap-2 text-2xl font-bold mb-2">
                         <FaBus /> TicketBari
                    </div>
                    <p className="text-gray-400">
                        Book bus, train, launch & flight <br /> tickets easily with us. <br />
                        Your trusted travel partner since 2025.
                    </p>
                </aside> 

                {/* Column 2: Quick Links */}
                <nav className="flex flex-col gap-2">
                    <header className="footer-title text-white opacity-100">Quick Links</header> 
                    {/* <a className="link link-hover">Home</a>
                    <a className="link link-hover">All Tickets</a>
                    <a className="link link-hover">About Us</a>
                    <a className="link link-hover">Contact</a> */}
                    <Link to="/" className="link link-hover">Home</Link>
                    <Link to="/all-tickets" className="link link-hover">All Tickets</Link>
                    <Link to="/about" className="link link-hover">About Us</Link>
                    <Link to="/contact" className="link link-hover">Contact</Link>
                </nav> 

                {/* Column 3: Contact Info */}
                <nav className="flex flex-col gap-2">
                    <header className="footer-title text-white opacity-100">Contact Us</header> 
                    <p>Email: support@ticketbari.com</p>
                    <p>Phone: +880 123 456 7890</p>
                    <div className="flex gap-4 mt-2">
                        <FaFacebook className="text-2xl cursor-pointer hover:text-blue-500"/>
                        <FaTwitter className="text-2xl cursor-pointer hover:text-blue-400"/>
                        <FaInstagram className="text-2xl cursor-pointer hover:text-pink-500"/>
                    </div>
                </nav> 

                {/* Column 4: Payment Methods */}
                <nav className="flex flex-col gap-2">
                    <header className="footer-title text-white opacity-100">We Accept</header> 
                    <div className="flex gap-4 text-4xl">
                        <FaStripe className="text-blue-400" />
                        <FaCcVisa />
                        <FaCcMastercard />
                    </div>
                    <p className="text-xs text-gray-500 mt-2">Secured by Stripe</p>
                </nav>
            </div>
            
            {/* Bottom Bar */}
            <div className="footer footer-center p-4 bg-base-300 text-base-content">
                <aside>
                    <p>© 2025 TicketBari. All rights reserved.</p>
                </aside>
            </div>
        </footer>
    );
};

export default Footer;