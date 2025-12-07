import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaBus, FaUserCircle } from "react-icons/fa";
import { AuthContext } from "../providers/AuthProviders";

const Navbar = () => {
    const { user, logOut } = useContext(AuthContext);

    const handleLogOut = () => {
        logOut()
            .then(() => { })
            .catch(error => console.log(error));
    }

    const navOptions = <>
        <li><NavLink to="/">Home</NavLink></li>
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
            <div className="navbar-end">
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