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

// import { useContext, useEffect, useState } from "react";
// import { AuthContext } from "../../../providers/AuthProviders"; 
// import { Link } from "react-router-dom";
// import useAxiosSecure from "../../../hooks/useAxiosSecure";
// import Swal from "sweetalert2"; // 1. IMPORT SWAL

// const MyBookedTickets = () => {
//     const { user } = useContext(AuthContext);
//     const [bookings, setBookings] = useState([]);
//     const axiosSecure = useAxiosSecure();

//     // 2. REFACTOR FETCHING (So we can reload after canceling)
//     const fetchBookings = () => {
//         if (user?.email) {
//             axiosSecure.get(`/bookings?email=${user.email}`)
//                 .then(res => setBookings(res.data));
//         }
//     }

//     useEffect(() => {
//         fetchBookings();
//     }, [user, axiosSecure]);

//     // 3. ADD CANCEL FUNCTION
//     const handleCancel = (id) => {
//         Swal.fire({
//             title: 'Cancel Booking?',
//             text: "Are you sure you want to cancel?",
//             icon: 'warning',
//             showCancelButton: true,
//             confirmButtonColor: '#d33',
//             confirmButtonText: 'Yes, cancel it!'
//         }).then((result) => {
//             if (result.isConfirmed) {
//                 axiosSecure.delete(`/bookings/${id}`)
//                     .then(res => {
//                         if (res.data.deletedCount > 0) {
//                             Swal.fire('Cancelled!', 'Booking has been cancelled.', 'success');
//                             fetchBookings(); // Refresh list
//                         }
//                     })
//                     .catch(error => {
//                         Swal.fire('Error', error.response?.data?.message || 'Failed to cancel', 'error');
//                     })
//             }
//         })
//     }

//     // 4. ADD DOWNLOAD FUNCTION
//     const handleDownload = (item) => {
//         const printWindow = window.open('', '', 'width=800,height=600');
//         printWindow.document.write(`
//             <html>
//                 <head>
//                     <title>Ticket - ${item.ticketTitle}</title>
//                     <style>
//                         body { font-family: sans-serif; text-align: center; padding: 20px; border: 5px solid #ccc; }
//                         h1 { color: #2ecc71; }
//                         .ticket-info { margin-top: 20px; font-size: 18px; line-height: 1.6; }
//                     </style>
//                 </head>
//                 <body>
//                     <h1>TicketBari Confirmed Ticket</h1>
//                     <hr/>
//                     <h2>${item.ticketTitle}</h2>
//                     <div class="ticket-info">
//                         <p><strong>Passenger:</strong> ${user?.displayName}</p>
//                         <p><strong>Route:</strong> ${item.from} to ${item.to}</p>
//                         <p><strong>Quantity:</strong> ${item.bookingQty}</p>
//                         <p><strong>Total Paid:</strong> $${item.totalPrice}</p>
//                         <p><strong>Date:</strong> ${new Date(item.departureDate).toLocaleDateString()}</p>
//                     </div>
//                     <h3>Status: PAID</h3>
//                     <script>window.print()</script>
//                 </body>
//             </html>
//         `);
//         printWindow.document.close();
//     }

