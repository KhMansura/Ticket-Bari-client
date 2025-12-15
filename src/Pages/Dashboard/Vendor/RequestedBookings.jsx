import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../providers/AuthProviders";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const RequestedBookings = () => {
    const { user } = useContext(AuthContext);
    const [bookings, setBookings] = useState([]);
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        if(user?.email){
            axiosSecure.get(`/bookings/vendor?email=${user.email}`)
                .then(res => setBookings(res.data));
        }
    }, [user, axiosSecure]);

    const handleBookingStatus = (id, status) => {
        axiosSecure.patch(`/bookings/status/${id}`, { status })
            .then(res => {
                if(res.data.modifiedCount > 0){
                    Swal.fire('Updated', `Booking ${status}`, 'success');
                    // Refresh 
                    axiosSecure.get(`/bookings/vendor?email=${user.email}`)
                        .then(res => setBookings(res.data));
                }
            })
    }

    return (
        <div className="w-full px-4">
            <h2 className="text-3xl font-bold my-4">Booking Requests: {bookings.length}</h2>
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    <thead>
                        <tr>
                            <th>Customer</th>
                            <th>Ticket</th>
                            <th>Qty</th>
                            <th>Total Price</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings.map(booking => (
                            <tr key={booking._id}>
                                <td>
                                    {booking.customerName}<br/>
                                    <span className="text-xs text-gray-500">{booking.customerEmail}</span>
                                </td>
                                <td>{booking.ticketTitle}</td>
                                <td>{booking.bookingQty}</td>
                                <td>${booking.totalPrice}</td>
                                <td>
                                    <span className={`badge ${booking.status === 'approved' ? 'badge-success' : 'badge-warning'}`}>
                                        {booking.status}
                                    </span>
                                </td>
                                <td>
                                    {booking.status === 'pending' ? (
                                        <div className="flex gap-2">
                                            <button onClick={() => handleBookingStatus(booking._id, 'approved')} className="btn btn-xs btn-success text-white">Accept</button>
                                            <button onClick={() => handleBookingStatus(booking._id, 'rejected')} className="btn btn-xs btn-error text-white">Reject</button>
                                        </div>
                                    ) : (
                                        <span className="text-sm font-bold text-gray-400">Processed</span>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default RequestedBookings;

// import { useContext, useEffect, useState } from "react";
// import { AuthContext } from "../../../providers/AuthProviders";
// import useAxiosSecure from "../../../hooks/useAxiosSecure";
// import Swal from "sweetalert2";
// import { FaCheck, FaTimes, FaUser, FaTicketAlt, FaClock, FaCheckCircle, FaTimesCircle } from "react-icons/fa";

// const RequestedBookings = () => {
//     const { user } = useContext(AuthContext);
//     const [bookings, setBookings] = useState([]);
//     const axiosSecure = useAxiosSecure();

//     useEffect(() => {
//         if(user?.email){
//             axiosSecure.get(`/bookings/vendor?email=${user.email}`)
//                 .then(res => setBookings(res.data));
//         }
//     }, [user, axiosSecure]);

//     const handleBookingStatus = (id, status) => {
//         axiosSecure.patch(`/bookings/status/${id}`, { status })
//             .then(res => {
//                 if(res.data.modifiedCount > 0){
//                     Swal.fire({
//                         title: status === 'approved' ? 'Booking Accepted' : 'Booking Rejected',
//                         text: `The booking status has been updated.`,
//                         icon: status === 'approved' ? 'success' : 'error',
//                         timer: 1500,
//                         showConfirmButton: false
//                     });
//                     // Refresh data
//                     axiosSecure.get(`/bookings/vendor?email=${user.email}`)
//                         .then(res => setBookings(res.data));
//                 }
//             })
//     }

//     return (
//         <div className="w-full max-w-7xl mx-auto px-4 font-poppins">
            
//             {/* Header Section */}
//             <div className="flex flex-col md:flex-row justify-between items-end mb-8 border-b border-gray-200 pb-5">
//                 <div>
//                     <h2 className="text-3xl font-bold text-[#1e3a8a]">Booking Requests</h2>
//                     <p className="text-slate-500 mt-1">Manage incoming booking requests from users.</p>
//                 </div>
//                 <div className="text-right mt-4 md:mt-0">
//                     <span className="text-4xl font-bold text-primary">{bookings.length}</span>
//                     <p className="text-xs uppercase tracking-wider text-gray-400 font-semibold">Total Requests</p>
//                 </div>
//             </div>

//             {/* Professional Table Card */}
//             <div className="bg-white rounded-xl shadow-card overflow-hidden border border-gray-100">
//                 <div className="overflow-x-auto">
//                     <table className="table w-full">
//                         {/* Table Head */}
//                         <thead className="bg-[#F8FAFC] text-slate-500 border-b border-gray-200 uppercase text-xs tracking-wider font-semibold">
//                             <tr>
//                                 <th className="py-4 pl-6">Customer Details</th>
//                                 <th>Ticket Info</th>
//                                 <th className="text-center">Qty</th>
//                                 <th>Total Price</th>
//                                 <th>Current Status</th>
//                                 <th className="text-right pr-6">Actions</th>
//                             </tr>
//                         </thead>
                        
//                         {/* Table Body */}
//                         <tbody className="divide-y divide-gray-50">
//                             {bookings.map(booking => (
//                                 <tr key={booking._id} className="hover:bg-blue-50/30 transition-colors">
                                    
//                                     {/* Customer Column */}
//                                     <td className="pl-6 py-4">
//                                         <div className="flex items-center gap-3">
//                                             <div className="avatar placeholder">
//                                                 <div className="bg-blue-100 text-blue-600 rounded-full w-10 h-10 flex items-center justify-center">
//                                                     <FaUser />
//                                                 </div>
//                                             </div>
//                                             <div>
//                                                 <div className="font-bold text-slate-700">{booking.customerName}</div>
//                                                 <div className="text-xs text-gray-400">{booking.customerEmail}</div>
//                                             </div>
//                                         </div>
//                                     </td>

//                                     {/* Ticket Info Column */}
//                                     <td>
//                                         <div className="flex items-center gap-2 text-slate-600 font-medium">
//                                             <FaTicketAlt className="text-gray-300" />
//                                             {booking.ticketTitle}
//                                         </div>
//                                     </td>

//                                     {/* Qty Column */}
//                                     <td className="text-center font-semibold text-slate-600">
//                                         {booking.bookingQty}
//                                     </td>

//                                     {/* Price Column */}
//                                     <td className="font-bold text-[#1e3a8a]">
//                                         ${booking.totalPrice}
//                                     </td>

//                                     {/* Status Column */}
//                                     <td>
//                                         {booking.status === 'pending' ? (
//                                             <div className="badge badge-warning gap-2 text-white font-bold text-xs py-3 px-3 shadow-sm">
//                                                 <FaClock /> Pending
//                                             </div>
//                                         ) : booking.status === 'approved' ? (
//                                             <div className="badge badge-success gap-2 text-white font-bold text-xs py-3 px-3 shadow-sm">
//                                                 <FaCheckCircle /> Approved
//                                             </div>
//                                         ) : (
//                                             <div className="badge badge-error gap-2 text-white font-bold text-xs py-3 px-3 shadow-sm">
//                                                 <FaTimesCircle /> Rejected
//                                             </div>
//                                         )}
//                                     </td>

//                                     {/* Actions Column */}
//                                     <td className="text-right pr-6">
//                                         {booking.status === 'pending' ? (
//                                             <div className="flex gap-2 justify-end">
//                                                 <button 
//                                                     onClick={() => handleBookingStatus(booking._id, 'approved')} 
//                                                     className="btn btn-sm btn-success text-white shadow-md hover:scale-105 transition-transform"
//                                                     title="Accept Booking"
//                                                 >
//                                                     <FaCheck /> Accept
//                                                 </button>
//                                                 <button 
//                                                     onClick={() => handleBookingStatus(booking._id, 'rejected')} 
//                                                     className="btn btn-sm btn-error text-white shadow-md hover:scale-105 transition-transform"
//                                                     title="Reject Booking"
//                                                 >
//                                                     <FaTimes /> Reject
//                                                 </button>
//                                             </div>
//                                         ) : (
//                                             <span className="text-xs font-bold text-gray-400 uppercase tracking-wide">
//                                                 Processed
//                                             </span>
//                                         )}
//                                     </td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>

//                     {/* Empty State */}
//                     {bookings.length === 0 && (
//                         <div className="text-center py-16 bg-white">
//                             <div className="text-5xl mb-4 text-gray-200">📭</div>
//                             <h3 className="text-lg font-bold text-gray-400">No booking requests found</h3>
//                             <p className="text-gray-400 text-sm">New requests will appear here.</p>
//                         </div>
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default RequestedBookings;