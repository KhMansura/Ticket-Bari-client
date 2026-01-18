// import { useQuery } from "@tanstack/react-query";

// import useAxiosSecure from "../../../hooks/useAxiosSecure";
// import { FaUsers, FaTicketAlt, FaBullhorn, FaCheckCircle, FaClock } from "react-icons/fa";
// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, PieChart, Pie, Legend } from "recharts";

// const AdminHome = () => {
//     const axiosSecure = useAxiosSecure();

//     const { data: stats = {}, isLoading } = useQuery({
//         queryKey: ['admin-stats'],
//         queryFn: async () => {
//             const res = await axiosSecure.get('/admin-stats');
//             return res.data;
//         }
//     });

//     if (isLoading) return <span className="loading loading-spinner loading-lg"></span>;

//     const COLORS = ['#6366F1', '#10B981', '#F59E0B', '#EF4444'];

//     return (
//         <div className="p-6 bg-base-200 min-h-screen">
//             <h2 className="text-3xl font-bold mb-8 text-[#1e3a8a]">Admin Management Overview</h2>

//             {/* 1. Stats Cards */}
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
//                 <div className="stat bg-white shadow rounded-2xl p-6 border-b-4 border-primary">
//                     <div className="stat-title uppercase text-xs font-bold text-gray-500">Total Users</div>
//                     <div className="stat-value text-primary flex items-center gap-2">
//                         <FaUsers className="text-2xl" /> {stats.totalUsers}
//                     </div>
//                 </div>

//                 <div className="stat bg-white shadow rounded-2xl p-6 border-b-4 border-secondary">
//                     <div className="stat-title uppercase text-xs font-bold text-gray-500">System Tickets</div>
//                     <div className="stat-value text-secondary flex items-center gap-2">
//                         <FaTicketAlt className="text-2xl" /> {stats.totalTickets}
//                     </div>
//                 </div>

//                 <div className="stat bg-white shadow rounded-2xl p-6 border-b-4 border-accent">
//                     <div className="stat-title uppercase text-xs font-bold text-gray-500">Live Ads</div>
//                     <div className="stat-value text-accent flex items-center gap-2">
//                         <FaBullhorn className="text-2xl" /> {stats.advertisedCount}/{stats.advertisementLimit}
//                     </div>
//                 </div>

//                 <div className="stat bg-white shadow rounded-2xl p-6 border-b-4 border-success">
//                     <div className="stat-title uppercase text-xs font-bold text-gray-500">Approved Tickets</div>
//                     <div className="stat-value text-success flex items-center gap-2">
//                         <FaCheckCircle className="text-2xl" /> 
//                         {stats.ticketStats?.find(s => s._id === 'approved')?.count || 0}
//                     </div>
//                 </div>
//             </div>

//             {/* 2. Charts Section */}
//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//                 {/* Role Distribution Pie Chart */}
//                 <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
//                     <h3 className="text-xl font-bold mb-6 flex items-center gap-2"><FaUsers /> User Roles</h3>
//                     <div className="h-[300px]">
//                         <ResponsiveContainer width="100%" height="100%">
//                             <PieChart>
//                                 <Pie data={stats.roleStats} dataKey="count" nameKey="_id" cx="50%" cy="50%" outerRadius={80} label>
//                                     {stats.roleStats?.map((entry, index) => (
//                                         <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                                     ))}
//                                 </Pie>
//                                 <Tooltip />
//                                 <Legend />
//                             </PieChart>
//                         </ResponsiveContainer>
//                     </div>
//                 </div>

//                 {/* Ticket Status Bar Chart */}
//                 <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
//                     <h3 className="text-xl font-bold mb-6 flex items-center gap-2"><FaClock /> Verification Progress</h3>
//                     <div className="h-[300px]">
//                         <ResponsiveContainer width="100%" height="100%">
//                             <BarChart data={stats.ticketStats}>
//                                 <CartesianGrid strokeDasharray="3 3" vertical={false} />
//                                 <XAxis dataKey="_id" tick={{fontSize: 12}} />
//                                 <YAxis />
//                                 <Tooltip />
//                                 <Bar dataKey="count" fill="#6366F1" radius={[10, 10, 0, 0]} />
//                             </BarChart>
//                         </ResponsiveContainer>
//                     </div>
//                 </div>
                
//             </div>
            
//         </div>
        
//     );
// };

// export default AdminHome;
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaUsers, FaTicketAlt, FaBullhorn, FaCheckCircle, FaClock } from "react-icons/fa";
import { Link } from "react-router-dom";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, PieChart, Pie, Legend } from "recharts";

const AdminHome = () => {
    const axiosSecure = useAxiosSecure();

    const { data: stats = {}, isLoading } = useQuery({
        queryKey: ['admin-stats'],
        queryFn: async () => {
            const res = await axiosSecure.get('/admin-stats');
            return res.data;
        }
    });

    if (isLoading) {
        return (
            <div className="h-screen flex items-center justify-center">
                <span className="loading loading-spinner loading-lg text-primary"></span>
            </div>
        );
    }

    const COLORS = ['#6366F1', '#10B981', '#F59E0B', '#EF4444'];

    return (
        <div className="p-6 bg-base-200 min-h-screen font-poppins">
            <h2 className="text-3xl font-bold mb-8 text-[#1e3a8a]">Admin Management Overview</h2>

            {/* 1. OVERVIEW CARDS */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                <div className="stat bg-white shadow rounded-2xl p-6 border-b-4 border-primary">
                    <div className="stat-title uppercase text-xs font-bold text-gray-500">Total Users</div>
                    <div className="stat-value text-primary flex items-center gap-2">
                        <FaUsers className="text-2xl" /> {stats.totalUsers || 0}
                    </div>
                </div>

                <div className="stat bg-white shadow rounded-2xl p-6 border-b-4 border-secondary">
                    <div className="stat-title uppercase text-xs font-bold text-gray-500">System Tickets</div>
                    <div className="stat-value text-secondary flex items-center gap-2">
                        <FaTicketAlt className="text-2xl" /> {stats.totalTickets || 0}
                    </div>
                </div>

                <div className="stat bg-white shadow rounded-2xl p-6 border-b-4 border-accent">
                    <div className="stat-title uppercase text-xs font-bold text-gray-500">Live Ads</div>
                    <div className="stat-value text-accent flex items-center gap-2">
                        <FaBullhorn className="text-2xl" /> {stats.advertisedCount || 0}/{stats.advertisementLimit}
                    </div>
                </div>

                <div className="stat bg-white shadow rounded-2xl p-6 border-b-4 border-success">
                    <div className="stat-title uppercase text-xs font-bold text-gray-500">Approved Tickets</div>
                    <div className="stat-value text-success flex items-center gap-2">
                        <FaCheckCircle className="text-2xl" /> 
                        {stats.ticketStats?.find(s => s._id === 'approved')?.count || 0}
                    </div>
                </div>
            </div>

            {/* 2. CHARTS SECTION */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
                <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                    <h3 className="text-xl font-bold mb-6 flex items-center gap-2"><FaUsers className="text-primary"/> User Roles</h3>
                    <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie data={stats.roleStats} dataKey="count" nameKey="_id" cx="50%" cy="50%" outerRadius={80} label>
                                    {stats.roleStats?.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                    <h3 className="text-xl font-bold mb-6 flex items-center gap-2"><FaClock className="text-secondary"/> Verification Progress</h3>
                    <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={stats.ticketStats}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                <XAxis dataKey="_id" tick={{fontSize: 12}} />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="count" fill="#6366F1" radius={[10, 10, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* 3. DATA SUMMARY TABLE */}
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
                <div className="flex items-center gap-2 mb-6">
                    <div className="w-2 h-8 bg-primary rounded-full"></div>
                    <h3 className="text-xl font-bold text-[#1e3a8a]">Detailed Data Summary</h3>
                </div>

                <div className="overflow-x-auto">
                    <table className="table w-full border-separate border-spacing-y-2">
                        <thead>
                            <tr className="text-gray-500 uppercase text-xs tracking-wider">
                                <th className="bg-transparent border-none">Category</th>
                                <th className="bg-transparent border-none">Total Count</th>
                                <th className="bg-transparent border-none">Status Breakdown</th>
                                <th className="bg-transparent border-none text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* User Summary Row */}
                            <tr className="bg-slate-50 hover:bg-slate-100 transition-colors">
                                <td className="font-bold text-[#1e3a8a] rounded-l-xl">User Accounts</td>
                                <td className="font-semibold text-2xl px-6">{stats.totalUsers}</td>
                                <td>
                                    <div className="flex gap-2">
                                        {stats.roleStats?.map((role, idx) => (
                                            <span key={idx} className="badge badge-ghost text-[10px] font-bold uppercase">
                                                {role._id}: {role.count}
                                            </span>
                                        ))}
                                    </div>
                                </td>
                                <td className="rounded-r-xl text-right">
                                    <Link to="/dashboard/manage-users" className="btn btn-ghost btn-xs text-primary underline">Manage</Link>
                                </td>
                            </tr>

                            {/* Tickets Summary Row */}
                            <tr className="bg-slate-50 hover:bg-slate-100 transition-colors">
                                <td className="font-bold text-[#1e3a8a] rounded-l-xl">Ticket Listings</td>
                                <td className="font-semibold text-2xl px-6">{stats.totalTickets}</td>
                                <td>
                                    <div className="flex gap-2">
                                        {stats.ticketStats?.map((status, idx) => (
                                            <span key={idx} className={`badge badge-sm font-bold uppercase ${
                                                status._id === 'approved' 
                                                    ? 'badge-success' 
                                                    : (status._id === 'pending' ? 'badge-warning' : 'badge-error')
                                            }`}>
                                                {status._id || 'N/A'}: {status.count}
                                            </span>
                                        ))}
                                    </div>
                                </td>
                                <td className="rounded-r-xl text-right">
                                    <Link to="/dashboard/manage-tickets" className="btn btn-ghost btn-xs text-primary underline">Review</Link>
                                </td>
                            </tr>

                            {/* Advertisement Summary Row */}
                            <tr className="bg-slate-50 hover:bg-slate-100 transition-colors">
                                <td className="font-bold text-[#1e3a8a] rounded-l-xl">Promoted Ads</td>
                                <td className="font-semibold text-2xl px-6">{stats.advertisedCount}</td>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <progress 
                                            className="progress progress-primary w-32" 
                                            value={stats.advertisedCount || 0} 
                                            max={stats.advertisementLimit}>
                                        </progress>
                                        <span className="text-xs font-medium text-gray-500">
                                            {stats.advertisedCount || 0}/{stats.advertisementLimit} Slots
                                        </span>
                                    </div>
                                </td>
                                <td className="rounded-r-xl text-right">
                                    <Link to="/dashboard/advertise-tickets" className="btn btn-ghost btn-xs text-primary underline">Manage Ads</Link>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminHome;