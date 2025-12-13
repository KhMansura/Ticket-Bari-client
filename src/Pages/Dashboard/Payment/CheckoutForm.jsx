// import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
// import { useEffect, useState } from "react";
// import useAxiosSecure from "../../../hooks/useAxiosSecure";
// import Swal from "sweetalert2";

// const CheckoutForm = ({ booking, price }) => {
//     const stripe = useStripe();
//     const elements = useElements();
//     const axiosSecure = useAxiosSecure();
//     const [clientSecret, setClientSecret] = useState('');
//     const [processing, setProcessing] = useState(false);

//     useEffect(() => {
//         if (price > 0) {
//             axiosSecure.post('/create-payment-intent', { price })
//                 .then(res => {
//                     setClientSecret(res.data.clientSecret);
//                 })
//         }
//     }, [price, axiosSecure]);

//     const handleSubmit = async (event) => {
//         event.preventDefault();

//         if (!stripe || !elements) return;

//         const card = elements.getElement(CardElement);
//         if (card == null) return;

//         setProcessing(true);

//         const { error, paymentMethod } = await stripe.createPaymentMethod({
//             type: 'card',
//             card,
//         });

//         if (error) {
//             console.log('error', error);
//             setProcessing(false);
//             return;
//         }

//         const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
//             clientSecret,
//             {
//                 payment_method: {
//                     card: card,
//                     billing_details: {
//                         name: booking?.customerName || 'anonymous',
//                         email: booking?.customerEmail || 'anonymous'
//                     },
//                 },
//             },
//         );

//         if (confirmError) {
//             console.log(confirmError);
//             setProcessing(false);
//         }

//         if (paymentIntent.status === 'succeeded') {
//             // Save payment info to database
//             const payment = {
//                 email: booking.customerEmail, 
//                 transactionId: paymentIntent.id,
//                 price,
//                 date: new Date(),
//                 bookingId: booking._id,
//                 ticketTitle: booking.ticketTitle,
//                 status: 'paid'
//             }

//             const res = await axiosSecure.post('/payments', payment);
//             if (res.data.insertedId) {
//                 Swal.fire("Success", "Payment Successful!", "success");
//             }
//             setProcessing(false);
//         }
//     };

//     return (
//         <form onSubmit={handleSubmit} className="w-2/3 mx-auto border p-8 rounded shadow-lg bg-base-100">
//             <CardElement
//                 options={{
//                     style: {
//                         base: {
//                             fontSize: '16px',
//                             color: '#424770',
//                             '::placeholder': { color: '#aab7c4' },
//                         },
//                         invalid: { color: '#9e2146' },
//                     },
//                 }}
//             />
//             <button className="btn btn-primary btn-sm mt-4 w-full" type="submit" disabled={!stripe || !clientSecret || processing}>
//                 {processing ? "Processing..." : `Pay $${price}`}
//             </button>
//         </form>
//     );
// };

// export default CheckoutForm;
import { CardNumberElement, CardExpiryElement, CardCvcElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure"; // Verify your hook path
import Swal from "sweetalert2";
import { useContext } from "react";
import { AuthContext } from "../../../providers/AuthProviders"; // Verify your auth path
import { useNavigate } from "react-router-dom";

const CheckoutForm = ({ booking, price }) => {
    const stripe = useStripe();
    const elements = useElements();
    const axiosSecure = useAxiosSecure();
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    
    const [clientSecret, setClientSecret] = useState('');
    const [processing, setProcessing] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (price > 0) {
            axiosSecure.post('/create-payment-intent', { price: price })
                .then(res => {
                    setClientSecret(res.data.clientSecret);
                })
        }
    }, [axiosSecure, price]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        // Get individual elements
        const cardNum = elements.getElement(CardNumberElement);
        const cardExp = elements.getElement(CardExpiryElement);
        const cardCvc = elements.getElement(CardCvcElement);

        if (cardNum == null || cardExp == null || cardCvc == null) {
            return;
        }

        // 1. Create Payment Method (Optional check)
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: cardNum, // You only need to pass the number element, Stripe handles the rest link
            billing_details: {
                name: user?.displayName || 'Anonymous',
                email: user?.email || 'unknown',
                address: {
                    postal_code: event.target.postal.value // Get postal code from manual input
                }
            }
        });

        if (error) {
            console.log('Payment Error', error);
            setError(error.message);
            return; // Stop if error
        } else {
            setError('');
        }

        setProcessing(true);

        // 2. Confirm Payment
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: cardNum,
                billing_details: {
                    name: user?.displayName || 'Anonymous',
                    email: user?.email || 'unknown',
                    address: {
                        postal_code: event.target.postal.value
                    }
                }
            }
        });

        if (confirmError) {
            console.log('Confirm Error', confirmError);
            setError(confirmError.message);
            setProcessing(false);
        } else {
            console.log('Payment Intent', paymentIntent);
            if (paymentIntent.status === 'succeeded') {
                
                // 3. Save to Database
                const paymentInfo = {
                    email: user.email,
                    transactionId: paymentIntent.id,
                    price: price,
                    date: new Date(),
                    bookingId: booking._id,
                    ticketId: booking.ticketId,
                    ticketTitle: booking.ticketTitle,
                    bookingQty: booking.bookingQty,
                    status: 'paid'
                }
                

                const res = await axiosSecure.post('/payments', paymentInfo);
                if (res.data?.insertedId) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Payment Successful',
                        text: `Transaction ID: ${paymentIntent.id}`
                    });
                    navigate('/dashboard/my-booked-tickets');
                }
                setProcessing(false);
            }
        }
    };

    // Styling for Stripe Elements
    const elementStyle = {
        style: {
            base: {
                fontSize: '16px',
                color: '#424770',
                '::placeholder': {
                    color: '#aab7c4',
                },
            },
            invalid: {
                color: '#9e2146',
            },
        },
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            
            {/* 1. Card Number Line */}
            <div className="form-control">
                <label className="label">
                    <span className="label-text font-semibold text-slate-600">Card Number</span>
                </label>
                <div className="input input-bordered flex items-center bg-white">
                    <CardNumberElement options={elementStyle} className="w-full" />
                </div>
            </div>

            {/* 2. Expiration Date Line */}
            <div className="form-control">
                <label className="label">
                    <span className="label-text font-semibold text-slate-600">Expiration Date (MM/YY)</span>
                </label>
                <div className="input input-bordered flex items-center bg-white">
                    <CardExpiryElement options={elementStyle} className="w-full" />
                </div>
            </div>

            {/* 3. Postal Code Line (Standard Input) */}
            <div className="form-control">
                <label className="label">
                    <span className="label-text font-semibold text-slate-600">Postal Code</span>
                </label>
                <input 
                    type="text" 
                    name="postal" 
                    placeholder="12345" 
                    className="input input-bordered bg-white w-full" 
                    required 
                />
            </div>

            {/* 4. CVC Line */}
            <div className="form-control">
                <label className="label">
                    <span className="label-text font-semibold text-slate-600">CVC (3-digit code)</span>
                </label>
                <div className="input input-bordered flex items-center bg-white">
                    <CardCvcElement options={elementStyle} className="w-full" />
                </div>
            </div>

            {/* Error Message */}
            {error && <p className="text-red-600 text-sm mt-2">{error}</p>}

            {/* Submit Button */}
            <button 
                className="btn btn-primary w-full mt-6 text-lg font-bold shadow-lg" 
                type="submit" 
                disabled={!stripe || !clientSecret || processing}
            >
                {processing ? <span className="loading loading-spinner"></span> : `Pay $${price}`}
            </button>
        </form>
    );
};

export default CheckoutForm;