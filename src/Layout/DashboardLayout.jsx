// import React from "react";
// import { Link, Outlet } from "react-router-dom"; // FIXED: Added Link
// import { FaBook, FaBullhorn, FaChartPie, FaHome, FaPlusCircle, FaTicketAlt, FaUser, FaUsers, FaWallet } from "react-icons/fa";
// import useRole from "../hooks/useRole";

// const DashboardLayout = () => {
//     // const role = 'vendor'; 
//     const [role] = useRole();

//     return (
//         <div className="drawer lg:drawer-open font-poppins bg-base-200">
//             <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
//             <div className="drawer-content flex flex-col items-center justify-center p-8">
//                 {/* Page Content */}
//                 <Outlet />
//                 <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open Drawer</label>
//             </div> 
//             <div className="drawer-side">
//                 <label htmlFor="my-drawer-2" className="drawer-overlay"></label> 
//                 <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
//                     {/* Sidebar Header */}
//                     <div className="mb-6 text-center">
//                         <h2 className="text-2xl font-bold">TicketBari</h2>
//                         <p className="text-sm uppercase tracking-widest">Dashboard</p>
//                     </div>

//                     {/* Conditional Links based on Role */}
//                     {
//                         role === 'admin' ? <>
//                         {/* admin links */}
//                             <li className="menu-title text-gray-500 text-xs uppercase mb-2">Admin Controls</li>
//                             <li><Link to="/dashboard/user-profile"><FaUser /> Admin Profile</Link></li>
//                             <li><Link to="/dashboard/manage-users"><FaUsers /> Manage Users</Link></li>
//                             <li><Link to="/dashboard/manage-tickets"><FaTicketAlt /> Manage Tickets</Link></li>
//                             <li><Link to="/dashboard/advertise-tickets"><FaBullhorn /> Advertise Tickets</Link></li>
//                         </> : role === 'vendor' ? <>
//                         {/* vendor links */}
//                              <li className="menu-title text-gray-500 text-xs uppercase mb-2">Vendor Controls</li>
//                             <li><Link to="/dashboard/user-profile"><FaUser /> Vendor Profile</Link></li>
//                             <li><Link to="/dashboard/vendor-home"><FaChartPie /> Revenue Overview</Link></li>
//                             <li><Link to="/dashboard/add-ticket"><FaPlusCircle /> Add Ticket</Link></li>
//                             <li><Link to="/dashboard/my-added-tickets"><FaTicketAlt /> My Added Tickets</Link></li>
//                             <li><Link to="/dashboard/requested-bookings"><FaBook /> Requested Bookings</Link></li>
//                         </> : <>
//                         {/* user links */}
//                             <li className="menu-title text-gray-500 text-xs uppercase mb-2">User Menu</li>
//                             <li><Link to="/dashboard/user-profile"><FaUser /> User Profile</Link></li>
//                             <li><Link to="/dashboard/my-booked-tickets"><FaBook /> My Booked Tickets</Link></li>
//                             <li><Link to="/dashboard/payment-history"><FaWallet/> Payment History</Link></li>
                            
//                         </>
//                     }
                    
//                     {/* <div className="divider"></div> 

//                     <li><Link to="/"><FaHome /> Home</Link></li> */}
//                     {/* Sidebar Footer */}
//                     <div className="p-4 border-t border-gray-800">
//                         <Link to="/" className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-400 hover:bg-white/10 hover:text-white transition-all">
//                             <FaHome /> Back to Home
//                         </Link>
//                     </div>
//                 </ul>
//             </div>
//         </div>
//     );
// };

// export default DashboardLayout;

import React, { useContext } from "react";
import { Link, Outlet, useLocation } from "react-router-dom"; 
import { FaBook, FaBullhorn, FaChartPie, FaHome, FaPlusCircle, FaTicketAlt, FaUser, FaUsers, FaWallet } from "react-icons/fa";
import useRole from "../hooks/useRole";
import { AuthContext } from "../providers/AuthProviders";

