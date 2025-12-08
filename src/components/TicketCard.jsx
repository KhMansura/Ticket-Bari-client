import { Link } from "react-router-dom";

const TicketCard = ({ ticket }) => {
  const { _id, title, from, to, transportType, price, quantity, perks, photo, departureDate } = ticket;

  return (
    <div className="card bg-base-100 shadow-xl border border-gray-200 hover:shadow-2xl transition-all duration-300">
      <figure className="h-48 w-full overflow-hidden">
        <img src={photo} alt={title} className="w-full h-full object-cover transform hover:scale-110 transition-duration-500" />
      </figure>
      <div className="card-body p-5">
        <div className="flex justify-between items-center">
          <div className="badge badge-secondary badge-outline">{transportType}</div>
          <div className="text-lg font-bold text-primary">${price}</div>
        </div>
        <h2 className="card-title mt-2">{title}</h2>
        <p className="text-gray-500 text-sm">
          Route: <span className="font-semibold">{from}</span> ➝ <span className="font-semibold">{to}</span>
        </p>
        
        {/* Perks Section */}
        <div className="flex flex-wrap gap-2 my-2">
          {perks?.slice(0, 3).map((perk, idx) => (
            <span key={idx} className="text-xs bg-gray-100 px-2 py-1 rounded text-gray-600">{perk}</span>
          ))}
        </div>

        <div className="card-actions justify-between items-center mt-4">
          <div className={`text-sm ${quantity > 0 ? 'text-success' : 'text-error'}`}>
            {quantity > 0 ? `${quantity} Seats Available` : 'Sold Out'}
          </div>
          <Link to={`/ticket/${_id}`}>
            <button className="btn btn-primary btn-sm">See Details</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TicketCard;