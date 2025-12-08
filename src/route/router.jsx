
// router.jsx
import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../Layout/RootLayout.jsx";
import DashboardLayout from "../Layout/DashboardLayout.jsx";
import Home from "../Pages/Home/Home.jsx";
import AddTicket from "../Pages/Dashboard/Vendor/AddTicket.jsx";
import MyBookedTickets from "../Pages/Dashboard/User/MyBookedTickets.jsx";
import Login from "../Pages/Login/Login.jsx";
import Register from "../Pages/Register.jsx";
import TicketDetails from "../Pages/TicketDetails/TicketDetails.jsx";
import PrivateRoute from "./PrivateRoute.jsx";
import AllTickets from "../Pages/AllTickets/AllTickets.jsx";
import ManageUsers from "../Pages/Dashboard/Admin/ManageUsers.jsx";
import Profile from "../Pages/Dashboard/Profile/Profile.jsx";
import MyAddedTickets from "../Pages/Dashboard/Vendor/MyAddedTickets.jsx";
import RequestedBookings from "../Pages/Dashboard/Vendor/RequestedBooking.jsx";
import ManageTickets from "../Pages/Dashboard/Admin/ManageTickets.jsx";
import Payment from "../Pages/Dashboard/Payment/Payment.jsx";
import PaymentHistory from "../Pages/Dashboard/Payment/PaymentHistory.jsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout></RootLayout>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "login",
        element: <Login></Login>,
      },
      {
        path: "register",
        element: <Register></Register>,
      },
      { 
        path: "all-tickets", 
        element: <PrivateRoute><AllTickets></AllTickets></PrivateRoute> 
      },
      {
        path: "ticket/:id",
        element: <PrivateRoute><TicketDetails></TicketDetails></PrivateRoute>, 
        loader: ({params}) => fetch(`http://localhost:5000/tickets/${params.id}`)
      },
    ],
  },
  {
    path: "dashboard",
    element: <PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
    children: [
      // DEFAULT:
      { path: "", element: <Profile></Profile> }, 

      // PROFILES (Link all to the same generic Profile page for now)
      { path: "user-profile", element: <Profile></Profile> },
      { path: "vendor-profile", element: <Profile></Profile> },
      { path: "admin-profile", element: <Profile></Profile> },
      // User Routes
      {
        path: "my-booked-tickets",
        element: <MyBookedTickets></MyBookedTickets>,
      },

      // Vendor Routes
      { 
            path: "my-added-tickets", 
            element: <MyAddedTickets></MyAddedTickets> 
        },
      {
        path: "add-ticket",
        element: <AddTicket></AddTicket>,
      },
      // ADMIN ROUTES
      { path: "manage-users", element: <ManageUsers></ManageUsers> },
      { path: "manage-tickets", element: <ManageTickets></ManageTickets> },
      { path: "requested-bookings", element: <RequestedBookings></RequestedBookings> },
      { path: "payment", element: <Payment></Payment> },
      { path: "history", element: <PaymentHistory></PaymentHistory> },
    ],
  },
]);