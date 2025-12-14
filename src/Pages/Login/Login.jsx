// import { useContext, useState } from "react";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import Swal from "sweetalert2";
// import { AuthContext } from "../../providers/AuthProviders";
// import { FaEye, FaEyeSlash } from "react-icons/fa";

// const Login = () => {
//     const { signIn, googleSignIn } = useContext(AuthContext);
//     const [showPassword, setShowPassword] = useState(false);
//     const navigate = useNavigate();
//     const location = useLocation();

//     const from = location.state?.from?.pathname || "/";
   
    

//     const handleLogin = event => {
//         event.preventDefault();
//         const form = event.target;
//         const email = form.email.value;
//         const password = form.password.value;

//         signIn(email, password)
//             .then(result => {
//                 const user = result.user;
//                 Swal.fire({ title: 'User Login Successful',
//                     icon: 'success', 
//                     showConfirmButton: false, 
//                     timer: 1500 });
//                 navigate(from, { replace: true });
//             })
//             // 1. ADDED ERROR HANDLING
//             .catch(error => {
//                 Swal.fire({
//                     title: 'Error!',
//                     text: error.message,
//                     icon: 'error',
//                     confirmButtonText: 'Try Again'
//                 });
//             });
//     }

//     const handleGoogleLogin = () => {
//         googleSignIn()
//             .then(result => {
//                 const user = result.user;
//                 navigate(from, { replace: true });
//             })
//             .catch(error => {
//                 Swal.fire('Error', error.message, 'error');
//             });
//     }

//     return (
//         <div className="hero min-h-screen bg-base-200">
//             <div className="hero-content flex-col md:flex-row-reverse">
//                 <div className="text-center md:text-left">
//                     <h1 className="text-5xl font-bold">Login now!</h1>
//                     <p className="py-6">Access your dashboard and manage your tickets.</p>
//                 </div>
//                 <div className="card md:w-1/2 max-w-sm shadow-2xl bg-base-100">
//                     <form onSubmit={handleLogin} className="card-body">
//                         <div className="form-control">
//                             <label className="label"><span className="label-text">Email</span></label>
//                             <input type="email" name="email" placeholder="email" className="input input-bordered" />
//                         </div>
//                         <div className="form-control">
//                             <label className="label"><span className="label-text">Password</span></label>

//                             {/* <input type="password" name="password" placeholder="password" className="input input-bordered" /> */}
//                             <div className="relative">
//                                 <input 
//                                     type={showPassword ? "text" : "password"} 
//                                     name="password" 
//                                     placeholder="password" 
//                                     className="input input-bordered w-full" 
//                                 />
//                                 <span 
//                                     className="absolute top-4 right-3 cursor-pointer"
//                                     onClick={() => setShowPassword(!showPassword)}
//                                 >
//                                     {showPassword ? <FaEyeSlash /> : <FaEye />}
//                                 </span>
//                             </div>
                            
//                             <label className="label">
//                                 <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
//                             </label>
//                         </div>
//                         <div className="form-control mt-6">
//                             <input className="btn btn-primary" type="submit" value="Login" />
//                         </div>
//                     </form>
//                     <div className="text-center mb-4 px-6">
//                         <div className="divider">OR</div>
//                         <button onClick={handleGoogleLogin} className="btn btn-outline w-full">Google Login</button>
//                         <p className="mt-4">New here? <Link to="/register" className="text-primary font-bold">Create an account</Link></p>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Login;
import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../../providers/AuthProviders";
import { FaEye, FaEyeSlash, FaGoogle, FaEnvelope, FaLock } from "react-icons/fa";

