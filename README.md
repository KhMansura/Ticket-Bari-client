# 🚌 TicketBari - MERN Stack Ticket Booking System

TicketBari is a full-stack web application designed for booking bus, train, launch, and flight tickets. It features a multi-role system (User, Vendor, Admin) with secure payments, dashboard analytics, and real-time status updates.

## 🔗 Live Demo
**(Paste your deployed link here, e.g., https://ticketbari.web.app)**

---

## 🚀 Features

### 👤 User Features
* **Secure Authentication:** Login/Register using Email & Password or Google.
* **Browse & Filter:** Search tickets by location, transport type, or price.
* **Booking System:** Book tickets and view booking status (Pending/Approved).
* **Payment Gateway:** Secure payments via Stripe for approved tickets.
* **History:** View past booking history and payment transactions.

### 🏪 Vendor Features
* **Dashboard:** Visual analytics (Charts) showing total revenue, sales, and tickets.
* **Ticket Management:** Add new tickets with images (hosted on ImgBB).
* **Order Management:** Accept or Reject booking requests from users.
* **My Tickets:** View and delete tickets they created.

### 🛡️ Admin Features
* **User Management:** View all users and promote them to Admin or Vendor roles.
* **Ticket Approval:** Approve or Reject new tickets posted by Vendors.
* **Advertisement System:** Toggle "Advertise" on tickets to feature them on the Home page.

---

## 🛠️ Technologies Used

* **Frontend:** React.js, Tailwind CSS, DaisyUI, Recharts (Analytics), Axios, Stripe.js.
* **Backend:** Node.js, Express.js, JWT (Authentication).
* **Database:** MongoDB (CRUD operations, Aggregation).
* **Image Hosting:** ImgBB API.
* **Payment:** Stripe Payment Gateway.

---

## ⚙️ How to Run Locally

### 1. Clone the Repository
```bash
git clone https://github.com/KhMansura/Ticket-Bari-client
cd ticket-bari
