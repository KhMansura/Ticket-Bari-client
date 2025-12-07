import React from "react";
import { Outlet } from "react-router-dom";
// import Navbar from "../Pages/Shared/Navbar/Navbar";
// import Footer from "../Pages/Shared/Footer/Footer";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const RootLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default RootLayout;
