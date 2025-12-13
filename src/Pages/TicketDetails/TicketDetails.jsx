
// import { useLoaderData, useNavigate } from "react-router-dom";

// import { useContext, useEffect, useState } from "react";
// import { AuthContext } from "../../providers/AuthProviders";
// import Swal from "sweetalert2";
// import useAxiosSecure from "../../hooks/useAxiosSecure";
// import SeatMap from "../../components/SeatMap"; // Make sure you created this component!

// const TicketDetails = () => {
//     const ticket = useLoaderData(); 
//     const { user } = useContext(AuthContext);
//     const navigate = useNavigate();
//     const axiosSecure = useAxiosSecure();

//     // Seat Map States
//     const [takenSeats, setTakenSeats] = useState([]);
//     const [selectedSeats, setSelectedSeats] = useState([]);

//     // Countdown & Status States
//     const [timeLeft, setTimeLeft] = useState("");
//     const [isExpired, setIsExpired] = useState(false);
//     const [alreadyBooked, setAlreadyBooked] = useState(false);
    
//     const { _id, title, from, to, transportType, price, quantity, perks, photo, departureDate, vendorEmail } = ticket;

//     // 1. Fetch Live Taken Seats (NEW)
//     useEffect(() => {
//         axiosSecure.get(`/tickets/taken-seats/${_id}`)
//             .then(res => setTakenSeats(res.data));
//     }, [_id, axiosSecure]);

//     // 2. Check if User already booked this ticket (EXISTING)
//     useEffect(() => {
//         if(user?.email) {
//             axiosSecure.get(`/bookings?email=${user.email}`)
//                 .then(res => {
//                     const exists = res.data.find(b => b.ticketId === _id);
//                     if(exists) {
//                         setAlreadyBooked(true);
//                     }
//                 })
//         }
//     }, [user, _id, axiosSecure]);

//     // 3. Countdown Logic (EXISTING)
//     useEffect(() => {
//         if(!departureDate) return;
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

//     // 4. Handle Booking (UPDATED to use Selected Seats)
//     const handleBookTicket = async () => {
//         if (!user) {
//             return Swal.fire("Please Login", "You must login to book tickets", "warning");
//         }
//         if (selectedSeats.length === 0) {
//             return Swal.fire("Select Seats", "Please select at least one seat from the map", "warning");
//         }

//         const bookingData = {
//             ticketId: _id,
//             ticketTitle: title,
//             customerEmail: user?.email,
//             customerName: user?.displayName,
//             vendorEmail: vendorEmail, 
//             from, to, transportType, 
//             unitPrice: price,
//             bookingQty: selectedSeats.length, // Quantity is automatic now
//             seatNumbers: selectedSeats,       // Save specific seat numbers (A1, B2)
//             totalPrice: price * selectedSeats.length,
//             departureDate,
//             photo,
//             status: 'pending'
//         }

//         const res = await axiosSecure.post('/bookings', bookingData);

//         if(res.data.insertedId){
//             Swal.fire("Success", "Booking Request Sent!", "success");
//             navigate('/dashboard/my-booked-tickets');
//         }
//     }

//     return (
//         <div className="max-w-7xl mx-auto my-10 px-4">
            
//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                
//                 {/* LEFT SIDE: TICKET INFO */}
//                 <div>
//                     <img src={photo} alt="Ticket" className="w-full h-80 object-cover rounded-xl shadow-md mb-6"/>
                    
//                     <h2 className="text-4xl font-bold mb-4">{title}</h2>
                    
//                     {/* Countdown Badge */}
//                     <div className={`badge badge-lg p-4 mb-4 ${isExpired ? 'badge-error text-white' : 'badge-primary'}`}>
//                         {timeLeft}
//                     </div>

//                     <div className="grid grid-cols-2 gap-4 mb-6">
//                         <div className="badge badge-lg badge-outline p-4">{transportType}</div>
//                         <div className="text-2xl font-bold text-primary">${price} <span className="text-sm text-gray-500">/seat</span></div>
//                     </div>
                    
//                     <div className="space-y-2 text-lg text-gray-600 border p-4 rounded-lg bg-base-100">
//                         <p><strong>Route:</strong> {from} ➝ {to}</p>
//                         <p><strong>Date:</strong> {new Date(departureDate).toLocaleString()}</p>
//                         <p><strong>Total Seats:</strong> {quantity}</p>
//                         <p><strong>Perks:</strong></p>
//                         <div className="flex gap-2 flex-wrap mt-1">
//                             {Array.isArray(perks) ? (
//                                 perks.map((perk, i) => <span key={i} className="badge badge-accent text-white">{perk}</span>)
//                             ) : (
//                                 <span className="text-sm">No specific perks</span>
//                             )}
//                         </div>
//                     </div>
//                 </div>

