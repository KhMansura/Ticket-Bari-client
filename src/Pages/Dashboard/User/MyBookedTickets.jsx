
// import { useContext, useEffect, useState } from "react";

// import { AuthContext } from "../../../providers/AuthProviders"; 
// import { Link } from "react-router-dom";
// import useAxiosSecure from "../../../hooks/useAxiosSecure";

// const MyBookedTickets = () => {
//     const { user } = useContext(AuthContext);
//     const [bookings, setBookings] = useState([]);
//     const axiosSecure = useAxiosSecure();

//     useEffect(() => {
//         if (user?.email) {
//             axiosSecure.get(`/bookings?email=${user.email}`)
//             .then(res => setBookings(res.data))
//         }
//     }, [user, axiosSecure]);

//     // Helper component for Countdown inside each card
//     const Countdown = ({ date, onExpire }) => {
//         const [timeLeft, setTimeLeft] = useState("");
        
//         useEffect(() => {
//             const calculate = () => {
//                 const diff = +new Date(date) - +new Date();
//                 if (diff > 0) {
//                     const d = Math.floor(diff / (1000 * 60 * 60 * 24));
//                     const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
//                     const m = Math.floor((diff / 1000 / 60) % 60);
//                     setTimeLeft(`${d}d ${h}h ${m}m`);
//                 } else {
//                     setTimeLeft("Expired");
//                     onExpire(true); 
//                 }
//             };
//             const timer = setInterval(calculate, 1000);
//             calculate();
//             return () => clearInterval(timer);
//         }, [date, onExpire]);

//         return <span className="text-xs font-mono bg-gray-100 px-2 py-1 rounded">{timeLeft}</span>;
//     };

//     return (
//         <div className="w-full px-6">
//             <h2 className="text-3xl font-bold mb-8">My Bookings: {bookings.length}</h2>
            
