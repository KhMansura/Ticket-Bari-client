// import React, { useState } from "react";
// import { useContext } from "react";
// import { useForm } from "react-hook-form";
// import { Link, useNavigate } from "react-router-dom"; 
// import axios from "axios";
// import Swal from "sweetalert2";
// import { AuthContext } from "../providers/AuthProviders"; 
// import { FaEye, FaEyeSlash } from "react-icons/fa";


// const image_hosting_key = import.meta.env.VITE_IMGBB_API_KEY;
// const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

// const Register = () => {
//     const { createUser, updateUserProfile, googleSignIn } = useContext(AuthContext);
//     const { register, handleSubmit, reset, formState: { errors } } = useForm();
//     const navigate = useNavigate();
//     // 3. ADD STATE FOR SHOW/HIDE PASSWORD
//     const [showPassword, setShowPassword] = useState(false);

//     const onSubmit = async (data) => {
//         // 1. Upload Image to ImgBB first
//         const imageFile = { image: data.image[0] }
//         const res = await axios.post(image_hosting_api, imageFile, {
//             headers: {
//                 'content-type': 'multipart/form-data'
//             }
//         });

//         if (res.data.success) {
//             const photoURL = res.data.data.display_url; // Get the URL from ImgBB

//             // 2. Create User in Firebase
//             createUser(data.email, data.password)
//                 .then(result => {
//                     const loggedUser = result.user;
                    
//                     // 3. Update Firebase Profile with the new Image URL
//                     updateUserProfile(data.name, photoURL)
//                         .then(() => {
//                             // 4. Save user to Database
//                             const userInfo = { 
//                                 name: data.name, 
//                                 email: data.email, 
//                                 photo: photoURL, // Save the ImgBB URL here
//                                 role: 'user' 
//                             }; 
                            
//                             axios.post('import.meta.env.VITE_SERVER_URL/users', userInfo)
//                                 .then(dbRes => {
//                                     if (dbRes.data.insertedId) {
//                                         reset();
//                                         Swal.fire("Success", "User created successfully!", "success");
//                                         navigate("/");
//                                     }
//                                 })
//                         })
//                 })
//                 .catch(error => {
//                     Swal.fire("Error", error.message, "error");
//                 });
//         }
//     };

//     const handleGoogleSignIn = () => {
//         googleSignIn()
//             .then(result => {
//                 const userInfo = { 
//                     email: result.user.email, 
//                     name: result.user.displayName, 
//                     photo: result.user.photoURL,
//                     role: 'user' 
//                 };
//                 axios.post('import.meta.env.VITE_SERVER_URL/users', userInfo)
//                     .then(() => {
//                         navigate("/");
//                     })
//             })
//     }

//     return (
//         <div className="hero min-h-screen bg-base-200">
//             <div className="hero-content flex-col">
//                 <div className="text-center lg:text-left">
//                     <h1 className="text-5xl font-bold mb-4">Register now!</h1>
//                 </div>
//                 <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
//                     <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                        
//                         {/* Name Field */}
//                         <div className="form-control">
//                             <label className="label"><span className="label-text">Name</span></label>
//                             <input type="text" {...register("name", { required: true })} placeholder="Name" className="input input-bordered" />
//                         </div>

//                         {/* Image Upload Field (Changed from Text URL to File) */}
//                         <div className="form-control">
//                             <label className="label"><span className="label-text">Upload Photo</span></label>
//                             <input type="file" {...register("image", { required: true })} className="file-input file-input-bordered w-full" />
//                         </div>

//                         {/* Email Field */}
//                         <div className="form-control">
//                             <label className="label"><span className="label-text">Email</span></label>
//                             <input type="email" {...register("email", { required: true })} placeholder="email" className="input input-bordered" />
//                         </div>

//                         {/* Password Field */}
//                      {/* --- 4. UPDATED PASSWORD FIELD WITH EYE ICON --- */}
//                         <div className="form-control">
//                             <label className="label"><span className="label-text">Password</span></label>
//                             <div className="relative">
//                                 <input 
//                                     type={showPassword ? "text" : "password"} 
//                                     {...register("password", { 
//                                         required: true, 
//                                         minLength: 6, 
//                                         maxLength: 20,
//                                         pattern: /(?=.*[A-Z])(?=.*[a-z])/ 
//                                     })} 
//                                     placeholder="password" 
//                                     className="input input-bordered w-full pr-10" 
//                                 />
//                                 <span 
//                                     className="absolute top-4 right-3 cursor-pointer text-gray-500"
//                                     onClick={() => setShowPassword(!showPassword)}
//                                 >
//                                     {showPassword ? <FaEyeSlash /> : <FaEye />}
//                                 </span>
//                             </div>
//                             {errors.password?.type === 'minLength' && <span className="text-red-600">Password must be 6 characters</span>}
//                             {errors.password?.type === 'pattern' && <span className="text-red-600">Must have one uppercase and one lowercase</span>}
//                         </div>