//                 {/* RIGHT SIDE: SEAT MAP & CONFIRMATION */}
//                 <div>
//                     {/* Only show map if booking is allowed */}
//                     {isExpired || quantity === 0 ? (
//                         <div className="h-full flex items-center justify-center bg-gray-100 rounded-xl">
//                             <h2 className="text-2xl font-bold text-gray-400">Booking Closed</h2>
//                         </div>
//                     ) : alreadyBooked ? (
//                         <div className="h-full flex items-center justify-center bg-gray-100 rounded-xl">
//                             <h2 className="text-2xl font-bold text-primary">You already booked this ticket</h2>
//                         </div>
//                     ) : (
//                         <div className="flex flex-col gap-4">
//                             {/* THE LIVE SEAT MAP COMPONENT */}
//                             <SeatMap 
//                                 takenSeats={takenSeats} 
//                                 selectedSeats={selectedSeats} 
//                                 setSelectedSeats={setSelectedSeats} 
//                                 price={price} 
//                             />
                            
//                             <button 
//                                 onClick={handleBookTicket} 
//                                 disabled={selectedSeats.length === 0}
//                                 className="btn btn-primary w-full text-lg shadow-lg">
//                                 Confirm {selectedSeats.length} Seats - ${selectedSeats.length * price}
//                             </button>
//                         </div>
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default TicketDetails;

// import { useLoaderData, useNavigate } from "react-router-dom";
// import { useContext, useEffect, useState } from "react";
// import { AuthContext } from "../../providers/AuthProviders";
// import Swal from "sweetalert2";
// import useAxiosSecure from "../../hooks/useAxiosSecure";
// import SeatMap from "../../components/SeatMap"; 
// import { FaMapMarkerAlt, FaBus, FaClock, FaCheckCircle, FaExclamationTriangle, FaChair, FaTimes } from "react-icons/fa";

// const TicketDetails = () => {
//     const ticket = useLoaderData(); 
//     const { user } = useContext(AuthContext);
//     const navigate = useNavigate();
//     const axiosSecure = useAxiosSecure();

//     // Seat Map States
//     const [takenSeats, setTakenSeats] = useState([]);
//     const [selectedSeats, setSelectedSeats] = useState([]);

//     // Countdown & Status States
//     const [timeLeft, setTimeLeft] = useState("");
//     const [isExpired, setIsExpired] = useState(false);
//     const [alreadyBooked, setAlreadyBooked] = useState(false);
    
//     // Modal State
//     const [bookingQty, setBookingQty] = useState(0);

//     const { _id, title, from, to, transportType, price, quantity, perks, photo, departureDate, vendorEmail } = ticket;

//     // 1. Fetch Live Taken Seats
//     useEffect(() => {
//         axiosSecure.get(`/tickets/taken-seats/${_id}`)
//             .then(res => setTakenSeats(res.data));
//     }, [_id, axiosSecure]);

//     // 2. Check if User already booked
//     useEffect(() => {
//         if(user?.email) {
//             axiosSecure.get(`/bookings?email=${user.email}`)
//                 .then(res => {
//                     const exists = res.data.find(b => b.ticketId === _id);
//                     if(exists) setAlreadyBooked(true);
//                 })
//         }
//     }, [user, _id, axiosSecure]);

//     // 3. Countdown Logic
//     useEffect(() => {
//         if(!departureDate) return;
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

//     // Sync selected seats with modal input
//     useEffect(() => {
//         setBookingQty(selectedSeats.length);
//     }, [selectedSeats]);

//     // 4. Handle "Book Now" Click -> OPENS MODAL
//     const handleBookClick = () => {
//         if (!user) {
//             return Swal.fire("Login Required", "Please login to book tickets.", "warning");
//         }
//         if (selectedSeats.length === 0) {
//             return Swal.fire("No Seats Selected", "Please select at least one seat from the map.", "info");
//         }
//         // Open the modal using standard HTML dialog method
//         document.getElementById('booking_modal').showModal();
//     }

