// import { useContext } from "react";
// import { AuthContext } from "../../../providers/AuthProviders";

// const Profile = () => {
//     const { user } = useContext(AuthContext);
    

//     return (
//         <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
//             <div className="avatar online">
//                 <div className="w-32 rounded-full border-4 border-primary">
//                     <img src={user?.photoURL || "https://i.ibb.co/5GzXkwq/user.png"} alt="Profile" />
//                 </div>
//             </div>
//             <div className="text-center">
//                 <h2 className="text-3xl font-bold">{user?.displayName}</h2>
//                 <p className="text-gray-500">{user?.email}</p>
//                 <div className="badge badge-primary badge-outline mt-2 uppercase">
//                     Role: User {/* You can fetch real role here later */}
//                 </div>
//             </div>
            
//             <div className="stats shadow bg-base-200 mt-8">
//                 <div className="stat place-items-center">
//                     <div className="stat-title">Joined</div>
//                     <div className="stat-value text-sm">{user?.metadata?.creationTime?.slice(0, 16)}</div>
//                 </div>
                
//                 <div className="stat place-items-center">
//                     <div className="stat-title">Last Login</div>
//                     <div className="stat-value text-sm">{user?.metadata?.lastSignInTime?.slice(0, 16)}</div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Profile;
import { useContext } from "react";
import { AuthContext } from "../../../providers/AuthProviders";
import useRole from "../../../hooks/useRole"; // Import your hook

const Profile = () => {
    const { user } = useContext(AuthContext);
    const [role, isRoleLoading] = useRole(); // Use the hook to get the REAL role from MongoDB

    // 1. Format the date
    const joinDate = user?.metadata?.creationTime 
        ? new Date(user.metadata.creationTime).toDateString() 
        : 'N/A';
    
    const lastLogin = user?.metadata?.lastSignInTime 
        ? new Date(user.metadata.lastSignInTime).toDateString() 
        : 'N/A';

    return (
        <div className="w-full flex justify-center mt-10">
            <div className="card w-96 bg-base-100 shadow-xl border border-gray-700">
                <div className="card-body items-center text-center">
                    
                    {/* Profile Image */}
                    <div className="avatar online">
                        <div className="w-24 rounded-full border-4 border-primary">
                            <img src={user?.photoURL || "https://i.ibb.co/5GzXkwq/user.png"} alt="Profile" />
                        </div>
                    </div>

                    <h2 className="card-title text-2xl mt-4">{user?.displayName}</h2>
                    <p className="text-gray-500">{user?.email}</p>

                    {/* 2. THE FIX: Display the role from the hook, NOT from user object */}
                    {isRoleLoading ? (
                        <span className="loading loading-dots loading-sm"></span>
                    ) : (
                        <div className={`badge badge-outline mt-2 font-bold p-3 uppercase 
                            ${role === 'admin' ? 'badge-error' : role === 'vendor' ? 'badge-warning' : 'badge-primary'}`}>
                            ROLE: {role || 'USER'}
                        </div>
                    )}

                    {/* User Stats */}
                    <div className="stats shadow mt-6 w-full bg-base-200">
                        <div className="stat place-items-center">
                            <div className="stat-title text-xs">Joined</div>
                            <div className="stat-value text-sm">{joinDate}</div>
                        </div>
                        <div className="stat place-items-center">
                            <div className="stat-title text-xs">Last Login</div>
                            <div className="stat-value text-sm">{lastLogin}</div>
                        </div>
                    </div>

                    <div className="card-actions mt-6">
                        <button className="btn btn-primary w-full">Edit Profile</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;