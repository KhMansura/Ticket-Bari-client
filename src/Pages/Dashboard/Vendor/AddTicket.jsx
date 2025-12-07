// import { useForm } from "react-hook-form";
// import Swal from "sweetalert2";
// import axios from "axios";
// import { useContext } from "react";
// import { AuthContext } from "../../../providers/AuthProviders";

// const image_hosting_key = import.meta.env.VITE_IMGBB_API_KEY;
// const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

// const AddTicket = () => {
//     const { user } = useContext(AuthContext);
//     const { register, handleSubmit, reset } = useForm();

//     const onSubmit = async (data) => {
//         // 1. Upload Image to ImgBB
//         const imageFile = { image: data.image[0] }
//         const res = await axios.post(image_hosting_api, imageFile, {
//             headers: {
//                 'content-type': 'multipart/form-data'
//             }
//         });

//         if (res.data.success) {
//             // 2. Prepare data to send to database
//             const ticketItem = {
//                 title: data.title,
//                 from: data.from,
//                 to: data.to,
//                 transportType: data.transportType,
//                 price: parseFloat(data.price),
//                 quantity: parseInt(data.quantity),
//                 departureDate: data.departureDate, // "2025-12-01T14:30"
//                 perks: data.perks, // Array of selected perks
//                 photo: res.data.data.display_url,
//                 vendorName: user?.displayName,
//                 vendorEmail: user?.email,
//                 verificationStatus: 'pending' // Initial status
//             }

//             // 3. Send to Server
//             const menuRes = await axios.post('http://localhost:5000/tickets', ticketItem);
//             if (menuRes.data.insertedId) {
//                 reset();
//                 Swal.fire({
//                     position: 'top-end',
//                     icon: 'success',
//                     title: `${data.title} is added to the database.`,
//                     showConfirmButton: false,
//                     timer: 1500
//                 });
//             }
//         }
//     };

//     return (
//         <div className="w-full p-10">
//             <h2 className="text-3xl font-bold mb-6">Add a New Ticket</h2>
//             <form onSubmit={handleSubmit(onSubmit)}>
//                 {/* Ticket Title */}
//                 <div className="form-control w-full mb-4">
//                     <label className="label"><span className="label-text">Ticket Title</span></label>
//                     <input type="text" placeholder="E.g. Green Line AC Bus" 
//                         {...register("title", { required: true })} 
//                         className="input input-bordered w-full" />
//                 </div>

//                 <div className="flex gap-6">
//                     {/* From */}
//                     <div className="form-control w-full">
//                         <label className="label"><span className="label-text">From</span></label>
//                         <input type="text" placeholder="Dhaka" 
//                             {...register("from", { required: true })} 
//                             className="input input-bordered w-full" />
//                     </div>
//                     {/* To */}
//                     <div className="form-control w-full">
//                         <label className="label"><span className="label-text">To</span></label>
//                         <input type="text" placeholder="Chittagong" 
//                             {...register("to", { required: true })} 
//                             className="input input-bordered w-full" />
//                     </div>
//                 </div>

//                 <div className="flex gap-6 mt-4">
//                     {/* Transport Type */}
//                     <div className="form-control w-full">
//                         <label className="label"><span className="label-text">Transport Type</span></label>
//                         <select defaultValue="Bus" {...register("transportType", { required: true })} className="select select-bordered w-full">
//                             <option value="Bus">Bus</option>
//                             <option value="Train">Train</option>
//                             <option value="Launch">Launch</option>
//                             <option value="Plane">Plane</option>
//                         </select>
//                     </div>
//                     {/* Price */}
//                     <div className="form-control w-full">
//                         <label className="label"><span className="label-text">Price (per unit)</span></label>
//                         <input type="number" placeholder="Price" 
//                             {...register("price", { required: true })} 
//                             className="input input-bordered w-full" />
//                     </div>
//                 </div>

//                 <div className="flex gap-6 mt-4">
//                     {/* Quantity */}
//                     <div className="form-control w-full">
//                         <label className="label"><span className="label-text">Total Quantity</span></label>
//                         <input type="number" placeholder="e.g. 40" 
//                             {...register("quantity", { required: true })} 
//                             className="input input-bordered w-full" />
//                     </div>
//                     {/* Date Time */}
//                     <div className="form-control w-full">
//                         <label className="label"><span className="label-text">Departure Date & Time</span></label>
//                         <input type="datetime-local" 
//                             {...register("departureDate", { required: true })} 
//                             className="input input-bordered w-full" />
//                     </div>
//                 </div>

//                 {/* Perks Checkboxes */}
//                 <div className="form-control mt-4">
//                     <label className="label"><span className="label-text font-bold">Perks</span></label>
//                     <div className="flex gap-4">
//                         <label className="cursor-pointer label border p-2 rounded">
//                             <span className="label-text mr-2">AC</span>
//                             <input type="checkbox" value="AC" {...register("perks")} className="checkbox checkbox-primary" />
//                         </label>
//                         <label className="cursor-pointer label border p-2 rounded">
//                             <span className="label-text mr-2">WiFi</span>
//                             <input type="checkbox" value="WiFi" {...register("perks")} className="checkbox checkbox-primary" />
//                         </label>
//                         <label className="cursor-pointer label border p-2 rounded">
//                             <span className="label-text mr-2">Snacks</span>
//                             <input type="checkbox" value="Snacks" {...register("perks")} className="checkbox checkbox-primary" />
//                         </label>
//                     </div>
//                 </div>

