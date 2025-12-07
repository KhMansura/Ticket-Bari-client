import { useEffect, useState } from "react";
import axios from "axios";
import TicketCard from "../../components/TicketCard"; // Use the component we made earlier

const AllTickets = () => {
    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch all tickets from the server
        axios.get('http://localhost:5000/tickets')
            .then(res => {
                setTickets(res.data);
                setLoading(false);
            })
            .catch(error => {
                console.error(error);
                setLoading(false);
            })
    }, []);

    if(loading) {
        return <div className="text-center mt-20"><span className="loading loading-spinner loading-lg"></span></div>
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-10">
            <h2 className="text-4xl font-bold text-center mb-10">All Available Tickets</h2>
            
            {/* Grid Layout for Tickets */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {tickets.map(ticket => (
                    <TicketCard key={ticket._id} ticket={ticket} />
                ))}
            </div>

            {tickets.length === 0 && (
                <div className="text-center text-gray-500 mt-10">
                    <p>No tickets found. Please ask a Vendor to add some!</p>
                </div>
            )}
        </div>
    );
};

export default AllTickets;