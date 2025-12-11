
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

//     const handleDownload = (payment) => {
//         // 1. Create the Ticket Design
//         const ticketContent = `
//             <html>
//             <head>
//                 <title>Ticket - ${payment.ticketTitle}</title>
//                 <style>
//                     body { font-family: Arial, sans-serif; padding: 40px; background-color: #f9f9f9; }
//                     .ticket-box { 
//                         border: 2px dashed #4CAF50; 
//                         padding: 30px; 
//                         max-width: 600px; 
//                         margin: 0 auto; 
//                         background: white;
//                         border-radius: 10px;
//                     }
//                     .header { text-align: center; color: #4CAF50; margin-bottom: 20px; }
//                     .info-row { display: flex; justify-content: space-between; margin-bottom: 10px; border-bottom: 1px solid #eee; padding-bottom: 5px; }
//                     .label { font-weight: bold; color: #555; }
//                     .footer { text-align: center; margin-top: 30px; font-size: 12px; color: #888; }
//                     .btn-print { display: none; } /* Hide print button in print view */
//                 </style>
//             </head>
//             <body>
//                 <div class="ticket-box">
//                     <div class="header">
//                         <h1>TicketBari</h1>
//                         <h3>Official E-Ticket</h3>
//                     </div>
                    
//                     <div class="info-row">
//                         <span class="label">Transaction ID:</span>
//                         <span>${payment.transactionId}</span>
//                     </div>
//                     <div class="info-row">
//                         <span class="label">Passenger:</span>
//                         <span>${payment.customerName}</span>
//                     </div>
//                     <div class="info-row">
//                         <span class="label">Email:</span>
//                         <span>${payment.customerEmail}</span>
//                     </div>
//                     <div class="info-row">
//                         <span class="label">Route:</span>
//                         <span>${payment.from || 'N/A'} ➝ ${payment.to || 'N/A'}</span>
//                     </div>
//                     <div class="info-row">
//                         <span class="label">Transport:</span>
//                         <span>${payment.transportType || 'Bus'}</span>
//                     </div>
//                     <div class="info-row">
//                         <span class="label">Seats:</span>
//                         <span>${payment.bookingQty}</span>
//                     </div>
//                     <div class="info-row">
//                         <span class="label">Total Paid:</span>
//                         <span style="color: #4CAF50; font-weight: bold;">$${payment.price}</span>
//                     </div>
//                     <div class="info-row">
//                         <span class="label">Booking Date:</span>
//                         <span>${new Date(payment.date).toLocaleString()}</span>
//                     </div>

//                     <div class="footer">
//                         <p>Please show this ticket at the counter.</p>
//                         <p>Thank you for traveling with TicketBari!</p>
//                     </div>
//                 </div>
//                 <script>
//                     window.onload = function() { window.print(); }
//                 </script>
//             </body>
//             </html>
//         `;

//         // 2. Open a new window and print it
//         const printWindow = window.open('', '', 'width=800,height=800');
//         printWindow.document.write(ticketContent);
//         printWindow.document.close();
//     };

//     return (
//         <div className="w-full px-10">
//             <h2 className="text-3xl font-bold my-6">Payment History: {payments.length}</h2>
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
//                             <th>Action</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {payments.map((payment, index) => (
//                             <tr key={payment._id}>
//                                 <th>{index + 1}</th>
//                                 <td className="font-mono text-xs">{payment.transactionId}</td>
//                                 <td>
//                                     {payment.ticketTitle} <br/>
//                                     <span className="text-xs opacity-50">{payment.bookingQty} seats</span>
//                                 </td>
//                                 <td>${payment.price}</td>
//                                 <td>{new Date(payment.date).toLocaleDateString()}</td>
//                                 <td>
//                                     <span className="badge badge-success text-white">Paid</span>
//                                 </td>
//                                 <td>
//                                     <button 
//                                         onClick={() => handleDownload(payment)} 
//                                         className="btn btn-xs btn-outline btn-primary">
//                                         Download Ticket
//                                     </button>
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
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../providers/AuthProviders";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaFileInvoiceDollar, FaCheckCircle, FaDownload } from "react-icons/fa";

