import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaBus, FaUserCircle } from "react-icons/fa";
import { AuthContext } from "../providers/AuthProviders";

const Navbar = ({theme, handleToggle}) => {
    const { user, logOut } = useContext(AuthContext);

    const handleLogOut = () => {
        logOut()
            .then(() => { })
            .catch(error => console.log(error));
    }

    const navOptions = <>
        <li><NavLink to="/">Home</NavLink></li>
        <li><NavLink to="/about">About Us</NavLink></li> 
        <li><NavLink to="/contact">Contact Us</NavLink></li>
        {/* Only show these if user is logged in, per requirements "(private)" */}
        {user && <li><NavLink to="/all-tickets">All Tickets</NavLink></li>}
        {user && <li><NavLink to="/dashboard/user-profile">Dashboard</NavLink></li>}
        
    </>

    return (
        <div className="navbar bg-base-100 sticky top-0 z-50 shadow-md">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        {navOptions}
                    </ul>
                </div>
                <Link to="/" className="btn btn-ghost text-xl text-primary font-bold">
                    <FaBus className="text-2xl" /> TicketBari
                </Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {navOptions}
                </ul>
            </div>
            <div className="navbar-end gap-3">
                <label className="swap swap-rotate">
                    {/* this hidden checkbox controls the state */}
                    <input type="checkbox" onChange={handleToggle} checked={theme === "dark"} />
                    
                    {/* sun icon */}
                    <svg className="swap-on fill-current w-8 h-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,5.64,7.05Zm12,1.41a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,17.64,8.46Zm1.41,8.54a1,1,0,0,0,0,1.41l.71.71a1,1,0,0,0,1.41-1.41l-.71-.71A1,1,0,0,0,19.05,17Zm-7,5a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V23A1,1,0,0,0,12,22ZM12,8a4,4,0,1,0,4,4A4,4,0,0,0,12,8Z"/></svg>
                    
                    {/* moon icon */}
                    <svg className="swap-off fill-current w-8 h-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z"/></svg>
                </label>

                {
                    user ? <>
                        {/* User is Logged In */}
                        <div className="flex items-center gap-2">
                            <span className="hidden md:block font-semibold">{user?.displayName}</span>
                            <div className="dropdown dropdown-end">
                                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                    <div className="w-10 rounded-full border border-primary">
                                        <img alt="User" src={user?.photoURL || "https://i.ibb.co/5GzXkwq/user.png"} />
                                    </div>
                                </div>
                                <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                                    <li>
                                        <Link to="/dashboard/user-profile" className="justify-between">
                                            My Profile
                                            <span className="badge">New</span>
                                        </Link>
                                    </li>
                                    <li><button onClick={handleLogOut}>Logout</button></li>
                                </ul>
                            </div>
                        </div>
                    </> : <>
                        {/* User is Logged Out */}
                        <Link to="/login" className="btn btn-primary btn-sm mr-2">Login</Link>
                        <Link to="/register" className="btn btn-outline btn-primary btn-sm">Register</Link>
                    </>
                }
            </div>
        </div>
    );
};

export default Navbar;