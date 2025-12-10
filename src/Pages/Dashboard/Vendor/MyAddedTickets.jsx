// import { useContext, useEffect, useState } from "react";
// import { AuthContext } from "../../../providers/AuthProviders"; // Adjust path if needed
// import axios from "axios";
// import Swal from "sweetalert2";
// import { FaTrash, FaEdit } from "react-icons/fa";
// import useAxiosSecure from "../../../hooks/useAxiosSecure";

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
//         // We will update server to handle "?email=" query in Step 3
//         // axios.get(`http://localhost:5000/tickets/vendor/${user.email}`)
//         //     .then(res => setTickets(res.data));
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
//                 // axios.delete(`http://localhost:5000/tickets/${id}`)
//                 axiosSecure.delete(`/tickets/${id}`)
//                     .then(res => {
//                         if (res.data.deletedCount > 0) {
//                             Swal.fire('Deleted!', 'Your ticket has been deleted.', 'success');
//                             fetchMyTickets(); // Refresh list
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
//                             <div className={`badge ${ticket.verificationStatus === 'approved' ? 'badge-success' : ticket.verificationStatus === 'rejected' ? 'badge-error' : 'badge-warning'} gap-2`}>
//                                 {ticket.verificationStatus || 'pending'}
//                             </div>

//                             <div className="card-actions justify-end mt-4">
//                                 <button className="btn btn-sm btn-ghost text-blue-600"><FaEdit /></button>
//                                 <button 
//                                     onClick={() => handleDelete(ticket._id)}
//                                     className="btn btn-sm btn-ghost text-red-600">
//                                     <FaTrash />
//                                 </button>
//                             </div>
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
// import { FaTrash, FaEdit } from "react-icons/fa"; // You can remove this if no longer using icons
import useAxiosSecure from "../../../hooks/useAxiosSecure";

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

    // --- NEW: Handle Update Placeholder ---
    const handleUpdate = (id) => {
        // Later, you will navigate to an Update Page here
        console.log("Update ticket:", id);
        Swal.fire("Info", "Update feature coming soon!", "info");
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
                            fetchMyTickets(); // Refresh list
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
                    <div key={ticket._id} className="card bg-base-100 shadow-xl border">
                        <figure className="h-40">
                            <img src={ticket.photo} alt={ticket.title} className="w-full h-full object-cover" />
                        </figure>
                        <div className="card-body p-4">
                            <h2 className="card-title text-lg">{ticket.title}</h2>
                            <p className="text-sm">Price: ${ticket.price}</p>
                            <p className="text-sm">Route: {ticket.from} ➝ {ticket.to}</p>
                            
                            {/* Verification Status Badge */}
                            <div className={`badge ${ticket.verificationStatus === 'approved' ? 'badge-success' : ticket.verificationStatus === 'rejected' ? 'badge-error' : 'badge-warning'} gap-2 text-white`}>
                                {ticket.verificationStatus || 'pending'}
                            </div>

                            {/* --- BUTTONS REPLACED HERE --- */}
                            <div className="card-actions justify-end mt-4 flex gap-2">
                                <button 
                                    disabled={ticket.verificationStatus === 'rejected'} 
                                    onClick={() => handleUpdate(ticket._id)}
                                    className="btn btn-sm btn-info text-white">
                                    Update
                                </button>

                                <button 
                                    disabled={ticket.verificationStatus === 'rejected'} 
                                    onClick={() => handleDelete(ticket._id)}
                                    className="btn btn-sm btn-error text-white">
                                    Delete
                                </button>
                            </div>
                            {/* --------------------------- */}
                            
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyAddedTickets;
