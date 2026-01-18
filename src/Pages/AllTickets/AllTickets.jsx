import { useEffect, useState } from "react";
import axios from "axios";
import TicketCard from "../../components/TicketCard";
import { FaSearch, FaFilter, FaSortAmountDown, FaTimes } from "react-icons/fa";
import TicketSkeleton from "../TicketSkeleton";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const AllTickets = () => {
    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(true);
    const axiosSecure = useAxiosSecure();
    
    // --- 1. STATES FOR SEARCH & FILTER ---
    const [searchFrom, setSearchFrom] = useState('');
    const [searchTo, setSearchTo] = useState('');
    const [filterType, setFilterType] = useState('All'); 
    const [sortOrder, setSortOrder] = useState('default');
    const [maxPrice, setMaxPrice] = useState(5000);

    // --- 2. PAGINATION STATES ---
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(8);

    const resetFilters = () => {
    setSearchFrom('');
    setSearchTo('');
    setFilterType('All');
    setSortOrder('default');
    setMaxPrice(5000); 
    setCurrentPage(1);  
};

  
    useEffect(() => {
    setLoading(true);
    axiosSecure.get(`${import.meta.env.VITE_SERVER_URL}/tickets`)
        .then(res => {
            const approved = res.data.filter(t => t.verificationStatus === 'approved');
            setTickets(approved);
        })
        .catch(err => console.error(err))
        .finally(() => setLoading(false));
}, [axiosSecure])

    // --- 2. FILTERING  ---
    const filteredTickets = tickets.filter(ticket => {
        const matchFrom = ticket.from.toLowerCase().includes(searchFrom.toLowerCase());
        const matchTo = ticket.to.toLowerCase().includes(searchTo.toLowerCase());
        const matchType = filterType === 'All' || ticket.transportType === filterType;
        const matchPrice = ticket.price <= maxPrice;
        return matchFrom && matchTo && matchType && matchPrice;
    });

    // --- 3. SORTING  ---
    const sortedTickets = [...filteredTickets].sort((a, b) => {
        if(sortOrder === 'asc') return a.price - b.price;
        if(sortOrder === 'desc') return b.price - a.price;
        return 0;
    });

    // --- 4. PAGINATION  ---
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = sortedTickets.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(sortedTickets.length / itemsPerPage);

    useEffect(() => {
        setCurrentPage(1);
    }, [searchFrom, searchTo, filterType, sortOrder,maxPrice]);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div className="min-h-screen bg-base-200 pb-20">
            
            {/* 1. Header */}
            <div className="relative bg-gradient-to-r from-[#1e3a8a] to-[#2563EB] py-16 text-center text-white">
                <div className="absolute inset-0 bg-black opacity-10"></div>
                <div className="relative z-10 max-w-4xl mx-auto px-4">
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[#93c5fd] to-[#3b82f6]">All Available Tickets</h1>
                    <p className="text-blue-100 text-lg">Find the best deals for your next journey across Bangladesh.</p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 -mt-10 relative z-20">
                
                {/* 2. Floating Search Bar */}
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
                    <div className="flex flex-col min-w-[200px] w-full md:w-auto px-2">
        <label className="label p-0 mb-1">
            <span className="label-text font-semibold text-gray-600">Max Price: ${maxPrice}</span>
        </label>
        <input 
            type="range" 
            min="0" 
            max="5000" 
            value={maxPrice} 
            onChange={(e) => setMaxPrice(e.target.value)} 
            className="range range-primary range-sm" 
        />
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
                        <button 
        onClick={resetFilters}
        className="btn btn-outline btn-error btn-sm h-12 px-6 rounded-lg flex items-center gap-2 hover:bg-red-50"
        title="Clear all filters"
    >
        <FaTimes className="text-xs" />
        Reset
    </button>
                    </div>
                </div>
                

                {/* 3. Results Section */}
                <div className="mb-6 flex justify-between items-center px-2">
                    <h2 className="text-xl font-bold text-[#1e3a8a]">
                        Available Tickets <span className="text-sm font-normal text-slate-500 ml-2">({filteredTickets.length} found)</span>
                    </h2>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
    {loading 
        ? [...Array(8)].map((_, i) => <TicketSkeleton key={i} />) 
        : currentItems.map(ticket => (
            <TicketCard key={ticket._id} ticket={ticket} />
        ))
    }
</div>

                {/* 4. Pagination */}
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
{!loading && sortedTickets.length === 0 && (
    <div className="text-center py-20 bg-base-100 rounded-2xl shadow-sm border border-dashed border-gray-300">
        <div className="text-6xl mb-4">🎫</div>
        <h3 className="text-2xl font-bold text-secondary">No tickets found</h3>
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