//                         <div className="form-control mt-6">
//                             <input className="btn btn-primary" type="submit" value="Register" />
//                         </div>
//                     </form>
//                     <div className="text-center mb-4">
//                         <button onClick={handleGoogleSignIn} className="btn btn-outline btn-accent w-full">Google Login</button>
//                         <p className="mt-2">Already have an account? <Link to="/login" className="font-bold text-primary">Login</Link></p>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Register;
import React, { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom"; 
import axios from "axios";
import Swal from "sweetalert2";
import { AuthContext } from "../providers/AuthProviders"; 
import { FaEye, FaEyeSlash, FaGoogle, FaUser, FaEnvelope, FaLock, FaImage } from "react-icons/fa";

const image_hosting_key = import.meta.env.VITE_IMGBB_API_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const Register = () => {
    const { createUser, updateUserProfile, googleSignIn } = useContext(AuthContext);
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    const onSubmit = async (data) => {
        // 1. Upload Image to ImgBB
        const imageFile = { image: data.image[0] }
        const res = await axios.post(image_hosting_api, imageFile, {
            headers: { 'content-type': 'multipart/form-data' }
        });

        if (res.data.success) {
            const photoURL = res.data.data.display_url;

            // 2. Create User in Firebase
            createUser(data.email, data.password)
                .then(result => {
                    // 3. Update Profile
                    updateUserProfile(data.name, photoURL)
                        .then(() => {
                            // 4. Save to Database
                            const userInfo = { 
                                name: data.name, 
                                email: data.email, 
                                photo: photoURL, 
                                role: 'user' 
                            }; 
                            
                            // axios.post('import.meta.env.VITE_SERVER_URL/users', userInfo)
                            axios.post(`${import.meta.env.VITE_API_URL}/users`, userInfo)
                                .then(dbRes => {
                                    if (dbRes.data.insertedId) {
                                        reset();
                                        Swal.fire({
                                            title: "Account Created!",
                                            text: "Welcome to TicketBari.",
                                            icon: "success",
                                            confirmButtonColor: "#2563EB"
                                        });
                                        navigate("/");
                                    }
                                })
                        })
                })
                .catch(error => {
                    Swal.fire("Registration Failed", error.message, "error");
                });
        }
    };

    const handleGoogleSignIn = () => {
        googleSignIn()
            .then(result => {
                const userInfo = { 
                    email: result.user.email, 
                    name: result.user.displayName, 
                    photo: result.user.photoURL,
                    role: 'user' 
                };
                axios.post(`${import.meta.env.VITE_SERVER_URL}/users`, userInfo)
                    .then(() => {
                        navigate("/");
                    })
            })
            .catch(error => Swal.fire("Error", error.message, "error"));
    }

    return (
        <div className="min-h-screen bg-base-200 flex items-center justify-center py-10 px-4 font-poppins">
            <div className="max-w-5xl w-full bg-base-100 shadow-2xl rounded-2xl overflow-hidden flex flex-col md:flex-row-reverse">
                
                {/* RIGHT SIDE: Branding (Reverse of Login) */}
                <div className="md:w-1/2 bg-gradient-to-br from-[#1e3a8a] to-[#2563EB] p-10 flex flex-col justify-center text-white relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                    
                    <div className="relative z-10 text-center md:text-right">
                        <h1 className="text-4xl font-bold mb-4">Join Us Today!</h1>
                        <p className="text-blue-100 text-lg mb-8 leading-relaxed">
                            Create an account to start booking your trips instantly. Safe, fast, and reliable.
                        </p>
                        
                        <div className="hidden md:flex flex-col gap-4 items-end mt-auto">
                            <div className="p-4 bg-white/10 rounded-lg backdrop-blur-sm w-fit text-right">
                                <h3 className="font-bold text-xl">Exclusive Deals</h3>
                                <p className="text-xs text-blue-200">For members only</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* LEFT SIDE: Register Form */}
                <div className="md:w-1/2 p-8 md:p-12">
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold text-[#1e3a8a]">Create Account</h2>
                        <p className="text-slate-500 mt-2">Fill in your details to register</p>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                        
                        {/* Name Field */}
                        <div className="form-control">
                            <label className="label font-semibold text-[#1e3a8a]">Full Name</label>
                            <div className="relative">
                                <FaUser className="absolute top-4 left-4 text-gray-400" />
                                <input 
                                    type="text" 
                                    {...register("name", { required: true })} 
                                    placeholder="John Doe" 
                                    className="input input-bordered w-full pl-11 bg-base-200 focus:bg-white focus:border-primary transition-all rounded-lg h-12" 
                                />
                            </div>
                            {errors.name && <span className="text-red-500 text-xs mt-1">Name is required</span>}
                        </div>

                        {/* Image Upload */}
                        <div className="form-control">
                            <label className="label font-semibold text-[#1e3a8a]">Profile Picture</label>
                            <div className="relative">
                                <FaImage className="absolute top-4 left-4 text-gray-400 z-10" />
                                <input 
                                    type="file" 
                                    {...register("image", { required: true })} 
                                    className="file-input file-input-bordered w-full pl-11 bg-base-200 focus:bg-white focus:border-primary transition-all rounded-lg h-12 pt-2" 
                                />
                            </div>
                            {errors.image && <span className="text-red-500 text-xs mt-1">Image is required</span>}
                        </div>

                        {/* Email Field */}
                        <div className="form-control">
                            <label className="label font-semibold text-[#1e3a8a]">Email Address</label>
                            <div className="relative">
                                <FaEnvelope className="absolute top-4 left-4 text-gray-400" />
                                <input 
                                    type="email" 
                                    {...register("email", { required: true })} 
                                    placeholder="john@example.com" 
                                    className="input input-bordered w-full pl-11 bg-base-200 focus:bg-white focus:border-primary transition-all rounded-lg h-12" 
                                />
                            </div>
                            {errors.email && <span className="text-red-500 text-xs mt-1">Email is required</span>}
                        </div>

                        {/* Password Field */}
                        <div className="form-control">
                            <label className="label font-semibold text-[#1e3a8a]">Password</label>
                            <div className="relative">
                                <FaLock className="absolute top-4 left-4 text-gray-400" />
                                <input 
                                    type={showPassword ? "text" : "password"} 
                                    {...register("password", { 
                                        required: true, 
                                        minLength: 6, 
                                        maxLength: 20,
                                        pattern: /(?=.*[A-Z])(?=.*[a-z])/ 
                                    })} 
                                    placeholder="Create a password" 
                                    className="input input-bordered w-full pl-11 pr-10 bg-base-200 focus:bg-white focus:border-primary transition-all rounded-lg h-12" 
                                />
                                <span 
                                    className="absolute top-4 right-4 cursor-pointer text-gray-500 hover:text-primary transition-colors"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </span>
                            </div>
                            {errors.password?.type === 'minLength' && <span className="text-red-600 text-xs mt-1">Min 6 chars required</span>}
                            {errors.password?.type === 'pattern' && <span className="text-red-600 text-xs mt-1">Need 1 Upper & 1 Lower case</span>}
                        </div>

                        <div className="form-control mt-6">
                            <button className="btn btn-primary w-full h-12 text-lg font-bold shadow-lg shadow-blue-200 hover:-translate-y-1 transition-transform">
                                Create Account
                            </button>
                        </div>
                    </form>

                    {/* Divider */}
                    <div className="divider my-6 text-slate-400 text-sm">OR JOIN WITH</div>

                    {/* Google Sign In */}
                    <button 
                        onClick={handleGoogleSignIn} 
                        className="btn btn-outline w-full h-12 border-gray-300 text-slate-600 hover:bg-base-200 hover:text-black hover:border-gray-400 flex items-center justify-center gap-2"
                    >
                        <FaGoogle className="text-red-500 text-xl" />
                        <span className="font-semibold">Sign up with Google</span>
                    </button>

                    <p className="text-center mt-6 text-slate-600">
                        Already have an account? 
                        <Link to="/login" className="text-primary font-bold ml-1 hover:underline">Login here</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;