const DashboardLayout = () => {
    // const [role] = useRole();
    // const location = useLocation(); 

    // 1. All Hooks MUST go at the top (Before any return statement)
    const { loading } = useContext(AuthContext);
    const [role, isRoleLoading] = useRole(); 
    const location = useLocation(); 

    // This prevents the "Flicker" (showing User menu before Admin menu loads)
    if (loading || isRoleLoading) {
        return (
            <div className="h-screen flex items-center justify-center">
                <span className="loading loading-spinner loading-lg text-primary"></span>
            </div>
        );
    }



    // Helper to style active links
    const getLinkClass = (path) => {
        const isActive = location.pathname === path;
        return `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
            isActive 
            ? "bg-primary text-white font-medium shadow-md" 
            : "text-gray-400 hover:bg-white/10 hover:text-white"
        }`;
    };

    return (
        <div className="drawer lg:drawer-open font-poppins bg-base-200">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            
            {/* Main Content Area */}
            <div className="drawer-content flex flex-col p-8 min-h-screen">
                {/* Mobile Toggle Button */}
                <div className="lg:hidden mb-6 flex justify-between items-center">
                    <span className="font-bold text-[#1e3a8a] text-xl">Dashboard</span>
                    <label htmlFor="my-drawer-2" className="btn btn-primary btn-sm drawer-button">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-5 h-5 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                    </label>
                </div>

                <Outlet />
            </div> 

            {/* Sidebar */}
            <div className="drawer-side z-20">
                <label htmlFor="my-drawer-2" className="drawer-overlay"></label> 
                
                {/* Dark Navy Background for Professional Look */}
                <aside className="w-72 min-h-full bg-[#0F172A] text-white flex flex-col">
                    
                    {/* Sidebar Header */}
                    <div className="p-6 text-center border-b border-gray-800">
                        <div className="flex items-center justify-center gap-2 text-2xl font-bold tracking-tight">
                            <FaTicketAlt className="text-primary" />
                            <span>TicketBari</span>
                        </div>
                        <p className="text-[10px] uppercase tracking-[0.2em] text-gray-500 mt-2">Management Portal</p>
                    </div>

                    {/* Menu Items */}
                    <ul className="menu p-4 flex-grow gap-1">
                        {
                            role === 'admin' ? <>
                                <li className="menu-title text-gray-500 text-xs uppercase mt-2 mb-1">Admin Controls</li>
                                <li><Link to="/dashboard/user-profile" className={getLinkClass("/dashboard/user-profile")}><FaUser /> Admin Profile</Link></li>
                                <li><Link to="/dashboard/manage-users" className={getLinkClass("/dashboard/manage-users")}><FaUsers /> Manage Users</Link></li>
                                <li><Link to="/dashboard/manage-tickets" className={getLinkClass("/dashboard/manage-tickets")}><FaTicketAlt /> Manage Tickets</Link></li>
                                <li><Link to="/dashboard/advertise-tickets" className={getLinkClass("/dashboard/advertise-tickets")}><FaBullhorn /> Advertise Tickets</Link></li>
                            </> : role === 'vendor' ? <>
                                <li className="menu-title text-gray-500 text-xs uppercase mt-2 mb-1">Vendor Controls</li>
                                <li><Link to="/dashboard/user-profile" className={getLinkClass("/dashboard/user-profile")}><FaUser /> Vendor Profile</Link></li>
                                <li><Link to="/dashboard/vendor-home" className={getLinkClass("/dashboard/vendor-home")}><FaChartPie /> Revenue Overview</Link></li>
                                <li><Link to="/dashboard/add-ticket" className={getLinkClass("/dashboard/add-ticket")}><FaPlusCircle /> Add Ticket</Link></li>
                                <li><Link to="/dashboard/my-added-tickets" className={getLinkClass("/dashboard/my-added-tickets")}><FaTicketAlt /> My Added Tickets</Link></li>
                                <li><Link to="/dashboard/requested-bookings" className={getLinkClass("/dashboard/requested-bookings")}><FaBook /> Requested Bookings</Link></li>
                            </> : <>
                                <li className="menu-title text-gray-500 text-xs uppercase mt-2 mb-1">User Menu</li>
                                <li><Link to="/dashboard/user-profile" className={getLinkClass("/dashboard/user-profile")}><FaUser /> User Profile</Link></li>
                                <li><Link to="/dashboard/my-booked-tickets" className={getLinkClass("/dashboard/my-booked-tickets")}><FaBook /> My Booked Tickets</Link></li>
                                <li><Link to="/dashboard/payment-history" className={getLinkClass("/dashboard/payment-history")}><FaWallet/> Payment History</Link></li>
                            </>
                        }
                    </ul>

                    {/* Sidebar Footer */}
                    <div className="p-4 border-t border-gray-800 mt-auto">
                        <Link to="/" className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-400 hover:bg-white/10 hover:text-white transition-all">
                            <FaHome /> Back to Home
                        </Link>
                    </div>
                </aside>
            </div>
        </div>
    );
};

export default DashboardLayout;