//                 {/* Image Upload */}
//                 <div className="form-control w-full mt-4">
//                     <label className="label"><span className="label-text">Ticket Image</span></label>
//                     <input type="file" {...register("image", { required: true })} className="file-input file-input-bordered w-full" />
//                 </div>

//                 <button className="btn btn-primary mt-6 w-full">
//                     Add Ticket
//                 </button>
//             </form>
//         </div>
//     );
// };

// export default AddTicket;
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import axios from "axios"; // Keep this for ImgBB
import { useContext } from "react";
import { AuthContext } from "../../../providers/AuthProviders";
import useAxiosSecure from "../../../hooks/useAxiosSecure"; // 1. IMPORT THIS

const image_hosting_key = import.meta.env.VITE_IMGBB_API_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddTicket = () => {
    const { user } = useContext(AuthContext);
    const { register, handleSubmit, reset } = useForm();
    const axiosSecure = useAxiosSecure(); // 2. USE THE HOOK

    const onSubmit = async (data) => {
        // 1. Upload Image to ImgBB (Use normal axios here)
        const imageFile = { image: data.image[0] }
        const res = await axios.post(image_hosting_api, imageFile, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        });

        if (res.data.success) {
            // 2. Prepare data to send to database
            const ticketItem = {
                title: data.title,
                from: data.from,
                to: data.to,
                transportType: data.transportType,
                price: parseFloat(data.price),
                quantity: parseInt(data.quantity),
                departureDate: data.departureDate, 
                perks: data.perks, 
                photo: res.data.data.display_url,
                vendorName: user?.displayName,
                vendorEmail: user?.email,
                verificationStatus: 'pending' 
            }

            // 3. Send to Server using axiosSecure (Fixes 401 Error)
            const menuRes = await axiosSecure.post('/tickets', ticketItem);
            
            if (menuRes.data.insertedId) {
                reset();
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: `${data.title} is added to the database.`,
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        }
    };

    return (
        <div className="w-full p-10">
            <h2 className="text-3xl font-bold mb-6">Add a New Ticket</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                {/* Ticket Title */}
                <div className="form-control w-full mb-4">
                    <label className="label"><span className="label-text">Ticket Title</span></label>
                    <input type="text" placeholder="E.g. Green Line AC Bus" 
                        {...register("title", { required: true })} 
                        className="input input-bordered w-full" />
                </div>

                <div className="flex gap-6">
                    {/* From */}
                    <div className="form-control w-full">
                        <label className="label"><span className="label-text">From</span></label>
                        <input type="text" placeholder="Dhaka" 
                            {...register("from", { required: true })} 
                            className="input input-bordered w-full" />
                    </div>
                    {/* To */}
                    <div className="form-control w-full">
                        <label className="label"><span className="label-text">To</span></label>
                        <input type="text" placeholder="Chittagong" 
                            {...register("to", { required: true })} 
                            className="input input-bordered w-full" />
                    </div>
                </div>

                <div className="flex gap-6 mt-4">
                    {/* Transport Type */}
                    <div className="form-control w-full">
                        <label className="label"><span className="label-text">Transport Type</span></label>
                        <select defaultValue="Bus" {...register("transportType", { required: true })} className="select select-bordered w-full">
                            <option value="Bus">Bus</option>
                            <option value="Train">Train</option>
                            <option value="Launch">Launch</option>
                            <option value="Plane">Plane</option>
                        </select>
                    </div>
                    {/* Price */}
                    <div className="form-control w-full">
                        <label className="label"><span className="label-text">Price (per unit)</span></label>
                        <input type="number" placeholder="Price" 
                            {...register("price", { required: true })} 
                            className="input input-bordered w-full" />
                    </div>
                </div>

                <div className="flex gap-6 mt-4">
                    {/* Quantity */}
                    <div className="form-control w-full">
                        <label className="label"><span className="label-text">Total Quantity</span></label>
                        <input type="number" placeholder="e.g. 40" 
                            {...register("quantity", { required: true })} 
                            className="input input-bordered w-full" />
                    </div>
                    {/* Date Time */}
                    <div className="form-control w-full">
                        <label className="label"><span className="label-text">Departure Date & Time</span></label>
                        <input type="datetime-local" 
                            {...register("departureDate", { required: true })} 
                            className="input input-bordered w-full" />
                    </div>
                </div>

                {/* Perks Checkboxes */}
                <div className="form-control mt-4">
                    <label className="label"><span className="label-text font-bold">Perks</span></label>
                    <div className="flex gap-4">
                        <label className="cursor-pointer label border p-2 rounded">
                            <span className="label-text mr-2">AC</span>
                            <input type="checkbox" value="AC" {...register("perks")} className="checkbox checkbox-primary" />
                        </label>
                        <label className="cursor-pointer label border p-2 rounded">
                            <span className="label-text mr-2">WiFi</span>
                            <input type="checkbox" value="WiFi" {...register("perks")} className="checkbox checkbox-primary" />
                        </label>
                        <label className="cursor-pointer label border p-2 rounded">
                            <span className="label-text mr-2">Snacks</span>
                            <input type="checkbox" value="Snacks" {...register("perks")} className="checkbox checkbox-primary" />
                        </label>
                    </div>
                </div>

                {/* Image Upload */}
                <div className="form-control w-full mt-4">
                    <label className="label"><span className="label-text">Ticket Image</span></label>
                    <input type="file" {...register("image", { required: true })} className="file-input file-input-bordered w-full" />
                </div>

                <button className="btn btn-primary mt-6 w-full">
                    Add Ticket
                </button>
            </form>
        </div>
    );
};

export default AddTicket;