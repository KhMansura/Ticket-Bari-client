// import { useLoaderData, useNavigate } from "react-router-dom";
// import { useContext, useEffect, useState } from "react";
// import { AuthContext } from "../../providers/AuthProviders";
// import Swal from "sweetalert2";
// import useAxiosSecure from "../../hooks/useAxiosSecure";

// const TicketDetails = () => {
//     const ticket = useLoaderData(); 
//     const { user } = useContext(AuthContext);
//     const navigate = useNavigate();
//     const [bookingQty, setBookingQty] = useState(1);
//     const axiosSecure = useAxiosSecure();

    

//     // Countdown State
//     const [timeLeft, setTimeLeft] = useState("");
//     const [isExpired, setIsExpired] = useState(false);
//     const [alreadyBooked, setAlreadyBooked] = useState(false);
    
//     const { _id, title, from, to, transportType, price, quantity, perks, photo, departureDate, vendorEmail } = ticket;

//     // 1. Check if User already booked this ticket
//     useEffect(() => {
//         if(user?.email) {
//             axiosSecure.get(`/bookings?email=${user.email}`)
//                 .then(res => {
//                     // Check if any booking matches this ticket ID
//                     const exists = res.data.find(b => b.ticketId === _id);
//                     if(exists) {
//                         setAlreadyBooked(true);
//                     }
//                 })
//         }
//     }, [user, _id, axiosSecure]);

//     // --- COUNTDOWN LOGIC ---
//     useEffect(() => {
//         if(!departureDate) return; // Safety check
//         const calculateTimeLeft = () => {
//             const difference = +new Date(departureDate) - +new Date();
//             if (difference > 0) {
//                 const days = Math.floor(difference / (1000 * 60 * 60 * 24));
//                 const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
//                 const minutes = Math.floor((difference / 1000 / 60) % 60);
//                 const seconds = Math.floor((difference / 1000) % 60);
//                 setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);
//                 setIsExpired(false);
//             } else {
//                 setTimeLeft("Departure Time Passed");
//                 setIsExpired(true);
//             }
//         };

//         const timer = setInterval(calculateTimeLeft, 1000);
//         calculateTimeLeft();

//         return () => clearInterval(timer);
//     }, [departureDate]);

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
//             vendorEmail: vendorEmail, 
//             from, to, transportType, 
//             unitPrice: price,
//             bookingQty: parseInt(bookingQty),
//             totalPrice: price * parseInt(bookingQty),
//             departureDate,
//             photo,
//             status: 'pending'
//         }

//         // 3. Use axiosSecure
//         const res = await axiosSecure.post('/bookings', bookingData);

//         if(res.data.insertedId){
//             Swal.fire("Success", "Booking Request Sent!", "success");
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

//                     {/* Countdown Badge */}
//                     <div className={`badge badge-lg p-4 mb-4 ${isExpired ? 'badge-error text-white' : 'badge-primary'}`}>
//                         {timeLeft}
//                     </div>

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
//                     {/* <div className="flex gap-2 flex-wrap">
//                         {perks?.map((perk, i) => <span key={i} className="badge badge-accent text-white">{perk}</span>)}
//                     </div> */}
//                     <div className="flex gap-2 flex-wrap">
//                         {Array.isArray(perks) ? (
//                             perks.map((perk, i) => <span key={i} className="badge badge-accent text-white">{perk}</span>)
//                         ) : (
//                             <span className="text-gray-500 text-sm">No specific perks listed</span>
//                         )}
//                     </div>

//                     <div className="card-actions justify-end mt-8">
//                         {/* Open Modal Button */}
//                         <button 
//                             className="btn btn-primary w-full" 
//                             disabled={quantity === 0 || isExpired || alreadyBooked} 
//                             onClick={()=>document.getElementById('booking_modal').showModal()}
//                         >
//                             {/* UPDATE: Button Text */}
//                             {isExpired ? "Expired" : alreadyBooked ? "Already Booked" : quantity === 0 ? "Sold Out" : "Book Now"}
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
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../providers/AuthProviders";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import SeatMap from "../../components/SeatMap"; // Make sure you created this component!

