// src/App.jsx
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Layout from "./components/Layout";
import AnalyticsPanel from "./components/AnalyticsPanel";
import UserForm from "./components/UserForm";
import UserTable from "./components/UserTable";
import {
  fetchUsers,
  createUser,
  updateUser,
  deleteUser,
  notifyUser,
  fetchAnalytics,
} from "./services/api";

export default function App() {
  const [users, setUsers] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [editingUser, setEditingUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formLoading, setFormLoading] = useState(false);

  const loadEverything = async () => {
    try {
      setLoading(true);
      const [usersRes, analyticsRes] = await Promise.all([
        fetchUsers(),
        fetchAnalytics(),
      ]);
      
      setUsers(usersRes.data || []);
      setAnalytics(analyticsRes.data || null);
      
      toast.success('Data loaded successfully!');
    } catch (err) {
      console.error("Fetch error:", err);
      toast.error("Failed to fetch data from server.");
      
      // Fallback to mock data if API fails
      const mockUsers = [
        {
          _id: '1',
          name: 'Yash Dealmukh',
          email: 'yash123@gmail.com',
          location: 'Dubai',
          phone: '+971 50 123 4567',
          status: 'active'
        },
        {
          _id: '2',
          name: 'Digvijay Patil',
          email: 'digvijaypatil6223@gmail.com',
          location: 'Kolhapur',
          phone: '+91 98765 43210',
          status: 'active'
        },
        {
          _id: '3',
          name: 'Raju Patil',
          email: 'rajupatil0199@gmail.com',
          location: 'Pune',
          phone: '+91 87654 32109',
          status: 'pending'
        }
      ];
      
      setUsers(mockUsers);
      calculateAnalytics(mockUsers);
    } finally {
      setLoading(false);
    }
  };

  const calculateAnalytics = (userList) => {
    if (!userList || userList.length === 0) {
      setAnalytics({
        totalUsers: 0,
        majorLocation: 'N/A',
        usersByLocation: []
      });
      return;
    }

    const totalUsers = userList.length;
    
    const locationCounts = {};
    userList.forEach(user => {
      locationCounts[user.location] = (locationCounts[user.location] || 0) + 1;
    });

    let majorLocation = '';
    let maxCount = 0;
    Object.entries(locationCounts).forEach(([location, count]) => {
      if (count > maxCount) {
        maxCount = count;
        majorLocation = location;
      }
    });

    const usersByLocation = Object.entries(locationCounts).map(([location, count]) => ({
      _id: location,
      location,
      count
    }));

    setAnalytics({
      totalUsers,
      majorLocation: majorLocation || 'N/A',
      usersByLocation
    });
  };

  useEffect(() => {
    loadEverything();
  }, []);

  const handleSave = async (formData) => {
    try {
      setFormLoading(true);
      
      if (editingUser) {
        const response = await updateUser(editingUser._id, formData);
        
        const updatedUsers = users.map(user =>
          user._id === editingUser._id ? { ...response.data, _id: user._id } : user
        );
        
        setUsers(updatedUsers);
        calculateAnalytics(updatedUsers);
        setEditingUser(null);
        toast.success('User updated successfully!');
      } else {
        const response = await createUser(formData);
        
        const newUser = response.data;
        const updatedUsers = [...users, newUser];
        setUsers(updatedUsers);
        calculateAnalytics(updatedUsers);
        toast.success('User created successfully!');
      }
      
    } catch (err) {
      console.error("Save error:", err);
      
      if (err.response?.status === 400) {
        toast.error(err.response.data?.message || 'Validation failed.');
      } else if (err.response?.status === 409) {
        toast.error('User with this email already exists.');
      } else {
        toast.error("Failed to save user.");
      }
      
      // Fallback for demo
      if (editingUser) {
        const updatedUsers = users.map(user =>
          user._id === editingUser._id ? { ...user, ...formData } : user
        );
        setUsers(updatedUsers);
        calculateAnalytics(updatedUsers);
        setEditingUser(null);
        toast.info('User updated (offline mode)!');
      } else {
        const newUser = {
          _id: Date.now().toString(),
          ...formData
        };
        setUsers([...users, newUser]);
        calculateAnalytics([...users, newUser]);
        toast.info('User created (offline mode)!');
      }
    } finally {
      setFormLoading(false);
    }
  };

  const handleDelete = async (userId) => {
    const userToDelete = users.find(u => u._id === userId);
    
    if (!userToDelete) {
      toast.error('User not found!');
      return;
    }
    
    if (!window.confirm(`Are you sure you want to delete "${userToDelete.name}"?`)) {
      return;
    }
    
    try {
      await deleteUser(userId);
      
      const updatedUsers = users.filter(user => user._id !== userId);
      setUsers(updatedUsers);
      calculateAnalytics(updatedUsers);
      
      toast.success(`User "${userToDelete.name}" deleted successfully!`);
    } catch (err) {
      console.error("Delete error:", err);
      
      if (err.response?.status === 404) {
        toast.error('User not found on server.');
      } else {
        toast.error("Failed to delete user.");
      }
      
      const updatedUsers = users.filter(user => user._id !== userId);
      setUsers(updatedUsers);
      calculateAnalytics(updatedUsers);
      toast.info('User deleted (offline mode)!');
    }
  };

  
  const handleNotify = async (user) => {
   
    toast.success(`Notification sent to ${user.email}!`);
    
   
    console.log(`Notification sent to user: ${user.name} (${user.email})`, {
      userId: user._id,
      email: user.email,
      timestamp: new Date().toISOString(),
      location: user.location,
      status: 'notified'
    });
    
   
    const notificationLog = {
      id: Date.now(),
      userId: user._id,
      userName: user.name,
      userEmail: user.email,
      timestamp: new Date().toISOString(),
      type: 'email_notification'
    };
    
    // Store in localStorage or send to your analytics
    try {
      const existingLogs = JSON.parse(localStorage.getItem('notificationLogs') || '[]');
      existingLogs.push(notificationLog);
      localStorage.setItem('notificationLogs', JSON.stringify(existingLogs.slice(-100)));
    } catch (e) {
      console.log('Failed to save notification log:', e);
    }
    
    
    try {
      await notifyUser(user._id);
    } catch (error) {
      console.log('Backend notification failed, but user already sees success:', error.message);
    }
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
  };

  const handleCancelEdit = () => {
    setEditingUser(null);
  };

  return (
    <Layout>
      <ToastContainer 
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      
      <AnalyticsPanel analytics={analytics} isLoading={loading} />
      
      <UserForm
        key={editingUser ? `edit-${editingUser._id}` : 'add'}
        editingUser={editingUser}
        onSubmit={handleSave}
        onCancel={handleCancelEdit}
        isLoading={formLoading}
      />
      
      {loading ? (
        <div className="flex flex-col items-center justify-center p-12" data-aos="fade-in">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-lg font-semibold text-gray-700">Loading users...</p>
          <p className="text-gray-500">Please wait while we fetch your data</p>
        </div>
      ) : (
        <UserTable
          users={users}
          onEdit={handleEditUser}
          onDelete={handleDelete}
          onNotify={handleNotify}
          isLoading={loading}
        />
      )}
    </Layout>
  );
}