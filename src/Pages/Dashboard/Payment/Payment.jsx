import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { useLocation } from "react-router-dom";

// Add your Public Key from Stripe Dashboard here
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK);

const Payment = () => {
    const location = useLocation();
    const booking = location.state; // We will pass booking data via state
    const total = booking?.totalPrice || 0;

    return (
        <div className="w-full">
            <h2 className="text-3xl text-center font-bold mb-10">Make Payment</h2>
            <Elements stripe={stripePromise}>
                <CheckoutForm booking={booking} price={total} />
            </Elements>
        </div>
    );
};

export default Payment;