//             {/* 3 Column Grid Layout (Requirement 5b) */}
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {bookings.map((item) => {
//                     let isExpired = false;
//                     const handleExpire = (state) => { isExpired = state; };
//                     // Handle both status variations just in case
//                     const isAccepted = item.status === 'approved' || item.status === 'accepted';

//                     return (
//                         <div key={item._id} className="card bg-base-100 shadow-xl border">
//                             <figure className="h-40">
//                                 <img src={item.photo} alt={item.ticketTitle} className="w-full h-full object-cover" />
//                             </figure>
//                             <div className="card-body p-5">
//                                 <h2 className="card-title text-lg">
//                                     {item.ticketTitle}
//                                     <div className={`badge ${item.status === 'paid' ? 'badge-success' : item.status === 'rejected' ? 'badge-error' : 'badge-warning'} text-xs text-white`}>
//                                         {item.status}
//                                     </div>
//                                 </h2>

//                                 <div className="text-sm space-y-1 my-2">
//                                     <p><strong>Route:</strong> {item.from} ➝ {item.to}</p>
//                                     <p><strong>Qty:</strong> {item.bookingQty}</p>
//                                     <p><strong>Total:</strong> ${item.totalPrice}</p>
//                                     <p><strong>Date:</strong> {new Date(item.departureDate).toLocaleDateString()}</p>
//                                 </div>

//                                 {/* Countdown (Only show if NOT rejected and NOT paid) */}
//                                 {item.status !== 'rejected' && item.status !== 'paid' && (
//                                     <div className="mb-2">
//                                         <Countdown date={item.departureDate} onExpire={handleExpire} />
//                                     </div>
//                                 )}

//                                 <div className="card-actions justify-end mt-2">
//                                     {/* Logic: Must be Accepted AND Not Expired to pay */}
//                                     {isAccepted && !isExpired ? (
//                                         <Link to="/dashboard/payment" state={item} className="w-full">
//                                             <button className="btn btn-sm btn-success w-full text-white">Pay Now</button>
//                                         </Link>
//                                     ) : (
//                                         <button className="btn btn-sm btn-disabled w-full">
//                                             {item.status === 'paid' ? "Paid" : item.status === 'rejected' ? "Rejected" : "Pending / Expired"}
//                                         </button>
//                                     )}
//                                 </div>
//                             </div>
//                         </div>
//                     );
//                 })}
//             </div>
//         </div>
//     );
// };

// export default MyBookedTickets;
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../providers/AuthProviders"; 
import { Link } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2"; // 1. IMPORT SWAL

const MyBookedTickets = () => {
    const { user } = useContext(AuthContext);
    const [bookings, setBookings] = useState([]);
    const axiosSecure = useAxiosSecure();

    // 2. REFACTOR FETCHING (So we can reload after canceling)
    const fetchBookings = () => {
        if (user?.email) {
            axiosSecure.get(`/bookings?email=${user.email}`)
                .then(res => setBookings(res.data));
        }
    }

    useEffect(() => {
        fetchBookings();
    }, [user, axiosSecure]);

    // 3. ADD CANCEL FUNCTION
    const handleCancel = (id) => {
        Swal.fire({
            title: 'Cancel Booking?',
            text: "Are you sure you want to cancel?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            confirmButtonText: 'Yes, cancel it!'
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/bookings/${id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            Swal.fire('Cancelled!', 'Booking has been cancelled.', 'success');
                            fetchBookings(); // Refresh list
                        }
                    })
                    .catch(error => {
                        Swal.fire('Error', error.response?.data?.message || 'Failed to cancel', 'error');
                    })
            }
        })
    }

    // 4. ADD DOWNLOAD FUNCTION
    const handleDownload = (item) => {
        const printWindow = window.open('', '', 'width=800,height=600');
        printWindow.document.write(`
            <html>
                <head>
                    <title>Ticket - ${item.ticketTitle}</title>
                    <style>
                        body { font-family: sans-serif; text-align: center; padding: 20px; border: 5px solid #ccc; }
                        h1 { color: #2ecc71; }
                        .ticket-info { margin-top: 20px; font-size: 18px; line-height: 1.6; }
                    </style>
                </head>
                <body>
                    <h1>TicketBari Confirmed Ticket</h1>
                    <hr/>
                    <h2>${item.ticketTitle}</h2>
                    <div class="ticket-info">
                        <p><strong>Passenger:</strong> ${user?.displayName}</p>
                        <p><strong>Route:</strong> ${item.from} to ${item.to}</p>
                        <p><strong>Quantity:</strong> ${item.bookingQty}</p>
                        <p><strong>Total Paid:</strong> $${item.totalPrice}</p>
                        <p><strong>Date:</strong> ${new Date(item.departureDate).toLocaleDateString()}</p>
                    </div>
                    <h3>Status: PAID</h3>
                    <script>window.print()</script>
                </body>
            </html>
        `);
        printWindow.document.close();
    }

    // Helper component for Countdown
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
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {bookings.map((item) => {
                    let isExpired = false;
                    const handleExpire = (state) => { isExpired = state; };
                    const isAccepted = item.status === 'approved' || item.status === 'accepted';

                    return (
                        <div key={item._id} className="card bg-base-100 shadow-xl border h-full flex flex-col">
                            <figure className="h-40">
                                <img src={item.photo || "https://i.ibb.co/hR055j5/bus-1.jpg"} alt={item.ticketTitle} className="w-full h-full object-cover" />
                            </figure>
                            <div className="card-body p-5 flex-grow">
                                <h2 className="card-title text-lg justify-between">
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

                                {item.status !== 'rejected' && item.status !== 'paid' && (
                                    <div className="mb-2">
                                        <Countdown date={item.departureDate} onExpire={handleExpire} />
                                    </div>
                                )}

                                {/* --- 5. UPDATED BUTTONS SECTION --- */}
                                <div className="card-actions justify-end mt-auto flex-col gap-2">
                                    
                                    {/* PAY BUTTON */}
                                    {isAccepted && !isExpired && item.status !== 'paid' ? (
                                        <Link to="/dashboard/payment" state={item} className="w-full">
                                            <button className="btn btn-sm btn-success w-full text-white">Pay Now</button>
                                        </Link>
                                    ) : (
                                        item.status !== 'paid' && (
                                            <button className="btn btn-sm btn-disabled w-full">
                                                {item.status === 'rejected' ? "Rejected" : "Pending / Wait"}
                                            </button>
                                        )
                                    )}

                                    {/* CANCEL BUTTON (Only if Pending) */}
                                    {item.status === 'pending' && (
                                        <button 
                                            onClick={() => handleCancel(item._id)} 
                                            className="btn btn-sm btn-outline btn-error w-full">
                                            Cancel
                                        </button>
                                    )}

                                    {/* DOWNLOAD BUTTON (Only if Paid) */}
                                    {item.status === 'paid' && (
                                        <button 
                                            onClick={() => handleDownload(item)} 
                                            className="btn btn-sm btn-primary w-full text-white">
                                            Download Ticket
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