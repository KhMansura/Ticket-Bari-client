import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { FaBullhorn } from "react-icons/fa";

const AdvertiseTickets = () => {
    const [tickets, setTickets] = useState([]);
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        fetchApprovedTickets();
    }, []);

    const fetchApprovedTickets = () => {
        // We fetch ALL tickets, but in the UI we will filter for 'approved'
        // Ideally, you should create a specific backend API like /tickets/approved
        axiosSecure.get('/tickets') 
            .then(res => {
                // Requirement 7d: Show all admin-approved tickets
                const approved = res.data.filter(t => t.verificationStatus === 'approved');
                setTickets(approved);
            });
    }

    const handleAdvertise = (ticket) => {
        const newStatus = !ticket.isAdvertised;
        
        axiosSecure.patch(`/tickets/advertise/${ticket._id}`, { isAdvertised: newStatus })
            .then(res => {
                if(res.data.message === 'limit_reached'){
                    Swal.fire('Limit Reached', 'You can only advertise 6 tickets at a time.', 'warning');
                } else if(res.data.modifiedCount > 0){
                    Swal.fire('Success', newStatus ? 'Added to Home Slider' : 'Removed from Slider', 'success');
                    fetchApprovedTickets(); // Refresh list
                }
            })
    }

    return (
        <div className="w-full px-10">
            <h2 className="text-3xl font-bold my-4">Advertise Tickets</h2>
            <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Title</th>
                            <th>Vendor</th>
                            <th>Current Status</th>
                            <th>Action</th>
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
                                    {ticket.isAdvertised ? 
                                        <span className="badge badge-primary">Advertised</span> : 
                                        <span className="badge badge-ghost">Not Advertised</span>
                                    }
                                </td>
                                <td>
                                    {/* Requirement 7d: Advertise Toggle Button */}
                                    <button 
                                        onClick={() => handleAdvertise(ticket)}
                                        className={`btn btn-sm ${ticket.isAdvertised ? 'btn-error' : 'btn-success text-white'}`}>
                                        <FaBullhorn /> 
                                        {ticket.isAdvertised ? 'Remove Ad' : 'Advertise'}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdvertiseTickets;