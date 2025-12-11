// import { useState, useEffect } from "react";
// import useAxiosSecure from "../../../hooks/useAxiosSecure";
// import Swal from "sweetalert2";
// import { FaCheck, FaTimes, FaUndo } from "react-icons/fa";

// const ManageTickets = () => {
//     const [tickets, setTickets] = useState([]);
//     const [loading, setLoading] = useState(true); // Added Loading State (Requirement: Additional)
//     const axiosSecure = useAxiosSecure();

//     useEffect(() => {
//         fetchTickets();
//     }, []);

//     const fetchTickets = () => {
//         setLoading(true);
//         axiosSecure.get('/tickets') 
//             .then(res => {
//                 setTickets(res.data);
//                 setLoading(false);
//             })
//             .catch(() => setLoading(false));
//     };

//     const handleStatus = (ticket, status) => {
//         axiosSecure.patch(`/tickets/status/${ticket._id}`, { status })
//             .then(res => {
//                 if(res.data.modifiedCount > 0){
//                     Swal.fire('Success', `Ticket ${status}!`, 'success');
//                     fetchTickets();
//                 }
//             })
//     };

//     // Requirement: Show loading spinner
//     if (loading) {
//         return (
//             <div className="flex justify-center items-center h-screen">
//                 <span className="loading loading-spinner loading-lg text-primary"></span>
//             </div>
//         );
//     }

//     return (
//         <div className="w-full px-10">
//             <h2 className="text-3xl font-bold my-4">Manage Tickets: {tickets.length}</h2>
//             <div className="overflow-x-auto">
//                 <table className="table table-zebra w-full">
//                     <thead className="bg-base-200">
//                         <tr>
//                             <th>Image</th>
//                             <th>Title</th>
//                             <th>Vendor</th>
//                             <th>Status</th>
//                             <th>Actions</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {tickets.map(ticket => (
//                             <tr key={ticket._id}>
//                                 <td>
//                                     <div className="avatar">
//                                         <div className="mask mask-squircle w-12 h-12">
//                                             <img src={ticket.photo} alt="Ticket" />
//                                         </div>
//                                     </div>
//                                 </td>
//                                 <td>{ticket.title}</td>
//                                 <td>{ticket.vendorEmail}</td>
//                                 <td>
//                                     <span className={`badge font-bold text-white p-3
//                                         ${ticket.verificationStatus === 'approved' ? 'badge-success' : 
//                                           ticket.verificationStatus === 'rejected' ? 'badge-error' : 'badge-warning'}`}>
//                                         {ticket.verificationStatus || 'pending'}
//                                     </span>
//                                 </td>
//                                 <td className="flex gap-2">
//                                     {/* 1. Approve Button (Requirement 7b) */}
//                                     {ticket.verificationStatus !== 'approved' && (
//                                         <button 
//                                             onClick={() => handleStatus(ticket, 'approved')} 
//                                             className="btn btn-xs btn-success text-white"
//                                             title="Approve">
//                                             <FaCheck /> Approve
//                                         </button>
//                                     )}
                                    
//                                     {/* 2. Reject Button (Requirement 7b) */}
//                                     {ticket.verificationStatus !== 'rejected' && (
//                                         <button 
//                                             onClick={() => handleStatus(ticket, 'rejected')} 
//                                             className="btn btn-xs btn-error text-white"
//                                             title="Reject">
//                                             <FaTimes /> Reject
//                                         </button>
//                                     )}

//                                     {/* Optional Undo Button (For fixing mistakes) */}
//                                     {ticket.verificationStatus && ticket.verificationStatus !== 'pending' && (
//                                         <button 
//                                             onClick={() => handleStatus(ticket, 'pending')} 
//                                             className="btn btn-xs btn-neutral text-white"
//                                             title="Reset to Pending">
//                                             <FaUndo /> Undo
//                                         </button>
//                                     )}
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     );
// };

// export default ManageTickets;

import { useState, useEffect } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { FaCheck, FaTimes, FaUndo, FaTicketAlt, FaClock, FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const ManageTickets = () => {
    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(true);
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        fetchTickets();
    }, []);

    const fetchTickets = () => {
        setLoading(true);
        axiosSecure.get('/tickets') 
            .then(res => {
                setTickets(res.data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    };

    const handleStatus = (ticket, status) => {
        axiosSecure.patch(`/tickets/status/${ticket._id}`, { status })
            .then(res => {
                if(res.data.modifiedCount > 0){
                    Swal.fire({
                        title: status === 'approved' ? 'Ticket Approved' : 'Ticket Rejected',
                        text: `The status has been updated successfully.`,
                        icon: status === 'approved' ? 'success' : 'warning',
                        timer: 1500,
                        showConfirmButton: false
                    });
                    fetchTickets();
                }
            })
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen bg-base-200">
                <span className="loading loading-spinner loading-lg text-primary"></span>
            </div>
        );
    }

    return (
        <div className="w-full max-w-7xl mx-auto px-4 font-poppins">
            
            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-end mb-8 border-b border-gray-200 pb-5">
                <div>
                    <h2 className="text-3xl font-bold text-[#1e3a8a] flex items-center gap-3">
                        <FaTicketAlt /> Ticket Management
                    </h2>
                    <p className="text-slate-500 mt-1">Review and approve vendor tickets.</p>
                </div>
                <div className="text-right mt-4 md:mt-0">
                    <span className="text-4xl font-bold text-primary">{tickets.length}</span>
                    <p className="text-xs uppercase tracking-wider text-gray-400 font-semibold">Total Tickets</p>
                </div>
            </div>

            {/* Professional Table Card */}
            <div className="bg-white rounded-xl shadow-card overflow-hidden border border-gray-100">
                <div className="overflow-x-auto">
                    <table className="table w-full">
                        {/* Table Head */}
                        <thead className="bg-[#F8FAFC] text-slate-500 border-b border-gray-200 uppercase text-xs tracking-wider">
                            <tr>
                                <th className="py-4 pl-6">Ticket Preview</th>
                                <th>Details</th>
                                <th>Vendor Info</th>
                                <th>Status</th>
                                <th className="text-right pr-6">Moderation</th>
                            </tr>
                        </thead>
                        
                        {/* Table Body */}
                        <tbody className="divide-y divide-gray-50">
                            {tickets.map(ticket => (
                                <tr key={ticket._id} className="hover:bg-blue-50/30 transition-colors">
                                    
                                    {/* Image Column */}
                                    <td className="pl-6 py-4">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-16 h-16 bg-gray-100 border border-gray-200">
                                                <img src={ticket.photo} alt="Ticket" className="object-cover" />
                                            </div>
                                        </div>
                                    </td>

                                    {/* Details Column */}
                                    <td>
                                        <div className="font-bold text-slate-700">{ticket.title}</div>
                                        <div className="text-xs text-gray-400 mt-1">
                                            Route: {ticket.from} ➝ {ticket.to}
                                        </div>
                                    </td>

                                    {/* Vendor Column */}
                                    <td className="text-sm font-medium text-slate-600">
                                        {ticket.vendorEmail}
                                    </td>

                                    {/* Status Column */}
                                    <td>
                                        {ticket.verificationStatus === 'approved' ? (
                                            <div className="badge badge-success gap-2 text-white font-bold text-xs py-3 px-3 shadow-sm">
                                                <FaCheckCircle /> Live
                                            </div>
                                        ) : ticket.verificationStatus === 'rejected' ? (
                                            <div className="badge badge-error gap-2 text-white font-bold text-xs py-3 px-3 shadow-sm">
                                                <FaTimesCircle /> Rejected
                                            </div>
                                        ) : (
                                            <div className="badge badge-warning gap-2 text-white font-bold text-xs py-3 px-3 shadow-sm">
                                                <FaClock /> Review
                                            </div>
                                        )}
                                    </td>

                                    {/* Actions Column */}
                                    <td className="text-right pr-6">
                                        <div className="flex justify-end gap-2">
                                            
                                            {/* Approve Button */}
                                            {ticket.verificationStatus !== 'approved' && (
                                                <button 
                                                    onClick={() => handleStatus(ticket, 'approved')} 
                                                    className="btn btn-sm btn-success text-white shadow-md hover:scale-105 transition-transform"
                                                    title="Approve Ticket">
                                                    <FaCheck />
                                                </button>
                                            )}
                                            
                                            {/* Reject Button */}
                                            {ticket.verificationStatus !== 'rejected' && (
                                                <button 
                                                    onClick={() => handleStatus(ticket, 'rejected')} 
                                                    className="btn btn-sm btn-error text-white shadow-md hover:scale-105 transition-transform"
                                                    title="Reject Ticket">
                                                    <FaTimes />
                                                </button>
                                            )}

                                            {/* Undo Button (Reset to Pending) */}
                                            {ticket.verificationStatus && ticket.verificationStatus !== 'pending' && (
                                                <button 
                                                    onClick={() => handleStatus(ticket, 'pending')} 
                                                    className="btn btn-sm btn-ghost text-slate-400 hover:text-primary hover:bg-blue-50 border border-gray-200"
                                                    title="Reset to Pending">
                                                    <FaUndo />
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* Empty State */}
                    {tickets.length === 0 && (
                        <div className="text-center py-16 bg-white">
                            <div className="text-5xl mb-4 text-gray-200">🎫</div>
                            <h3 className="text-lg font-bold text-gray-400">No tickets found</h3>
                            <p className="text-gray-400 text-sm">Vendor submissions will appear here.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ManageTickets;