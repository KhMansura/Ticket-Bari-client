// import { useState, useEffect } from "react";
// import useAxiosSecure from "../../../hooks/useAxiosSecure";
// import Swal from "sweetalert2";
// import { FaBullhorn, FaCheck, FaTimes, FaUndo } from "react-icons/fa";

// const ManageTickets = () => {
//     const [tickets, setTickets] = useState([]);
//     const axiosSecure = useAxiosSecure();

//     useEffect(() => {
//         fetchTickets();
//     }, []);

//     const fetchTickets = () => {
//         axiosSecure.get('/tickets') // This gets ALL tickets (pending & approved)
//             .then(res => setTickets(res.data));
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
//     const handleAdvertise = (ticket) => {
//         const newStatus = !ticket.isAdvertised; // Toggle status

//         axiosSecure.patch(`/tickets/advertise/${ticket._id}`, { isAdvertised: newStatus })
//             .then(res => {
//                 if(res.data.message === 'limit_reached'){
//                     Swal.fire('Limit Reached', 'You can only advertise 6 tickets at a time.', 'warning');
//                 } else if(res.data.modifiedCount > 0){
//                     Swal.fire('Success', newStatus ? 'Ticket is now Advertised!' : 'Removed from Advertisement', 'success');
//                     fetchTickets(); // Refresh the list to show the new color
//                 }
//             })
//     }

//     return (
//         <div className="w-full px-4">
//             <h2 className="text-3xl font-bold my-4">Manage Tickets: {tickets.length}</h2>
//             <div className="overflow-x-auto">
//                 <table className="table">
//                     <thead>
//                         <tr>
//                             <th>Image</th>
//                             <th>Title</th>
//                             <th>Vendor</th>
//                             <th>Status</th>
//                             <th>Advertise</th>
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
//                                     <span className={`badge ${ticket.verificationStatus === 'approved' ? 'badge-success' : 'badge-warning'}`}>
//                                         {ticket.verificationStatus || 'pending'}
//                                     </span>
//                                 </td>
//                                 {/* 4. BUTTON COLUMN ADDED HERE */}
//                                 <td>
//                                     {ticket.verificationStatus === 'approved' && (
//                                         <button 
//                                             onClick={() => handleAdvertise(ticket)}
//                                             className={`btn btn-sm ${ticket.isAdvertised ? 'btn-accent' : 'btn-outline'}`}
//                                             title="Toggle Advertisement">
//                                             <FaBullhorn /> {ticket.isAdvertised ? 'Advertised' : 'Advertise'}
//                                         </button>
//                                     )}
//                                 </td>
//                                 <td>
//                                     {ticket.verificationStatus !== 'approved' && (
//                                         <button 
//                                             onClick={() => handleStatus(ticket, 'approved')} 
//                                             className="btn btn-xs btn-success text-white mr-2">
//                                             Approve
//                                             <FaCheck></FaCheck>
//                                         </button>
//                                     )}
//                                     {ticket.verificationStatus !== 'rejected' && (
//                                         <button 
//                                             onClick={() => handleStatus(ticket, 'rejected')} 
//                                             className="btn btn-xs btn-error text-white">
//                                             Reject
//                                             <FaTimes></FaTimes>
//                                         </button>
//                                     )}
//                                     {/* 3. UNDO BUTTON (New Feature) */}
//                                     {/* Only show if status is NOT 'pending' */}
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
import { FaCheck, FaTimes, FaUndo } from "react-icons/fa";

const ManageTickets = () => {
    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(true); // Added Loading State (Requirement: Additional)
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
                    Swal.fire('Success', `Ticket ${status}!`, 'success');
                    fetchTickets();
                }
            })
    };

    // Requirement: Show loading spinner
    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <span className="loading loading-spinner loading-lg text-primary"></span>
            </div>
        );
    }

    return (
        <div className="w-full px-10">
            <h2 className="text-3xl font-bold my-4">Manage Tickets: {tickets.length}</h2>
            <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                    <thead className="bg-base-200">
                        <tr>
                            <th>Image</th>
                            <th>Title</th>
                            <th>Vendor</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tickets.map(ticket => (
                            <tr key={ticket._id}>
                                <td>
                                    <div className="avatar">
                                        <div className="mask mask-squircle w-12 h-12">
                                            <img src={ticket.photo} alt="Ticket" />
                                        </div>
                                    </div>
                                </td>
                                <td>{ticket.title}</td>
                                <td>{ticket.vendorEmail}</td>
                                <td>
                                    <span className={`badge font-bold text-white p-3
                                        ${ticket.verificationStatus === 'approved' ? 'badge-success' : 
                                          ticket.verificationStatus === 'rejected' ? 'badge-error' : 'badge-warning'}`}>
                                        {ticket.verificationStatus || 'pending'}
                                    </span>
                                </td>
                                <td className="flex gap-2">
                                    {/* 1. Approve Button (Requirement 7b) */}
                                    {ticket.verificationStatus !== 'approved' && (
                                        <button 
                                            onClick={() => handleStatus(ticket, 'approved')} 
                                            className="btn btn-xs btn-success text-white"
                                            title="Approve">
                                            <FaCheck /> Approve
                                        </button>
                                    )}
                                    
                                    {/* 2. Reject Button (Requirement 7b) */}
                                    {ticket.verificationStatus !== 'rejected' && (
                                        <button 
                                            onClick={() => handleStatus(ticket, 'rejected')} 
                                            className="btn btn-xs btn-error text-white"
                                            title="Reject">
                                            <FaTimes /> Reject
                                        </button>
                                    )}

                                    {/* Optional Undo Button (For fixing mistakes) */}
                                    {ticket.verificationStatus && ticket.verificationStatus !== 'pending' && (
                                        <button 
                                            onClick={() => handleStatus(ticket, 'pending')} 
                                            className="btn btn-xs btn-neutral text-white"
                                            title="Reset to Pending">
                                            <FaUndo /> Undo
                                        </button>
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

export default ManageTickets;