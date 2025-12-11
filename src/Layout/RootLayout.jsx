import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const RootLayout = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") ? localStorage.getItem("theme") : "light");

    // Apply theme to HTML tag
    useEffect(() => {
        localStorage.setItem("theme", theme);
        const localTheme = localStorage.getItem("theme");
        document.querySelector("html").setAttribute("data-theme", localTheme);
    }, [theme]);

    const handleToggle = (e) => {
        if (e.target.checked) {
            setTheme("dark");
        } else {
            setTheme("light");
        }
    };
  return (
    <div className="flex flex-col min-h-screen font-poppins">
      <Navbar theme={theme} handleToggle={handleToggle} />
      <div className="flex-grow min-h-[calc(100vh-300px)] bg-base-200 transition-colors duration-300">
                <Outlet />
            </div>
      <Footer />
    </div>
  );
};

export default RootLayout;
