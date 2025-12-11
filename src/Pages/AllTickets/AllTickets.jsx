// import { useEffect, useState } from "react";
// import axios from "axios";
// import TicketCard from "../../components/TicketCard";

// const AllTickets = () => {
//     const [tickets, setTickets] = useState([]);
//     const [loading, setLoading] = useState(true);
    
//     // --- 1. STATES FOR SEARCH & FILTER ---
//     const [searchFrom, setSearchFrom] = useState('');
//     const [searchTo, setSearchTo] = useState('');
//     const [filterType, setFilterType] = useState('All'); 
//     const [sortOrder, setSortOrder] = useState('default'); 

//     // --- 2. PAGINATION STATES ---
//     const [currentPage, setCurrentPage] = useState(1);
//     const [itemsPerPage] = useState(6);

//     useEffect(() => {
//         // Fetch all tickets from the database
//         axios.get('http://localhost:5000/tickets')
//             .then(res => {
//                 // Show approved tickets only
//                 const approved = res.data.filter(t => t.verificationStatus === 'approved');
//                 setTickets(approved);
//                 setLoading(false);
//             })
//     }, []);

//     // --- 2. FILTERING LOGIC ---
//     const filteredTickets = tickets.filter(ticket => {
//         const matchFrom = ticket.from.toLowerCase().includes(searchFrom.toLowerCase());
//         const matchTo = ticket.to.toLowerCase().includes(searchTo.toLowerCase());
//         const matchType = filterType === 'All' || ticket.transportType === filterType;
//         return matchFrom && matchTo && matchType;
//     });

//     // --- 3. SORTING LOGIC ---
//     const sortedTickets = [...filteredTickets].sort((a, b) => {
//         if(sortOrder === 'asc') return a.price - b.price;
//         if(sortOrder === 'desc') return b.price - a.price;
//         return 0;
//     });
//     // --- 4. PAGINATION CALCULATIONS ---
//     const indexOfLastItem = currentPage * itemsPerPage;
//     const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//     const currentItems = sortedTickets.slice(indexOfFirstItem, indexOfLastItem);
//     const totalPages = Math.ceil(sortedTickets.length / itemsPerPage);

//     // Reset to page 1 if user changes filter/search
//     useEffect(() => {
//         setCurrentPage(1);
//     }, [searchFrom, searchTo, filterType, sortOrder]);

//     const handlePageChange = (pageNumber) => {
//         setCurrentPage(pageNumber);
//     };

//     if(loading) return <div className="text-center mt-20"><span className="loading loading-spinner loading-lg"></span></div>

//     return (
//         <div className="min-h-screen bg-base-200 py-10">
//             <div className="max-w-7xl mx-auto px-4">
//                 <h2 className="text-4xl font-bold text-center mb-8 text-purple-800">All Available Tickets</h2>
                
//                 {/* --- SEARCH & FILTER BAR --- */}
//                 <div className="bg-base-100 p-4 rounded-xl shadow-lg flex flex-wrap gap-4 items-center justify-center mb-10 border border-gray-700">
                    
//                     {/* From Input */}
//                     <input 
//                         type="text" 
//                         placeholder="From (Location)" 
//                         className="input input-bordered w-full md:w-auto bg-base-200" 
//                         value={searchFrom}
//                         onChange={(e) => setSearchFrom(e.target.value)}
//                     />

//                     {/* To Input */}
//                     <input 
//                         type="text" 
//                         placeholder="To (Location)" 
//                         className="input input-bordered w-full md:w-auto bg-base-200" 
//                         value={searchTo}
//                         onChange={(e) => setSearchTo(e.target.value)}
//                     />
                    
//                     {/* Transport Type Dropdown */}
//                     <select 
//                         className="select select-bordered w-full md:w-auto bg-base-200" 
//                         value={filterType}
//                         onChange={(e) => setFilterType(e.target.value)}
//                     >
//                         <option value="All">All Transports</option>
//                         <option value="Bus">Bus</option>
//                         <option value="Train">Train</option>
//                         <option value="Launch">Launch</option>
//                         <option value="Plane">Plane</option>
//                     </select>

//                     {/* Sort Dropdown */}
//                     <select 
//                         className="select select-bordered w-full md:w-auto bg-base-200" 
//                         value={sortOrder}
//                         onChange={(e) => setSortOrder(e.target.value)}
//                     >
//                         <option value="default">Sort by Price</option>
//                         <option value="asc">Low to High</option>
//                         <option value="desc">High to Low</option>
//                     </select>
//                 </div>

//                 {/* --- TICKET GRID --- */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                     {currentItems.map(ticket => (
//                         <TicketCard key={ticket._id} ticket={ticket} />
//                     ))}
//                 </div>
//                 {/* --- PAGINATION CONTROLS --- */}
//                 {totalPages > 1 && (
//                     <div className="flex justify-center mt-10">
//                         <div className="join">
//                             <button 
//                                 className="join-item btn" 
//                                 onClick={() => handlePageChange(currentPage - 1)}
//                                 disabled={currentPage === 1}
//                             >
//                                 «
//                             </button>
//                             {[...Array(totalPages)].map((_, index) => (
//                                 <button 
//                                     key={index} 
//                                     className={`join-item btn ${currentPage === index + 1 ? 'btn-active btn-primary' : ''}`}
//                                     onClick={() => handlePageChange(index + 1)}
//                                 >
//                                     {index + 1}
//                                 </button>
//                             ))}
//                             <button 
//                                 className="join-item btn" 
//                                 onClick={() => handlePageChange(currentPage + 1)}
//                                 disabled={currentPage === totalPages}
//                             >
//                                 »
//                             </button>
//                         </div>
//                     </div>
//                 )}

