// import { FaCalendarAlt } from "react-icons/fa";
// import { Link } from "react-router-dom";

// const TicketCard = ({ ticket }) => {
//   const { _id, title, from, to, transportType, price, quantity, perks, photo, departureDate } = ticket;

//   return (
//     <div className="card bg-base-100 shadow-xl border border-gray-200 hover:shadow-2xl transition-all duration-300">
//       <figure className="h-48 w-full overflow-hidden">
//         <img src={photo} alt={title} className="w-full h-full object-cover transform hover:scale-110 transition-duration-500" />
//       </figure>
//       <div className="card-body p-5">
//         <div className="flex justify-between items-center">
//           <div className="badge badge-secondary badge-outline">{transportType}</div>
//           <div className="text-lg font-bold text-primary">${price}</div>
//         </div>
//         <h2 className="card-title mt-2">{title}</h2>
//         <p className="text-gray-500 text-sm">
//           Route: <span className="font-semibold">{from}</span> ➝ <span className="font-semibold">{to}</span>
//         </p>
//         {/* --- NEW: Departure Date */}
//         <p className="text-sm text-gray-500 flex items-center gap-2 mt-1">
//              <FaCalendarAlt /> {new Date(departureDate).toLocaleString()}
//         </p>
        
//         {/* Perks Section */}
//         <div className="flex flex-wrap gap-2 my-2">
//           {/* {perks?.slice(0, 3).map((perk, idx) => ( */}
//           {Array.isArray(perks) && perks.slice(0, 3).map((perk, idx) => (
//             <span key={idx} className="text-xs bg-gray-100 px-2 py-1 rounded text-gray-600">{perk}</span>
//           ))}
//         </div>

//         <div className="card-actions justify-between items-center mt-4">
//           <div className={`text-sm ${quantity > 0 ? 'text-success' : 'text-error'}`}>
//             {quantity > 0 ? `${quantity} Seats Available` : 'Sold Out'}
//           </div>
//           <Link to={`/ticket/${_id}`}>
//             <button className="btn btn-primary btn-sm">See Details</button>
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TicketCard;


import { FaCalendarAlt, FaMapMarkerAlt, FaBus, FaArrowRight, FaTicketAlt, FaChair, FaPlane, FaTrain, FaShip, FaClock } from "react-icons/fa";
import { Link } from "react-router-dom";

const TicketCard = ({ ticket }) => {
  const { _id, title, from, to, transportType, price, quantity, perks, photo, departureDate } = ticket;

  // Helper to determine transport icon
  const getTransportIcon = (type) => {
      const lowerType = type?.toLowerCase() || "";
      if (lowerType.includes("flight") || lowerType.includes("plane") || lowerType.includes("air")) return <FaPlane className="rotate-[-45deg]" />;
      if (lowerType.includes("train") || lowerType.includes("rail")) return <FaTrain />;
      if (lowerType.includes("launch") || lowerType.includes("ship")) return <FaShip />;
      return <FaBus />; 
  };

  // Helper to format Date & Time nicely
  const formatDateTime = (dateString) => {
      if (!dateString) return "Date N/A";
      const date = new Date(dateString);
      return date.toLocaleString('en-US', { 
          month: 'short', 
          day: 'numeric', 
          year: 'numeric', 
          hour: '2-digit', 
          minute: '2-digit',
          hour12: true 
      }); 
      // Example output: "Dec 25, 2025, 10:30 AM"
  };

  return (
    <div className="card bg-base-100 shadow-card border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group h-full flex flex-col font-poppins">
      
      {/* 1. Image Header */}
      <figure className="h-52 w-full relative overflow-hidden">
        <img 
            src={photo} 
            alt={title} 
            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" 
        />
        <div className="absolute top-3 left-3">
            <span className="badge bg-white/90 text-[#1e3a8a] font-bold border-none shadow-sm backdrop-blur-sm gap-2 p-3">
                {getTransportIcon(transportType)} {transportType}
            </span>
        </div>
        <div className="absolute bottom-3 right-3">
            <span className="badge badge-lg bg-primary text-white font-bold border-none shadow-md p-4">
                ${price}
            </span>
        </div>
      </figure>

      {/* 2. Card Content */}
      <div className="card-body p-5 flex-grow">
        
        <h2 className="card-title text-lg font-bold text-[#1e3a8a] mb-1 line-clamp-1" title={title}>
            {title}
        </h2>
        
        <div className="flex items-center gap-2 text-sm text-slate-500 font-medium mb-3">
            <span className="flex items-center gap-1"><FaMapMarkerAlt className="text-primary"/> {from}</span>
            <FaArrowRight className="text-gray-300 text-xs" />
            <span className="flex items-center gap-1"><FaMapMarkerAlt className="text-primary"/> {to}</span>
        </div>

        <div className="divider my-1"></div>

        {/* ✅ FIXED: Shows Date AND Time now */}
        <div className="grid grid-cols-1 gap-y-2 text-sm text-gray-600 mb-3">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2" title="Departure Time">
                    <FaCalendarAlt className="text-primary" />
                    <span className="font-semibold">{formatDateTime(departureDate)}</span>
                </div>
                <div className="flex items-center gap-2">
                     <span className={quantity > 0 ? "badge badge-xs badge-success text-white py-2" : "badge badge-xs badge-error text-white py-2"}>
                        {quantity > 0 ? `${quantity} Seats` : 'Sold Out'}
                     </span>
                </div>
            </div>
        </div>

        {/* Perks */}
        <div className="flex flex-wrap gap-2 mb-4">
            {Array.isArray(perks) && perks.slice(0, 3).map((perk, idx) => (
                <span key={idx} className="badge badge-xs bg-blue-50 text-blue-600 border-none px-2 py-3 font-semibold">
                    {perk}
                </span>
            ))}
        </div>

        {/* 3. Action Button */}
        <div className="card-actions mt-auto">
          <Link to={`/ticket/${_id}`} className="w-full">
            <button className="btn btn-primary w-full shadow-lg shadow-blue-100 group-hover:bg-[#1e3a8a] border-none transition-colors">
                See Details <FaArrowRight className="ml-1" />
            </button>
          </Link>
        </div>

      </div>
    </div>
  );
};

export default TicketCard;