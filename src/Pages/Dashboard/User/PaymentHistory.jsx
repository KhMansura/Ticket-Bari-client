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

//     // --- NEW: Download Logic ---
//     const handleDownload = (payment) => {
//         // Create a simple printable view
//         const printContent = `
//             <div style="font-family: Arial, sans-serif; padding: 40px; border: 2px dashed #333; max-width: 600px; margin: auto;">
//                 <h1 style="text-align: center; color: #4CAF50; margin-bottom: 10px;">TicketBari</h1>
//                 <h3 style="text-align: center; text-transform: uppercase; margin-top: 0;">Official E-Ticket</h3>
//                 <hr style="border: 1px solid #ddd; margin: 20px 0;" />
                
//                 <p><strong>Ticket ID:</strong> ${payment.ticketId}</p>
//                 <p><strong>Transaction ID:</strong> ${payment.transactionId}</p>
//                 <br/>
//                 <h2 style="color: #333;">${payment.ticketTitle || "Bus Ticket"}</h2>
//                 <p><strong>Passenger:</strong> ${payment.customerName}</p>
//                 <p><strong>Email:</strong> ${payment.customerEmail}</p>
//                 <p><strong>Route:</strong> ${payment.from || 'N/A'} ➝ ${payment.to || 'N/A'}</p>
//                 <p><strong>Transport:</strong> ${payment.transportType || 'Bus'}</p>
//                 <br/>
//                 <div style="display: flex; justify-content: space-between; font-weight: bold; font-size: 18px;">
//                     <span>Seats: ${payment.bookingQty}</span>
//                     <span>Total Paid: $${payment.price}</span>
//                 </div>
//                 <br />
//                 <hr style="border: 1px solid #ddd;" />
//                 <p style="text-align: center; font-size: 12px; color: #888;">
//                     Issue Date: ${new Date(payment.date).toLocaleString()} <br/>
//                     Please show this ticket at the counter.
//                 </p>
//             </div>
//         `;
        
//         const printWindow = window.open('', '', 'width=800,height=600');
//         printWindow.document.write('<html><head><title>Print Ticket</title></head><body>');
//         printWindow.document.write(printContent);
//         printWindow.document.write('</body></html>');
//         printWindow.document.close();
//         printWindow.print();
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
//                             <th>Action</th> {/* Added Action Column */}
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
//                                     {/* Added Download Button */}
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

    const handleDownload = (payment) => {
        // 1. Create the Ticket Design
        const ticketContent = `
            <html>
            <head>
                <title>Ticket - ${payment.ticketTitle}</title>
                <style>
                    body { font-family: Arial, sans-serif; padding: 40px; background-color: #f9f9f9; }
                    .ticket-box { 
                        border: 2px dashed #4CAF50; 
                        padding: 30px; 
                        max-width: 600px; 
                        margin: 0 auto; 
                        background: white;
                        border-radius: 10px;
                    }
                    .header { text-align: center; color: #4CAF50; margin-bottom: 20px; }
                    .info-row { display: flex; justify-content: space-between; margin-bottom: 10px; border-bottom: 1px solid #eee; padding-bottom: 5px; }
                    .label { font-weight: bold; color: #555; }
                    .footer { text-align: center; margin-top: 30px; font-size: 12px; color: #888; }
                    .btn-print { display: none; } /* Hide print button in print view */
                </style>
            </head>
            <body>
                <div class="ticket-box">
                    <div class="header">
                        <h1>TicketBari</h1>
                        <h3>Official E-Ticket</h3>
                    </div>
                    
                    <div class="info-row">
                        <span class="label">Transaction ID:</span>
                        <span>${payment.transactionId}</span>
                    </div>
                    <div class="info-row">
                        <span class="label">Passenger:</span>
                        <span>${payment.customerName}</span>
                    </div>
                    <div class="info-row">
                        <span class="label">Email:</span>
                        <span>${payment.customerEmail}</span>
                    </div>
                    <div class="info-row">
                        <span class="label">Route:</span>
                        <span>${payment.from || 'N/A'} ➝ ${payment.to || 'N/A'}</span>
                    </div>
                    <div class="info-row">
                        <span class="label">Transport:</span>
                        <span>${payment.transportType || 'Bus'}</span>
                    </div>
                    <div class="info-row">
                        <span class="label">Seats:</span>
                        <span>${payment.bookingQty}</span>
                    </div>
                    <div class="info-row">
                        <span class="label">Total Paid:</span>
                        <span style="color: #4CAF50; font-weight: bold;">$${payment.price}</span>
                    </div>
                    <div class="info-row">
                        <span class="label">Booking Date:</span>
                        <span>${new Date(payment.date).toLocaleString()}</span>
                    </div>

                    <div class="footer">
                        <p>Please show this ticket at the counter.</p>
                        <p>Thank you for traveling with TicketBari!</p>
                    </div>
                </div>
                <script>
                    window.onload = function() { window.print(); }
                </script>
            </body>
            </html>
        `;

        // 2. Open a new window and print it
        const printWindow = window.open('', '', 'width=800,height=800');
        printWindow.document.write(ticketContent);
        printWindow.document.close();
    };

    return (
        <div className="w-full px-10">
            <h2 className="text-3xl font-bold my-6">Payment History: {payments.length}</h2>
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Transaction ID</th>
                            <th>Ticket</th>
                            <th>Amount</th>
                            <th>Date</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {payments.map((payment, index) => (
                            <tr key={payment._id}>
                                <th>{index + 1}</th>
                                <td className="font-mono text-xs">{payment.transactionId}</td>
                                <td>
                                    {payment.ticketTitle} <br/>
                                    <span className="text-xs opacity-50">{payment.bookingQty} seats</span>
                                </td>
                                <td>${payment.price}</td>
                                <td>{new Date(payment.date).toLocaleDateString()}</td>
                                <td>
                                    <span className="badge badge-success text-white">Paid</span>
                                </td>
                                <td>
                                    <button 
                                        onClick={() => handleDownload(payment)} 
                                        className="btn btn-xs btn-outline btn-primary">
                                        Download Ticket
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PaymentHistory;