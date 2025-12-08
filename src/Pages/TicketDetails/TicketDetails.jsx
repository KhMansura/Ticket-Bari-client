// import { useLoaderData, useNavigate } from "react-router-dom";
// import { useContext, useState } from "react";
// import { AuthContext } from "../../providers/AuthProviders";
// import axios from "axios";
// import Swal from "sweetalert2";

// const TicketDetails = () => {
//     // You need to update your Router to use a loader for this page
//     const ticket = useLoaderData(); 
//     const { user } = useContext(AuthContext);
//     const navigate = useNavigate();
//     const [bookingQty, setBookingQty] = useState(1);
    
//     const { _id, title, from, to, transportType, price, quantity, perks, photo, departureDate, vendorEmail } = ticket;

//     const handleBookTicket = async () => {
//         if(bookingQty > quantity) {
//             Swal.fire("Error", "Not enough seats available!", "error");
//             return;
//         }

//         const bookingData = {
//             ticketId: _id,
//             ticketTitle: title,
//             customerEmail: user?.email,
//             customerName: user?.displayName,
//             vendorEmail: vendorEmail, // Needed for Vendor Dashboard
//             from, to, transportType, 
//             unitPrice: price,
//             bookingQty: parseInt(bookingQty),
//             totalPrice: price * parseInt(bookingQty),
//             departureDate,
//             photo,
//             status: 'pending' // Initial status
//         }

//         const res = await axios.post('http://localhost:5000/bookings', bookingData, {
//              headers: { authorization: `Bearer ${localStorage.getItem('access-token')}` }
//         });

//         if(res.data.insertedId){
//             Swal.fire("Success", "Booking Request Sent!", "success");
//             // Close modal manually if needed, or redirect
//             document.getElementById('booking_modal').close();
//             navigate('/dashboard/my-booked-tickets');
//         }
//     }

//     return (
//         <div className="max-w-6xl mx-auto my-10 p-4">
//             <div className="card lg:card-side bg-base-100 shadow-xl border">
//                 <figure className="w-full lg:w-1/2">
//                     <img src={photo} alt="Ticket" className="w-full h-full object-cover"/>
//                 </figure>
//                 <div className="card-body lg:w-1/2">
//                     <h2 className="card-title text-4xl mb-4">{title}</h2>
//                     <div className="grid grid-cols-2 gap-4 mb-6">
//                         <div className="badge badge-lg badge-outline p-4">{transportType}</div>
//                         <div className="text-2xl font-bold text-primary">${price} <span className="text-sm text-gray-500">/seat</span></div>
//                     </div>
                    
//                     <div className="space-y-2">
//                         <p><strong>Route:</strong> {from} ➝ {to}</p>
//                         <p><strong>Date:</strong> {new Date(departureDate).toLocaleString()}</p>
//                         <p><strong>Available Seats:</strong> {quantity}</p>
//                     </div>

//                     <div className="divider">Perks</div>
//                     <div className="flex gap-2 flex-wrap">
//                         {perks?.map((perk, i) => <span key={i} className="badge badge-accent text-white">{perk}</span>)}
//                     </div>

//                     <div className="card-actions justify-end mt-8">
//                         {/* Open Modal Button */}
//                         <button className="btn btn-primary w-full" onClick={()=>document.getElementById('booking_modal').showModal()}>
//                             Book Now
//                         </button>
//                     </div>
//                 </div>
//             </div>

//             {/* DaisyUI Modal for Booking */}
//             <dialog id="booking_modal" className="modal">
//                 <div className="modal-box">
//                     <h3 className="font-bold text-lg">Confirm Booking</h3>
//                     <p className="py-4">How many seats do you want to book?</p>
                    
//                     <div className="form-control">
//                         <label className="label"><span className="label-text">Quantity</span></label>
//                         <input 
//                             type="number" 
//                             min="1" 
//                             max={quantity} 
//                             value={bookingQty}
//                             onChange={(e) => setBookingQty(e.target.value)} 
//                             className="input input-bordered" 
//                         />
//                         <label className="label">
//                             <span className="label-text-alt">Total Price: ${price * bookingQty}</span>
//                         </label>
//                     </div>

//                     <div className="modal-action">
//                         <form method="dialog">
//                             {/* if there is a button in form, it will close the modal */}
//                             <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
//                             <button className="btn mr-2">Cancel</button>
//                         </form>
//                         <button onClick={handleBookTicket} className="btn btn-primary">Confirm</button>
//                     </div>
//                 </div>
//             </dialog>
//         </div>
//     );
// };

// export default TicketDetails;
import { useLoaderData, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../providers/AuthProviders";
// import axios from "axios"; <--- Remove this
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure"; // 1. Import Hook

const TicketDetails = () => {
    const ticket = useLoaderData(); 
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [bookingQty, setBookingQty] = useState(1);
    const axiosSecure = useAxiosSecure(); // 2. Use Hook
    
    const { _id, title, from, to, transportType, price, quantity, perks, photo, departureDate, vendorEmail } = ticket;

    const handleBookTicket = async () => {
        if(bookingQty > quantity) {
            Swal.fire("Error", "Not enough seats available!", "error");
            return;
        }

        const bookingData = {
            ticketId: _id,
            ticketTitle: title,
            customerEmail: user?.email,
            customerName: user?.displayName,
            vendorEmail: vendorEmail, 
            from, to, transportType, 
            unitPrice: price,
            bookingQty: parseInt(bookingQty),
            totalPrice: price * parseInt(bookingQty),
            departureDate,
            photo,
            status: 'pending'
        }

        // 3. Use axiosSecure (No need to manually add headers)
        const res = await axiosSecure.post('/bookings', bookingData);

        if(res.data.insertedId){
            Swal.fire("Success", "Booking Request Sent!", "success");
            document.getElementById('booking_modal').close();
            navigate('/dashboard/my-booked-tickets');
        }
    }

    return (
        <div className="max-w-6xl mx-auto my-10 p-4">
            <div className="card lg:card-side bg-base-100 shadow-xl border">
                <figure className="w-full lg:w-1/2">
                    <img src={photo} alt="Ticket" className="w-full h-full object-cover"/>
                </figure>
                <div className="card-body lg:w-1/2">
                    <h2 className="card-title text-4xl mb-4">{title}</h2>
                    <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="badge badge-lg badge-outline p-4">{transportType}</div>
                        <div className="text-2xl font-bold text-primary">${price} <span className="text-sm text-gray-500">/seat</span></div>
                    </div>
                    
                    <div className="space-y-2">
                        <p><strong>Route:</strong> {from} ➝ {to}</p>
                        <p><strong>Date:</strong> {new Date(departureDate).toLocaleString()}</p>
                        <p><strong>Available Seats:</strong> {quantity}</p>
                    </div>

                    <div className="divider">Perks</div>
                    <div className="flex gap-2 flex-wrap">
                        {perks?.map((perk, i) => <span key={i} className="badge badge-accent text-white">{perk}</span>)}
                    </div>

                    <div className="card-actions justify-end mt-8">
                        {/* Open Modal Button */}
                        <button className="btn btn-primary w-full" onClick={()=>document.getElementById('booking_modal').showModal()}>
                            Book Now
                        </button>
                    </div>
                </div>
            </div>

            {/* DaisyUI Modal for Booking */}
            <dialog id="booking_modal" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Confirm Booking</h3>
                    <p className="py-4">How many seats do you want to book?</p>
                    
                    <div className="form-control">
                        <label className="label"><span className="label-text">Quantity</span></label>
                        <input 
                            type="number" 
                            min="1" 
                            max={quantity} 
                            value={bookingQty}
                            onChange={(e) => setBookingQty(e.target.value)} 
                            className="input input-bordered" 
                        />
                        <label className="label">
                            <span className="label-text-alt">Total Price: ${price * bookingQty}</span>
                        </label>
                    </div>

                    <div className="modal-action">
                        <form method="dialog">
                            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                            <button className="btn mr-2">Cancel</button>
                        </form>
                        <button onClick={handleBookTicket} className="btn btn-primary">Confirm</button>
                    </div>
                </div>
            </dialog>
        </div>
    );
};

export default TicketDetails;