🚍 TicketBari - Online Ticket Booking Platform

TicketBari is a comprehensive full-stack MERN application designed to simplify travel booking. Users can browse and book tickets for buses, trains, and flights. The platform features role-based dashboards for Users, Vendors, and Admins, ensuring a seamless experience for managing tickets, bookings, and payments.

🔗 Live Site URL: https://ticket-bari-89e64.web.app

📂 Server Repository: [Link to Server Repo](https://github.com/KhMansura/Ticket-Bari-server.git)

📂 Client Repository: [Link to Client Repo](https://github.com/KhMansura/Ticket-Bari-client.git)
---
## 🖼️ Screenshot 
![Project Home](https://raw.githubusercontent.com/KhMansura/ticket-bari-client/main/public/assets/full-home.png)

🚀 Purpose

The primary goal of TicketBari is to bridge the gap between transport operators (Vendors) and travelers. It provides a secure, transparent, and user-friendly interface where:
- Users can easily search, book, and pay for tickets.
- Vendors can manage their fleet, tickets, and bookings efficiently.
- Admins maintain platform integrity by verifying vendors and tickets.
---

## ✨ Key Features 
### 🌍 General 
- Secure Firebase Authentication (Email/Password + Google)
- Role‑Based Access Control (User, Vendor, Admin)
- Dynamic Home Page with Swiper.js banner & 3D Coverflow Ads
-  Fully responsive UI (Mobile, Tablet, Desktop)

  ### 👤 User Features - Real‑time seat availability check
  - Interactive seat map (A1, B2, etc.)
  - Booking history with status tracking
  - Stripe payment gateway
  - PDF E‑Ticket download
  - Cancel pending bookings

 ### 🏪 Vendor Features 
 -  Add, update, delete tickets (ImgBB image hosting)
 -  Accept/Reject booking requests
 -  Analytics dashboard with charts
 -  Real‑time booking updates

 ### 🛡️ Admin Features 
- Approve/Reject vendor tickets 
- Promote users to Admin/Vendor 
- Mark vendors as “Fraud” 
- Control homepage advertisements
-  Platform‑wide statistics
  ---
   ## 🛠️ Technologies Used 
   ### **Frontend** 
   - React.js
   - Tailwind CSS
   -  DaisyUI - Swiper.js
   -  Axios
   -  Firebase Auth
   -  React Router DOM
   -  React Hook Form
   -  SweetAlert2
   -  React Icons
 ### **Backend** 
 - Node.js
 - Express.js
 - MongoDB
 - Firebase Admin SDK
 - Stripe
 - Dotenv
 - CORS
     ---
      ## 📦 NPM Packages Included
   - @stripe/react-stripe-js
   - @stripe/stripe-js
   - firebase
   - firebase-admin
   - swiper
   - jspdf
   - recharts
   - react-tilt
   - localforage
   - match-sorter
     ---
     ## 🧪 Environment Variables
     ### **Client (.env)**
     PORT=5000
MONGO_URI=your_mongo_uri
STRIPE_SECRET_KEY=your_stripe_key
FIREBASE_PROJECT_ID=your_project_id


---

## 🛠️ How to Run the Project Locally

### 1. Clone the repositories
```bash
git clone https://github.com/KhMansura/Ticket-Bari-client.git
git clone https://github.com/KhMansura/Ticket-Bari-server.git

2. Install dependencies
   cd Ticket-Bari-client
npm install

cd ../Ticket-Bari-server
npm install
3. Add environment variables
Create .env files in both client and server folders (see above).
4. Start the development servers
Client
npm run dev
Server
npm start
5. Open in browser
http://localhost:5173
```