//     // 5. FINAL SUBMISSION (From Modal)
//     const handleConfirmBooking = async (e) => {
//         e.preventDefault();

//         const bookingData = {
//             ticketId: _id,
//             ticketTitle: title,
//             customerEmail: user?.email,
//             customerName: user?.displayName,
//             vendorEmail: vendorEmail, 
//             from, to, transportType, 
//             unitPrice: price,
//             bookingQty: selectedSeats.length,
//             seatNumbers: selectedSeats,
//             totalPrice: price * selectedSeats.length,
//             departureDate,
//             photo,
//             status: 'pending'
//         }

//         try {
//             const res = await axiosSecure.post('/bookings', bookingData);
//             if(res.data.insertedId){
//                 document.getElementById('booking_modal').close(); 
//                 Swal.fire({
//                     title: "Booking Requested!",
//                     text: "Waiting for vendor approval.",
//                     icon: "success",
//                     confirmButtonColor: "#2563EB"
//                 });
//                 navigate('/dashboard/my-booked-tickets');
//             }
//         } catch (error) {
//             console.error(error);
//             Swal.fire("Error", "Booking Failed", "error");
//         }
//     }

//     return (
//         <div className="min-h-screen bg-base-200 py-10 font-poppins">
//             <div className="max-w-7xl mx-auto px-4">
                
//                 {/* Banner */}
//                 <div className="mb-8">
//                     <h1 className="text-3xl font-bold text-[#1e3a8a]">{title}</h1>
//                     <div className="flex items-center gap-2 text-slate-500 text-sm mt-1">
//                         <span>{transportType}</span>
//                         <span>•</span>
//                         <span>{from} to {to}</span>
//                     </div>
//                 </div>

//                 <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    
//                     {/* LEFT COLUMN: Details */}
//                     <div className="lg:col-span-2 space-y-8">
//                         <div className="rounded-2xl overflow-hidden shadow-card h-[400px]">
//                             <img src={photo} alt="Ticket" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"/>
//                         </div>

//                         <div className="bg-white p-8 rounded-2xl shadow-card border border-gray-100">
//                             <h2 className="text-xl font-bold text-[#1e3a8a] mb-6 border-b pb-4">Trip Information</h2>
//                             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                                 {/* Info Items */}
//                                 <div className="flex items-start gap-4">
//                                     <div className="p-3 bg-blue-50 rounded-lg text-primary text-xl"><FaClock /></div>
//                                     <div>
//                                         <p className="text-xs text-slate-400 uppercase font-bold tracking-wider">Departure</p>
//                                         <p className="font-semibold text-slate-700">{new Date(departureDate).toLocaleString()}</p>
//                                     </div>
//                                 </div>
//                                 <div className="flex items-start gap-4">
//                                     <div className="p-3 bg-blue-50 rounded-lg text-primary text-xl"><FaChair /></div>
//                                     <div>
//                                         <p className="text-xs text-slate-400 uppercase font-bold tracking-wider">Availability</p>
//                                         <p className="font-semibold text-slate-700">{quantity} Seats Left</p>
//                                     </div>
//                                 </div>
//                                 <div className="flex items-start gap-4">
//                                     <div className="p-3 bg-blue-50 rounded-lg text-primary text-xl"><FaMapMarkerAlt /></div>
//                                     <div>
//                                         <p className="text-xs text-slate-400 uppercase font-bold tracking-wider">Route</p>
//                                         <p className="font-semibold text-slate-700">{from} ➝ {to}</p>
//                                     </div>
//                                 </div>
//                             </div>
                            
//                             {/* Perks */}
//                             <div className="mt-8 pt-6 border-t border-gray-100">
//                                 <div className="flex gap-2 flex-wrap">
//                                     {Array.isArray(perks) && perks.map((perk, i) => (
//                                         <span key={i} className="badge badge-lg bg-gray-100 text-slate-600 border-none px-4 py-3 gap-2">
//                                             <FaCheckCircle className="text-green-500 text-xs" /> {perk}
//                                         </span>
//                                     ))}
//                                 </div>
//                             </div>
//                         </div>
//                     </div>

//                     {/* RIGHT COLUMN: Booking Panel */}
//                     <div className="lg:col-span-1">
//                         <div className="bg-white rounded-2xl shadow-card border border-gray-100 sticky top-24 overflow-hidden">
                            
