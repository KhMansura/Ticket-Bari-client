import { useState, useEffect } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const ManageTickets = () => {
    const [tickets, setTickets] = useState([]);
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        fetchTickets();
    }, []);

    const fetchTickets = () => {
        axiosSecure.get('/tickets') // This gets ALL tickets (pending & approved)
            .then(res => setTickets(res.data));
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

    return (
        <div className="w-full px-4">
            <h2 className="text-3xl font-bold my-4">Manage Tickets: {tickets.length}</h2>
            <div className="overflow-x-auto">
                <table className="table">
                    <thead>
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
                                    <span className={`badge ${ticket.verificationStatus === 'approved' ? 'badge-success' : 'badge-warning'}`}>
                                        {ticket.verificationStatus || 'pending'}
                                    </span>
                                </td>
                                <td>
                                    {ticket.verificationStatus !== 'approved' && (
                                        <button 
                                            onClick={() => handleStatus(ticket, 'approved')} 
                                            className="btn btn-xs btn-success text-white mr-2">
                                            Approve
                                        </button>
                                    )}
                                    {ticket.verificationStatus !== 'rejected' && (
                                        <button 
                                            onClick={() => handleStatus(ticket, 'rejected')} 
                                            className="btn btn-xs btn-error text-white">
                                            Reject
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