const TicketDetails = () => {
    const ticket = useLoaderData(); 
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();

    // Seat Map States
    const [takenSeats, setTakenSeats] = useState([]);
    const [selectedSeats, setSelectedSeats] = useState([]);

    // Countdown & Status States
    const [timeLeft, setTimeLeft] = useState("");
    const [isExpired, setIsExpired] = useState(false);
    const [alreadyBooked, setAlreadyBooked] = useState(false);
    
    const { _id, title, from, to, transportType, price, quantity, perks, photo, departureDate, vendorEmail } = ticket;

    // 1. Fetch Live Taken Seats (NEW)
    useEffect(() => {
        axiosSecure.get(`/tickets/taken-seats/${_id}`)
            .then(res => setTakenSeats(res.data));
    }, [_id, axiosSecure]);

    // 2. Check if User already booked this ticket (EXISTING)
    useEffect(() => {
        if(user?.email) {
            axiosSecure.get(`/bookings?email=${user.email}`)
                .then(res => {
                    const exists = res.data.find(b => b.ticketId === _id);
                    if(exists) {
                        setAlreadyBooked(true);
                    }
                })
        }
    }, [user, _id, axiosSecure]);

    // 3. Countdown Logic (EXISTING)
    useEffect(() => {
        if(!departureDate) return;
        const calculateTimeLeft = () => {
            const difference = +new Date(departureDate) - +new Date();
            if (difference > 0) {
                const days = Math.floor(difference / (1000 * 60 * 60 * 24));
                const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
                const minutes = Math.floor((difference / 1000 / 60) % 60);
                const seconds = Math.floor((difference / 1000) % 60);
                setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);
                setIsExpired(false);
            } else {
                setTimeLeft("Departure Time Passed");
                setIsExpired(true);
            }
        };
        const timer = setInterval(calculateTimeLeft, 1000);
        calculateTimeLeft();
        return () => clearInterval(timer);
    }, [departureDate]);

    // 4. Handle Booking (UPDATED to use Selected Seats)
    const handleBookTicket = async () => {
        if (!user) {
            return Swal.fire("Please Login", "You must login to book tickets", "warning");
        }
        if (selectedSeats.length === 0) {
            return Swal.fire("Select Seats", "Please select at least one seat from the map", "warning");
        }

        const bookingData = {
            ticketId: _id,
            ticketTitle: title,
            customerEmail: user?.email,
            customerName: user?.displayName,
            vendorEmail: vendorEmail, 
            from, to, transportType, 
            unitPrice: price,
            bookingQty: selectedSeats.length, // Quantity is automatic now
            seatNumbers: selectedSeats,       // Save specific seat numbers (A1, B2)
            totalPrice: price * selectedSeats.length,
            departureDate,
            photo,
            status: 'pending'
        }

        const res = await axiosSecure.post('/bookings', bookingData);

        if(res.data.insertedId){
            Swal.fire("Success", "Booking Request Sent!", "success");
            navigate('/dashboard/my-booked-tickets');
        }
    }

    return (
        <div className="max-w-7xl mx-auto my-10 px-4">
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                
                {/* LEFT SIDE: TICKET INFO */}
                <div>
                    <img src={photo} alt="Ticket" className="w-full h-80 object-cover rounded-xl shadow-md mb-6"/>
                    
                    <h2 className="text-4xl font-bold mb-4">{title}</h2>
                    
                    {/* Countdown Badge */}
                    <div className={`badge badge-lg p-4 mb-4 ${isExpired ? 'badge-error text-white' : 'badge-primary'}`}>
                        {timeLeft}
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="badge badge-lg badge-outline p-4">{transportType}</div>
                        <div className="text-2xl font-bold text-primary">${price} <span className="text-sm text-gray-500">/seat</span></div>
                    </div>
                    
                    <div className="space-y-2 text-lg text-gray-600 border p-4 rounded-lg bg-base-100">
                        <p><strong>Route:</strong> {from} ➝ {to}</p>
                        <p><strong>Date:</strong> {new Date(departureDate).toLocaleString()}</p>
                        <p><strong>Total Seats:</strong> {quantity}</p>
                        <p><strong>Perks:</strong></p>
                        <div className="flex gap-2 flex-wrap mt-1">
                            {Array.isArray(perks) ? (
                                perks.map((perk, i) => <span key={i} className="badge badge-accent text-white">{perk}</span>)
                            ) : (
                                <span className="text-sm">No specific perks</span>
                            )}
                        </div>
                    </div>
                </div>

                {/* RIGHT SIDE: SEAT MAP & CONFIRMATION */}
                <div>
                    {/* Only show map if booking is allowed */}
                    {isExpired || quantity === 0 ? (
                        <div className="h-full flex items-center justify-center bg-gray-100 rounded-xl">
                            <h2 className="text-2xl font-bold text-gray-400">Booking Closed</h2>
                        </div>
                    ) : alreadyBooked ? (
                        <div className="h-full flex items-center justify-center bg-gray-100 rounded-xl">
                            <h2 className="text-2xl font-bold text-primary">You already booked this ticket</h2>
                        </div>
                    ) : (
                        <div className="flex flex-col gap-4">
                            {/* THE LIVE SEAT MAP COMPONENT */}
                            <SeatMap 
                                takenSeats={takenSeats} 
                                selectedSeats={selectedSeats} 
                                setSelectedSeats={setSelectedSeats} 
                                price={price} 
                            />
                            
                            <button 
                                onClick={handleBookTicket} 
                                disabled={selectedSeats.length === 0}
                                className="btn btn-primary w-full text-lg shadow-lg">
                                Confirm {selectedSeats.length} Seats - ${selectedSeats.length * price}
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TicketDetails;