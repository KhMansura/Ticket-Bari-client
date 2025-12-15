
// import { useEffect, useState } from "react";

// import useAxiosSecure from "../../../hooks/useAxiosSecure";
// import Swal from "sweetalert2";
// import { FaUserShield, FaStore, FaUser, FaBan } from "react-icons/fa";

// const ManageUsers = () => {
//     const [users, setUsers] = useState([]);
//     const axiosSecure = useAxiosSecure();

//     useEffect(() => {
//         fetchUsers();
//     }, []);

//     const fetchUsers = () => {
//         axiosSecure.get('/users').then(res => setUsers(res.data));
//     }

//     const handleMakeRole = (user, role) => {
//         axiosSecure.patch(`/users/admin/${user._id}`, { role: role })
//             .then(res => {
//                 if(res.data.modifiedCount > 0){
//                     fetchUsers();
//                     Swal.fire('Success', `${user.name} is now a ${role}!`, 'success');
//                 }
//             })
//     }

//     // --- NEW: Handle Fraud Logic ---
//     const handleMarkFraud = (user) => {
//         Swal.fire({
//             title: 'Mark as Fraud?',
//             text: "This will block the Vendor and remove ALL their tickets!",
//             icon: 'warning',
//             showCancelButton: true,
//             confirmButtonColor: '#d33',
//             confirmButtonText: 'Yes, Mark Fraud'
//         }).then((result) => {
//             if (result.isConfirmed) {
//                 axiosSecure.patch(`/users/fraud/${user._id}`)
//                     .then(res => {
//                         if(res.data.userModified > 0){
//                             fetchUsers();
//                             Swal.fire('Banned!', 'Vendor marked as fraud and tickets hidden.', 'success');
//                         }
//                     })
//             }
//         })
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
//                                     <span className={`badge font-bold text-white p-3
//                                         ${user.role === 'admin' ? 'badge-error' : 
//                                           user.role === 'vendor' ? 'badge-warning' : 
//                                           user.role === 'fraud' ? 'badge-neutral' : 'badge-success'}`}>
//                                         {user.role}
//                                     </span>
//                                 </td>
//                                 <td className="flex gap-2">
//                                     {/* Role Buttons */}
//                                     {user.role !== 'admin' && user.role !== 'fraud' &&
//                                         <button onClick={() => handleMakeRole(user, 'admin')} className="btn btn-xs btn-error text-white" title="Make Admin"><FaUserShield/></button>}
//                                     {user.role !== 'vendor' && user.role !== 'fraud' &&
//                                         <button onClick={() => handleMakeRole(user, 'vendor')} className="btn btn-xs btn-warning text-white" title="Make Vendor"><FaStore/></button>}
//                                     {user.role !== 'user' && user.role !== 'fraud' &&
//                                         <button onClick={() => handleMakeRole(user, 'user')} className="btn btn-xs btn-success text-white" title="Make User"><FaUser/></button>}

