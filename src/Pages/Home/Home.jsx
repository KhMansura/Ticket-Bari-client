// import { useEffect, useState } from "react";
// import TicketCard from "../../components/TicketCard";
// import axios from "axios";
// import Swal from "sweetalert2";
// import { useNavigate } from "react-router";
// import Banner from "./Banner";
// import Partners from "./Partners/Partners";



// const Home = () => {
//   const [latestTickets, setLatestTickets] = useState([]);
//   const [advertisedTickets, setAdvertisedTickets] = useState([]);
//   const navigate = useNavigate();

//   const handleSubscribe = () => {
//       // Show success alert first, then redirect
//       Swal.fire({
//           title: "Subscribed!",
//           text: "Thank you for joining us.",
//           icon: "success",
//           timer: 1500,
//           showConfirmButton: false
//       }).then(() => {
//           // Redirect to the new success page
//           navigate("/subscription-success");
//       });
//     }
  
//   useEffect(() => {
//     // Ensure your server has this route: app.get('/tickets/latest', ...)
//     axios.get('http://localhost:5000/tickets') 
//       .then(res => {
//         const approved = res.data.filter(t => t.verificationStatus === 'approved');
//         setLatestTickets(approved.slice(0, 6)); 
//       });
      
//       axios.get('http://localhost:5000/tickets/advertised')
//         .then(res => setAdvertisedTickets(res.data));
//   }, []);

//   return (
//     <div>
//       {/* 1. Hero Banner */}
//       <Banner></Banner>

//       {/* 2. Advertisement Section (Admin Choice) */}
//       {advertisedTickets.length > 0 && (
//         <div className="max-w-7xl mx-auto py-12 px-4 bg-yellow-50 rounded-xl my-10">
//           <h2 className="text-3xl font-bold text-center mb-8 text-blue-900">Featured Trips 🌟</h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//               {advertisedTickets.map(ticket => <TicketCard key={ticket._id} ticket={ticket} />)}
//           </div>
//         </div>
//       )}
//       <Partners></Partners>

//       {/* 3. Latest Tickets Section */}
//       <div className="bg-gray-50 py-12">
//         <div className="max-w-7xl mx-auto px-4">
//             <h2 className="text-3xl font-bold text-center mb-8">Latest Tickets 🎟️</h2>
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {latestTickets.map(ticket => (
//                     <TicketCard key={ticket._id} ticket={ticket} />
//                 ))}
//             </div>
//         </div>
//       </div>

//       {/* 4. Extra Section: Why Choose Us */}
//       <div className="py-12 text-center">
//         <h2 className="text-3xl font-bold mb-8">Why Choose Us?</h2>
//         <div className="flex flex-wrap justify-center gap-10">
//             <div className="w-60 p-4 border rounded shadow">
//                 <div className="text-4xl mb-2">🛡️</div>
//                 <h3 className="font-bold">Secure Payment</h3>
//             </div>
//             <div className="w-60 p-4 border rounded shadow">
//                 <div className="text-4xl mb-2">⚡</div>
//                 <h3 className="font-bold">Fast Booking</h3>
//             </div>
//             <div className="w-60 p-4 border rounded shadow">
//                 <div className="text-4xl mb-2">📞</div>
//                 <h3 className="font-bold">24/7 Support</h3>
//             </div>
//             {/* 5. Extra Section: Newsletter */}
//       <div className="bg-base-200 py-16">
//         <div className="max-w-4xl mx-auto px-4 text-center">
//             <h2 className="text-3xl font-bold mb-4">Get Updates on New Routes! 📩</h2>
//             <p className="mb-6 text-gray-500">Subscribe to our newsletter to get the latest ticket offers and updates directly to your inbox.</p>
            
//             <div className="join w-full justify-center">
//                 <input className="input input-bordered join-item w-full max-w-xs" placeholder="Enter your email" />
//                 <button 
//                     onClick={handleSubscribe} 
//                     className="btn btn-primary join-item">
//                     Subscribe
//                 </button>
//             </div>
//         </div>
//       </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Home;
import { useEffect, useState } from "react";
import TicketCard from "../../components/TicketCard";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import Banner from "./Banner";
import Partners from "./Partners/Partners";

// 1. IMPORT SWIPER & MODULES
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, Autoplay } from 'swiper/modules';

// 2. IMPORT SWIPER STYLES
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

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
    <div className="overflow-x-hidden">
      {/* 1. Hero Banner */}
      <Banner></Banner>

            {/* 3. Latest Tickets Section */}
      <div className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-8 text-blue-800">Latest Tickets 🎟️</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {latestTickets.map(ticket => (
                    <TicketCard key={ticket._id} ticket={ticket} />
                ))}
            </div>
        </div>
      </div>

      {/* 2. Advertisement Section (Admin Choice) - WITH COVERFLOW */}
      {advertisedTickets.length > 0 && (
        <div className="max-w-7xl mx-auto py-12 px-4 bg-yellow- rounded-xl my-10">
          <h2 className="text-3xl font-bold text-center mb-8 text-blue-900">Featured Trips 🌟</h2>
          
          {/* REPLACED GRID WITH SWIPER COVERFLOW */}
          <Swiper
              effect={'coverflow'}
              grabCursor={true}
              centeredSlides={true}
              slidesPerView={'auto'}
              loop={true}
              coverflowEffect={{
                  rotate: 50,
                  stretch: 0,
                  depth: 100,
                  modifier: 1,
                  slideShadows: true,
              }}
              autoplay={{
                  delay: 2500,
                  disableOnInteraction: false,
              }}
              pagination={{ clickable: true }}
              modules={[EffectCoverflow, Pagination, Autoplay]}
              className="mySwiper w-full py-10"
          >
              {advertisedTickets.map(ticket => (
                  // Width styling is important for coverflow effect
                  <SwiperSlide key={ticket._id} className="w-[300px] md:w-[350px]">
                      <TicketCard ticket={ticket} />
                  </SwiperSlide>
              ))}
          </Swiper>
        </div>
      )}

      <Partners></Partners>



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
        
        {/* 5. Extra Section: Newsletter */}
        <div className="bg-base-200 py-16 mt-12">
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
  );
};

export default Home;
