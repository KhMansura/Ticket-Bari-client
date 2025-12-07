import { useContext } from "react";
import { AuthContext } from "../../../providers/AuthProviders";

const Profile = () => {
    const { user } = useContext(AuthContext);

    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
            <div className="avatar online">
                <div className="w-32 rounded-full border-4 border-primary">
                    <img src={user?.photoURL || "https://i.ibb.co/5GzXkwq/user.png"} alt="Profile" />
                </div>
            </div>
            <div className="text-center">
                <h2 className="text-3xl font-bold">{user?.displayName}</h2>
                <p className="text-gray-500">{user?.email}</p>
                <div className="badge badge-primary badge-outline mt-2 uppercase">
                    Role: User {/* You can fetch real role here later */}
                </div>
            </div>
            
            <div className="stats shadow bg-base-200 mt-8">
                <div className="stat place-items-center">
                    <div className="stat-title">Joined</div>
                    <div className="stat-value text-sm">{user?.metadata?.creationTime?.slice(0, 16)}</div>
                </div>
                
                <div className="stat place-items-center">
                    <div className="stat-title">Last Login</div>
                    <div className="stat-value text-sm">{user?.metadata?.lastSignInTime?.slice(0, 16)}</div>
                </div>
            </div>
        </div>
    );
};

export default Profile;