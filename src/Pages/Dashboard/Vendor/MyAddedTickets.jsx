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
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../providers/AuthProviders";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Link } from "react-router-dom";

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
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/tickets/${id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            Swal.fire('Deleted!', 'Your ticket has been deleted.', 'success');
                            fetchMyTickets();
                        }
                    })
            }
        })
    }

    return (
        <div className="w-full px-10">
            <h2 className="text-3xl font-bold my-4">My Added Tickets: {tickets.length}</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {tickets.map(ticket => (
                    // 1. CARD CONTAINER: Added 'h-full flex flex-col justify-between' for equal height
                    <div key={ticket._id} className="card bg-base-100 shadow-xl border h-full flex flex-col justify-between">
                        
                        {/* 2. IMAGE SECTION: Fixed height and object-cover */}
                        <figure className="h-48 w-full">
                            <img src={ticket.photo} alt={ticket.title} className="w-full h-full object-cover" />
                        </figure>

                        {/* 3. BODY SECTION: Added 'flex-grow' to push buttons to the bottom */}
                        <div className="card-body p-4 flex-grow">
                            <h2 className="card-title text-lg">{ticket.title}</h2>
                            <p className="text-sm">Price: ${ticket.price}</p>
                            <p className="text-sm">Route: {ticket.from} ➝ {ticket.to}</p>
                            
                            {/* Verification Status Badge */}
                            <div className={`badge ${ticket.verificationStatus === 'approved' ? 'badge-success' : ticket.verificationStatus === 'rejected' ? 'badge-error' : 'badge-warning'} gap-2 text-white`}>
                                {ticket.verificationStatus || 'pending'}
                            </div>
                        </div>

                        {/* 4. ACTIONS SECTION: Added 'mt-auto' to stick to bottom */}
                        <div className="card-actions justify-end p-4 mt-auto flex gap-2">
                            
                            {/* Logic: If Rejected, show disabled button. If Active, show Link. */}
                            {ticket.verificationStatus === 'rejected' ? (
                                <button 
                                    disabled 
                                    className="btn btn-sm btn-info text-white opacity-50 cursor-not-allowed">
                                    Update
                                </button>
                            ) : (
                                <Link to={`/dashboard/update-ticket/${ticket._id}`}>
                                    <button className="btn btn-sm btn-info text-white">
                                        Update
                                    </button>
                                </Link>
                            )}

                            <button 
                                disabled={ticket.verificationStatus === 'rejected'} 
                                onClick={() => handleDelete(ticket._id)}
                                className="btn btn-sm btn-error text-white">
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyAddedTickets;
