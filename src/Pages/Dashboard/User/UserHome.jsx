import { useContext } from "react";
import { AuthContext } from "../../../providers/AuthProviders";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaWallet, FaBook, FaCheckCircle, FaHistory } from "react-icons/fa";
import { Link } from "react-router-dom";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const UserHome = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();

    const { data: stats = {}, isLoading } = useQuery({
        queryKey: ['user-stats', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/user-stats/${user?.email}`);
            return res.data;
        }
    });

    if (isLoading) return <div className="flex justify-center mt-20"><span className="loading loading-spinner loading-lg text-primary"></span></div>;

    return (
        <div className="p-6 bg-base-200 min-h-screen font-poppins">
            <h2 className="text-3xl font-bold mb-8 text-[#1e3a8a]">User Dashboard Overview</h2>

            {/* 1. STATS CARDS */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                <div className="stat bg-white shadow rounded-2xl p-6 border-b-4 border-blue-500">
                    <div className="stat-title uppercase text-xs font-bold text-gray-500">Total Bookings</div>
                    <div className="stat-value text-blue-600 flex items-center gap-2">
                        <FaBook className="text-2xl" /> {stats.totalBookings || 0}
                    </div>
                </div>

                <div className="stat bg-white shadow rounded-2xl p-6 border-b-4 border-green-500">
                    <div className="stat-title uppercase text-xs font-bold text-gray-500">Total Spent</div>
                    <div className="stat-value text-green-600 flex items-center gap-2">
                        <FaWallet className="text-2xl" /> ${stats.totalSpent || 0}
                    </div>
                </div>

                <div className="stat bg-white shadow rounded-2xl p-6 border-b-4 border-orange-500">
                    <div className="stat-title uppercase text-xs font-bold text-gray-500">Paid Tickets</div>
                    <div className="stat-value text-orange-500 flex items-center gap-2">
                        <FaCheckCircle className="text-2xl" /> 
                        {stats.bookingStats?.find(s => s._id === 'paid')?.count || 0}
                    </div>
                </div>
            </div>

            {/* 2. CHART SECTION */}
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 mb-10">
                <h3 className="text-xl font-bold mb-6 text-gray-700">Spending Trend (Recent Activity)</h3>
                <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={stats.spendingHistory || []}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="amount" fill="#2563EB" radius={[6, 6, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* 3. DATA SUMMARY TABLE */}
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
                <div className="flex items-center gap-2 mb-6">
                    <div className="w-2 h-8 bg-primary rounded-full"></div>
                    <h3 className="text-xl font-bold text-[#1e3a8a]">Activity Summary</h3>
                </div>

                <div className="overflow-x-auto">
                    <table className="table w-full border-separate border-spacing-y-2">
                        <thead>
                            <tr className="text-gray-500 uppercase text-xs tracking-wider">
                                <th className="bg-transparent border-none">Module</th>
                                <th className="bg-transparent border-none">Quick Stats</th>
                                <th className="bg-transparent border-none">Detailed Breakdown</th>
                                <th className="bg-transparent border-none text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* Booking Summary */}
                            <tr className="bg-slate-50 hover:bg-slate-100 transition-colors">
                                <td className="font-bold text-[#1e3a8a] rounded-l-xl uppercase text-xs">Booked Tickets</td>
                                <td className="font-semibold px-6">{stats.totalBookings} Tickets</td>
                                <td>
                                    <div className="flex gap-2">
                                        {stats.bookingStats?.map((s, idx) => (
                                            <span key={idx} className={`badge badge-sm font-bold uppercase ${
                                                s._id === 'paid' ? 'badge-success' : s._id === 'pending' ? 'badge-warning' : 'badge-ghost'
                                            }`}>
                                                {s._id}: {s.count}
                                            </span>
                                        ))}
                                    </div>
                                </td>
                                <td className="rounded-r-xl text-right">
                                    <Link to="/dashboard/my-booked-tickets" className="btn btn-ghost btn-xs text-primary underline italic">View Bookings</Link>
                                </td>
                            </tr>

                            {/* Payment Summary */}
                            <tr className="bg-slate-50 hover:bg-slate-100 transition-colors">
                                <td className="font-bold text-[#1e3a8a] rounded-l-xl uppercase text-xs">Financials</td>
                                <td className="font-semibold px-6 text-green-600">${stats.totalSpent} Spent</td>
                                <td>
                                    <div className="flex items-center gap-2 text-xs font-medium text-gray-500">
                                        <FaHistory /> Last transaction recorded successfully
                                    </div>
                                </td>
                                <td className="rounded-r-xl text-right">
                                    <Link to="/dashboard/payment-history" className="btn btn-ghost btn-xs text-primary underline italic">History</Link>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default UserHome;