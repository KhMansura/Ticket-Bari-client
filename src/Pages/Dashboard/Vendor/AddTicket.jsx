
import { useContext } from "react";
import { useForm } from "react-hook-form"; 
import { AuthContext } from "../../../providers/AuthProviders";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const img_hosting_token = import.meta.env.VITE_IMGBB_API_KEY; 

const AddTicket = () => {
    const { user } = useContext(AuthContext);
    const { register, handleSubmit, reset } = useForm();
    const axiosSecure = useAxiosSecure();
    
    // API for ImgBB
    const img_hosting_url = `https://api.imgbb.com/1/upload?key=${img_hosting_token}`;

    const onSubmit = async (data) => {
        // 1. Upload Image to ImgBB
        const formData = new FormData();
        formData.append('image', data.image[0]);

        fetch(img_hosting_url, { method: 'POST', body: formData })
            .then(res => res.json())
            .then(imgResponse => {
                if(imgResponse.success){
                    const imgURL = imgResponse.data.display_url;
                    
                    // 2. Prepare Data
                    const { title, from, to, transportType, price, quantity, departureDate, perks } = data;
                    
                    const newItem = {
                        title, 
                        from, 
                        to, 
                        transportType, 
                        price: parseFloat(price), 
                        quantity: parseInt(quantity),
                        departureDate,
                        perks: perks || [],
                        photo: imgURL,
                        vendorName: user?.displayName,
                        vendorEmail: user?.email,
                        verificationStatus: 'pending',
                        isAdvertised: false
                    }

                    // 3. Send to Server
                    axiosSecure.post('/tickets', newItem)
                        .then(res => {
                            if(res.data.insertedId){
                                reset();
                                Swal.fire('Success', 'Ticket Added! Wait for Admin Approval.', 'success');
                            }
                        })
                }
            })
    };

    return (
        <div className="w-full px-10 py-5">
            <h2 className="text-3xl font-bold mb-5">Add A New Ticket</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                
                {/* Title */}
                <div className="form-control">
                    <label className="label"><span className="label-text">Ticket Title</span></label>
                    <input type="text" {...register("title", {required: true})} placeholder="e.g. Hanif Enterprise" className="input input-bordered w-full" />
                </div>

                <div className="flex gap-4">
                    {/* From */}
                    <div className="form-control w-1/2">
                        <label className="label"><span className="label-text">From</span></label>
                        <input type="text" {...register("from", {required: true})} placeholder="Dhaka" className="input input-bordered w-full" />
                    </div>
                    {/* To */}
                    <div className="form-control w-1/2">
                        <label className="label"><span className="label-text">To</span></label>
                        <input type="text" {...register("to", {required: true})} placeholder="Chittagong" className="input input-bordered w-full" />
                    </div>
                </div>

                <div className="flex gap-4">
                    {/* Price */}
                    <div className="form-control w-1/2">
                        <label className="label"><span className="label-text">Price</span></label>
                        <input type="number" {...register("price", {required: true})} className="input input-bordered w-full" />
                    </div>
                    {/* Quantity */}
                    <div className="form-control w-1/2">
                        <label className="label"><span className="label-text">Quantity</span></label>
                        <input type="number" {...register("quantity", {required: true})} className="input input-bordered w-full" />
                    </div>
                </div>

                {/* Transport Type */}
                <div className="form-control">
                    <label className="label"><span className="label-text">Transport Type</span></label>
                    <select defaultValue="Bus" {...register("transportType", {required: true})} className="select select-bordered w-full">
                        <option>Bus</option>
                        <option>Train</option>
                        <option>Launch</option>
                        <option>Plane</option>
                    </select>
                </div>

                {/* Date & Time */}
                <div className="form-control">
                    <label className="label"><span className="label-text">Departure Date & Time</span></label>
                    <input type="datetime-local" {...register("departureDate", {required: true})} className="input input-bordered w-full" />
                </div>

                {/* PERKS CHECKBOXES */}
                <div className="form-control">
                    <label className="label"><span className="label-text font-bold">Perks</span></label>
                    <div className="flex gap-6">
                        <label className="cursor-pointer flex items-center gap-2">
                            <input type="checkbox" value="AC" {...register("perks")} className="checkbox checkbox-primary" />
                            <span>AC</span>
                        </label>
                        <label className="cursor-pointer flex items-center gap-2">
                            <input type="checkbox" value="Breakfast" {...register("perks")} className="checkbox checkbox-primary" />
                            <span>Breakfast</span>
                        </label>
                        <label className="cursor-pointer flex items-center gap-2">
                            <input type="checkbox" value="WiFi" {...register("perks")} className="checkbox checkbox-primary" />
                            <span>WiFi</span>
                        </label>
                        <label className="cursor-pointer flex items-center gap-2">
                            <input type="checkbox" value="Blanket" {...register("perks")} className="checkbox checkbox-primary" />
                            <span>Blanket</span>
                        </label>
                    </div>
                </div>

                {/* Image Upload */}
                <div className="form-control">
                    <label className="label"><span className="label-text">Ticket Image</span></label>
                    <input type="file" {...register("image", {required: true})}
                    accept="image/*"
                     className="file-input file-input-bordered w-full" />
                </div>

                {/* Readonly Vendor Info */}
                <div className="flex gap-4">
                    <div className="form-control w-1/2">
                        <label className="label"><span className="label-text">Vendor Name</span></label>
                        <input type="text" value={user?.displayName} readOnly className="input input-bordered bg-gray-100" />
                    </div>
                    <div className="form-control w-1/2">
                        <label className="label"><span className="label-text">Vendor Email</span></label>
                        <input type="text" value={user?.email} readOnly className="input input-bordered bg-gray-100" />
                    </div>
                </div>

                <input className="btn btn-primary w-full mt-4" type="submit" value="Add Ticket" />
            </form>
        </div>
    );
};

export default AddTicket;