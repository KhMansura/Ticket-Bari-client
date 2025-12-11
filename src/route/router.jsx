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
import RequestedBookings from "../Pages/Dashboard/Vendor/RequestedBookings.jsx";
import ManageTickets from "../Pages/Dashboard/Admin/ManageTickets.jsx";
import Payment from "../Pages/Dashboard/Payment/Payment.jsx";
import VendorHome from "../Pages/Dashboard/Vendor/VendorHome.jsx";
import About from "../Pages/About/About.jsx";
import Contact from "../Pages/Contact/Contact.jsx";
import SubscriptionSuccess from "../Pages/Subscription/SubscriptionSuccess.jsx";
import PaymentHistory from "../Pages/Dashboard/User/PaymentHistory.jsx";
import UpdateTicket from "../Pages/Dashboard/Vendor/UpdateTicket.jsx";
import AdvertiseTickets from "../Pages/Dashboard/Admin/AdvertiseTickets.jsx";
import RoutesPage from "../Pages/Routes/RoutesPage.jsx";
import ErrorPage from "../Pages/ErrorPage.jsx";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout></RootLayout>,
    children: [
      { path: "/", element: <Home></Home>},
      { path: "login", element: <Login></Login>},
      { path: "register",element: <Register></Register>},
      { path: "all-tickets", element: <PrivateRoute><AllTickets></AllTickets></PrivateRoute> },
      { path: "about", element: <About></About> },
      { path: "contact", element: <Contact></Contact> },
      { path: "subscription-success", element: <SubscriptionSuccess></SubscriptionSuccess> },
      {
        path: "ticket/:id",
        element: <PrivateRoute><TicketDetails></TicketDetails></PrivateRoute>, 
        loader: ({params}) => fetch(`http://localhost:5000/tickets/${params.id}`)
      },
      {
        path: "routes",
        element: <RoutesPage />
      },
    

  {
    path: "dashboard",
    element: <PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
    children: [
      // DEFAULT:
      { path: "", element: <Profile></Profile> }, 

      // PROFILES
      { path: "admin-profile", element: <Profile></Profile> },
      
      // User Routes
      { path: "user-profile", element: <Profile></Profile> },
      { path: "my-booked-tickets", element: <MyBookedTickets></MyBookedTickets>},
      { path: "payment", element: <Payment></Payment> },
      { path: "payment-history", element: <PaymentHistory></PaymentHistory> },

      // Vendor Routes
      { path: "user-profile", element: <Profile /> },
      { path: "vendor-home", element: <VendorHome></VendorHome> },
      { path: "my-added-tickets", element: <MyAddedTickets></MyAddedTickets> },
      {path: "add-ticket",element: <AddTicket></AddTicket>},
      { path: "requested-bookings", element: <RequestedBookings></RequestedBookings> },
      { path: "update-ticket/:id",element: <UpdateTicket />},
     
      // ADMIN ROUTES
      { path: "manage-users", element: <ManageUsers></ManageUsers> },
      { path: "manage-tickets", element: <ManageTickets></ManageTickets> },
      { path: "advertise-tickets",element: <AdvertiseTickets />},

      { path: "*", element: <ErrorPage />}

      

      
    ]
  }
      
    ],
  },
]);