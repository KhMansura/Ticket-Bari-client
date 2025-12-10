// import { useContext } from "react";
// import { useQuery } from "@tanstack/react-query";
// import { AuthContext } from "../../../providers/AuthProviders";
// import useAxiosSecure from "../../../hooks/useAxiosSecure";
// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
// // ADDED ICONS BACK
// import { FaDollarSign, FaTicketAlt, FaUsers } from "react-icons/fa";

// const VendorHome = () => {
//     const { user } = useContext(AuthContext);
//     const axiosSecure = useAxiosSecure();

//     const { data: stats = {} } = useQuery({
//         queryKey: ['vendor-stats', user?.email],
//         queryFn: async () => {
//             const res = await axiosSecure.get(`/vendor-stats/${user.email}`);
//             return res.data;
//         }
//     });

//     const data = stats.chartData || [];
//     const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', 'red', 'pink'];

//     return (
//         <div className="w-full p-4">
//             <h2 className="text-3xl font-bold mb-6">Revenue Overview</h2>
            
//             {/* 1. Stats Cards */}
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
//                 {/* Revenue Card */}
//                 <div className="stat bg-base-100 shadow rounded-xl border-l-4 border-primary">
//                     <div className="stat-figure text-primary">
//                         <FaDollarSign className="text-3xl" />
//                     </div>
//                     <div className="stat-title">Total Revenue</div>
//                     <div className="stat-value text-primary">${stats.totalRevenue || 0}</div>
//                 </div>

//                 {/* Sold Card */}
//                 <div className="stat bg-base-100 shadow rounded-xl border-l-4 border-secondary">
//                     <div className="stat-figure text-secondary">
//                         <FaUsers className="text-3xl" />
//                     </div>
//                     <div className="stat-title">Tickets Sold</div>
//                     <div className="stat-value text-secondary">{stats.totalBookings || 0}</div>
//                 </div>

//                 {/* Added Card */}
//                 <div className="stat bg-base-100 shadow rounded-xl border-l-4 border-accent">
//                     <div className="stat-figure text-accent">
//                         <FaTicketAlt className="text-3xl" />
//                     </div>
//                     <div className="stat-title">Tickets Added</div>
//                     <div className="stat-value text-accent">{stats.totalTickets || 0}</div>
//                 </div>
//             </div>

//             {/* 2. Interactive Charts */}
//             <div className="flex flex-col lg:flex-row gap-6">
                
//                 {/* Bar Chart: Revenue by Ticket */}
//                 <div className="w-full lg:w-1/2 h-[400px] bg-base-100 p-4 shadow rounded-xl">
//                     <h3 className="text-xl font-bold mb-4 text-center">Revenue by Ticket Route</h3>
//                     <ResponsiveContainer width="100%" height="100%">
//                         <BarChart data={data}>
//                             <CartesianGrid strokeDasharray="3 3" />
//                             <XAxis dataKey="name" />
//                             <YAxis />
//                             <Tooltip />
//                             <Legend />
//                             <Bar dataKey="value" fill="#8884d8" name="Revenue ($)" />
//                         </BarChart>
//                     </ResponsiveContainer>
//                 </div>

//                 {/* Pie Chart: Sales Distribution */}
//                 <div className="w-full lg:w-1/2 h-[400px] bg-base-100 p-4 shadow rounded-xl">
//                     <h3 className="text-xl font-bold mb-4 text-center">Sales Distribution</h3>
//                     <ResponsiveContainer width="100%" height="100%">
//                         <PieChart>
//                             <Pie
//                                 data={data}
//                                 cx="50%"
//                                 cy="50%"
//                                 labelLine={false}
//                                 label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
//                                 outerRadius={120}
//                                 fill="#8884d8"
//                                 dataKey="value"
//                             >
//                                 {data.map((entry, index) => (
//                                     <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                                 ))}
//                             </Pie>
//                             <Tooltip />
//                         </PieChart>
//                     </ResponsiveContainer>
//                 </div>
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
import { FaDollarSign, FaTicketAlt, FaUsers, FaCalendarAlt } from "react-icons/fa";

const VendorHome = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();

    // Fetch Stats
    const { data: stats = {} } = useQuery({
        queryKey: ['vendor-stats', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/vendor-stats/${user.email}`);
            return res.data;
        }
    });

    const data = stats.chartData || [];
    
    // Vibrant Color Palette
    const COLORS = ['#6366F1', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899'];

    // Custom Tooltip for Charts
    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-base-100 p-3 border border-gray-200 shadow-xl rounded-lg">
                    <p className="font-bold">{label}</p>
                    <p className="text-primary font-semibold">
                        {`Value: ${payload[0].value}`}
                    </p>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="w-full p-6 bg-base-200 min-h-screen">
            
            {/* 1. Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 bg-base-100 p-6 rounded-2xl shadow-sm border border-base-300">
                <div>
                    <h2 className="text-3xl font-bold">
                        Welcome back, <span className="text-primary">{user?.displayName}</span>! 👋
                    </h2>
                    <p className="opacity-60 mt-1">Here is what's happening with your business today.</p>
                </div>
                <div className="flex items-center gap-2 bg-base-200 px-4 py-2 rounded-lg font-medium opacity-80">
                    <FaCalendarAlt />
                    <span>{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                </div>
            </div>
            
            {/* 2. Colorful Stat Cards (Gradients) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                
                {/* Total Revenue - Purple Gradient */}
                <div className="stat relative overflow-hidden bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-xl rounded-2xl">
                    <div className="stat-figure text-white opacity-30">
                        <FaDollarSign className="text-8xl absolute -right-4 -bottom-4" />
                    </div>
                    <div className="stat-title text-indigo-100 font-medium">Total Revenue</div>
                    <div className="stat-value text-5xl font-bold my-2">${stats.totalRevenue || 0}</div>
                    <div className="stat-desc text-indigo-200">Lifetime earnings</div>
                </div>

                {/* Tickets Sold - Emerald Gradient */}
                <div className="stat relative overflow-hidden bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-xl rounded-2xl">
                    <div className="stat-figure text-white opacity-30">
                        <FaUsers className="text-8xl absolute -right-4 -bottom-4" />
                    </div>
                    <div className="stat-title text-emerald-100 font-medium">Total Bookings</div>
                    <div className="stat-value text-5xl font-bold my-2">{stats.totalBookings || 0}</div>
                    <div className="stat-desc text-emerald-200">Seats sold successfully</div>
                </div>

                {/* Tickets Added - Orange Gradient */}
                <div className="stat relative overflow-hidden bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-xl rounded-2xl">
                    <div className="stat-figure text-white opacity-30">
                        <FaTicketAlt className="text-8xl absolute -right-4 -bottom-4" />
                    </div>
                    <div className="stat-title text-orange-100 font-medium">Total Routes</div>
                    <div className="stat-value text-5xl font-bold my-2">{stats.totalTickets || 0}</div>
                    <div className="stat-desc text-orange-200">Active tickets in system</div>
                </div>
            </div>

            {/* 3. Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                
                {/* Bar Chart Container */}
                <div className="bg-base-100 p-6 rounded-2xl shadow-lg border border-base-300">
                    <h3 className="text-xl font-bold mb-6 border-b pb-4 opacity-80">Revenue by Route</h3>
                    <div className="h-[350px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={data}>
                                {/* Grid Lines Visible - Dark Gray */}
                                <CartesianGrid stroke="#ccc" strokeDasharray="3 3" />
                                
                                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                                <YAxis axisLine={false} tickLine={false} />
                                <Tooltip content={<CustomTooltip />} />
                                <Bar dataKey="value" name="Revenue" radius={[8, 8, 0, 0]}>
                                    {data.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Pie Chart Container */}
                <div className="bg-base-100 p-6 rounded-2xl shadow-lg border border-base-300">
                    <h3 className="text-xl font-bold mb-6 border-b pb-4 opacity-80">Sales Distribution</h3>
                    <div className="h-[350px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={data}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    innerRadius={60} // Donut style
                                    outerRadius={100}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {data.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend layout="vertical" verticalAlign="middle" align="right" />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VendorHome;