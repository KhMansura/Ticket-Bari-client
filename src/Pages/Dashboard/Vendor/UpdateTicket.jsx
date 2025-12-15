import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const img_hosting_token = import.meta.env.VITE_IMGBB_API_KEY;

const UpdateTicket = () => {
    const { id } = useParams(); 
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();
    const { register, handleSubmit, setValue } = useForm();
    const [loading, setLoading] = useState(true);
    const [oldPhoto, setOldPhoto] = useState(null);

    const img_hosting_url = `https://api.imgbb.com/1/upload?key=${img_hosting_token}`;

    // 1. Fetch Existing Data
    useEffect(() => {
        axiosSecure.get(`/tickets/${id}`) 
            .then(res => {
                const data = res.data;
                setValue("title", data.title);
                setValue("from", data.from);
                setValue("to", data.to);
                setValue("price", data.price);
                setValue("quantity", data.quantity);
                setValue("transportType", data.transportType);
                setValue("departureDate", data.departureDate);
                setValue("perks", data.perks);
                setOldPhoto(data.photo);
                setLoading(false);
            });
    }, [id, axiosSecure, setValue]);

    const onSubmit = async (data) => {
        let imgURL = oldPhoto;

        // 2. Upload New Image (ONLY if user selected one)
        if (data.image && data.image.length > 0) {
            const formData = new FormData();
            formData.append('image', data.image[0]);

            const imgRes = await fetch(img_hosting_url, { method: 'POST', body: formData });
            const imgData = await imgRes.json();
            if (imgData.success) {
                imgURL = imgData.data.display_url;
            }
        }

        // 3. Prepare Update Data
        const updatedItem = {
            title: data.title,
            from: data.from,
            to: data.to,
            transportType: data.transportType,
            price: parseFloat(data.price),
            quantity: parseInt(data.quantity),
            departureDate: data.departureDate,
            perks: data.perks || [],
            photo: imgURL
        };

        // 4. Send Update Request
        const res = await axiosSecure.patch(`/tickets/${id}`, updatedItem);
        if (res.data.modifiedCount > 0) {
            Swal.fire('Success', 'Ticket Updated Successfully!', 'success');
            navigate('/dashboard/my-added-tickets');
        }
    };

    if (loading) return <div className="text-center mt-10"><span className="loading loading-spinner loading-lg"></span></div>;

    return (
        <div className="w-full px-10 py-5">
            <h2 className="text-3xl font-bold mb-5">Update Ticket</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                
                {/* Title */}
                <div className="form-control">
                    <label className="label"><span className="label-text">Ticket Title</span></label>
                    <input type="text" {...register("title")} className="input input-bordered w-full" />
                </div>

                <div className="flex gap-4">
                    <div className="form-control w-1/2">
                        <label className="label"><span className="label-text">From</span></label>
                        <input type="text" {...register("from")} className="input input-bordered w-full" />
                    </div>
                    <div className="form-control w-1/2">
                        <label className="label"><span className="label-text">To</span></label>
                        <input type="text" {...register("to")} className="input input-bordered w-full" />
                    </div>
                </div>

                <div className="flex gap-4">
                    <div className="form-control w-1/2">
                        <label className="label"><span className="label-text">Price</span></label>
                        <input type="number" {...register("price")} className="input input-bordered w-full" />
                    </div>
                    <div className="form-control w-1/2">
                        <label className="label"><span className="label-text">Quantity</span></label>
                        <input type="number" {...register("quantity")} className="input input-bordered w-full" />
                    </div>
                </div>

                {/* Transport Type */}
                <div className="form-control">
                    <label className="label"><span className="label-text">Transport Type</span></label>
                    <select {...register("transportType")} className="select select-bordered w-full">
                        <option>Bus</option>
                        <option>Train</option>
                        <option>Launch</option>
                        <option>Plane</option>
                    </select>
                </div>

                {/* Date */}
                <div className="form-control">
                    <label className="label"><span className="label-text">Departure Date</span></label>
                    <input type="datetime-local" {...register("departureDate")} className="input input-bordered w-full" />
                </div>

                {/* Perks */}
                <div className="form-control">
                    <label className="label"><span className="label-text font-bold">Perks</span></label>
                    <div className="flex gap-6">
                        {['AC', 'Breakfast', 'WiFi', 'Blanket'].map(perk => (
                            <label key={perk} className="cursor-pointer flex items-center gap-2">
                                <input type="checkbox" value={perk} {...register("perks")} className="checkbox checkbox-primary" />
                                <span>{perk}</span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Image */}
                <div className="form-control">
                    <label className="label"><span className="label-text">Update Image (Optional)</span></label>
                    <input type="file" {...register("image")} className="file-input file-input-bordered w-full" />
                </div>

                <input className="btn btn-warning w-full mt-4" type="submit" value="Update Ticket" />
            </form>
        </div>
    );
};

export default UpdateTicket;