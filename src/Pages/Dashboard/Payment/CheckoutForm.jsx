import { CardNumberElement, CardExpiryElement, CardCvcElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure"; 
import Swal from "sweetalert2";
import { useContext } from "react";
import { AuthContext } from "../../../providers/AuthProviders"; 
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

        // 1. Create Payment Method 
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: cardNum, 
            billing_details: {
                name: user?.displayName || 'Anonymous',
                email: user?.email || 'unknown',
                address: {
                    postal_code: event.target.postal.value 
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

    // Stripe Elements
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

            {/* 3. Postal Code Line */}
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