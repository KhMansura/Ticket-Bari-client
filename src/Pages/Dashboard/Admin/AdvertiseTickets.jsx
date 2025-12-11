// import { useEffect, useState } from "react";
// import useAxiosSecure from "../../../hooks/useAxiosSecure";
// import Swal from "sweetalert2";
// import { FaBullhorn } from "react-icons/fa";

// const AdvertiseTickets = () => {
//     const [tickets, setTickets] = useState([]);
//     const axiosSecure = useAxiosSecure();

//     useEffect(() => {
//         fetchApprovedTickets();
//     }, []);

//     const fetchApprovedTickets = () => {
//         // We fetch ALL tickets, but in the UI we will filter for 'approved'
//         // Ideally, you should create a specific backend API like /tickets/approved
//         axiosSecure.get('/tickets') 
//             .then(res => {
//                 // Requirement 7d: Show all admin-approved tickets
//                 const approved = res.data.filter(t => t.verificationStatus === 'approved');
//                 setTickets(approved);
//             });
//     }

//     const handleAdvertise = (ticket) => {
//         const newStatus = !ticket.isAdvertised;
        
//         axiosSecure.patch(`/tickets/advertise/${ticket._id}`, { isAdvertised: newStatus })
//             .then(res => {
//                 if(res.data.message === 'limit_reached'){
//                     Swal.fire('Limit Reached', 'You can only advertise 6 tickets at a time.', 'warning');
//                 } else if(res.data.modifiedCount > 0){
//                     Swal.fire('Success', newStatus ? 'Added to Home Slider' : 'Removed from Slider', 'success');
//                     fetchApprovedTickets(); // Refresh list
//                 }
//             })
//     }

//     return (
//         <div className="w-full px-10">
//             <h2 className="text-3xl font-bold my-4">Advertise Tickets</h2>
//             <div className="overflow-x-auto">
//                 <table className="table table-zebra w-full">
//                     <thead>
//                         <tr>
//                             <th>Image</th>
//                             <th>Title</th>
//                             <th>Vendor</th>
//                             <th>Current Status</th>
//                             <th>Action</th>
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
//                                     {ticket.isAdvertised ? 
//                                         <span className="badge badge-primary">Advertised</span> : 
//                                         <span className="badge badge-ghost">Not Advertised</span>
//                                     }
//                                 </td>
//                                 <td>
//                                     {/* Requirement 7d: Advertise Toggle Button */}
//                                     <button 
//                                         onClick={() => handleAdvertise(ticket)}
//                                         className={`btn btn-sm ${ticket.isAdvertised ? 'btn-error' : 'btn-success text-white'}`}>
//                                         <FaBullhorn /> 
//                                         {ticket.isAdvertised ? 'Remove Ad' : 'Advertise'}
//                                     </button>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     );
// };

// export default AdvertiseTickets;

import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { FaBullhorn, FaEye, FaEyeSlash, FaAd, FaImage } from "react-icons/fa";

