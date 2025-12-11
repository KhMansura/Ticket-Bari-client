// import { useContext, useEffect, useState } from "react";
// import { AuthContext } from "../../../providers/AuthProviders";
// import Swal from "sweetalert2";
// // import { FaTrash, FaEdit } from "react-icons/fa";
// import useAxiosSecure from "../../../hooks/useAxiosSecure";
// import { Link } from "react-router";

// const MyAddedTickets = () => {
//     const { user } = useContext(AuthContext);
//     const [tickets, setTickets] = useState([]);
//     const axiosSecure = useAxiosSecure();

//     useEffect(() => {
//         if (user?.email) {
//             fetchMyTickets();
//         }
//     }, [user]);

//     const fetchMyTickets = () => {
//         axiosSecure.get(`/tickets/vendor/${user.email}`)
//             .then(res => setTickets(res.data))
//             .catch(err => console.error(err));
//     }

//     const handleDelete = (id) => {
//         Swal.fire({
//             title: 'Are you sure?',
//             text: "You won't be able to revert this!",
//             icon: 'warning',
//             showCancelButton: true,
//             confirmButtonColor: '#3085d6',
//             cancelButtonColor: '#d33',
//             confirmButtonText: 'Yes, delete it!'
//         }).then((result) => {
//             if (result.isConfirmed) {
//                 axiosSecure.delete(`/tickets/${id}`)
//                     .then(res => {
//                         if (res.data.deletedCount > 0) {
//                             Swal.fire('Deleted!', 'Your ticket has been deleted.', 'success');
//                             fetchMyTickets();
//                         }
//                     })
//             }
//         })
//     }

//     return (
//         <div className="w-full px-10">
//             <h2 className="text-3xl font-bold my-4">My Added Tickets: {tickets.length}</h2>
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {tickets.map(ticket => (
//                     <div key={ticket._id} className="card bg-base-100 shadow-xl border">
//                         <figure className="h-40">
//                             <img src={ticket.photo} alt={ticket.title} className="w-full h-full object-cover" />
//                         </figure>
//                         <div className="card-body p-4">
//                             <h2 className="card-title text-lg">{ticket.title}</h2>
//                             <p className="text-sm">Price: ${ticket.price}</p>
//                             <p className="text-sm">Route: {ticket.from} ➝ {ticket.to}</p>
                            
//                             {/* Verification Status Badge */}
//                             <div className={`badge ${ticket.verificationStatus === 'approved' ? 'badge-success' : ticket.verificationStatus === 'rejected' ? 'badge-error' : 'badge-warning'} gap-2 text-white`}>
//                                 {ticket.verificationStatus || 'pending'}
//                             </div>

//                             {/* --- BUTTONS --- */}
//                             <div className="card-actions justify-end mt-4 flex gap-2">
//                     {ticket.verificationStatus === 'rejected' ? (
//                                     // 1. If Rejected: Show a PLAIN DISABLED BUTTON (No Link)
//                                     <button 
//                                         disabled 
//                                         className="btn btn-sm btn-info text-white opacity-50 cursor-not-allowed">
//                                         Update
//                                     </button>
//                                 ) : (
//                                     // 2. If Active: Wrap in Link
//                                     <Link to={`/dashboard/update-ticket/${ticket._id}`}>
//                                         <button className="btn btn-sm btn-info text-white">
//                                             Update
//                                         </button>
//                                     </Link>
//                                 )}

//                                 <button 
//                                     disabled={ticket.verificationStatus === 'rejected'} 
//                                     onClick={() => handleDelete(ticket._id)}
//                                     className="btn btn-sm btn-error text-white">
//                                     Delete
//                                 </button>
//                             </div>
//                             {/* --------------------------- */}
                            
//                         </div>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default MyAddedTickets;

// import { useContext, useEffect, useState } from "react";
// import { AuthContext } from "../../../providers/AuthProviders";
// import Swal from "sweetalert2";
// import useAxiosSecure from "../../../hooks/useAxiosSecure";
// import { Link } from "react-router-dom";

// const MyAddedTickets = () => {
//     const { user } = useContext(AuthContext);
//     const [tickets, setTickets] = useState([]);
//     const axiosSecure = useAxiosSecure();

//     useEffect(() => {
//         if (user?.email) {
//             fetchMyTickets();
//         }
//     }, [user]);

//     const fetchMyTickets = () => {
//         axiosSecure.get(`/tickets/vendor/${user.email}`)
//             .then(res => setTickets(res.data))
//             .catch(err => console.error(err));
//     }

//     const handleDelete = (id) => {
//         Swal.fire({
//             title: 'Are you sure?',
//             text: "You won't be able to revert this!",
//             icon: 'warning',
//             showCancelButton: true,
//             confirmButtonColor: '#3085d6',
//             cancelButtonColor: '#d33',
//             confirmButtonText: 'Yes, delete it!'
//         }).then((result) => {
//             if (result.isConfirmed) {
//                 axiosSecure.delete(`/tickets/${id}`)
//                     .then(res => {
//                         if (res.data.deletedCount > 0) {
//                             Swal.fire('Deleted!', 'Your ticket has been deleted.', 'success');
//                             fetchMyTickets();
//                         }
//                     })
//             }
//         })
//     }

//     return (
//         <div className="w-full px-10">
//             <h2 className="text-3xl font-bold my-4">My Added Tickets: {tickets.length}</h2>
            
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {tickets.map(ticket => (
//                     // 1. CARD CONTAINER: Added 'h-full flex flex-col justify-between' for equal height
//                     <div key={ticket._id} className="card bg-base-100 shadow-xl border h-full flex flex-col justify-between">
                        
//                         {/* 2. IMAGE SECTION: Fixed height and object-cover */}
//                         <figure className="h-48 w-full">
//                             <img src={ticket.photo} alt={ticket.title} className="w-full h-full object-cover" />
//                         </figure>

//                         {/* 3. BODY SECTION: Added 'flex-grow' to push buttons to the bottom */}
//                         <div className="card-body p-4 flex-grow">
//                             <h2 className="card-title text-lg">{ticket.title}</h2>
//                             <p className="text-sm">Price: ${ticket.price}</p>
//                             <p className="text-sm">Route: {ticket.from} ➝ {ticket.to}</p>
                            
//                             {/* Verification Status Badge */}
//                             <div className={`badge ${ticket.verificationStatus === 'approved' ? 'badge-success' : ticket.verificationStatus === 'rejected' ? 'badge-error' : 'badge-warning'} gap-2 text-white`}>
//                                 {ticket.verificationStatus || 'pending'}
//                             </div>
//                         </div>

//                         {/* 4. ACTIONS SECTION: Added 'mt-auto' to stick to bottom */}
//                         <div className="card-actions justify-end p-4 mt-auto flex gap-2">
                            
//                             {/* Logic: If Rejected, show disabled button. If Active, show Link. */}
//                             {ticket.verificationStatus === 'rejected' ? (
//                                 <button 
//                                     disabled 
//                                     className="btn btn-sm btn-info text-white opacity-50 cursor-not-allowed">
//                                     Update
//                                 </button>
//                             ) : (
//                                 <Link to={`/dashboard/update-ticket/${ticket._id}`}>
//                                     <button className="btn btn-sm btn-info text-white">
//                                         Update
//                                     </button>
//                                 </Link>
//                             )}

//                             <button 
//                                 disabled={ticket.verificationStatus === 'rejected'} 
//                                 onClick={() => handleDelete(ticket._id)}
//                                 className="btn btn-sm btn-error text-white">
//                                 Delete
//                             </button>
//                         </div>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default MyAddedTickets;

import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../providers/AuthProviders";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Link } from "react-router-dom";
import { FaTrash, FaEdit, FaMapMarkerAlt, FaMoneyBillWave, FaClock } from "react-icons/fa";

const MyAddedTickets = () => {
    const { user } = useContext(AuthContext);
    const [tickets, setTickets] = useState([]);
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        if (user?.email) {
            fetchMyTickets();
        }
    }, [user]);

    const fetchMyTickets = () => {
        axiosSecure.get(`/tickets/vendor/${user.email}`)
            .then(res => setTickets(res.data))
            .catch(err => console.error(err));
    }

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Delete Ticket?',
            text: "This action cannot be undone!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/tickets/${id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            Swal.fire('Deleted!', 'Your ticket has been removed.', 'success');
                            fetchMyTickets();
                        }
                    })
            }
        })
    }

    // Helper for Status Badge Color
    const getStatusColor = (status) => {
        switch(status) {
            case 'approved': return 'badge-success text-white';
            case 'rejected': return 'badge-error text-white';
            default: return 'badge-warning text-white';
        }
    };

    return (
        <div className="w-full max-w-7xl mx-auto px-4 font-poppins">
            
            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-end mb-8 border-b border-gray-200 pb-5">
                <div>
                    <h2 className="text-3xl font-bold text-[#1e3a8a]">Inventory Management</h2>
                    <p className="text-slate-500 mt-1">Manage your fleet and ticket listings.</p>
                </div>
                <div className="text-right mt-4 md:mt-0">
                    <Link to="/dashboard/add-ticket">
                        <button className="btn btn-primary btn-sm shadow-md">
                            + Add New Ticket
                        </button>
                    </Link>
                    <p className="text-xs uppercase tracking-wider text-gray-400 font-semibold mt-2">Total: {tickets.length} Items</p>
                </div>
            </div>
            
            {/* Grid Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {tickets.map(ticket => (
                    <div key={ticket._id} className="card bg-base-100 shadow-card border border-gray-100 hover:shadow-xl transition-all duration-300 flex flex-col h-full group overflow-hidden">
                        
                        {/* Image Header with Status Overlay */}
                        <figure className="h-48 relative">
                            <img src={ticket.photo} alt={ticket.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                            <div className="absolute top-3 right-3">
                                <div className={`badge ${getStatusColor(ticket.verificationStatus)} uppercase font-bold shadow-sm p-3`}>
                                    {ticket.verificationStatus || 'pending'}
                                </div>
                            </div>
                        </figure>

                        {/* Card Body */}
                        <div className="p-6 flex-grow flex flex-col">
                            <h2 className="text-lg font-bold text-[#1e3a8a] mb-3 line-clamp-1" title={ticket.title}>
                                {ticket.title}
                            </h2>

                            <div className="space-y-3 text-sm text-gray-600 flex-grow">
                                <div className="flex items-center justify-between bg-base-200 p-2 rounded-lg">
                                    <div className="flex items-center gap-2">
                                        <FaMoneyBillWave className="text-green-600" />
                                        <span className="font-bold text-slate-700">${ticket.price}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <FaClock className="text-primary" />
                                        <span className="text-xs font-semibold">
                                            {new Date(ticket.departureTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                                        </span>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3 mt-4">
                                    <FaMapMarkerAlt className="text-primary mt-1" />
                                    <div>
                                        <span className="font-semibold text-gray-800">{ticket.from}</span>
                                        <span className="mx-2 text-gray-400">➝</span>
                                        <span className="font-semibold text-gray-800">{ticket.to}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="mt-6 pt-4 border-t border-gray-100 grid grid-cols-2 gap-3">
                                {ticket.verificationStatus === 'rejected' ? (
                                    <button disabled className="btn btn-sm btn-disabled w-full bg-gray-100 text-gray-400 border-none">
                                        <FaEdit /> Update
                                    </button>
                                ) : (
                                    <Link to={`/dashboard/update-ticket/${ticket._id}`} className="w-full">
                                        <button className="btn btn-sm btn-info text-white w-full shadow-sm hover:bg-info/90">
                                            <FaEdit /> Update
                                        </button>
                                    </Link>
                                )}

                                <button 
                                    disabled={ticket.verificationStatus === 'rejected'} 
                                    onClick={() => handleDelete(ticket._id)}
                                    className="btn btn-sm btn-error text-white w-full shadow-sm hover:bg-error/90 disabled:bg-gray-200 disabled:text-gray-400">
                                    <FaTrash /> Delete
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Empty State */}
            {tickets.length === 0 && (
                <div className="text-center py-20 bg-white rounded-xl shadow-sm border border-dashed border-gray-300">
                    <div className="text-6xl mb-4 opacity-20">📦</div>
                    <h3 className="text-xl font-bold text-gray-400">No tickets added yet</h3>
                    <Link to="/dashboard/add-ticket" className="btn btn-link no-underline text-primary mt-2">Add Your First Ticket</Link>
                </div>
            )}
        </div>
    );
};

export default MyAddedTickets;

