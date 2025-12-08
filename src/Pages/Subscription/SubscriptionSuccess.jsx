import { Link } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";

const SubscriptionSuccess = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-base-200">
            <div className="card w-96 bg-base-100 shadow-xl text-center p-8">
                <div className="flex justify-center mb-4">
                    <FaCheckCircle className="text-6xl text-success" />
                </div>
                <h2 className="text-3xl font-bold mb-2">Success!</h2>
                <p className="text-gray-500 mb-6">You have successfully subscribed to our newsletter. We have sent a confirmation email to your inbox.</p>
                <Link to="/">
                    <button className="btn btn-primary w-full">Back to Home</button>
                </Link>
            </div>
        </div>
    );
};

export default SubscriptionSuccess;