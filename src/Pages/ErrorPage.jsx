import { Link, useRouteError } from "react-router-dom";
import { FaHome, FaExclamationTriangle } from "react-icons/fa";

const ErrorPage = () => {
    const error = useRouteError();

    return (
        <div className="min-h-screen bg-base-200 flex items-center justify-center p-4 font-poppins relative overflow-hidden">
            
            {/* Background */}
            <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
            <div className="absolute -top-20 -right-20 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-50"></div>
            <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-indigo-100 rounded-full blur-3xl opacity-50"></div>

            {/* Main Error Card */}
            <div className="max-w-lg w-full bg-white/80 backdrop-blur-md shadow-2xl rounded-3xl p-10 text-center border border-white relative z-10">
                
                {/* Icon & 404 Text */}
                <div className="flex justify-center mb-6">
                    <div className="relative">
                        <h1 className="text-9xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#1e3a8a] to-[#2563EB] tracking-tighter drop-shadow-sm">
                            404
                        </h1>
                        <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-white px-2">
                            <FaExclamationTriangle className="text-4xl text-amber-500 animate-bounce" />
                        </div>
                    </div>
                </div>

                {/* Error Message */}
                <h2 className="text-3xl font-bold text-[#1e3a8a] mb-2">Page Not Found</h2>
                <p className="text-slate-500 mb-8 text-lg">
                    Oops! The page you are looking for seems to have taken a different route.
                </p>

                {/* Technical Error Details */}
                {error && (
                    <div className="mb-8 p-4 bg-red-50 rounded-xl border border-red-100 text-sm text-red-500 font-mono inline-block max-w-full overflow-hidden text-ellipsis">
                        <i>{error.statusText || error.message}</i>
                    </div>
                )}

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link to="/">
                        <button className="btn btn-primary w-full sm:w-auto shadow-lg shadow-blue-200 px-8 text-lg font-bold hover:-translate-y-1 transition-transform">
                            <FaHome className="mr-2" /> Back to Home
                        </button>
                    </Link>
                    <button 
                        onClick={() => window.history.back()} 
                        className="btn btn-outline btn-ghost w-full sm:w-auto border-gray-300 text-slate-600 hover:bg-gray-100">
                        Go Back Previous
                    </button>
                </div>

                {/* Footer branding */}
                <div className="mt-10 pt-6 border-t border-gray-100">
                    <p className="text-xs text-slate-400 uppercase tracking-widest font-semibold">
                        TicketBari System
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ErrorPage;