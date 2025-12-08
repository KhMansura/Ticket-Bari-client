import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const CheckoutForm = ({ booking, price }) => {
    const stripe = useStripe();
    const elements = useElements();
    const axiosSecure = useAxiosSecure();
    const [clientSecret, setClientSecret] = useState('');
    const [processing, setProcessing] = useState(false);

    useEffect(() => {
        if (price > 0) {
            axiosSecure.post('/create-payment-intent', { price })
                .then(res => {
                    setClientSecret(res.data.clientSecret);
                })
        }
    }, [price, axiosSecure]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) return;

        const card = elements.getElement(CardElement);
        if (card == null) return;

        setProcessing(true);

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            console.log('error', error);
            setProcessing(false);
            return;
        }

        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        name: booking?.customerName || 'anonymous',
                        email: booking?.customerEmail || 'anonymous'
                    },
                },
            },
        );

        if (confirmError) {
            console.log(confirmError);
            setProcessing(false);
        }

        if (paymentIntent.status === 'succeeded') {
            // Save payment info to database
            const payment = {
                email: booking.customerEmail, 
                transactionId: paymentIntent.id,
                price,
                date: new Date(),
                bookingId: booking._id,
                ticketTitle: booking.ticketTitle,
                status: 'paid'
            }

            const res = await axiosSecure.post('/payments', payment);
            if (res.data.insertedId) {
                Swal.fire("Success", "Payment Successful!", "success");
            }
            setProcessing(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="w-2/3 mx-auto border p-8 rounded shadow-lg bg-base-100">
            <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#424770',
                            '::placeholder': { color: '#aab7c4' },
                        },
                        invalid: { color: '#9e2146' },
                    },
                }}
            />
            <button className="btn btn-primary btn-sm mt-4 w-full" type="submit" disabled={!stripe || !clientSecret || processing}>
                {processing ? "Processing..." : `Pay $${price}`}
            </button>
        </form>
    );
};

export default CheckoutForm;