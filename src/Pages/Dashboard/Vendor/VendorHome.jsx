// import { useContext, useEffect, useState } from "react";
// // Adjust this path to point to your AuthProvider
// import { AuthContext } from "../../../providers/AuthProviders";
// // Adjust this path to point to your Axios hook
// import useAxiosSecure from "../../../hooks/useAxiosSecure";
// import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
// import { FaDollarSign, FaTicketAlt, FaUsers } from "react-icons/fa";

// const VendorHome = () => {
//     const { user } = useContext(AuthContext);
//     const axiosSecure = useAxiosSecure();
//     const [stats, setStats] = useState({
//         totalTickets: 0,
//         totalBookings: 0,
//         totalRevenue: 0,
//         chartData: []
//     });

//     useEffect(() => {
//         if (user?.email) {
//             axiosSecure.get(`/vendor-stats/${user.email}`)
//                 .then(res => setStats(res.data))
//                 .catch(err => console.error(err));
//         }
//     }, [user, axiosSecure]);

//     return (
//         <div className="w-full px-4">
//             <h2 className="text-3xl font-bold my-6">Hi, {user?.displayName}!</h2>
            
//             {/* Stats Cards */}
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
//                 {/* Revenue Card */}
//                 <div className="stat bg-gradient-to-r from-purple-500 to-purple-400 text-white rounded-lg shadow">
//                     <div className="stat-figure text-white opacity-80"><FaDollarSign className="text-4xl"/></div>
//                     <div className="stat-title text-white">Total Revenue</div>
//                     <div className="stat-value">${stats.totalRevenue}</div>
//                 </div>

//                 {/* Total Sold Card */}
//                 <div className="stat bg-gradient-to-r from-blue-500 to-blue-400 text-white rounded-lg shadow">
//                     <div className="stat-figure text-white opacity-80"><FaUsers className="text-4xl"/></div>
//                     <div className="stat-title text-white">Total Sold</div>
//                     <div className="stat-value">{stats.totalBookings}</div>
//                 </div>

//                 {/* Tickets Added Card */}
//                 <div className="stat bg-gradient-to-r from-orange-500 to-orange-400 text-white rounded-lg shadow">
//                     <div className="stat-figure text-white opacity-80"><FaTicketAlt className="text-4xl"/></div>
//                     <div className="stat-title text-white">Tickets Added</div>
//                     <div className="stat-value">{stats.totalTickets}</div>
//                 </div>
//             </div>

//             {/* Bar Chart Section */}
//             <div className="h-[400px] bg-base-100 p-4 rounded shadow border">
//                 <h3 className="text-xl font-bold mb-4">Revenue by Ticket</h3>
//                 <ResponsiveContainer width="100%" height="100%">
//                     <BarChart
//                         data={stats.chartData}
//                         margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
//                     >
//                         <CartesianGrid strokeDasharray="3 3" />
//                         <XAxis dataKey="name" />
//                         <YAxis />
//                         <Tooltip />
//                         <Legend />
//                         <Bar dataKey="value" fill="#8884d8" name="Revenue ($)">
//                             {stats.chartData.map((entry, index) => (
//                                 <Cell key={`cell-${index}`} fill={['#0088FE', '#00C49F', '#FFBB28', '#FF8042'][index % 4]} />
//                             ))}
//                         </Bar>
//                     </BarChart>
//                 </ResponsiveContainer>
//             </div>
//         </div>
//     );
// };

// export default VendorHome;

import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../../../providers/AuthProviders";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
// ADDED ICONS BACK
import { FaDollarSign, FaTicketAlt, FaUsers } from "react-icons/fa";

const VendorHome = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();

    const { data: stats = {} } = useQuery({
        queryKey: ['vendor-stats', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/vendor-stats/${user.email}`);
            return res.data;
        }
    });

    const data = stats.chartData || [];
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', 'red', 'pink'];

    return (
        <div className="w-full p-4">
            <h2 className="text-3xl font-bold mb-6">Revenue Overview</h2>
            
            {/* 1. Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {/* Revenue Card */}
                <div className="stat bg-base-100 shadow rounded-xl border-l-4 border-primary">
                    <div className="stat-figure text-primary">
                        <FaDollarSign className="text-3xl" />
                    </div>
                    <div className="stat-title">Total Revenue</div>
                    <div className="stat-value text-primary">${stats.totalRevenue || 0}</div>
                </div>

                {/* Sold Card */}
                <div className="stat bg-base-100 shadow rounded-xl border-l-4 border-secondary">
                    <div className="stat-figure text-secondary">
                        <FaUsers className="text-3xl" />
                    </div>
                    <div className="stat-title">Tickets Sold</div>
                    <div className="stat-value text-secondary">{stats.totalBookings || 0}</div>
                </div>

                {/* Added Card */}
                <div className="stat bg-base-100 shadow rounded-xl border-l-4 border-accent">
                    <div className="stat-figure text-accent">
                        <FaTicketAlt className="text-3xl" />
                    </div>
                    <div className="stat-title">Tickets Added</div>
                    <div className="stat-value text-accent">{stats.totalTickets || 0}</div>
                </div>
            </div>

            {/* 2. Interactive Charts */}
            <div className="flex flex-col lg:flex-row gap-6">
                
                {/* Bar Chart: Revenue by Ticket */}
                <div className="w-full lg:w-1/2 h-[400px] bg-base-100 p-4 shadow rounded-xl">
                    <h3 className="text-xl font-bold mb-4 text-center">Revenue by Ticket Route</h3>
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={data}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="value" fill="#8884d8" name="Revenue ($)" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                {/* Pie Chart: Sales Distribution */}
                <div className="w-full lg:w-1/2 h-[400px] bg-base-100 p-4 shadow rounded-xl">
                    <h3 className="text-xl font-bold mb-4 text-center">Sales Distribution</h3>
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={data}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                outerRadius={120}
                                fill="#8884d8"
                                dataKey="value"
                            >
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default VendorHome;