const Login = () => {
    const { signIn, googleSignIn } = useContext(AuthContext);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || "/";

    const handleLogin = event => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;

        signIn(email, password)
            .then(result => {
                const user = result.user;
                Swal.fire({ 
                    title: 'Welcome Back!',
                    text: 'Login Successful',
                    icon: 'success', 
                    showConfirmButton: false, 
                    timer: 1500,
                    confirmButtonColor: "#2563EB"
                });
                navigate("/", { replace: true });
            })
            .catch(error => {
                Swal.fire({
                    title: 'Login Failed',
                    text: 'Incorrect email or password.',
                    icon: 'error',
                    confirmButtonText: 'Try Again',
                    confirmButtonColor: "#d33"
                });
            });
    }

    const handleGoogleLogin = () => {
        googleSignIn()
            .then(result => {
                const user = result.user;
                Swal.fire({ 
                    title: 'Welcome!',
                    text: `Logged in as ${user.displayName}`,
                    icon: 'success', 
                    timer: 1500,
                    showConfirmButton: false
                });
                navigate(from, { replace: true });
            })
            .catch(error => {
                Swal.fire('Error', error.message, 'error');
            });
    }

    return (
        <div className="min-h-screen bg-base-200 flex items-center justify-center py-10 px-4 font-poppins">
            <div className="max-w-5xl w-full bg-base-100 shadow-2xl rounded-2xl overflow-hidden flex flex-col md:flex-row">
                
                {/* LEFT SIDE: Professional Branding Section */}
                <div className="md:w-1/2 bg-gradient-to-br from-[#1e3a8a] to-[#2563EB] p-10 flex flex-col justify-center text-white relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                    
                    <div className="relative z-10 text-center md:text-left">
                        <h1 className="text-4xl font-bold mb-4">Welcome Back!</h1>
                        <p className="text-blue-100 text-lg mb-8 leading-relaxed">
                            Access your dashboard, manage your bookings, and explore new routes with TicketBari.
                        </p>
                        
                        <div className="hidden md:flex gap-4 mt-auto">
                            <div className="p-4 bg-white/10 rounded-lg backdrop-blur-sm">
                                <h3 className="font-bold text-2xl">50k+</h3>
                                <p className="text-sm text-blue-200">Users</p>
                            </div>
                            <div className="p-4 bg-white/10 rounded-lg backdrop-blur-sm">
                                <h3 className="font-bold text-2xl">100%</h3>
                                <p className="text-sm text-blue-200">Secure</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* RIGHT SIDE: Login Form */}
                <div className="md:w-1/2 p-8 md:p-12">
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold text-[#1e3a8a]">Login</h2>
                        <p className="text-slate-500 mt-2">Please enter your details</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-5">
                        {/* Email Input */}
                        <div className="form-control">
                            <label className="label font-semibold text-[#1e3a8a]">Email Address</label>
                            <div className="relative">
                                <FaEnvelope className="absolute top-4 left-4 text-gray-400" />
                                <input 
                                    type="email" 
                                    name="email" 
                                    placeholder="Enter your email" 
                                    className="input input-bordered w-full pl-11 bg-base-200 focus:bg-white focus:border-primary transition-all rounded-lg h-12" 
                                    required
                                />
                            </div>
                        </div>

                        {/* Password Input */}
                        <div className="form-control">
                            <label className="label font-semibold text-[#1e3a8a]">Password</label>
                            <div className="relative">
                                <FaLock className="absolute top-4 left-4 text-gray-400" />
                                <input 
                                    type={showPassword ? "text" : "password"} 
                                    name="password" 
                                    placeholder="Enter password" 
                                    className="input input-bordered w-full pl-11 bg-base-200 focus:bg-white focus:border-primary transition-all rounded-lg h-12" 
                                    required
                                />
                                <span 
                                    className="absolute top-4 right-4 cursor-pointer text-gray-500 hover:text-primary transition-colors"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </span>
                            </div>
                            <label className="label">
                                <a href="#" className="label-text-alt link link-hover text-primary font-medium">Forgot password?</a>
                            </label>
                        </div>

                        {/* Login Button */}
                        <div className="form-control mt-4">
                            <button className="btn btn-primary w-full h-12 text-lg font-bold shadow-lg shadow-blue-200 hover:-translate-y-1 transition-transform">
                                Sign In
                            </button>
                        </div>
                    </form>

                    {/* Divider */}
                    <div className="divider my-6 text-slate-400 text-sm">OR CONTINUE WITH</div>

                    {/* Google Login */}
                    <button 
                        onClick={handleGoogleLogin} 
                        className="btn btn-outline w-full h-12 border-gray-300 text-slate-600 hover:bg-base-200 hover:text-black hover:border-gray-400 flex items-center justify-center gap-2"
                    >
                        <FaGoogle className="text-red-500 text-xl" />
                        <span className="font-semibold">Sign in with Google</span>
                    </button>

                    {/* Register Link */}
                    <p className="text-center mt-8 text-slate-600">
                        Don't have an account? 
                        <Link to="/register" className="text-primary font-bold ml-1 hover:underline">Create an account</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;