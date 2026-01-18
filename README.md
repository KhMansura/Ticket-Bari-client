🚍 TicketBari - Online Ticket Booking Platform

TicketBari is a comprehensive full-stack MERN application designed to simplify travel booking. Users can browse and book tickets for buses, trains, and flights. The platform features role-based dashboards for Users, Vendors, and Admins, ensuring a seamless experience for managing tickets, bookings, and payments.

🔗 Live Site URL: https://ticket-bari-89e64.web.app

📂 Server Repository: [Link to Server Repo](https://github.com/KhMansura/Ticket-Bari-server.git)

📂 Client Repository: [Link to Client Repo](https://github.com/KhMansura/Ticket-Bari-client.git)
---
## 🖼️ Screenshot 
![Project Screenshot](../ticket-bari-client/public/assets/full-home.png)
🚀 Purpose

The primary goal of TicketBari is to bridge the gap between transport operators (Vendors) and travelers. It provides a secure, transparent, and user-friendly interface where:

    . Users can easily search, book, and pay for tickets.
    . Vendors can manage their fleet, tickets, and bookings efficiently.
    . Admins maintain platform integrity by verifying vendors and tickets.

✨ Key Features
🌍 General
     Secure Authentication: Email/Password & Google Social Login protected by Firebase.
     Role-Based Access Control (RBAC): Distinct dashboards for User, Vendor, and Admin.
     Dynamic Home Page: Features a Swiper.js banner, Admin-controlled Advertisement section with 3D Coverflow effects, and a Partners showcase.
     Responsive Design: Fully optimized for Mobile, Tablet, and Desktop devices using Tailwind CSS & DaisyUI.

👤 User Features
    Smart Booking System: Real-time seat availability check and validation.
    Live Seat Map: Interactive visual grid to select specific seats (e.g., A1, B2).
    My Bookings: detailed history with status tracking (Pending/Accepted/Paid).
    Secure Payments: Integrated Stripe Payment Gateway for seamless transactions.
    E-Ticket Download: One-click PDF Ticket generation after successful payment.
    Booking Cancellation: Users can cancel "Pending" bookings instantly.

🏪 Vendor Features

    Ticket Management: Add, Update, or Delete tickets with image hosting via ImgBB.
    Booking Requests: Accept or Reject booking requests from users.
    Analytics Dashboard: Visual charts showing Total Revenue, Tickets Sold, and Booking Stats.
    Real-time Updates: Instant status changes reflect on the user's dashboard.

🛡️ Admin Features

    Content Moderation: Approve or Reject tickets added by vendors before they go live.
    User Management: Promote users to Admin/Vendor or Mark Vendors as "Fraud" to ban them.
    Advertisement Control: Toggle "Featured Trips" on the homepage directly from the dashboard.
    Stats Overview: Monitor platform-wide activity.

🛠️ Technologies Used
Frontend

    React.js: Component-based UI architecture.
    Tailwind CSS & DaisyUI: For modern, responsive styling.
    Swiper.js: For interactive sliders and carousel effects.
    Axios: For secure HTTP requests.
    Firebase Auth: For secure user authentication.
    React Router DOM: For seamless navigation.
    React Hook Form: For efficient form handling.
    SweetAlert2: For beautiful popup notifications.
    React-Icons: For vector icons.

Backend
    Node.js & Express.js: Robust RESTful API development.
    MongoDB: NoSQL database for flexible data storage.
    Firebase Admin SDK: Server-side token verification (High-level security).
    Stripe: Secure payment processing.
    Dotenv: Environment variable management.
    Cors: Cross-origin resource sharing.

📦 NPM Packages Included

    @stripe/react-stripe-js / @stripe/stripe-js: Payment integration.
    firebase: Client-side authentication.
    firebase-admin: Server-side token verification.
    swiper: Advanced sliders and carousels.
    jspdf: Generating PDF tickets.
    recharts: Data visualization charts for dashboards.
    react-tilt: 3D hover effects (optional).
    localforage / match-sorter: Utility dependencies.

✨ Upcoming / Advanced Features
    
    🌓 Dynamic Dark Mode: Seamlessly switch between light and dark themes for better accessibility.
    🔍 Advanced Filter & Sort: Filter tickets by price, vehicle category, or date for a better search experience.
    📩 Email Confirmation: Instant automated email notifications for successful bookings and payments.
    📊 Real-time Dashboard Sync: Auto-refetching data using TanStack Query to ensure stats are always up-to-date.