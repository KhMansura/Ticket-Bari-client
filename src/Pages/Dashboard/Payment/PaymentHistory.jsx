// import { useContext, useEffect, useState } from "react";
// import { AuthContext } from "../../../providers/AuthProviders";
// import useAxiosSecure from "../../../hooks/useAxiosSecure";

// const PaymentHistory = () => {
//     const { user } = useContext(AuthContext);
//     const axiosSecure = useAxiosSecure();
//     const [payments, setPayments] = useState([]);

//     useEffect(() => {
//         if(user?.email){
//             axiosSecure.get(`/payments/${user.email}`)
//                 .then(res => setPayments(res.data))
//         }
//     }, [user, axiosSecure]);

//     return (
//         <div className="w-full px-10">
//             <h2 className="text-3xl font-bold my-6">Payment History</h2>
//             <div className="overflow-x-auto">
//                 <table className="table table-zebra">
//                     <thead>
//                         <tr>
//                             <th>#</th>
//                             <th>Transaction ID</th>
//                             <th>Ticket</th>
//                             <th>Amount</th>
//                             <th>Date</th>
//                             <th>Status</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {payments.map((payment, index) => (
//                             <tr key={payment._id}>
//                                 <th>{index + 1}</th>
//                                 <td className="font-mono text-xs">{payment.transactionId}</td>
//                                 <td>{payment.ticketTitle}</td>
//                                 <td>${payment.price}</td>
//                                 <td>{new Date(payment.date).toLocaleDateString()}</td>
//                                 <td>
//                                     <span className="badge badge-success text-white">Paid</span>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     );
// };

// export default PaymentHistory;
import { useContext } from "react";
import { AuthContext } from "../../../providers/AuthProviders";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { FaHistory, FaFileInvoiceDollar } from "react-icons/fa";

const PaymentHistory = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();

    const { data: payments = [], isLoading } = useQuery({
        queryKey: ['payments', user.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/payments/${user.email}`);
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

    return (
        <div className="max-w-7xl mx-auto px-4 font-poppins">
            
            {/* Header */}
            <div className="mb-8">
                <h2 className="text-3xl font-bold text-[#1e3a8a] flex items-center gap-3">
                    <FaHistory /> Payment History
                </h2>
                <p className="text-slate-500 mt-1">View all your past transactions and receipts.</p>
            </div>

            {/* Table */}
            <div className="bg-white rounded-xl shadow-card overflow-hidden border border-gray-100">
                <div className="overflow-x-auto">
                    <table className="table w-full">
                        {/* Table Head */}
                        <thead className="bg-[#F8FAFC] text-slate-500 border-b border-gray-200 uppercase text-xs tracking-wider">
                            <tr>
                                <th className="py-4 pl-6">#</th>
                                <th>Transaction ID</th>
                                <th>Ticket Title</th>
                                <th>Amount</th>
                                <th className="text-right pr-6">Payment Date</th>
                            </tr>
                        </thead>
                        
                        {/* Table Body */}
                        <tbody className="divide-y divide-gray-50">
                            {payments.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="text-center py-8 text-slate-400 italic">
                                        No transaction history found.
                                    </td>
                                </tr>
                            ) : (
                                payments.map((payment, index) => (
                                    <tr key={payment._id} className="hover:bg-blue-50/30 transition-colors">
                                        <td className="pl-6 font-bold text-slate-400">{index + 1}</td>
                                        
                                        <td className="font-mono text-xs text-primary font-semibold">
                                            {payment.transactionId}
                                        </td>
                                        
                                        <td className="font-medium text-slate-700">
                                            {/* Shows Title if saved, otherwise fallback */}
                                            {payment.ticketTitle || "Ticket Purchase"}
                                        </td>
                                        
                                        <td className="font-bold text-slate-700">
                                            ${payment.price}
                                        </td>
                                        
                                        <td className="text-right pr-6 text-slate-500 text-sm">
                                            {new Date(payment.date).toLocaleDateString()}
                                            <span className="text-xs ml-2 text-gray-400">
                                                {new Date(payment.date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                                            </span>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Total Spent Summary */}
            <div className="mt-6 flex justify-end">
                <div className="bg-[#1e3a8a] text-white px-6 py-4 rounded-xl shadow-lg flex items-center gap-4">
                    <div className="p-2 bg-white/20 rounded-lg">
                        <FaFileInvoiceDollar className="text-xl" />
                    </div>
                    <div>
                        <p className="text-xs opacity-80 uppercase font-bold tracking-wider">Total Spent</p>
                        <p className="text-2xl font-bold">
                            ${payments.reduce((sum, item) => sum + item.price, 0)}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentHistory;