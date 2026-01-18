
import { useContext, useState } from "react";
import { AuthContext } from "../../../providers/AuthProviders";
import useRole from "../../../hooks/useRole";
import { FaCalendarAlt, FaClock, FaEdit, FaUser, FaImage, FaTimes } from "react-icons/fa";
import Swal from "sweetalert2";

const Profile = () => {
    const { user, updateUserProfile, setUser } = useContext(AuthContext);
    const [role, isRoleLoading] = useRole();
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Check if the user is the Demo Admin
    const isDemoAdmin = user?.email === "admin@ticketbari.com";

    // Format the dates
    const joinDate = user?.metadata?.creationTime 
        ? new Date(user.metadata.creationTime).toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' }) 
        : 'N/A';
    
    const lastLogin = user?.metadata?.lastSignInTime 
        ? new Date(user.metadata.lastSignInTime).toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' }) 
        : 'N/A';

    // Handle Update Logic
    const handleUpdate = async (e) => {
        e.preventDefault();
        const name = e.target.name.value;
        const photo = e.target.photo.value;

        try {
            await updateUserProfile(name, photo);
            // Update local state for instant UI change
            setUser({ ...user, displayName: name, photoURL: photo });
            
            setIsModalOpen(false);
            Swal.fire({
                icon: 'success',
                title: 'Profile Updated!',
                showConfirmButton: false,
                timer: 1500
            });
        } catch (error) {
            Swal.fire('Error', error.message, 'error');
        }
    };

    return (
        <div className="w-full max-w-lg mx-auto mt-10 p-4">
            <div className="bg-base-100 rounded-2xl shadow-xl overflow-hidden border border-gray-100 relative">
                
                {/* 1. Cover Background */}
                <div className="h-32 bg-gradient-to-r from-[#1e3a8a] to-[#2563EB]"></div>

                {/* 2. Profile Content */}
                <div className="px-8 pb-8">
                    
                    {/* Avatar */}
                    <div className="relative -mt-16 mb-4 flex justify-center">
                        <div className="avatar online">
                            <div className="w-32 rounded-full border-4 border-white shadow-lg bg-base-100">
                                <img src={user?.photoURL || "https://i.ibb.co/5GzXkwq/user.png"} alt="Profile" className="object-cover" />
                            </div>
                        </div>
                    </div>

                    {/* User Info */}
                    <div className="text-center">
                        <h2 className="text-3xl font-bold text-[#1e3a8a] tracking-tight">{user?.displayName}</h2>
                        <p className="text-slate-500 font-medium">{user?.email}</p>

                        <div className="mt-4">
                            {isRoleLoading ? (
                                <span className="loading loading-dots loading-sm text-primary"></span>
                            ) : (
                                <span className={`inline-flex items-center px-4 py-1 rounded-full text-xs font-bold tracking-widest uppercase border 
                                    ${role === 'admin' ? 'bg-red-50 text-red-600 border-red-200' : 'bg-blue-50 text-blue-600 border-blue-200'}`}>
                                    {role || 'USER'}
                                </span>
                            )}
                        </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 gap-4 mt-8">
                        <div className="p-4 bg-base-200 rounded-xl text-center">
                            <div className="flex justify-center text-primary mb-2 opacity-80"><FaCalendarAlt /></div>
                            <p className="text-xs text-slate-500 uppercase font-bold tracking-wider">Member Since</p>
                            <p className="text-sm font-semibold text-[#1e3a8a] mt-1">{joinDate}</p>
                        </div>
                        <div className="p-4 bg-base-200 rounded-xl text-center">
                            <div className="flex justify-center text-primary mb-2 opacity-80"><FaClock /></div>
                            <p className="text-xs text-slate-500 uppercase font-bold tracking-wider">Last Login</p>
                            <p className="text-sm font-semibold text-[#1e3a8a] mt-1">{lastLogin}</p>
                        </div>
                    </div>

                    {/* Action Button - Disabled for Demo Admin */}
                    <div className="mt-8">
                        <button 
                            onClick={() => setIsModalOpen(true)}
                            disabled={isDemoAdmin}
                            title={isDemoAdmin ? "Edit disabled for Demo Admin" : "Edit Profile"}
                            className={`btn w-full text-lg font-bold shadow-lg flex items-center justify-center gap-2 
                                ${isDemoAdmin ? 'btn-disabled opacity-50 bg-gray-300' : 'btn-primary shadow-blue-200'}`}
                        >
                            <FaEdit /> Edit Profile
                        </button>
                        {isDemoAdmin && (
                            <p className="text-center text-error text-xs mt-2 italic">Restrictions apply for demo account</p>
                        )}
                    </div>
                </div>
            </div>

            {/* --- EDIT MODAL --- */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
                    <div className="bg-base-100 rounded-2xl p-8 max-w-md w-full shadow-2xl relative border border-gray-100">
                        <button 
                            onClick={() => setIsModalOpen(false)} 
                            className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors"
                        >
                            <FaTimes size={20} />
                        </button>

                        <h3 className="text-2xl font-bold text-[#1e3a8a] mb-6 flex items-center gap-2">
                            <FaUser className="text-primary text-xl" /> Update Profile
                        </h3>
                        
                        <form onSubmit={handleUpdate} className="space-y-4">
                            <div className="form-control">
                                <label className="label font-semibold text-gray-600">Full Name</label>
                                <div className="relative">
                                    <FaUser className="absolute left-4 top-4 text-gray-400" />
                                    <input name="name" type="text" defaultValue={user?.displayName} className="input input-bordered w-full pl-11 h-12 focus:border-primary" required />
                                </div>
                            </div>
                            
                            <div className="form-control">
                                <label className="label font-semibold text-gray-600">Photo URL</label>
                                <div className="relative">
                                    <FaImage className="absolute left-4 top-4 text-gray-400" />
                                    <input name="photo" type="text" defaultValue={user?.photoURL} className="input input-bordered w-full pl-11 h-12 focus:border-primary" required />
                                </div>
                            </div>

                            <div className="flex gap-3 mt-8 pt-2">
                                <button type="button" onClick={() => setIsModalOpen(false)} className="btn btn-ghost flex-1">Cancel</button>
                                <button type="submit" className="btn btn-primary flex-1 shadow-md">Save Changes</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Profile;