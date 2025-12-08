// export default Register;
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom"; 
import axios from "axios";
import Swal from "sweetalert2";
// Ensure this path matches your folder structure
import { AuthContext } from "../providers/AuthProviders"; 

// Use the same ImgBB key you added to .env.local earlier
const image_hosting_key = import.meta.env.VITE_IMGBB_API_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const Register = () => {
    const { createUser, updateUserProfile, googleSignIn } = useContext(AuthContext);
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        // 1. Upload Image to ImgBB first
        const imageFile = { image: data.image[0] }
        const res = await axios.post(image_hosting_api, imageFile, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        });

        if (res.data.success) {
            const photoURL = res.data.data.display_url; // Get the URL from ImgBB

            // 2. Create User in Firebase
            createUser(data.email, data.password)
                .then(result => {
                    const loggedUser = result.user;
                    
                    // 3. Update Firebase Profile with the new Image URL
                    updateUserProfile(data.name, photoURL)
                        .then(() => {
                            // 4. Save user to Database
                            const userInfo = { 
                                name: data.name, 
                                email: data.email, 
                                photo: photoURL, // Save the ImgBB URL here
                                role: 'user' 
                            }; 
                            
                            axios.post('http://localhost:5000/users', userInfo)
                                .then(dbRes => {
                                    if (dbRes.data.insertedId) {
                                        reset();
                                        Swal.fire("Success", "User created successfully!", "success");
                                        navigate("/");
                                    }
                                })
                        })
                })
                .catch(error => {
                    Swal.fire("Error", error.message, "error");
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
                axios.post('http://localhost:5000/users', userInfo)
                    .then(() => {
                        navigate("/");
                    })
            })
    }

    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold mb-4">Register now!</h1>
                </div>
                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                        
                        {/* Name Field */}
                        <div className="form-control">
                            <label className="label"><span className="label-text">Name</span></label>
                            <input type="text" {...register("name", { required: true })} placeholder="Name" className="input input-bordered" />
                        </div>

                        {/* Image Upload Field (Changed from Text URL to File) */}
                        <div className="form-control">
                            <label className="label"><span className="label-text">Upload Photo</span></label>
                            <input type="file" {...register("image", { required: true })} className="file-input file-input-bordered w-full" />
                        </div>

                        {/* Email Field */}
                        <div className="form-control">
                            <label className="label"><span className="label-text">Email</span></label>
                            <input type="email" {...register("email", { required: true })} placeholder="email" className="input input-bordered" />
                        </div>

                        {/* Password Field */}
                        <div className="form-control">
                            <label className="label"><span className="label-text">Password</span></label>
                            <input type="password" {...register("password", { 
                                required: true, 
                                minLength: 6, 
                                maxLength: 20,
                                pattern: /(?=.*[A-Z])(?=.*[a-z])/ 
                            })} placeholder="password" className="input input-bordered" />
                            {errors.password?.type === 'minLength' && <span className="text-red-600">Password must be 6 characters</span>}
                            {errors.password?.type === 'pattern' && <span className="text-red-600">Must have one uppercase and one lowercase</span>}
                        </div>

                        <div className="form-control mt-6">
                            <input className="btn btn-primary" type="submit" value="Register" />
                        </div>
                    </form>
                    <div className="text-center mb-4">
                        <button onClick={handleGoogleSignIn} className="btn btn-outline btn-accent w-full">Google Login</button>
                        <p className="mt-2">Already have an account? <Link to="/login" className="font-bold text-primary">Login</Link></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;