
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
        },
        refetchOnWindowFocus: true,
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
{/* 4. Data Table Section */}
<div className="mt-12 bg-base-100 p-8 rounded-2xl shadow-lg border border-base-300">
    <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold opacity-80">Recent Ticket Performance</h3>
        <button className="btn btn-sm btn-ghost text-primary">View All</button>
    </div>

    <div className="overflow-x-auto">
        <table className="table w-full">
            {/* Table Head */}
            <thead className="bg-base-200">
                <tr>
                    <th className="rounded-l-lg">Route</th>
                    <th>Type</th>
                    <th>Price</th>
                    <th>Revenue</th>
                    <th className="rounded-r-lg">Status</th>
                </tr>
            </thead>
            {/* Table Body */}
            <tbody>
                {/* Dynamically mapping from stats.chartData or a separate query */}
                {stats.chartData?.map((item, index) => (
                    <tr key={index} className="hover:bg-base-200 transition-colors">
                        <td className="font-semibold text-primary">{item.name}</td>
                        <td>
                            <span className="badge badge-ghost badge-sm font-medium">Bus/Train</span>
                        </td>
                        <td>${(item.value / 2).toFixed(2)}</td> {/* Example logic */}
                        <td className="font-bold text-success">${item.value}</td>
                        <td>
                            <div className="badge badge-success badge-outline gap-2 text-[10px] font-bold">
                                ACTIVE
                            </div>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
        
        {/* If no data found */}
        {(!stats.chartData || stats.chartData.length === 0) && (
            <div className="text-center py-10 text-slate-400">
                No performance data available yet.
            </div>
        )}
    </div>
</div>
        </div>
    );
};

export default VendorHome;

