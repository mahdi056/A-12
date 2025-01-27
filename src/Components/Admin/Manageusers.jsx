import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

const ManageUsers = () => {
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]); 
    const [filterRole, setFilterRole] = useState('all'); 

    // Fetch all users on component mount
    useEffect(() => {
         axios.get('https://a-12-server-side-gold.vercel.app/users') 
            
            .then(res => {
                setUsers(res.data);
                setFilteredUsers(res.data); 
            })
            .catch(err => console.error(err));
    }, []);

    // Filter users based on selected role
    const handleFilterChange = (role) => {
        setFilterRole(role);
        if (role === 'all') {
            setFilteredUsers(users); 
        } else {
            setFilteredUsers(users.filter(user => user.role === role));
        }
    };

    // Update user role
    const handleRoleChange = (id, newRole) => {
        fetch(`https://a-12-server-side-gold.vercel.app/users/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ role: newRole }),
        })
            .then(res => res.json())
            .then(data => {
                if (data.message === 'User role updated successfully') {
                    const updatedUsers = users.map(user => 
                        user._id === id ? { ...user, role: newRole } : user
                    );
                    setUsers(updatedUsers);
                    setFilteredUsers(
                        filterRole === 'all'
                            ? updatedUsers
                            : updatedUsers.filter(user => user.role === filterRole)
                    ); // Update filtered users based on the current filter
                    Swal.fire({
                        text: "User Role Updated Successfully",
                        icon: "success"
                    });
                }
            })
            .catch(err => console.error(err));
    };

    // Delete user
    const handleDelete = id => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then(result => {
            if (result.isConfirmed) {
                fetch(`https://a-12-server-side-gold.vercel.app/users/${id}`, {
                    method: 'DELETE',
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.message === 'User deleted successfully') {
                            const updatedUsers = users.filter(user => user._id !== id);
                            setUsers(updatedUsers);
                            setFilteredUsers(
                                filterRole === 'all'
                                    ? updatedUsers
                                    : updatedUsers.filter(user => user.role === filterRole)
                            ); // Update filtered users based on the current filter
                            Swal.fire('Deleted!', 'User has been deleted.', 'success');
                        } else {
                            Swal.fire('Error', 'Could not delete the user', 'error');
                        }
                    })
                    .catch(err => {
                        console.error(err);
                        Swal.fire('Error', 'Something went wrong', 'error');
                    });
            }
        });
    };

    return (
        <div className="p-4">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Manage Users</h2>
                
                {/* Role Filter Dropdown */}
                <select
                    value={filterRole}
                    onChange={e => handleFilterChange(e.target.value)}
                    className="border rounded px-2 py-1"
                >
                    <option value="all">All Roles</option>
                    <option value="user">User</option>
                    <option value="moderator">Moderator</option>
                    <option value="admin">Admin</option>
                </select>
            </div>

            <table className="table-auto border-collapse border border-gray-200 w-full">
                <thead>
                    <tr>
                        <th className="border border-gray-300 px-4 py-2">Name</th>
                        <th className="border border-gray-300 px-4 py-2">Email</th>
                        <th className="border border-gray-300 px-4 py-2">Role</th>
                        <th className="border border-gray-300 px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredUsers.map(user => ( 
                        <tr key={user._id}>
                            <td className="border border-gray-300 px-4 py-2">{user.name || 'N/A'}</td>
                            <td className="border border-gray-300 px-4 py-2">{user.email}</td>
                            <td className="border border-gray-300 px-4 py-2">
                                <select
                                    value={user.role}
                                    onChange={e => handleRoleChange(user._id, e.target.value)}
                                    className="border rounded px-2 py-1"
                                >
                                    <option value="user">User</option>
                                    <option value="moderator">Moderator</option>
                                    <option value="admin">Admin</option>
                                </select>
                            </td>
                            <td className="border border-gray-300 px-4 py-2">
                                <button
                                    onClick={() => handleDelete(user._id)}
                                    className="bg-red-500 text-white px-4 py-2 rounded"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ManageUsers;
