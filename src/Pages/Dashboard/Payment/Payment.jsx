// import { loadStripe } from "@stripe/stripe-js";
// import { Elements } from "@stripe/react-stripe-js";
// import CheckoutForm from "./CheckoutForm";
// import { useLocation } from "react-router-dom";


// const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK);

// const Payment = () => {
//     const location = useLocation();
//     const booking = location.state; 
//     const total = booking?.totalPrice || 0;

//     return (
//         <div className="w-full">
//             <h2 className="text-3xl text-center font-bold mb-10">Make Payment</h2>
//             <Elements stripe={stripePromise}>
//                 <CheckoutForm booking={booking} price={total} />
//             </Elements>
//         </div>
//     );
// };

// export default Payment;

import { loadStripe } from "@stripe/stripe-js";

import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { useLocation, Navigate } from "react-router-dom";
import { FaLock, FaShieldAlt, FaTicketAlt, FaMoneyBillWave, FaCreditCard } from "react-icons/fa";

// Add your Public Key from Stripe Dashboard here
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK);

const Payment = () => {
    const location = useLocation();
    const booking = location.state; // We will pass booking data via state
    const total = booking?.totalPrice || 0;

    // Redirect if no booking data found (Prevents crashing if user refreshes)
    if (!booking) {
        return <Navigate to="/all-tickets" replace />;
    }

    return (
        <div className="min-h-screen bg-base-200 py-12 font-poppins">
            <div className="max-w-5xl mx-auto px-4">
                
                {/* Header */}
                <div className="text-center mb-10">
                    <h2 className="text-3xl font-bold text-[#1e3a8a] flex items-center justify-center gap-3">
                        <FaLock className="text-green-500" /> Secure Checkout
                    </h2>
                    <p className="text-slate-500 mt-2">Complete your purchase securely via Stripe.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    
                    {/* LEFT COLUMN: Order Summary Card */}
                    <div className="card bg-white shadow-card border border-gray-100 h-fit">
                        <div className="card-body p-8">
                            <h3 className="text-xl font-bold text-[#1e3a8a] border-b pb-4 mb-4 flex items-center gap-2">
                                <FaTicketAlt /> Order Summary
                            </h3>

                            {/* Ticket Details */}
                            <div className="flex gap-4 mb-6">
                                <div className="avatar">
                                    <div className="w-20 h-20 rounded-xl">
                                        <img src={booking.photo} alt="Ticket" className="object-cover" />
                                    </div>
                                </div>
                                <div>
                                    <h4 className="font-bold text-lg text-slate-700">{booking.ticketTitle}</h4>
                                    <p className="text-sm text-slate-500">{booking.transportType}</p>
                                    <p className="text-xs text-slate-400 mt-1">{booking.from} ➝ {booking.to}</p>
                                </div>
                            </div>

                            {/* Price Breakdown */}
                            <div className="space-y-3 text-sm text-slate-600 bg-gray-50 p-4 rounded-lg">
                                <div className="flex justify-between">
                                    <span>Price per unit</span>
                                    <span className="font-medium">${booking.unitPrice}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Quantity</span>
                                    <span className="font-medium">x {booking.bookingQty}</span>
                                </div>
                                <div className="divider my-1"></div>
                                <div className="flex justify-between text-lg font-bold text-[#1e3a8a]">
                                    <span>Total to Pay</span>
                                    <span>${total}</span>
                                </div>
                            </div>

                            {/* Trust Badges */}
                            <div className="mt-6 flex flex-col gap-2 text-xs text-slate-400 text-center">
                                <div className="flex justify-center gap-4 text-2xl text-slate-300">
                                    <FaCreditCard /> <FaShieldAlt /> <FaLock />
                                </div>
                                <p>Encrypted and Secured by Stripe</p>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT COLUMN: Payment Form (Elements) */}
                    <div className="card bg-white shadow-card border border-blue-100">
                        <div className="bg-gradient-to-r from-[#1e3a8a] to-[#2563EB] p-4 text-white text-center font-bold text-sm tracking-wider uppercase">
                            Payment Details
                        </div>
                        <div className="card-body p-8">
                            <Elements stripe={stripePromise}>
                                <CheckoutForm booking={booking} price={total} />
                            </Elements>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Payment;