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
                    // Refresh data
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