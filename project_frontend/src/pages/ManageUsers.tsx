import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Shield, ShieldOff, Trash2, Search } from 'lucide-react';
import Toast from '@/components/Toast';

interface UserManage {
  profileEpic: string;
  firstName: string;
  lastName: string;
  email: string;
  isAdmin: boolean;
  id: string;
}

interface UserCardProps {
  user: UserManage;
  onDelete: (id: string) => void;
  onToggleAdmin: (id: string) => void;
}

const UserCard: React.FC<UserCardProps> = ({ user, onDelete, onToggleAdmin }) => {
  return (
    <div className="bg-white rounded-lg p-6 shadow-lg text-gray-800">
      <div className="flex items-center gap-4 mb-4">
        <img
          src={user.profileEpic}
          alt={`${user.firstName} ${user.lastName}`}
          className="w-16 h-16 rounded-full object-cover"
        />
        <div>
          <h2 className="text-xl font-semibold">{`${user.firstName} ${user.lastName}`}</h2>
          <p className="text-gray-500">{user.email}</p>
        </div>
      </div>
      
      <div className="flex items-center justify-between mt-4">
        <div className="flex items-center gap-2">
          <span className={`px-3 py-1 rounded-full text-sm ${
            user.isAdmin ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
          }`}>
            {user.isAdmin ? 'Admin' : 'User'}
          </span>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => onToggleAdmin(user.id)}
            className={`p-2 rounded-lg transition-colors ${
              user.isAdmin 
                ? 'bg-red-600 hover:bg-red-700 text-white' 
                : 'bg-green-600 hover:bg-green-700 text-white'
            }`}
            title={user.isAdmin ? 'Remove admin status' : 'Make admin'}
          >
            {user.isAdmin ? <ShieldOff size={20} /> : <Shield size={20} />}
          </button>
          <button
            onClick={() => onDelete(user.id)}
            className="p-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors text-white"
            title="Delete user"
          >
            <Trash2 size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

const ManageUsers: React.FC = () => {
  const [users, setUsers] = useState<UserManage[]>([]);
  const [filter, setFilter] = useState<'all' | 'admin' | 'user'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const [toast, setToast] = useState<{show: boolean; success: boolean; msg: string}>({
      show: false,
      success: true,
      msg: ""
    });
    
    const showToast = (success: boolean, msg: string) => {
      setToast({ show: true, success, msg });
      // auto‑hide after 2.5 s
      setTimeout(() => setToast(t => ({ ...t, show: false })), 2500);
    };

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/employees/`);
      const fetchedUsers = response.data.map((user: any) => ({
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        isAdmin: user.isAdmin,
        profileEpic: user.profileEpic || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkshh0IMgSA8yw_1JFALVsXFojVdR88C05Fw&s",
      }));
      setUsers(fetchedUsers);
    } catch (err) {
      console.error("❌ Error loading users:", err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDeleteUser = async (id: string) => {
    try {
      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/employees/${id}`);
      setUsers(users.filter(user => user.id !== id));
      showToast(true, "User deleted succesfully");
    } catch (err) {
      console.error("❌ Error deleting user:", err);
      showToast(false, "Error deleting user");
    }
  };


  const handleToggleAdmin = async (id: string) => {
    const userToUpdate = users.find(user => user.id === id);
    if (!userToUpdate) return;
  
    const newIsAdmin = !userToUpdate.isAdmin;
  
    try {
      await axios.patch(
        `${import.meta.env.VITE_BACKEND_URL}/employees/${id}/admin-status`,
        { is_admin: newIsAdmin }
      );
      setUsers(users.map(user => 
        user.id === id ? { ...user, isAdmin: newIsAdmin } : user
      ));
      showToast(true, "Updated admin status succesfully");
    } catch (err) {
      console.error("❌ Error updating admin status:", err);
      showToast(false, "Error updating admin status");
    }
  };

  const filteredUsers = users
    .filter(user => {
      if (filter === 'admin') return user.isAdmin;
      if (filter === 'user') return !user.isAdmin;
      return true;
    })
    .filter(user => 
      user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <div className="min-h-screen bg-[#1e1e1e] p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <h1 className="text-3xl font-bold text-white">Manage Users</h1>
          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search users..."
                className="bg-[#2d2d2d] text-gray-200 rounded-lg pl-10 pr-4 py-2 w-full placeholder-gray-400 border border-gray-600 focus:outline-none focus:border-white focus:ring-1 focus:ring-white"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <select
              className="bg-[#2d2d2d] text-gray-200 rounded-lg px-4 py-2 border border-gray-600 focus:outline-none focus:border-white focus:ring-1 focus:ring-white"
              value={filter}
              onChange={(e) => setFilter(e.target.value as 'all' | 'admin' | 'user')}
            >
              <option value="all">All Users</option>
              <option value="admin">Admins Only</option>
              <option value="user">Regular Users</option>
            </select>
          </div>
        </div>

        {filteredUsers.length === 0 ? (
          <div className="bg-white rounded-lg p-6 text-center text-gray-800">
            <p className="text-xl">No users found matching your criteria.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredUsers.map(user => (
              <UserCard 
                key={user.id} 
                user={user} 
                onDelete={handleDeleteUser} 
                onToggleAdmin={handleToggleAdmin} 
              />
            ))}
          </div>
        )}
      </div>
      <Toast
        show={toast.show}
        success={toast.success}
        msg={toast.msg}
        onClose={() => setToast(t => ({ ...t, show: false }))}
      />
    </div>
  );
};

export default ManageUsers;
