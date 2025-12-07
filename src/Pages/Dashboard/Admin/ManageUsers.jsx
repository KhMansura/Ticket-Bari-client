import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Swal from "sweetalert2";
import { FaTrash, FaUserShield, FaStore } from "react-icons/fa";

const ManageUsers = () => {
    // 1. Fetch Users using TanStack Query (or standard useEffect)
    // Note: You might need to install: npm install @tanstack/react-query
    // For now, I will use standard React useEffect to keep it simple for you.
    
    // BUT since you are a beginner, let's use the simple useEffect way first:
    const [users, setUsers] = React.useState([]);

    React.useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = () => {
        axios.get('http://localhost:5000/users', {
            headers: { authorization: `Bearer ${localStorage.getItem('access-token')}` }
        })
        .then(res => setUsers(res.data));
    }

    const handleMakeAdmin = user => {
        axios.patch(`http://localhost:5000/users/admin/${user._id}`)
            .then(res => {
                if(res.data.modifiedCount > 0){
                    fetchUsers();
                    Swal.fire('Success', `${user.name} is an Admin Now!`, 'success');
                }
            })
    }

    return (
        <div className="w-full px-10">
            <h2 className="text-3xl font-bold my-4">Total Users: {users.length}</h2>
            <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                    {/* Head */}
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
                                    { user.role === 'admin' ? 'Admin' : 
                                      user.role === 'vendor' ? 'Vendor' : 'User' }
                                </td>
                                <td className="flex gap-2">
                                    { user.role === 'admin' ? 'Admin' : 
                                        <button onClick={() => handleMakeAdmin(user)} className="btn btn-ghost btn-xs bg-orange-500 text-white">
                                            <FaUserShield/> Make Admin
                                        </button> 
                                    }
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
import React from "react"; // Needed for the simple version
export default ManageUsers;