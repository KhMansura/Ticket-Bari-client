import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../providers/AuthProviders"; 
import { Link } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const MyBookedTickets = () => {
    const { user } = useContext(AuthContext);
    const [bookings, setBookings] = useState([]);
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        if (user?.email) {
            axiosSecure.get(`/bookings?email=${user.email}`)
            .then(res => setBookings(res.data))
        }
    }, [user, axiosSecure]);

    // Helper component for Countdown inside each card
    const Countdown = ({ date, onExpire }) => {
        const [timeLeft, setTimeLeft] = useState("");
        
        useEffect(() => {
            const calculate = () => {
                const diff = +new Date(date) - +new Date();
                if (diff > 0) {
                    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
                    const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
                    const m = Math.floor((diff / 1000 / 60) % 60);
                    setTimeLeft(`${d}d ${h}h ${m}m`);
                } else {
                    setTimeLeft("Expired");
                    onExpire(true); 
                }
            };
            const timer = setInterval(calculate, 1000);
            calculate();
            return () => clearInterval(timer);
        }, [date, onExpire]);

        return <span className="text-xs font-mono bg-gray-100 px-2 py-1 rounded">{timeLeft}</span>;
    };

    return (
        <div className="w-full px-6">
            <h2 className="text-3xl font-bold mb-8">My Bookings: {bookings.length}</h2>
            
            {/* 3 Column Grid Layout (Requirement 5b) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {bookings.map((item) => {
                    let isExpired = false;
                    const handleExpire = (state) => { isExpired = state; };
                    // Handle both status variations just in case
                    const isAccepted = item.status === 'approved' || item.status === 'accepted';

                    return (
                        <div key={item._id} className="card bg-base-100 shadow-xl border">
                            <figure className="h-40">
                                <img src={item.photo} alt={item.ticketTitle} className="w-full h-full object-cover" />
                            </figure>
                            <div className="card-body p-5">
                                <h2 className="card-title text-lg">
                                    {item.ticketTitle}
                                    <div className={`badge ${item.status === 'paid' ? 'badge-success' : item.status === 'rejected' ? 'badge-error' : 'badge-warning'} text-xs text-white`}>
                                        {item.status}
                                    </div>
                                </h2>

                                <div className="text-sm space-y-1 my-2">
                                    <p><strong>Route:</strong> {item.from} ➝ {item.to}</p>
                                    <p><strong>Qty:</strong> {item.bookingQty}</p>
                                    <p><strong>Total:</strong> ${item.totalPrice}</p>
                                    <p><strong>Date:</strong> {new Date(item.departureDate).toLocaleDateString()}</p>
                                </div>

                                {/* Countdown (Only show if NOT rejected and NOT paid) */}
                                {item.status !== 'rejected' && item.status !== 'paid' && (
                                    <div className="mb-2">
                                        <Countdown date={item.departureDate} onExpire={handleExpire} />
                                    </div>
                                )}

                                <div className="card-actions justify-end mt-2">
                                    {/* Logic: Must be Accepted AND Not Expired to pay */}
                                    {isAccepted && !isExpired ? (
                                        <Link to="/dashboard/payment" state={item} className="w-full">
                                            <button className="btn btn-sm btn-success w-full text-white">Pay Now</button>
                                        </Link>
                                    ) : (
                                        <button className="btn btn-sm btn-disabled w-full">
                                            {item.status === 'paid' ? "Paid" : item.status === 'rejected' ? "Rejected" : "Pending / Expired"}
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default MyBookedTickets;