//                 {/* Empty State Message */}
//                 {sortedTickets.length === 0 && (
//                     <div className="text-center text-gray-500 mt-20">
//                         <h3 className="text-2xl font-bold">No tickets found</h3>
//                         <p>Try changing your search or filter.</p>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default AllTickets;
import { useEffect, useState } from "react";
import axios from "axios";
import TicketCard from "../../components/TicketCard";
import { FaSearch, FaFilter, FaSortAmountDown } from "react-icons/fa";

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
        axios.get('http://localhost:5000/tickets')
            .then(res => {
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

    useEffect(() => {
        setCurrentPage(1);
    }, [searchFrom, searchTo, filterType, sortOrder]);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    if(loading) return (
        <div className="min-h-screen flex items-center justify-center bg-base-200">
            <span className="loading loading-spinner loading-lg text-primary"></span>
        </div>
    );

    return (
        <div className="min-h-screen bg-base-200 pb-20">
            
            {/* 1. Professional Header Section */}
            <div className="relative bg-gradient-to-r from-[#1e3a8a] to-[#2563EB] py-16 text-center text-white">
                <div className="absolute inset-0 bg-black opacity-10"></div>
                <div className="relative z-10 max-w-4xl mx-auto px-4">
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[#93c5fd] to-[#3b82f6]">All Available Tickets</h1>
                    <p className="text-blue-100 text-lg">Find the best deals for your next journey across Bangladesh.</p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 -mt-10 relative z-20">
                
                {/* 2. Floating Professional Search Bar */}
                <div className="bg-base-100 p-6 rounded-2xl shadow-card border border-gray-100 flex flex-col md:flex-row flex-wrap gap-4 items-center justify-between mb-12">
                    
                    {/* Search Inputs Group */}
                    <div className="flex flex-1 gap-4 w-full md:w-auto">
                        <div className="relative w-full">
                            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input 
                                type="text" 
                                placeholder="From (Location)" 
                                className="input input-bordered w-full pl-10 bg-base-200 focus:bg-white focus:border-primary transition-all rounded-lg" 
                                value={searchFrom}
                                onChange={(e) => setSearchFrom(e.target.value)}
                            />
                        </div>
                        <div className="relative w-full">
                            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input 
                                type="text" 
                                placeholder="To (Location)" 
                                className="input input-bordered w-full pl-10 bg-base-200 focus:bg-white focus:border-primary transition-all rounded-lg" 
                                value={searchTo}
                                onChange={(e) => setSearchTo(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Filters Group */}
                    <div className="flex gap-4 w-full md:w-auto overflow-x-auto">
                        <div className="relative min-w-[150px]">
                            <FaFilter className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                            <select 
                                className="select select-bordered w-full pl-10 bg-base-200 focus:bg-white focus:border-primary rounded-lg" 
                                value={filterType}
                                onChange={(e) => setFilterType(e.target.value)}
                            >
                                <option value="All">All Types</option>
                                <option value="Bus">Bus</option>
                                <option value="Train">Train</option>
                                <option value="Launch">Launch</option>
                                <option value="Plane">Plane</option>
                            </select>
                        </div>

                        <div className="relative min-w-[150px]">
                            <FaSortAmountDown className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                            <select 
                                className="select select-bordered w-full pl-10 bg-base-200 focus:bg-white focus:border-primary rounded-lg" 
                                value={sortOrder}
                                onChange={(e) => setSortOrder(e.target.value)}
                            >
                                <option value="default">Sort by</option>
                                <option value="asc">Price: Low to High</option>
                                <option value="desc">Price: High to Low</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* 3. Results Section */}
                <div className="mb-6 flex justify-between items-center px-2">
                    <h2 className="text-xl font-bold text-[#1e3a8a]">
                        Available Tickets <span className="text-sm font-normal text-slate-500 ml-2">({filteredTickets.length} found)</span>
                    </h2>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {currentItems.map(ticket => (
                        <TicketCard key={ticket._id} ticket={ticket} />
                    ))}
                </div>

                {/* 4. Professional Pagination */}
                {totalPages > 1 && (
                    <div className="flex justify-center mt-16">
                        <div className="join shadow-sm bg-white rounded-lg p-1 border border-gray-100">
                            <button 
                                className="join-item btn btn-sm btn-ghost hover:bg-blue-50" 
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 1}
                            >
                                « Previous
                            </button>
                            {[...Array(totalPages)].map((_, index) => (
                                <button 
                                    key={index} 
                                    className={`join-item btn btn-sm ${currentPage === index + 1 ? 'btn-primary text-white shadow-md' : 'btn-ghost hover:bg-blue-50'}`}
                                    onClick={() => handlePageChange(index + 1)}
                                >
                                    {index + 1}
                                </button>
                            ))}
                            <button 
                                className="join-item btn btn-sm btn-ghost hover:bg-blue-50" 
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage === totalPages}
                            >
                                Next »
                            </button>
                        </div>
                    </div>
                )}

                {/* 5. Empty State */}
                {sortedTickets.length === 0 && (
                    <div className="text-center py-20 bg-base-100 rounded-2xl shadow-sm border border-dashed border-gray-300">
                        <div className="text-6xl mb-4">🎫</div>
                        <h3 className="text-2xl font-bold text-[#1e3a8a]">No tickets found</h3>
                        <p className="text-slate-500 mt-2">Try adjusting your search or filters to find what you're looking for.</p>
                        <button 
                            onClick={() => {setSearchFrom(''); setSearchTo(''); setFilterType('All');}}
                            className="btn btn-outline btn-primary mt-6"
                        >
                            Clear Filters
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AllTickets;