//                             {/* Timer */}
//                             <div className={`p-4 text-center text-white font-bold ${isExpired ? 'bg-red-500' : 'bg-[#1e3a8a]'}`}>
//                                 {isExpired ? (
//                                     <span className="flex items-center justify-center gap-2"><FaExclamationTriangle /> Booking Closed</span>
//                                 ) : (
//                                     <div className="flex flex-col">
//                                         <span className="text-xs opacity-80 uppercase tracking-widest font-normal">Departing In</span>
//                                         <span className="text-xl font-mono">{timeLeft}</span>
//                                     </div>
//                                 )}
//                             </div>

//                             <div className="p-6">
//                                 <div className="flex justify-between items-center mb-6">
//                                     <span className="text-slate-500 font-medium">Price per seat</span>
//                                     <span className="text-2xl font-bold text-primary">${price}</span>
//                                 </div>

//                                 {/* SEAT MAP COMPONENT */}
//                                 <div className="bg-gray-50 border rounded-xl p-4 mb-6">
//                                     <p className="text-center text-xs text-slate-400 mb-4 uppercase font-bold tracking-wider">Select Your Seats</p>
//                                     {isExpired || quantity === 0 ? (
//                                         <div className="text-center text-red-400 font-bold">Unavailable</div>
//                                     ) : alreadyBooked ? (
//                                         <div className="text-center text-green-500 font-bold">Already Booked</div>
//                                     ) : (
//                                         <SeatMap 
//                                             takenSeats={takenSeats} 
//                                             selectedSeats={selectedSeats} 
//                                             setSelectedSeats={setSelectedSeats} 
//                                             price={price} 
//                                         />
//                                     )}
//                                 </div>

//                                 {/* Summary */}
//                                 <div className="space-y-3 mb-6">
//                                     <div className="flex justify-between text-lg font-bold text-[#1e3a8a] border-t pt-3">
//                                         <span>Total</span>
//                                         <span>${selectedSeats.length * price}</span>
//                                     </div>
//                                 </div>

//                                 {/* BOOK NOW BUTTON -> Triggers Modal */}
//                                 <button 
//                                     onClick={handleBookClick} 
//                                     disabled={isExpired || quantity === 0 || alreadyBooked || selectedSeats.length === 0}
//                                     className="btn btn-primary w-full h-12 shadow-lg shadow-blue-200 text-lg font-bold disabled:bg-gray-200 disabled:text-gray-400">
//                                     {alreadyBooked ? "View My Ticket" : "Book Now"}
//                                 </button>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             {/* --- REQUIREMENT: BOOKING MODAL --- */}
//             <dialog id="booking_modal" className="modal modal-bottom sm:modal-middle">
//                 <div className="modal-box">
//                     <form method="dialog">
//                         {/* Close button */}
//                         <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"><FaTimes/></button>
//                     </form>
                    
//                     <h3 className="font-bold text-lg text-[#1e3a8a] mb-4">Confirm Booking</h3>
                    
//                     <form onSubmit={handleConfirmBooking}>
//                         <div className="form-control mb-4">
//                             <label className="label">
//                                 <span className="label-text font-semibold">Selected Seats</span>
//                             </label>
//                             {/* Input Field: Shows quantity (Read Only because controlled by Map) */}
//                             <input 
//                                 type="number" 
//                                 value={bookingQty}
//                                 readOnly
//                                 className="input input-bordered w-full bg-gray-100 font-bold text-lg" 
//                             />
//                             <label className="label">
//                                 <span className="label-text-alt text-primary">Seats: {selectedSeats.join(", ")}</span>
//                             </label>
//                         </div>

//                         <div className="flex justify-between items-center bg-blue-50 p-4 rounded-lg mb-6 border border-blue-100">
//                             <span className="font-semibold text-gray-600">Total Amount:</span>
//                             <span className="font-bold text-xl text-primary">${price * bookingQty}</span>
//                         </div>