const AdvertiseTickets = () => {
    const [tickets, setTickets] = useState([]);
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        fetchApprovedTickets();
    }, []);

    const fetchApprovedTickets = () => {
        axiosSecure.get('/tickets') 
            .then(res => {
                // Filter for only approved tickets that are eligible for ads
                const approved = res.data.filter(t => t.verificationStatus === 'approved');
                setTickets(approved);
            });
    }

    const handleAdvertise = (ticket) => {
        const newStatus = !ticket.isAdvertised;
        
        axiosSecure.patch(`/tickets/advertise/${ticket._id}`, { isAdvertised: newStatus })
            .then(res => {
                if(res.data.message === 'limit_reached'){
                    Swal.fire({
                        title: 'Slot Limit Reached',
                        text: 'You can only advertise up to 6 tickets at a time. Please remove one first.',
                        icon: 'warning',
                        confirmButtonColor: "#F59E0B"
                    });
                } else if(res.data.modifiedCount > 0){
                    Swal.fire({
                        title: newStatus ? 'Campaign Active' : 'Campaign Stopped',
                        text: newStatus ? 'Ticket is now visible on the homepage slider.' : 'Ticket removed from homepage slider.',
                        icon: 'success',
                        timer: 1500,
                        showConfirmButton: false
                    });
                    fetchApprovedTickets(); 
                }
            })
    }

    return (
        <div className="w-full max-w-7xl mx-auto px-4 font-poppins">
            
            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-end mb-8 border-b border-gray-200 pb-5">
                <div>
                    <h2 className="text-3xl font-bold text-[#1e3a8a] flex items-center gap-3">
                        <FaAd /> Advertisement Manager
                    </h2>
                    <p className="text-slate-500 mt-1">Select tickets to feature on the homepage slider (Max 6).</p>
                </div>
                <div className="text-right mt-4 md:mt-0">
                    <span className="text-4xl font-bold text-primary">
                        {tickets.filter(t => t.isAdvertised).length}<span className="text-xl text-gray-400">/6</span>
                    </span>
                    <p className="text-xs uppercase tracking-wider text-gray-400 font-semibold">Active Ads</p>
                </div>
            </div>

            {/* Professional Table Card */}
            <div className="bg-white rounded-xl shadow-card overflow-hidden border border-gray-100">
                <div className="overflow-x-auto">
                    <table className="table w-full">
                        {/* Table Head */}
                        <thead className="bg-[#F8FAFC] text-slate-500 border-b border-gray-200 uppercase text-xs tracking-wider">
                            <tr>
                                <th className="py-4 pl-6">Visual</th>
                                <th>Ticket Details</th>
                                <th>Vendor</th>
                                <th>Visibility</th>
                                <th className="text-right pr-6">Campaign Action</th>
                            </tr>
                        </thead>
                        
                        {/* Table Body */}
                        <tbody className="divide-y divide-gray-50">
                            {tickets.map(ticket => (
                                <tr key={ticket._id} className={`transition-colors ${ticket.isAdvertised ? 'bg-blue-50/40' : 'hover:bg-gray-50'}`}>
                                    
                                    {/* Visual Column */}
                                    <td className="pl-6 py-4">
                                        <div className="avatar">
                                            <div className="w-16 h-10 rounded-lg shadow-sm border border-gray-200">
                                                {ticket.photo ? (
                                                    <img src={ticket.photo} alt="Ticket" className="object-cover" />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400">
                                                        <FaImage />
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </td>

                                    {/* Details Column */}
                                    <td>
                                        <div className="font-bold text-[#1e3a8a]">{ticket.title}</div>
                                        <div className="text-xs text-gray-500 mt-0.5">
                                            Route: {ticket.from} ➝ {ticket.to}
                                        </div>
                                    </td>

                                    {/* Vendor Column */}
                                    <td className="text-sm text-slate-600 font-medium">
                                        {ticket.vendorEmail}
                                    </td>

                                    {/* Visibility Status */}
                                    <td>
                                        {ticket.isAdvertised ? (
                                            <div className="badge badge-primary gap-2 text-white shadow-sm p-3 font-semibold">
                                                <FaBullhorn className="text-xs" /> Featured
                                            </div>
                                        ) : (
                                            <div className="badge badge-ghost gap-2 text-gray-400 p-3">
                                                Hidden
                                            </div>
                                        )}
                                    </td>

                                    {/* Action Button */}
                                    <td className="text-right pr-6">
                                        <button 
                                            onClick={() => handleAdvertise(ticket)}
                                            className={`btn btn-sm w-36 shadow-sm transition-all duration-200 ${
                                                ticket.isAdvertised 
                                                ? 'btn-outline btn-error hover:bg-red-50' 
                                                : 'btn-primary text-white hover:scale-105'
                                            }`}
                                        >
                                            {ticket.isAdvertised ? (
                                                <> <FaEyeSlash /> Remove Ad </>
                                            ) : (
                                                <> <FaEye /> Promote </>
                                            )}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* Empty State */}
                    {tickets.length === 0 && (
                        <div className="text-center py-16 bg-white">
                            <div className="text-5xl mb-4 text-gray-200">🎫</div>
                            <h3 className="text-lg font-bold text-gray-400">No approved tickets available</h3>
                            <p className="text-gray-400 text-sm">Approve tickets in "Manage Tickets" first.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdvertiseTickets;