
// import { useContext } from "react";

// import { useQuery } from "@tanstack/react-query";
// import { AuthContext } from "../../../providers/AuthProviders";
// import useAxiosSecure from "../../../hooks/useAxiosSecure";
// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
// import { FaDollarSign, FaTicketAlt, FaUsers, FaCalendarAlt } from "react-icons/fa";

// const VendorHome = () => {
//     const { user } = useContext(AuthContext);
//     const axiosSecure = useAxiosSecure();

//     // Fetch Stats
//     const { data: stats = {} } = useQuery({
//         queryKey: ['vendor-stats', user?.email],
//         queryFn: async () => {
//             const res = await axiosSecure.get(`/vendor-stats/${user.email}`);
//             return res.data;
//         }
//     });

//     const data = stats.chartData || [];
    
//     // Vibrant Color Palette
//     const COLORS = ['#6366F1', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899'];

//     // Custom Tooltip for Charts
//     const CustomTooltip = ({ active, payload, label }) => {
//         if (active && payload && payload.length) {
//             return (
//                 <div className="bg-base-100 p-3 border border-gray-200 shadow-xl rounded-lg">
//                     <p className="font-bold">{label}</p>
//                     <p className="text-primary font-semibold">
//                         {`Value: ${payload[0].value}`}
//                     </p>
//                 </div>
//             );
//         }
//         return null;
//     };

//     return (
//         <div className="w-full p-6 bg-base-200 min-h-screen">
            
//             {/* 1. Header Section */}
//             <div className="flex flex-col md:flex-row justify-between items-center mb-8 bg-base-100 p-6 rounded-2xl shadow-sm border border-base-300">
//                 <div>
//                     <h2 className="text-3xl font-bold">
//                         Welcome back, <span className="text-primary">{user?.displayName}</span>! 👋
//                     </h2>
//                     <p className="opacity-60 mt-1">Here is what's happening with your business today.</p>
//                 </div>
//                 <div className="flex items-center gap-2 bg-base-200 px-4 py-2 rounded-lg font-medium opacity-80">
//                     <FaCalendarAlt />
//                     <span>{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
//                 </div>
//             </div>
            
//             {/* 2. Colorful Stat Cards (Gradients) */}
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                
//                 {/* Total Revenue - Purple Gradient */}
//                 <div className="stat relative overflow-hidden bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-xl rounded-2xl">
//                     <div className="stat-figure text-white opacity-30">
//                         <FaDollarSign className="text-8xl absolute -right-4 -bottom-4" />
//                     </div>
//                     <div className="stat-title text-indigo-100 font-medium">Total Revenue</div>
//                     <div className="stat-value text-5xl font-bold my-2">${stats.totalRevenue || 0}</div>
//                     <div className="stat-desc text-indigo-200">Lifetime earnings</div>
//                 </div>

//                 {/* Tickets Sold - Emerald Gradient */}
//                 <div className="stat relative overflow-hidden bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-xl rounded-2xl">
//                     <div className="stat-figure text-white opacity-30">
//                         <FaUsers className="text-8xl absolute -right-4 -bottom-4" />
//                     </div>
//                     <div className="stat-title text-emerald-100 font-medium">Total Bookings</div>
//                     <div className="stat-value text-5xl font-bold my-2">{stats.totalBookings || 0}</div>
//                     <div className="stat-desc text-emerald-200">Seats sold successfully</div>
//                 </div>

//                 {/* Tickets Added - Orange Gradient */}
//                 <div className="stat relative overflow-hidden bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-xl rounded-2xl">
//                     <div className="stat-figure text-white opacity-30">
//                         <FaTicketAlt className="text-8xl absolute -right-4 -bottom-4" />
//                     </div>
//                     <div className="stat-title text-orange-100 font-medium">Total Routes</div>
//                     <div className="stat-value text-5xl font-bold my-2">{stats.totalTickets || 0}</div>
//                     <div className="stat-desc text-orange-200">Active tickets in system</div>
//                 </div>
//             </div>

//             {/* 3. Charts Section */}
//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                
//                 {/* Bar Chart Container */}
//                 <div className="bg-base-100 p-6 rounded-2xl shadow-lg border border-base-300">
//                     <h3 className="text-xl font-bold mb-6 border-b pb-4 opacity-80">Revenue by Route</h3>
//                     <div className="h-[350px]">
//                         <ResponsiveContainer width="100%" height="100%">
//                             <BarChart data={data}>
//                                 {/* Grid Lines Visible - Dark Gray */}
//                                 <CartesianGrid stroke="#ccc" strokeDasharray="3 3" />
                                
//                                 <XAxis dataKey="name" axisLine={false} tickLine={false} />
//                                 <YAxis axisLine={false} tickLine={false} />
//                                 <Tooltip content={<CustomTooltip />} />
//                                 <Bar dataKey="value" name="Revenue" radius={[8, 8, 0, 0]}>
//                                     {data.map((entry, index) => (
//                                         <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                                     ))}
//                                 </Bar>
//                             </BarChart>
//                         </ResponsiveContainer>
//                     </div>
//                 </div>

//                 {/* Pie Chart Container */}
//                 <div className="bg-base-100 p-6 rounded-2xl shadow-lg border border-base-300">
//                     <h3 className="text-xl font-bold mb-6 border-b pb-4 opacity-80">Sales Distribution</h3>
//                     <div className="h-[350px]">
//                         <ResponsiveContainer width="100%" height="100%">
//                             <PieChart>
//                                 <Pie
//                                     data={data}
//                                     cx="50%"
//                                     cy="50%"
//                                     labelLine={false}
//                                     innerRadius={60} // Donut style
//                                     outerRadius={100}
//                                     paddingAngle={5}
//                                     dataKey="value"
//                                 >
//                                     {data.map((entry, index) => (
//                                         <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                                     ))}
//                                 </Pie>
//                                 <Tooltip />
//                                 <Legend layout="vertical" verticalAlign="middle" align="right" />
//                             </PieChart>
//                         </ResponsiveContainer>
//                     </div>
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
import { FaDollarSign, FaTicketAlt, FaUsers, FaCalendarAlt, FaChartLine } from "react-icons/fa";

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
    
    // Professional Corporate Palette
    const COLORS = ['#2563EB', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899'];

    // Custom Tooltip for Charts
    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-white p-4 border border-gray-100 shadow-xl rounded-lg">
                    <p className="font-bold text-[#1e3a8a]">{label}</p>
                    <p className="text-primary font-semibold text-sm">
                        {`Revenue: $${payload[0].value}`}
                    </p>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="w-full p-6 lg:p-10 bg-base-200 min-h-screen font-poppins">
            
            {/* 1. Executive Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 bg-white p-8 rounded-2xl shadow-card border border-gray-100">
                <div>
                    <h2 className="text-3xl font-bold text-[#1e3a8a]">
                        Overview
                    </h2>
                    <p className="text-slate-500 mt-1 flex items-center gap-2">
                        Welcome back, <span className="font-semibold text-primary">{user?.displayName}</span>
                    </p>
                </div>
                <div className="flex items-center gap-3 bg-blue-50 text-[#1e3a8a] px-5 py-3 rounded-xl font-medium mt-4 md:mt-0 shadow-sm border border-blue-100">
                    <FaCalendarAlt />
                    <span>{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                </div>
            </div>
            
            {/* 2. Premium Stat Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                
                {/* Total Revenue */}
                <div className="relative overflow-hidden bg-gradient-to-br from-[#1e3a8a] to-[#2563EB] text-white shadow-lg rounded-2xl p-6 transition-transform hover:-translate-y-1 duration-300">
                    <div className="relative z-10">
                        <div className="text-blue-200 text-sm font-medium uppercase tracking-wider mb-2">Total Revenue</div>
                        <div className="text-4xl font-bold mb-1">${stats.totalRevenue?.toLocaleString() || 0}</div>
                        <div className="text-xs text-blue-200 opacity-80">+12% from last month</div>
                    </div>
                    <div className="absolute right-4 top-4 bg-white/10 p-3 rounded-full backdrop-blur-sm">
                        <FaDollarSign className="text-2xl text-white" />
                    </div>
                    {/* Decorative Circle */}
                    <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-white/10 rounded-full blur-xl"></div>
                </div>

                {/* Total Bookings */}
                <div className="relative overflow-hidden bg-white text-[#1e3a8a] shadow-card border border-gray-100 rounded-2xl p-6 transition-transform hover:-translate-y-1 duration-300">
                    <div className="relative z-10">
                        <div className="text-slate-400 text-sm font-medium uppercase tracking-wider mb-2">Total Bookings</div>
                        <div className="text-4xl font-bold mb-1">{stats.totalBookings || 0}</div>
                        <div className="text-xs text-green-500 font-semibold flex items-center gap-1">
                            <FaChartLine /> Growing steadily
                        </div>
                    </div>
                    <div className="absolute right-4 top-4 bg-blue-50 p-3 rounded-full">
                        <FaUsers className="text-2xl text-primary" />
                    </div>
                </div>

                {/* Total Routes */}
                <div className="relative overflow-hidden bg-white text-[#1e3a8a] shadow-card border border-gray-100 rounded-2xl p-6 transition-transform hover:-translate-y-1 duration-300">
                    <div className="relative z-10">
                        <div className="text-slate-400 text-sm font-medium uppercase tracking-wider mb-2">Active Routes</div>
                        <div className="text-4xl font-bold mb-1">{stats.totalTickets || 0}</div>
                        <div className="text-xs text-slate-400">Tickets currently on sale</div>
                    </div>
                    <div className="absolute right-4 top-4 bg-amber-50 p-3 rounded-full">
                        <FaTicketAlt className="text-2xl text-amber-500" />
                    </div>
                </div>
            </div>

            {/* 3. Analytics Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                
                {/* Revenue Bar Chart */}
                <div className="bg-white p-8 rounded-2xl shadow-card border border-gray-100">
                    <div className="flex justify-between items-center mb-8">
                        <h3 className="text-xl font-bold text-[#1e3a8a]">Revenue Analytics</h3>
                        <span className="text-xs text-slate-400 border px-2 py-1 rounded">Last 7 Days</span>
                    </div>
                    <div className="h-[350px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={data}>
                                <CartesianGrid stroke="#f1f5f9" strokeDasharray="3 3" vertical={false} />
                                <XAxis 
                                    dataKey="name" 
                                    axisLine={false} 
                                    tickLine={false} 
                                    tick={{fill: '#64748B', fontSize: 12}} 
                                    dy={10}
                                />
                                <YAxis 
                                    axisLine={false} 
                                    tickLine={false} 
                                    tick={{fill: '#64748B', fontSize: 12}} 
                                    tickFormatter={(value) => `$${value}`}
                                />
                                <Tooltip content={<CustomTooltip />} cursor={{fill: '#F8FAFC'}} />
                                <Bar dataKey="value" name="Revenue" radius={[6, 6, 0, 0]} barSize={40}>
                                    {data.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Sales Pie Chart */}
                <div className="bg-white p-8 rounded-2xl shadow-card border border-gray-100">
                    <div className="flex justify-between items-center mb-8">
                        <h3 className="text-xl font-bold text-[#1e3a8a]">Sales Distribution</h3>
                        <span className="text-xs text-slate-400 border px-2 py-1 rounded">By Category</span>
                    </div>
                    <div className="h-[350px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={data}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={80} // Modern Donut Chart
                                    outerRadius={110}
                                    paddingAngle={5}
                                    dataKey="value"
                                    stroke="none"
                                >
                                    {data.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend 
                                    layout="vertical" 
                                    verticalAlign="middle" 
                                    align="right"
                                    iconType="circle"
                                    wrapperStyle={{ fontSize: "12px", color: "#64748B" }}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VendorHome;