// import { useEffect, useState } from "react";

// import useAxiosSecure from "../../../hooks/useAxiosSecure";
// import Swal from "sweetalert2";
// import { FaUserShield, FaStore, FaUser } from "react-icons/fa"; // Added FaStore icon

// const ManageUsers = () => {
//     const [users, setUsers] = useState([]);
//     const axiosSecure = useAxiosSecure();

//     useEffect(() => {
//         fetchUsers();
//     }, []);

//     const fetchUsers = () => {
//         axiosSecure.get('/users')
//             .then(res => setUsers(res.data));
//     }

//     // Generic function to change role (works for both Admin and Vendor)
//     const handleMakeRole = (user, role) => {
//         axiosSecure.patch(`/users/admin/${user._id}`, { role: role }) 
//             .then(res => {
//                 if(res.data.modifiedCount > 0){
//                     fetchUsers(); // Refresh the list
//                     Swal.fire('Success', `${user.name} is now a ${role}!`, 'success');
//                 }
//             })
//     }

//     return (
//         <div className="w-full px-10">
//             <h2 className="text-3xl font-bold my-4">Total Users: {users.length}</h2>
//             <div className="overflow-x-auto">
//                 <table className="table table-zebra w-full">
//                     <thead className="bg-base-200">
//                         <tr>
//                             <th>#</th>
//                             <th>Name</th>
//                             <th>Email</th>
//                             <th>Role</th>
//                             <th>Actions</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {users.map((user, index) => (
//                             <tr key={user._id}>
//                                 <th>{index + 1}</th>
//                                 <td>{user.name}</td>
//                                 <td>{user.email}</td>
//                                 <td>
//                                     {/* Display Current Role Badge */}
//                                     <span className={`badge font-bold text-white
//                                         ${user.role === 'admin' ? 'badge-error' : 
//                                           user.role === 'vendor' ? 'badge-warning' : 'badge-ghost text-black'}`}>
//                                         {user.role === 'admin' ? 'Admin' : user.role === 'vendor' ? 'Vendor' : 'User'}
//                                     </span>
//                                 </td>
//                                 <td className="flex gap-2">
//                                     {/* 1. Make Admin Button (Only show if NOT already Admin) */}
//                                     { user.role !== 'admin' && 
//                                         <button 
//                                             onClick={() => handleMakeRole(user, 'admin')} 
//                                             className="btn btn-xs btn-error text-white"
//                                             title="Make Admin">
//                                             <FaUserShield/> Admin
//                                         </button> 
//                                     }

//                                     {/* 2. Make Vendor Button (NEW - Only show if NOT already Vendor) */}
//                                     { user.role !== 'vendor' && 
//                                         <button 
//                                             onClick={() => handleMakeRole(user, 'vendor')} 
//                                             className="btn btn-xs btn-warning text-white"
//                                             title="Make Vendor">
//                                             <FaStore/> Vendor
//                                         </button> 
//                                     }
//                                     {/* 3. MAKE USER BUTTON (Show if NOT User) - Demote option */}
//                                     { user.role !== 'user' && user.role && 
//                                         <button 
//                                             onClick={() => handleMakeRole(user, 'user')} 
//                                             className="btn btn-xs btn-success text-white"
//                                             title="Make Normal User">
//                                             <FaUser/> User
//                                         </button> 
//                                     }
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     );
// };

// export default ManageUsers;
import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { FaUserShield, FaStore, FaUser, FaBan } from "react-icons/fa";

const ManageUsers = () => {
    const [users, setUsers] = useState([]);
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = () => {
        axiosSecure.get('/users').then(res => setUsers(res.data));
    }

    const handleMakeRole = (user, role) => {
        axiosSecure.patch(`/users/admin/${user._id}`, { role: role })
            .then(res => {
                if(res.data.modifiedCount > 0){
                    fetchUsers();
                    Swal.fire('Success', `${user.name} is now a ${role}!`, 'success');
                }
            })
    }

    // --- NEW: Handle Fraud Logic ---
    const handleMarkFraud = (user) => {
        Swal.fire({
            title: 'Mark as Fraud?',
            text: "This will block the Vendor and remove ALL their tickets!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            confirmButtonText: 'Yes, Mark Fraud'
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.patch(`/users/fraud/${user._id}`)
                    .then(res => {
                        if(res.data.userModified > 0){
                            fetchUsers();
                            Swal.fire('Banned!', 'Vendor marked as fraud and tickets hidden.', 'success');
                        }
                    })
            }
        })
    }

    return (
        <div className="w-full px-10">
            <h2 className="text-3xl font-bold my-4">Total Users: {users.length}</h2>
            <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                    <thead className="bg-base-200">
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                            <tr key={user._id}>
                                <th>{index + 1}</th>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>
                                    <span className={`badge font-bold text-white p-3
                                        ${user.role === 'admin' ? 'badge-error' : 
                                          user.role === 'vendor' ? 'badge-warning' : 
                                          user.role === 'fraud' ? 'badge-neutral' : 'badge-success'}`}>
                                        {user.role}
                                    </span>
                                </td>
                                <td className="flex gap-2">
                                    {/* Role Buttons */}
                                    {user.role !== 'admin' && user.role !== 'fraud' &&
                                        <button onClick={() => handleMakeRole(user, 'admin')} className="btn btn-xs btn-error text-white" title="Make Admin"><FaUserShield/></button>}
                                    {user.role !== 'vendor' && user.role !== 'fraud' &&
                                        <button onClick={() => handleMakeRole(user, 'vendor')} className="btn btn-xs btn-warning text-white" title="Make Vendor"><FaStore/></button>}
                                    {user.role !== 'user' && user.role !== 'fraud' &&
                                        <button onClick={() => handleMakeRole(user, 'user')} className="btn btn-xs btn-success text-white" title="Make User"><FaUser/></button>}

                                    {/* --- FRAUD BUTTON (Requirement 7c) --- */}
                                    {user.role === 'vendor' && (
                                        <button 
                                            onClick={() => handleMarkFraud(user)} 
                                            className="btn btn-xs btn-outline btn-error"
                                            title="Mark as Fraud">
                                            <FaBan /> Fraud
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageUsers;