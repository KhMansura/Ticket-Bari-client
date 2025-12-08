// import { useEffect, useState } from "react";
// import axios from "axios";
// import TicketCard from "../../components/TicketCard"; // Use the component we made earlier

// const AllTickets = () => {
//     const [tickets, setTickets] = useState([]);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         // Fetch all tickets from the server
//         axios.get('http://localhost:5000/tickets')
//             .then(res => {
//                 setTickets(res.data);
//                 setLoading(false);
//             })
//             .catch(error => {
//                 console.error(error);
//                 setLoading(false);
//             })
//     }, []);

//     if(loading) {
//         return <div className="text-center mt-20"><span className="loading loading-spinner loading-lg"></span></div>
//     }

//     return (
//         <div className="max-w-7xl mx-auto px-4 py-10">
//             <h2 className="text-4xl font-bold text-center mb-10">All Available Tickets</h2>
            
//             {/* Grid Layout for Tickets */}
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {tickets.map(ticket => (
//                     <TicketCard key={ticket._id} ticket={ticket} />
//                 ))}
//             </div>

//             {tickets.length === 0 && (
//                 <div className="text-center text-gray-500 mt-10">
//                     <p>No tickets found. Please ask a Vendor to add some!</p>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default AllTickets;
import { useEffect, useState } from "react";
import axios from "axios";
import TicketCard from "../../components/TicketCard";

const AllTickets = () => {
    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(true);
    
    // Search & Filter States
    const [searchFrom, setSearchFrom] = useState('');
    const [searchTo, setSearchTo] = useState('');
    const [filterType, setFilterType] = useState('All'); // Bus, Train, etc.
    const [sortOrder, setSortOrder] = useState('default'); // asc, desc

    useEffect(() => {
        axios.get('http://localhost:5000/tickets')
            .then(res => {
                // Only show approved tickets in the public gallery
                const approved = res.data.filter(t => t.verificationStatus === 'approved');
                setTickets(approved);
                setLoading(false);
            })
    }, []);

    // Filter Logic
    const filteredTickets = tickets.filter(ticket => {
        const matchFrom = ticket.from.toLowerCase().includes(searchFrom.toLowerCase());
        const matchTo = ticket.to.toLowerCase().includes(searchTo.toLowerCase());
        const matchType = filterType === 'All' || ticket.transportType === filterType;
        
        return matchFrom && matchTo && matchType;
    });

    // Sort Logic
    const sortedTickets = [...filteredTickets].sort((a, b) => {
        if(sortOrder === 'asc') return a.price - b.price;
        if(sortOrder === 'desc') return b.price - a.price;
        return 0;
    });

    if(loading) return <div className="text-center mt-20"><span className="loading loading-spinner loading-lg"></span></div>

    return (
        <div className="max-w-7xl mx-auto px-4 py-10">
            <h2 className="text-4xl font-bold text-center mb-8">All Available Tickets</h2>
            
            {/* --- Search & Filter Bar --- */}
            <div className="bg-base-200 p-4 rounded-lg flex flex-wrap gap-4 items-center justify-center mb-8">
                <input 
                    type="text" 
                    placeholder="From (Location)" 
                    className="input input-bordered w-full md:w-auto" 
                    onChange={(e) => setSearchFrom(e.target.value)}
                />
                <input 
                    type="text" 
                    placeholder="To (Location)" 
                    className="input input-bordered w-full md:w-auto" 
                    onChange={(e) => setSearchTo(e.target.value)}
                />
                
                <select className="select select-bordered w-full md:w-auto" onChange={(e) => setFilterType(e.target.value)}>
                    <option value="All">All Transports</option>
                    <option value="Bus">Bus</option>
                    <option value="Train">Train</option>
                    <option value="Launch">Launch</option>
                    <option value="Plane">Plane</option>
                </select>

                <select className="select select-bordered w-full md:w-auto" onChange={(e) => setSortOrder(e.target.value)}>
                    <option value="default">Sort by Price</option>
                    <option value="asc">Low to High</option>
                    <option value="desc">High to Low</option>
                </select>
            </div>

            {/* --- Grid Layout --- */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sortedTickets.map(ticket => (
                    <TicketCard key={ticket._id} ticket={ticket} />
                ))}
            </div>

            {sortedTickets.length === 0 && (
                <div className="text-center text-gray-500 mt-10">
                    <p>No tickets found matching your criteria.</p>
                </div>
            )}
        </div>
    );
};

export default AllTickets;