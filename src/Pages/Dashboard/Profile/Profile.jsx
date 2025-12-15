import { useContext } from "react";
import { AuthContext } from "../../../providers/AuthProviders";
import useRole from "../../../hooks/useRole";
import { FaCalendarAlt, FaClock, FaEdit } from "react-icons/fa";

const Profile = () => {
    const { user } = useContext(AuthContext);
    const [role, isRoleLoading] = useRole();

    // 1. Format the date
    const joinDate = user?.metadata?.creationTime 
        ? new Date(user.metadata.creationTime).toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' }) 
        : 'N/A';
    
    const lastLogin = user?.metadata?.lastSignInTime 
        ? new Date(user.metadata.lastSignInTime).toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' }) 
        : 'N/A';

    return (
        <div className="w-full max-w-lg mx-auto mt-10">
            {/* Main Card */}
            <div className="bg-base-100 rounded-2xl shadow-card overflow-hidden border border-gray-100 relative">
                
                {/* 1. Cover Background  */}
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

                        {/* Role Badge */}
                        <div className="mt-4">
                            {isRoleLoading ? (
                                <span className="loading loading-dots loading-sm text-primary"></span>
                            ) : (
                                <span className={`inline-flex items-center px-4 py-1 rounded-full text-xs font-bold tracking-widest uppercase border 
                                    ${role === 'admin' 
                                        ? 'bg-red-50 text-red-600 border-red-200' 
                                        : role === 'vendor' 
                                            ? 'bg-amber-50 text-amber-600 border-amber-200' 
                                            : 'bg-blue-50 text-blue-600 border-blue-200'
                                    }`}>
                                    {role || 'USER'}
                                </span>
                            )}
                        </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 gap-4 mt-8">
                        <div className="p-4 bg-base-200 rounded-xl text-center hover:bg-base-300 transition-colors">
                            <div className="flex justify-center text-primary mb-2 opacity-80"><FaCalendarAlt /></div>
                            <p className="text-xs text-slate-500 uppercase font-bold tracking-wider">Member Since</p>
                            <p className="text-sm font-semibold text-[#1e3a8a] mt-1">{joinDate}</p>
                        </div>
                        
                        <div className="p-4 bg-base-200 rounded-xl text-center hover:bg-base-300 transition-colors">
                            <div className="flex justify-center text-primary mb-2 opacity-80"><FaClock /></div>
                            <p className="text-xs text-slate-500 uppercase font-bold tracking-wider">Last Login</p>
                            <p className="text-sm font-semibold text-[#1e3a8a] mt-1">{lastLogin}</p>
                        </div>
                    </div>

                    {/* Action Button */}
                    <div className="mt-8">
                        <button className="btn btn-primary w-full text-lg font-bold shadow-lg shadow-blue-200">
                            <FaEdit className="mr-2" /> Edit Profile
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;