const PaymentHistory = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const [payments, setPayments] = useState([]);

    useEffect(() => {
        if(user?.email){
            axiosSecure.get(`/payments/${user.email}`)
                .then(res => setPayments(res.data))
        }
    }, [user, axiosSecure]);

    // Enhanced Professional Ticket Design
    const handleDownload = (payment) => {
        const ticketContent = `
            <html>
            <head>
                <title>Ticket - ${payment.ticketTitle}</title>
                <style>
                    body { font-family: 'Helvetica', sans-serif; padding: 40px; background-color: #f3f4f6; -webkit-print-color-adjust: exact; }
                    .ticket-box { 
                        border: 1px solid #e5e7eb; 
                        padding: 0; 
                        max-width: 700px; 
                        margin: 0 auto; 
                        background: white;
                        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
                        border-radius: 12px;
                        overflow: hidden;
                    }
                    .header { 
                        background: #1e3a8a; 
                        color: white; 
                        padding: 30px; 
                        text-align: center;
                    }
                    .header h1 { margin: 0; font-size: 24px; letter-spacing: 1px; }
                    .header h3 { margin: 5px 0 0; opacity: 0.8; font-weight: normal; font-size: 14px; text-transform: uppercase; }
                    
                    .content { padding: 40px; }
                    
                    .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 30px; }
                    .info-item { border-bottom: 1px solid #f0f0f0; padding-bottom: 10px; }
                    .label { font-size: 11px; color: #6b7280; text-transform: uppercase; letter-spacing: 0.5px; display: block; margin-bottom: 4px; }
                    .value { font-size: 15px; color: #111827; font-weight: 600; }
                    
                    .total-section { 
                        background: #f0fdf4; 
                        border: 1px dashed #22c55e; 
                        padding: 15px; 
                        border-radius: 8px; 
                        text-align: center;
                        margin-top: 20px;
                    }
                    .total-label { color: #15803d; font-weight: bold; }
                    .total-price { font-size: 24px; color: #15803d; font-weight: 900; }

                    .footer { text-align: center; margin-top: 30px; font-size: 11px; color: #9ca3af; padding: 20px; background: #f9fafb; border-top: 1px solid #e5e7eb; }
                </style>
            </head>
            <body>
                <div class="ticket-box">
                    <div class="header">
                        <h1>TicketBari</h1>
                        <h3>Confirmed E-Ticket</h3>
                    </div>
                    
                    <div class="content">
                        <div class="info-grid">
                            <div class="info-item">
                                <span class="label">Transaction ID</span>
                                <span class="value" style="font-family: monospace;">${payment.transactionId}</span>
                            </div>
                            <div class="info-item">
                                <span class="label">Booking Date</span>
                                <span class="value">${new Date(payment.date).toLocaleDateString()}</span>
                            </div>
                            <div class="info-item">
                                <span class="label">Passenger Name</span>
                                <span class="value">${payment.customerName}</span>
                            </div>
                            <div class="info-item">
                                <span class="label">Passenger Email</span>
                                <span class="value">${payment.customerEmail}</span>
                            </div>
                            <div class="info-item">
                                <span class="label">Route</span>
                                <span class="value">${payment.from || 'Dhaka'} ➝ ${payment.to || 'Destination'}</span>
                            </div>
                            <div class="info-item">
                                <span class="label">Seats Booked</span>
                                <span class="value">${payment.bookingQty} Seat(s)</span>
                            </div>
                        </div>

                        <div class="total-section">
                            <span class="total-label">AMOUNT PAID</span><br/>
                            <span class="total-price">$${payment.price}</span>
                        </div>
                    </div>

                    <div class="footer">
                        <p>This is a computer generated receipt. No signature required.</p>
                        <p>© 2025 TicketBari Inc. All rights reserved.</p>
                    </div>
                </div>
                <script>window.onload = function() { window.print(); }</script>
            </body>
            </html>
        `;

        const printWindow = window.open('', '', 'width=800,height=800');
        printWindow.document.write(ticketContent);
        printWindow.document.close();
    };

    return (
        <div className="w-full max-w-7xl mx-auto px-4 font-poppins">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-end mb-8 border-b border-gray-200 pb-5">
                <div>
                    <h2 className="text-3xl font-bold text-[#1e3a8a]">Transaction History</h2>
                    <p className="text-slate-500 mt-1">View all your past payments and download receipts.</p>
                </div>
                <div className="text-right mt-4 md:mt-0">
                    <span className="text-4xl font-bold text-success">${payments.reduce((acc, curr) => acc + curr.price, 0).toFixed(2)}</span>
                    <p className="text-xs uppercase tracking-wider text-gray-400 font-semibold">Total Spent</p>
                </div>
            </div>

            {/* Professional Table */}
            <div className="bg-white rounded-xl shadow-card overflow-hidden border border-gray-100">
                <div className="overflow-x-auto">
                    <table className="table w-full">
                        {/* Table Head */}
                        <thead className="bg-[#F8FAFC] text-slate-500 border-b border-gray-200">
                            <tr>
                                <th className="py-4 pl-6">Transaction ID</th>
                                <th>Ticket Details</th>
                                <th>Date</th>
                                <th>Amount</th>
                                <th>Status</th>
                                <th className="pr-6 text-right">Receipt</th>
                            </tr>
                        </thead>
                        
                        {/* Table Body */}
                        <tbody className="divide-y divide-gray-50">
                            {payments.map((payment) => (
                                <tr key={payment._id} className="hover:bg-blue-50/50 transition-colors">
                                    <td className="pl-6 font-mono text-xs font-semibold text-slate-600">
                                        #{payment.transactionId.slice(-8).toUpperCase()}
                                    </td>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar placeholder">
                                                <div className="bg-blue-100 text-blue-600 rounded-full w-8 h-8 flex items-center justify-center">
                                                    <FaFileInvoiceDollar />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-bold text-[#1e3a8a]">{payment.ticketTitle}</div>
                                                <div className="text-xs text-gray-400">{payment.bookingQty} Seat(s) Booked</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="text-sm font-medium text-slate-600">
                                        {new Date(payment.date).toLocaleDateString("en-US", { year: 'numeric', month: 'short', day: 'numeric' })}
                                        <div className="text-xs text-gray-400">{new Date(payment.date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</div>
                                    </td>
                                    <td className="font-bold text-slate-700">
                                        ${payment.price}
                                    </td>
                                    <td>
                                        <div className="badge badge-success gap-2 text-white font-bold text-xs py-3 px-3">
                                            <FaCheckCircle /> Paid
                                        </div>
                                    </td>
                                    <td className="text-right pr-6">
                                        <button 
                                            onClick={() => handleDownload(payment)} 
                                            className="btn btn-sm btn-ghost text-primary hover:bg-blue-50 border border-transparent hover:border-blue-100">
                                            <FaDownload className="mr-1" /> PDF
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* Empty State */}
                    {payments.length === 0 && (
                        <div className="text-center py-16">
                            <div className="text-5xl mb-4 text-gray-200">🧾</div>
                            <h3 className="text-lg font-bold text-gray-400">No transactions found</h3>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PaymentHistory;