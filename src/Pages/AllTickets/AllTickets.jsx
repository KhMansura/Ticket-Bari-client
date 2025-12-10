import { useEffect, useState } from "react";
import axios from "axios";
import TicketCard from "../../components/TicketCard";

const AllTickets = () => {
    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(true);
    
    // --- 1. STATES FOR SEARCH & FILTER ---
    const [searchFrom, setSearchFrom] = useState('');
    const [searchTo, setSearchTo] = useState('');
    const [filterType, setFilterType] = useState('All'); 
    const [sortOrder, setSortOrder] = useState('default'); 

    // --- 2. PAGINATION STATES ---
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(6);

    useEffect(() => {
        // Fetch all tickets from the database
        axios.get('http://localhost:5000/tickets')
            .then(res => {
                // Show approved tickets only
                const approved = res.data.filter(t => t.verificationStatus === 'approved');
                setTickets(approved);
                setLoading(false);
            })
    }, []);

    // --- 2. FILTERING LOGIC ---
    const filteredTickets = tickets.filter(ticket => {
        const matchFrom = ticket.from.toLowerCase().includes(searchFrom.toLowerCase());
        const matchTo = ticket.to.toLowerCase().includes(searchTo.toLowerCase());
        const matchType = filterType === 'All' || ticket.transportType === filterType;
        return matchFrom && matchTo && matchType;
    });

    // --- 3. SORTING LOGIC ---
    const sortedTickets = [...filteredTickets].sort((a, b) => {
        if(sortOrder === 'asc') return a.price - b.price;
        if(sortOrder === 'desc') return b.price - a.price;
        return 0;
    });
    // --- 4. PAGINATION CALCULATIONS ---
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = sortedTickets.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(sortedTickets.length / itemsPerPage);

    // Reset to page 1 if user changes filter/search
    useEffect(() => {
        setCurrentPage(1);
    }, [searchFrom, searchTo, filterType, sortOrder]);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    if(loading) return <div className="text-center mt-20"><span className="loading loading-spinner loading-lg"></span></div>

    return (
        <div className="min-h-screen bg-base-200 py-10">
            <div className="max-w-7xl mx-auto px-4">
                <h2 className="text-4xl font-bold text-center mb-8 text-white">All Available Tickets</h2>
                
                {/* --- SEARCH & FILTER BAR --- */}
                <div className="bg-base-100 p-4 rounded-xl shadow-lg flex flex-wrap gap-4 items-center justify-center mb-10 border border-gray-700">
                    
                    {/* From Input */}
                    <input 
                        type="text" 
                        placeholder="From (Location)" 
                        className="input input-bordered w-full md:w-auto bg-base-200" 
                        value={searchFrom}
                        onChange={(e) => setSearchFrom(e.target.value)}
                    />

                    {/* To Input */}
                    <input 
                        type="text" 
                        placeholder="To (Location)" 
                        className="input input-bordered w-full md:w-auto bg-base-200" 
                        value={searchTo}
                        onChange={(e) => setSearchTo(e.target.value)}
                    />
                    
                    {/* Transport Type Dropdown */}
                    <select 
                        className="select select-bordered w-full md:w-auto bg-base-200" 
                        value={filterType}
                        onChange={(e) => setFilterType(e.target.value)}
                    >
                        <option value="All">All Transports</option>
                        <option value="Bus">Bus</option>
                        <option value="Train">Train</option>
                        <option value="Launch">Launch</option>
                        <option value="Plane">Plane</option>
                    </select>

                    {/* Sort Dropdown */}
                    <select 
                        className="select select-bordered w-full md:w-auto bg-base-200" 
                        value={sortOrder}
                        onChange={(e) => setSortOrder(e.target.value)}
                    >
                        <option value="default">Sort by Price</option>
                        <option value="asc">Low to High</option>
                        <option value="desc">High to Low</option>
                    </select>
                </div>

                {/* --- TICKET GRID --- */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {currentItems.map(ticket => (
                        <TicketCard key={ticket._id} ticket={ticket} />
                    ))}
                </div>
                {/* --- PAGINATION CONTROLS --- */}
                {totalPages > 1 && (
                    <div className="flex justify-center mt-10">
                        <div className="join">
                            <button 
                                className="join-item btn" 
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 1}
                            >
                                «
                            </button>
                            {[...Array(totalPages)].map((_, index) => (
                                <button 
                                    key={index} 
                                    className={`join-item btn ${currentPage === index + 1 ? 'btn-active btn-primary' : ''}`}
                                    onClick={() => handlePageChange(index + 1)}
                                >
                                    {index + 1}
                                </button>
                            ))}
                            <button 
                                className="join-item btn" 
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage === totalPages}
                            >
                                »
                            </button>
                        </div>
                    </div>
                )}

                {/* Empty State Message */}
                {sortedTickets.length === 0 && (
                    <div className="text-center text-gray-500 mt-20">
                        <h3 className="text-2xl font-bold">No tickets found</h3>
                        <p>Try changing your search or filter.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AllTickets;