//                                     {/* --- FRAUD BUTTON (Requirement 7c) --- */}
//                                     {user.role === 'vendor' && (
//                                         <button 
//                                             onClick={() => handleMarkFraud(user)} 
//                                             className="btn btn-xs btn-outline btn-error"
//                                             title="Mark as Fraud">
//                                             <FaBan /> Fraud
//                                         </button>
//                                     )}
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
import { FaUserShield, FaStore, FaUser, FaBan, FaUsersCog } from "react-icons/fa";

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
                    Swal.fire({
                        title: 'Role Updated',
                        text: `${user.name} is now a ${role}!`,
                        icon: 'success',
                        timer: 1500,
                        showConfirmButton: false
                    });
                }
            })
    }

    const handleMarkFraud = (user) => {
        Swal.fire({
            title: 'Mark as Fraud?',
            text: "This will block the Vendor and hide ALL their tickets!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, Mark Fraud'
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.patch(`/users/fraud/${user._id}`)
                    .then(res => {
                        if(res.data.userModified > 0){
                            fetchUsers();
                            Swal.fire('Banned!', 'Vendor marked as fraud.', 'success');
                        }
                    })
            }
        })
    }

    // Helper for Badge Colors
    const getRoleBadge = (role) => {
        switch(role) {
            case 'admin': return 'bg-red-100 text-red-600 border-red-200';
            case 'vendor': return 'bg-amber-100 text-amber-700 border-amber-200';
            case 'fraud': return 'bg-gray-800 text-white border-gray-700';
            default: return 'bg-blue-50 text-blue-600 border-blue-200';
        }
    };

    return (
        <div className="w-full max-w-7xl mx-auto px-4 font-poppins">
            
            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-end mb-8 border-b border-gray-200 pb-5">
                <div>
                    <h2 className="text-3xl font-bold text-[#1e3a8a] flex items-center gap-3">
                        <FaUsersCog /> User Management
                    </h2>
                    <p className="text-slate-500 mt-1">Manage permissions, roles, and security.</p>
                </div>
                <div className="text-right mt-4 md:mt-0">
                    <span className="text-4xl font-bold text-primary">{users.length}</span>
                    <p className="text-xs uppercase tracking-wider text-gray-400 font-semibold">Total Accounts</p>
                </div>
            </div>

            {/* Table Card */}
            <div className="bg-white rounded-xl shadow-card overflow-hidden border border-gray-100">
                <div className="overflow-x-auto">
                    <table className="table w-full">
                        {/* Table Head */}
                        <thead className="bg-[#F8FAFC] text-slate-500 border-b border-gray-200 uppercase text-xs tracking-wider">
                            <tr>
                                <th className="py-4 pl-6">User Identity</th>
                                <th>Current Role</th>
                                <th>Change Role</th>
                                <th className="text-right pr-6">Security Actions</th>
                            </tr>
                        </thead>
                        
                        {/* Table Body */}
                        <tbody className="divide-y divide-gray-50">
                            {users.map((user) => (
                                <tr key={user._id} className="hover:bg-blue-50/30 transition-colors">
                                    
                                    {/* Identity Column */}
                                    <td className="pl-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-10 h-10 bg-gray-200">
                                                    <img src={user.photo || "https://i.ibb.co/5GzXkwq/user.png"} alt="Avatar" />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-bold text-slate-700">{user.name}</div>
                                                <div className="text-xs text-gray-400">{user.email}</div>
                                            </div>
                                        </div>
                                    </td>

                                    {/* Role Column */}
                                    <td>
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold border uppercase tracking-wide ${getRoleBadge(user.role)}`}>
                                            {user.role}
                                        </span>
                                    </td>

                                    {/* Change Role Buttons */}
                                    <td>
                                        <div className="flex gap-2">
                                            {user.role !== 'admin' && 
                                                <button 
                                                    onClick={() => handleMakeRole(user, 'admin')} 
                                                    className="btn btn-xs btn-outline btn-error hover:text-white" 
                                                    title="Promote to Admin">
                                                    <FaUserShield /> Admin
                                                </button>
                                            }
                                            {user.role !== 'vendor' && 
                                                <button 
                                                    onClick={() => handleMakeRole(user, 'vendor')} 
                                                    className="btn btn-xs btn-outline btn-warning hover:text-white" 
                                                    title="Promote to Vendor">
                                                    <FaStore /> Vendor
                                                </button>
                                            }
                                            {user.role !== 'user' && 
                                                <button 
                                                    onClick={() => handleMakeRole(user, 'user')} 
                                                    className="btn btn-xs btn-outline btn-info hover:text-white" 
                                                    title="Demote to User">
                                                    <FaUser /> User
                                                </button>
                                            }
                                        </div>
                                    </td>

                                    {/* Security Actions (Fraud) */}
                                    <td className="text-right pr-6">
                                        {user.role === 'vendor' ? (
                                            <button 
                                                onClick={() => handleMarkFraud(user)} 
                                                className="btn btn-sm btn-error text-white shadow-md hover:bg-red-700 flex items-center gap-2 ml-auto"
                                                title="Mark as Fraud & Block">
                                                <FaBan /> Block Vendor
                                            </button>
                                        ) : user.role === 'fraud' ? (
                                            <span className="text-xs font-bold text-red-500 uppercase flex items-center justify-end gap-1">
                                                <FaBan /> Banned
                                            </span>
                                        ) : (
                                            <span className="text-gray-300 text-xs">—</span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ManageUsers;