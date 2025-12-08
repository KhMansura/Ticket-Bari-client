import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../providers/AuthProviders"; // Check spelling
import axios from "axios";
import { Link } from "react-router-dom";

const MyBookedTickets = () => {
    const { user } = useContext(AuthContext);
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        if (user?.email) {
            axios.get(`http://localhost:5000/bookings?email=${user.email}`, {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('access-token')}`
                }
            })
            .then(res => setBookings(res.data))
        }
    }, [user]);

    return (
        <div className="w-full">
            <h2 className="text-3xl font-bold mb-8">My Bookings: {bookings.length}</h2>
            <div className="overflow-x-auto">
                <table className="table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Ticket</th>
                            <th>Date</th>
                            <th>Total Price</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings.map((item, index) => (
                            <tr key={item._id}>
                                <th>{index + 1}</th>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img src={item.photo} alt="Avatar" />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold">{item.ticketTitle}</div>
                                            <div className="text-sm opacity-50">{item.from} to {item.to}</div>
                                        </div>
                                    </div>
                                </td>
                                <td>{new Date(item.departureDate).toLocaleString()}</td>
                                <td>${item.totalPrice}</td>
                                <td>
                                    <span className={`badge ${item.status === 'approved' ? 'badge-success' : 'badge-warning'}`}>
                                        {item.status}
                                    </span>
                                </td>
                                <td>
                                    {/* {item.status === 'approved' ? 
                                        <button className="btn btn-sm btn-success">Pay Now</button> 
                                        : 
                                        <button className="btn btn-sm btn-disabled">Pending</button>
                                    } */}
                                    {item.status === 'approved' ? 
                                        <Link to="/dashboard/payment" state={item}>
                                            <button className="btn btn-sm btn-success">Pay Now</button>
                                        </Link>
                                        : 
                                        <button className="btn btn-sm btn-disabled">Pending</button>
                                    }
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyBookedTickets;