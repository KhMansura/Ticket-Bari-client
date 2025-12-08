import { useEffect, useState } from "react";
import TicketCard from "../../components/TicketCard";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";

const Home = () => {
  const [latestTickets, setLatestTickets] = useState([]);
  const [advertisedTickets, setAdvertisedTickets] = useState([]);
  const navigate = useNavigate();

  const handleSubscribe = () => {
      // Show success alert first, then redirect
      Swal.fire({
          title: "Subscribed!",
          text: "Thank you for joining us.",
          icon: "success",
          timer: 1500,
          showConfirmButton: false
      }).then(() => {
          // Redirect to the new success page
          navigate("/subscription-success");
      });
    }
  
  useEffect(() => {
    // Ensure your server has this route: app.get('/tickets/latest', ...)
    axios.get('http://localhost:5000/tickets') 
      .then(res => {
        const approved = res.data.filter(t => t.verificationStatus === 'approved');
        setLatestTickets(approved.slice(0, 6)); 
      });
      
      axios.get('http://localhost:5000/tickets/advertised')
        .then(res => setAdvertisedTickets(res.data));
  }, []);

  return (
    <div>
      {/* 1. Hero Banner */}
      <div className="hero min-h-[500px]" style={{backgroundImage: 'url(https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=2069&auto=format&fit=crop)'}}>
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold">Welcome to TicketBari</h1>
            <p className="mb-5">Book your bus, train, launch, and flight tickets easily from one place.</p>
            <button className="btn btn-primary">Book Now</button>
          </div>
        </div>
      </div>

      {/* 2. Advertisement Section (Admin Choice) */}
      {advertisedTickets.length > 0 && (
        <div className="max-w-7xl mx-auto py-12 px-4 bg-yellow-50 rounded-xl my-10">
          <h2 className="text-3xl font-bold text-center mb-8">Featured Trips 🌟</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {advertisedTickets.map(ticket => <TicketCard key={ticket._id} ticket={ticket} />)}
          </div>
        </div>
      )}

      {/* 3. Latest Tickets Section */}
      <div className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-8">Latest Tickets 🎟️</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {latestTickets.map(ticket => (
                    <TicketCard key={ticket._id} ticket={ticket} />
                ))}
            </div>
        </div>
      </div>

      {/* 4. Extra Section: Why Choose Us */}
      <div className="py-12 text-center">
        <h2 className="text-3xl font-bold mb-8">Why Choose Us?</h2>
        <div className="flex flex-wrap justify-center gap-10">
            <div className="w-60 p-4 border rounded shadow">
                <div className="text-4xl mb-2">🛡️</div>
                <h3 className="font-bold">Secure Payment</h3>
            </div>
            <div className="w-60 p-4 border rounded shadow">
                <div className="text-4xl mb-2">⚡</div>
                <h3 className="font-bold">Fast Booking</h3>
            </div>
            <div className="w-60 p-4 border rounded shadow">
                <div className="text-4xl mb-2">📞</div>
                <h3 className="font-bold">24/7 Support</h3>
            </div>
            {/* 5. Extra Section: Newsletter */}
      <div className="bg-base-200 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Get Updates on New Routes! 📩</h2>
            <p className="mb-6 text-gray-500">Subscribe to our newsletter to get the latest ticket offers and updates directly to your inbox.</p>
            
            <div className="join w-full justify-center">
                <input className="input input-bordered join-item w-full max-w-xs" placeholder="Enter your email" />
                <button 
                    onClick={handleSubscribe} 
                    className="btn btn-primary join-item">
                    Subscribe
                </button>
            </div>
        </div>
      </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
