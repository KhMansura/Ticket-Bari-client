// export default TicketDetails;
import { useLoaderData, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../providers/AuthProviders";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const TicketDetails = () => {
    const ticket = useLoaderData(); 
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [bookingQty, setBookingQty] = useState(1);
    const axiosSecure = useAxiosSecure();

    // Countdown State
    const [timeLeft, setTimeLeft] = useState("");
    const [isExpired, setIsExpired] = useState(false);
    
    const { _id, title, from, to, transportType, price, quantity, perks, photo, departureDate, vendorEmail } = ticket;

    // --- COUNTDOWN LOGIC ---
    useEffect(() => {
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

        // 3. Use axiosSecure
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

                    {/* Countdown Badge */}
                    <div className={`badge badge-lg p-4 mb-4 ${isExpired ? 'badge-error text-white' : 'badge-primary'}`}>
                        {timeLeft}
                    </div>

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
                        <button className="btn btn-primary w-full"
                        disabled={quantity === 0 || isExpired} 
                        onClick={()=>document.getElementById('booking_modal').showModal()}>
                           {isExpired ? "Expired" : quantity === 0 ? "Sold Out" : "Book Now"}
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