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

    return (
        <div className="w-full px-10">
            <h2 className="text-3xl font-bold my-6">Payment History</h2>
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
                        </tr>
                    </thead>
                    <tbody>
                        {payments.map((payment, index) => (
                            <tr key={payment._id}>
                                <th>{index + 1}</th>
                                <td className="font-mono text-xs">{payment.transactionId}</td>
                                <td>{payment.ticketTitle}</td>
                                <td>${payment.price}</td>
                                <td>{new Date(payment.date).toLocaleDateString()}</td>
                                <td>
                                    <span className="badge badge-success text-white">Paid</span>
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