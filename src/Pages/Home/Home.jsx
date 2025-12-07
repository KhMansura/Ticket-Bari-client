// import React from 'react'

// export default function Home () {
//   return <h1>Home</h1>;
//     }
import { useEffect, useState } from "react";
import TicketCard from "../../components/TicketCard";
import axios from "axios";

const Home = () => {
  const [latestTickets, setLatestTickets] = useState([]);

  // Fetch data from your server
  useEffect(() => {
    // Ensure your server has this route: app.get('/tickets/latest', ...)
    axios.get('http://localhost:5000/tickets') 
      .then(res => {
        // For now, just taking the first 6 as "latest"
        setLatestTickets(res.data.slice(0, 6)); 
      })
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
      <div className="max-w-7xl mx-auto py-12 px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Featured Trips 🌟</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
             {/* Map through 'advertised' tickets here later */}
             {latestTickets.slice(0,3).map(ticket => <TicketCard key={ticket._id} ticket={ticket} />)}
        </div>
      </div>

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
        </div>
      </div>
    </div>
  );
};

export default Home;