//     // Helper component for Countdown
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
            
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {bookings.map((item) => {
//                     let isExpired = false;
//                     const handleExpire = (state) => { isExpired = state; };
//                     const isAccepted = item.status === 'approved' || item.status === 'accepted';

//                     return (
//                         <div key={item._id} className="card bg-base-100 shadow-xl border h-full flex flex-col">
//                             <figure className="h-40">
//                                 <img src={item.photo || "https://i.ibb.co/hR055j5/bus-1.jpg"} alt={item.ticketTitle} className="w-full h-full object-cover" />
//                             </figure>
//                             <div className="card-body p-5 flex-grow">
//                                 <h2 className="card-title text-lg justify-between">
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

//                                 {item.status !== 'rejected' && item.status !== 'paid' && (
//                                     <div className="mb-2">
//                                         <Countdown date={item.departureDate} onExpire={handleExpire} />
//                                     </div>
//                                 )}

//                                 {/* --- 5. UPDATED BUTTONS SECTION --- */}
//                                 <div className="card-actions justify-end mt-auto flex-col gap-2">
                                    
//                                     {/* PAY BUTTON */}
//                                     {isAccepted && !isExpired && item.status !== 'paid' ? (
//                                         <Link to="/dashboard/payment" state={item} className="w-full">
//                                             <button className="btn btn-sm btn-success w-full text-white">Pay Now</button>
//                                         </Link>
//                                     ) : (
//                                         item.status !== 'paid' && (
//                                             <button className="btn btn-sm btn-disabled w-full">
//                                                 {item.status === 'rejected' ? "Rejected" : "Pending / Wait"}
//                                             </button>
//                                         )
//                                     )}

//                                     {/* CANCEL BUTTON (Only if Pending) */}
//                                     {item.status === 'pending' && (
//                                         <button 
//                                             onClick={() => handleCancel(item._id)} 
//                                             className="btn btn-sm btn-outline btn-error w-full">
//                                             Cancel
//                                         </button>
//                                     )}

//                                     {/* DOWNLOAD BUTTON (Only if Paid) */}
//                                     {item.status === 'paid' && (
//                                         <button 
//                                             onClick={() => handleDownload(item)} 
//                                             className="btn btn-sm btn-primary w-full text-white">
//                                             Download Ticket
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
import Swal from "sweetalert2";
import { FaMapMarkerAlt, FaCalendarAlt, FaTicketAlt, FaMoneyBillWave, FaClock, FaDownload, FaCreditCard, FaBan } from "react-icons/fa";

const MyBookedTickets = () => {
    const { user } = useContext(AuthContext);
    const [bookings, setBookings] = useState([]);
    const axiosSecure = useAxiosSecure();

    // 2. REFACTOR FETCHING
    const fetchBookings = () => {
        if (user?.email) {
            axiosSecure.get(`/bookings?email=${user.email}`)
                .then(res => setBookings(res.data));
        }
    }

    useEffect(() => {
        fetchBookings();
    }, [user, axiosSecure]);

    // 3. CANCEL FUNCTION
    const handleCancel = (id) => {
        Swal.fire({
            title: 'Cancel Booking?',
            text: "Are you sure you want to cancel this trip?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, cancel it!'
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/bookings/${id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            Swal.fire('Cancelled!', 'Your booking has been cancelled.', 'success');
                            fetchBookings(); 
                        }
                    })
                    .catch(error => {
                        Swal.fire('Error', error.response?.data?.message || 'Failed to cancel', 'error');
                    })
            }
        })
    }

    // 4. DOWNLOAD FUNCTION (Professional Invoice Style)
    const handleDownload = (item) => {
        const printWindow = window.open('', '', 'width=800,height=600');
        printWindow.document.write(`
            <html>
                <head>
                    <title>Ticket - ${item.ticketTitle}</title>
                    <style>
                        body { font-family: 'Helvetica', sans-serif; padding: 40px; color: #333; }
                        .header { text-align: center; margin-bottom: 30px; border-bottom: 2px solid #2563EB; padding-bottom: 20px; }
                        .logo { color: #2563EB; font-size: 28px; font-weight: bold; }
                        .ticket-box { border: 1px solid #ddd; padding: 20px; border-radius: 8px; background: #f9f9f9; }
                        h2 { color: #1e3a8a; margin-top: 0; }
                        .row { display: flex; justify-content: space-between; margin-bottom: 10px; border-bottom: 1px dashed #ccc; padding-bottom: 5px; }
                        .label { font-weight: bold; color: #666; }
                        .status { color: #16a34a; font-weight: bold; border: 2px solid #16a34a; display: inline-block; padding: 5px 15px; border-radius: 4px; margin-top: 10px; }
                        .footer { margin-top: 30px; text-align: center; font-size: 12px; color: #999; }
                    </style>
                </head>
                <body>
                    <div class="header">
                        <div class="logo">TicketBari</div>
                        <p>Official E-Ticket</p>
                    </div>
                    <div class="ticket-box">
                        <h2>${item.ticketTitle}</h2>
                        <div class="row"><span class="label">Passenger:</span> <span>${user?.displayName}</span></div>
                        <div class="row"><span class="label">From:</span> <span>${item.from}</span></div>
                        <div class="row"><span class="label">To:</span> <span>${item.to}</span></div>
                        <div class="row"><span class="label">Quantity:</span> <span>${item.bookingQty}</span></div>
                        <div class="row"><span class="label">Total Paid:</span> <span>$${item.totalPrice}</span></div>
                        <div class="row"><span class="label">Departure:</span> <span>${new Date(item.departureDate).toLocaleString()}</span></div>
                        <div style="text-align:center; margin-top:20px;">
                            <span class="status">PAID & CONFIRMED</span>
                        </div>
                    </div>
                    <div class="footer">
                        Please show this ticket at the counter. Safe Travels!
                    </div>
                    <script>window.print()</script>
                </body>
            </html>
        `);
        printWindow.document.close();
    }

    // Helper: Countdown Component
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

        return (
            <div className="flex items-center gap-2 text-red-500 bg-red-50 px-3 py-1 rounded-md text-xs font-bold border border-red-100">
                <FaClock /> {timeLeft}
            </div>
        );
    };

    return (
        <div className="w-full max-w-7xl mx-auto">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-end mb-8 border-b border-gray-200 pb-5">
                <div>
                    <h2 className="text-3xl font-bold text-[#1e3a8a]">My Bookings</h2>
                    <p className="text-slate-500 mt-1">Manage your upcoming trips and tickets</p>
                </div>
                <div className="text-right mt-4 md:mt-0">
                    <span className="text-4xl font-bold text-primary">{bookings.length}</span>
                    <p className="text-xs uppercase tracking-wider text-gray-400 font-semibold">Total Tickets</p>
                </div>
            </div>
            
            {/* Grid Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {bookings.map((item) => {
                    let isExpired = false;
                    const handleExpire = (state) => { isExpired = state; };
                    const isAccepted = item.status === 'approved' || item.status === 'accepted';

                    // Status Badge Logic
                    const getStatusBadge = (status) => {
                        switch(status) {
                            case 'paid': return 'badge-success text-white';
                            case 'rejected': return 'badge-error text-white';
                            case 'approved': 
                            case 'accepted': return 'badge-info text-white';
                            default: return 'badge-warning text-white';
                        }
                    };

                    return (
                        <div key={item._id} className="card bg-base-100 shadow-card border border-gray-100 hover:shadow-xl transition-all duration-300 flex flex-col h-full overflow-hidden group">
                            
                            {/* Card Image Header */}
                            <figure className="h-44 relative">
                                <img src={item.photo || "https://i.ibb.co/hR055j5/bus-1.jpg"} alt={item.ticketTitle} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                                <div className="absolute top-3 right-3">
                                    <div className={`badge ${getStatusBadge(item.status)} uppercase font-bold shadow-sm p-3`}>
                                        {item.status}
                                    </div>
                                </div>
                            </figure>

                            {/* Card Content */}
                            <div className="p-6 flex-grow flex flex-col">
                                <h2 className="text-xl font-bold text-[#1e3a8a] mb-4 line-clamp-1" title={item.ticketTitle}>
                                    {item.ticketTitle}
                                </h2>

                                <div className="space-y-3 text-sm text-gray-600 flex-grow">
                                    <div className="flex items-start gap-3">
                                        <FaMapMarkerAlt className="text-primary mt-1" />
                                        <div>
                                            <span className="font-semibold text-gray-800">{item.from}</span>
                                            <span className="mx-2 text-gray-400">➝</span>
                                            <span className="font-semibold text-gray-800">{item.to}</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <FaCalendarAlt className="text-primary" />
                                        <span>{new Date(item.departureDate).toLocaleDateString(undefined, { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })}</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <FaTicketAlt className="text-primary" />
                                        <span>Qty: <strong>{item.bookingQty}</strong></span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <FaMoneyBillWave className="text-primary" />
                                        <span>Total: <strong className="text-green-600 text-lg">${item.totalPrice}</strong></span>
                                    </div>
                                </div>

                                {/* Countdown Section */}
                                {item.status !== 'rejected' && item.status !== 'paid' && (
                                    <div className="mt-4 pt-4 border-t border-dashed border-gray-200">
                                        <div className="flex justify-between items-center">
                                            <span className="text-xs text-gray-400 font-semibold uppercase">Time to Depart:</span>
                                            <Countdown date={item.departureDate} onExpire={handleExpire} />
                                        </div>
                                    </div>
                                )}

                                {/* Action Buttons */}
                                <div className="mt-6 pt-4 border-t border-gray-100 grid gap-2">
                                    
                                    {/* PAY BUTTON */}
                                    {isAccepted && !isExpired && item.status !== 'paid' ? (
                                        <Link to="/dashboard/payment" state={item} className="w-full">
                                            <button className="btn btn-primary w-full shadow-lg shadow-blue-100 animate-pulse">
                                                <FaCreditCard /> Pay Now
                                            </button>
                                        </Link>
                                    ) : (
                                        item.status !== 'paid' && (
                                            <button className="btn btn-disabled w-full bg-gray-100 text-gray-400 border-none">
                                                {item.status === 'rejected' ? "Booking Rejected" : "Awaiting Approval"}
                                            </button>
                                        )
                                    )}

                                    {/* CANCEL BUTTON (Only if Pending) */}
                                    {item.status === 'pending' && (
                                        <button 
                                            onClick={() => handleCancel(item._id)} 
                                            className="btn btn-outline btn-error w-full hover:bg-red-50">
                                            <FaBan /> Cancel Request
                                        </button>
                                    )}

                                    {/* DOWNLOAD BUTTON (Only if Paid) */}
                                    {item.status === 'paid' && (
                                        <button 
                                            onClick={() => handleDownload(item)} 
                                            className="btn btn-primary w-full">
                                            <FaDownload /> Download Ticket
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
            
            {/* Empty State */}
            {bookings.length === 0 && (
                <div className="text-center py-20 bg-white rounded-xl shadow-sm border border-dashed border-gray-300">
                    <div className="text-6xl mb-4 opacity-20">🎫</div>
                    <h3 className="text-xl font-bold text-gray-400">No bookings yet</h3>
                    <Link to="/all-tickets" className="btn btn-link no-underline text-primary mt-2">Browse Tickets</Link>
                </div>
            )}
        </div>
    );
};

export default MyBookedTickets;