//                         <button type="submit" className="btn btn-primary w-full">Confirm Payment</button>
//                     </form>
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
import SeatMap from "../../components/SeatMap"; 
import { FaMapMarkerAlt, FaBus, FaClock, FaCheckCircle, FaExclamationTriangle, FaChair, FaTimes } from "react-icons/fa";

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
    
    // Modal State
    const [bookingQty, setBookingQty] = useState(1); // Default to 1

    const { _id, title, from, to, transportType, price, quantity, perks, photo, departureDate, vendorEmail } = ticket;

    // 1. Fetch Live Taken Seats
    useEffect(() => {
        axiosSecure.get(`/tickets/taken-seats/${_id}`)
            .then(res => setTakenSeats(res.data));
    }, [_id, axiosSecure]);

    // 2. Check if User already booked
    useEffect(() => {
        if(user?.email) {
            axiosSecure.get(`/bookings?email=${user.email}`)
                .then(res => {
                    const exists = res.data.find(b => b.ticketId === _id);
                    if(exists) setAlreadyBooked(true);
                })
        }
    }, [user, _id, axiosSecure]);

    // 3. Countdown Logic
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

    // Sync selected seats with modal input (Optional convenience)
    useEffect(() => {
        if (selectedSeats.length > 0) {
            setBookingQty(selectedSeats.length);
        }
    }, [selectedSeats]);

    // 4. Handle "Book Now" Click -> OPENS MODAL
    const handleBookClick = () => {
        if (!user) {
            return Swal.fire("Login Required", "Please login to book tickets.", "warning");
        }
        // Open the modal using standard HTML dialog method
        document.getElementById('booking_modal').showModal();
    }

    // 5. FINAL SUBMISSION (From Modal)
    const handleConfirmBooking = async (e) => {
        e.preventDefault();

        // VALIDATION: Check if quantity is valid
        if (bookingQty > quantity) {
            return Swal.fire("Error", `Only ${quantity} seats are available.`, "error");
        }
        if (bookingQty < 1) {
            return Swal.fire("Error", "You must book at least 1 ticket.", "error");
        }

        const bookingData = {
            ticketId: _id,
            ticketTitle: title,
            customerEmail: user?.email,
            customerName: user?.displayName,
            vendorEmail: vendorEmail, 
            from, to, transportType, 
            unitPrice: price,
            bookingQty: parseInt(bookingQty), // Use the Typed Quantity
            seatNumbers: selectedSeats.length === parseInt(bookingQty) ? selectedSeats : [], // Only save seats if they match count
            totalPrice: price * parseInt(bookingQty),
            departureDate,
            photo,
            status: 'pending'
        }

        try {
            const res = await axiosSecure.post('/bookings', bookingData);
            if(res.data.insertedId){
                document.getElementById('booking_modal').close(); 
                Swal.fire({
                    title: "Booking Requested!",
                    text: "Waiting for vendor approval.",
                    icon: "success",
                    confirmButtonColor: "#2563EB"
                });
                navigate('/dashboard/my-booked-tickets');
            }
        } catch (error) {
            console.error(error);
            Swal.fire("Error", "Booking Failed", "error");
        }
    }

    return (
        <div className="min-h-screen bg-base-200 py-10 font-poppins">
            <div className="max-w-7xl mx-auto px-4">
                
                {/* Banner */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-[#1e3a8a]">{title}</h1>
                    <div className="flex items-center gap-2 text-slate-500 text-sm mt-1">
                        <span>{transportType}</span>
                        <span>•</span>
                        <span>{from} to {to}</span>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    
                    {/* LEFT COLUMN: Details */}
                    <div className="lg:col-span-2 space-y-8">
                        <div className="rounded-2xl overflow-hidden shadow-card h-[400px]">
                            <img src={photo} alt="Ticket" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"/>
                        </div>

                        <div className="bg-white p-8 rounded-2xl shadow-card border border-gray-100">
                            <h2 className="text-xl font-bold text-[#1e3a8a] mb-6 border-b pb-4">Trip Information</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="flex items-start gap-4">
                                    <div className="p-3 bg-blue-50 rounded-lg text-primary text-xl"><FaClock /></div>
                                    <div>
                                        <p className="text-xs text-slate-400 uppercase font-bold tracking-wider">Departure</p>
                                        <p className="font-semibold text-slate-700">{new Date(departureDate).toLocaleString()}</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="p-3 bg-blue-50 rounded-lg text-primary text-xl"><FaChair /></div>
                                    <div>
                                        <p className="text-xs text-slate-400 uppercase font-bold tracking-wider">Availability</p>
                                        <p className="font-semibold text-slate-700">{quantity} Seats Left</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="p-3 bg-blue-50 rounded-lg text-primary text-xl"><FaMapMarkerAlt /></div>
                                    <div>
                                        <p className="text-xs text-slate-400 uppercase font-bold tracking-wider">Route</p>
                                        <p className="font-semibold text-slate-700">{from} ➝ {to}</p>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="mt-8 pt-6 border-t border-gray-100">
                                <div className="flex gap-2 flex-wrap">
                                    {Array.isArray(perks) && perks.map((perk, i) => (
                                        <span key={i} className="badge badge-lg bg-gray-100 text-slate-600 border-none px-4 py-3 gap-2">
                                            <FaCheckCircle className="text-green-500 text-xs" /> {perk}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT COLUMN: Booking Panel */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-2xl shadow-card border border-gray-100 sticky top-24 overflow-hidden">
                            
                            {/* Timer */}
                            <div className={`p-4 text-center text-white font-bold ${isExpired ? 'bg-red-500' : 'bg-[#1e3a8a]'}`}>
                                {isExpired ? (
                                    <span className="flex items-center justify-center gap-2"><FaExclamationTriangle /> Booking Closed</span>
                                ) : (
                                    <div className="flex flex-col">
                                        <span className="text-xs opacity-80 uppercase tracking-widest font-normal">Departing In</span>
                                        <span className="text-xl font-mono">{timeLeft}</span>
                                    </div>
                                )}
                            </div>

                            <div className="p-6">
                                <div className="flex justify-between items-center mb-6">
                                    <span className="text-slate-500 font-medium">Price per seat</span>
                                    <span className="text-2xl font-bold text-primary">${price}</span>
                                </div>

                                {/* SEAT MAP */}
                                <div className="bg-gray-50 border rounded-xl p-4 mb-6">
                                    <p className="text-center text-xs text-slate-400 mb-4 uppercase font-bold tracking-wider">Select Your Seats (Optional)</p>
                                    {isExpired || quantity === 0 ? (
                                        <div className="text-center text-red-400 font-bold">Unavailable</div>
                                    ) : alreadyBooked ? (
                                        <div className="text-center text-green-500 font-bold">Already Booked</div>
                                    ) : (
                                        <SeatMap 
                                            takenSeats={takenSeats} 
                                            selectedSeats={selectedSeats} 
                                            setSelectedSeats={setSelectedSeats} 
                                            price={price} 
                                        />
                                    )}
                                </div>

                                <div className="space-y-3 mb-6">
                                    <div className="flex justify-between text-lg font-bold text-[#1e3a8a] border-t pt-3">
                                        <span>Total</span>
                                        <span>${(bookingQty > 0 ? bookingQty : selectedSeats.length) * price}</span>
                                    </div>
                                </div>

                                <button 
                                    onClick={handleBookClick} 
                                    disabled={isExpired || quantity === 0 || alreadyBooked}
                                    className="btn btn-primary w-full h-12 shadow-lg shadow-blue-200 text-lg font-bold disabled:bg-gray-200 disabled:text-gray-400">
                                    {alreadyBooked ? "View My Ticket" : "Book Now"}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* --- REQUIREMENT: BOOKING MODAL WITH EDITABLE INPUT --- */}
            <dialog id="booking_modal" className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"><FaTimes/></button>
                    </form>
                    
                    <h3 className="font-bold text-lg text-[#1e3a8a] mb-4">Confirm Booking</h3>
                    
                    <form onSubmit={handleConfirmBooking}>
                        <div className="form-control mb-4">
                            <label className="label">
                                <span className="label-text font-semibold">Enter Ticket Quantity</span>
                                <span className="label-text-alt">Available: {quantity}</span>
                            </label>
                            
                            {/* ✅ FIXED: Input is now Editable */}
                            <input 
                                type="number" 
                                min="1"
                                max={quantity}
                                value={bookingQty}
                                onChange={(e) => setBookingQty(e.target.value)}
                                className="input input-bordered w-full font-bold text-lg focus:border-primary focus:outline-none" 
                                required
                            />
                            
                            {/* Helper text showing selected seats if any */}
                            {selectedSeats.length > 0 && (
                                <label className="label">
                                    <span className="label-text-alt text-primary">Map Selection: {selectedSeats.join(", ")}</span>
                                </label>
                            )}
                        </div>

                        <div className="flex justify-between items-center bg-blue-50 p-4 rounded-lg mb-6 border border-blue-100">
                            <span className="font-semibold text-gray-600">Total Amount:</span>
                            <span className="font-bold text-xl text-primary">${price * bookingQty}</span>
                        </div>

                        <button type="submit" className="btn btn-primary w-full">Confirm Payment</button>
                    </form>
                </div>
            </dialog>

        </div>
    );
};

export default TicketDetails;