// const [role] = useRole(); 

// return (
//   <div className="drawer lg:drawer-open">
//     <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
//     <div className="drawer-content flex flex-col items-center justify-center">
//         <Outlet />
//     </div> 
//     <div className="drawer-side">
//       <label htmlFor="my-drawer-2" className="drawer-overlay"></label> 
//       <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
//         {
//             role === 'admin' ? <>
//                 <li><Link to="/dashboard/manage-users">Manage Users</Link></li>
//                 <li><Link to="/dashboard/manage-tickets">Manage Tickets</Link></li>
//             </> : role === 'vendor' ? <>
//                 <li><Link to="/dashboard/add-ticket">Add Ticket</Link></li>
//                 <li><Link to="/dashboard/my-added-tickets">My Added Tickets</Link></li>
//             </> : <>
//                 <li><Link to="/dashboard/my-booked-tickets">My Booked Tickets</Link></li>
//             </>
//         }
//         <div className="divider"></div> 
//         <li><Link to="/">Home</Link></li>
//       </ul>
//     </div>
//   </div>
// );
import { Link, Outlet } from "react-router-dom"; // FIXED: Added Link
import { FaBook, FaHome, FaPlusCircle, FaTicketAlt, FaUsers, FaWallet } from "react-icons/fa";
import useRole from "../hooks/useRole";

const DashboardLayout = () => {
    // TEMPORARY FIX: Manually set role to 'vendor', 'admin', or 'user' to test.
    // Once you create the useRole hook later, you can uncomment the real line.
    // const role = 'vendor'; 
    const [role] = useRole();

    return (
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col items-center justify-center p-8">
                {/* Page Content */}
                <Outlet />
                <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open Drawer</label>
            </div> 
            <div className="drawer-side">
                <label htmlFor="my-drawer-2" className="drawer-overlay"></label> 
                <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
                    {/* Sidebar Header */}
                    <div className="mb-6 text-center">
                        <h2 className="text-2xl font-bold">TicketBari</h2>
                        <p className="text-sm uppercase tracking-widest">Dashboard</p>
                    </div>

                    {/* Conditional Links based on Role */}
                    {/* {
                        role === 'admin' ? <>
                            <li><Link to="/dashboard/manage-users"><FaUsers /> Manage Users</Link></li>
                            <li><Link to="/dashboard/manage-tickets"><FaTicketAlt /> Manage Tickets</Link></li>
                        </> : role === 'vendor' ? <>
                            <li><Link to="/dashboard/add-ticket"><FaPlusCircle /> Add Ticket</Link></li>
                            <li><Link to="/dashboard/my-added-tickets"><FaTicketAlt /> My Added Tickets</Link></li>
                        </> : <>
                            <li><Link to="/dashboard/my-booked-tickets"><FaBook /> My Booked Tickets</Link></li>
                        </>
                    } */}
                    {
                        role === 'admin' ? <>
                        {/* admin links */}
                            <li><Link to="/dashboard/manage-users"><FaUsers /> Manage Users</Link></li>
                            <li><Link to="/dashboard/manage-tickets"><FaTicketAlt /> Manage Tickets</Link></li>
                        </> : role === 'vendor' ? <>
                        {/* vendor links */}
                            <li><Link to="/dashboard/add-ticket"><FaPlusCircle /> Add Ticket</Link></li>
                            <li><Link to="/dashboard/my-added-tickets"><FaTicketAlt /> My Added Tickets</Link></li>
                            <li><Link to="/dashboard/requested-bookings"><FaBook /> Requested Bookings</Link></li>
                        </> : <>
                        {/* user links */}
                            <li><Link to="/dashboard/my-booked-tickets"><FaBook /> My Booked Tickets</Link></li>
                            <li><Link to="/dashboard/payment-history"><FaWallet/> Payment History</Link></li>
                        </>
                    }
                    
                    <div className="divider"></div> 
                    <li><Link to="/"><FaHome /> Home</Link></li>
                </ul>
            </div>
        </div>
    );
};

export default DashboardLayout;