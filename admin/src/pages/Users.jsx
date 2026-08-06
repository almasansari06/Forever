import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { backendUrl } from '../App';
import { toast } from 'react-toastify';

const Users = ({ token }) => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    if (!token) return;
    try {
      const response = await axios.get(backendUrl + '/api/user/all-users', { headers: { token } });
      if (response.data.success) {
        setUsers(response.data.users);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const toggleStatusHandler = async (userId, currentStatus) => {
    const newStatus = currentStatus === 'disabled' ? 'active' : 'disabled';
    try {
      const response = await axios.post(
        backendUrl + '/api/user/toggle-status',
        { userId, status: newStatus },
        { headers: { token } }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        fetchUsers();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const deleteUserHandler = async (userId) => {
    if (!window.confirm("Kya aap sach me is user ko permanently delete karna chahte hain?")) return;
    try {
      const response = await axios.post(
        backendUrl + '/api/user/delete-user',
        { userId },
        { headers: { token } }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        fetchUsers();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [token]);

  return (
    <div className='p-4'>
      <h3 className='text-lg font-semibold mb-4'>User Management</h3>
      
      <div className='overflow-x-auto bg-white rounded-lg shadow-xs border border-gray-200'>
        <table className='w-full text-left text-sm text-gray-600'>
          <thead className='bg-gray-50 border-b text-gray-700 font-semibold uppercase text-xs'>
            <tr>
              <th className='p-3'>Name</th>
              <th className='p-3'>Email</th>
              <th className='p-3'>Status</th>
              <th className='p-3 text-center'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className='border-b hover:bg-gray-50/50'>
                <td className='p-3 font-medium text-gray-900'>{user.name}</td>
                <td className='p-3'>{user.email}</td>
                <td className='p-3'>
                  <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                    user.status === 'disabled' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
                  }`}>
                    {user.status || 'active'}
                  </span>
                </td>
                <td className='p-3 flex items-center justify-center gap-2'>
                  <button
                    onClick={() => toggleStatusHandler(user._id, user.status || 'active')}
                    className={`px-3 py-1.5 text-xs font-medium rounded text-white cursor-pointer transition-all ${
                      user.status === 'disabled' ? 'bg-green-600 hover:bg-green-700' : 'bg-amber-500 hover:bg-amber-600'
                    }`}
                  >
                    {user.status === 'disabled' ? 'Enable Account' : 'Disable Account'}
                  </button>

                  <button
                    onClick={() => deleteUserHandler(user._id)}
                    className='px-3 py-1.5 text-xs font-medium rounded bg-red-600 hover:bg-red-700 text-white cursor-pointer transition-all'
                  >
                    Delete Permanently
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
