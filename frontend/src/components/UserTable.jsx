
import React, { useState, useEffect, useRef } from 'react';
import { FiEdit, FiTrash2, FiSend, FiSearch, FiFilter, FiDownload, FiUser, FiMapPin } from 'react-icons/fi';

export default function UserTable({ users, onEdit, onDelete, onNotify, isLoading = false }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredUsers, setFilteredUsers] = useState(users);
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  
  
  const isInitialMount = useRef(true);

  // Filter users based on search term, location, and status
  useEffect(() => {
    
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    const filterUsers = () => {
      let result = users;
      
      // Filter by search term
      if (searchTerm) {
        const term = searchTerm.toLowerCase();
        result = result.filter(user => 
          user.name.toLowerCase().includes(term) ||
          user.email.toLowerCase().includes(term) ||
          user.location.toLowerCase().includes(term)
        );
      }
      
      // Filter by location
      if (selectedLocation !== 'all') {
        result = result.filter(user => user.location === selectedLocation);
      }
      
      // Filter by status
      if (selectedStatus !== 'all') {
        result = result.filter(user => user.status === selectedStatus);
      }
      
      // Use requestAnimationFrame to make setState asynchronous
      requestAnimationFrame(() => {
        setFilteredUsers(result);
      });
    };

    filterUsers();
  }, [users, searchTerm, selectedLocation, selectedStatus]);

  // Get unique locations for filter
  const locations = ['all', ...new Set(users.map(user => user.location))];
  const statuses = ['all', 'active', 'inactive', 'pending'];

  const getStatusBadge = (status) => {
    const colors = {
      active: 'bg-green-100 text-green-800',
      inactive: 'bg-red-100 text-red-800',
      pending: 'bg-yellow-100 text-yellow-800'
    };
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${colors[status] || 'bg-gray-100 text-gray-800'}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  return (
    <div 
      className="bg-white shadow-2xl rounded-2xl overflow-hidden border border-gray-200"
      data-aos="fade-up"
      data-aos-delay="100"
    >
      {/* Table Header with Filters */}
      <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-blue-50">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">User Management</h2>
            <p className="text-gray-600">Total Users: {users.length}</p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
            {/* Search Bar */}
            <div className="relative flex-1 sm:flex-none">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full sm:w-64 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              />
            </div>
            
            {/* Export Button */}
            <button className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl hover:shadow-lg transition flex items-center gap-2 justify-center">
              <FiDownload />
              Export
            </button>
          </div>
        </div>
        
        {/* Filter Controls */}
        <div className="flex flex-wrap gap-3">
          {/* Location Filter */}
          <div className="flex items-center gap-2">
            <FiMapPin className="text-gray-400" />
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            >
              {locations.map(location => (
                <option key={location} value={location}>
                  {location === 'all' ? 'All Locations' : location}
                </option>
              ))}
            </select>
          </div>
          
          {/* Status Filter */}
          <div className="flex items-center gap-2">
            <FiFilter className="text-gray-400" />
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            >
              {statuses.map(status => (
                <option key={status} value={status}>
                  {status === 'all' ? 'All Status' : status.charAt(0).toUpperCase() + status.slice(1)}
                </option>
              ))}
            </select>
          </div>
          
          {/* Clear Filters Button */}
          {(searchTerm || selectedLocation !== 'all' || selectedStatus !== 'all') && (
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedLocation('all');
                setSelectedStatus('all');
              }}
              className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 transition"
            >
              Clear Filters
            </button>
          )}
        </div>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="p-8 text-center">
          <div className="inline-block w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-2 text-gray-600">Loading users...</p>
        </div>
      )}

      {/* Table */}
      {!isLoading && (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-4 text-left text-sm font-semibold text-gray-700">User</th>
                <th className="p-4 text-left text-sm font-semibold text-gray-700">Email</th>
                <th className="p-4 text-left text-sm font-semibold text-gray-700">Location</th>
                <th className="p-4 text-left text-sm font-semibold text-gray-700">Status</th>
                <th className="p-4 text-right text-sm font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredUsers.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-8 text-center">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <FiUser className="text-2xl text-gray-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">No users found</h3>
                    <p className="text-gray-500">Try adjusting your search or filters</p>
                  </td>
                </tr>
              )}

              {filteredUsers.map((user, index) => (
                <tr 
                  key={user._id || user.id} 
                  className={`hover:bg-blue-50 transition-all duration-300 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}
                  data-aos="fade-up"
                  data-aos-delay={index * 50}
                >
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full flex items-center justify-center text-white font-semibold">
                        {user.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{user.name}</div>
                        {user.phone && (
                          <div className="text-sm text-gray-500">{user.phone}</div>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="text-gray-900">{user.email}</div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <FiMapPin className="text-gray-400" />
                      <span className="text-gray-900">{user.location}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    {getStatusBadge(user.status || 'active')}
                  </td>
                  <td className="p-4">
                    <div className="flex gap-2 justify-end">
                      <button
                        onClick={() => onNotify(user)}
                        className="p-2 bg-gradient-to-r from-green-100 to-emerald-100 text-emerald-600 rounded-lg hover:shadow transition transform hover:scale-105"
                        title="Send Notification"
                      >
                        <FiSend />
                      </button>
                      <button
                        onClick={() => onEdit(user)}
                        className="p-2 bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-600 rounded-lg hover:shadow transition transform hover:scale-105"
                        title="Edit User"
                      >
                        <FiEdit />
                      </button>
                      <button
                        onClick={() => onDelete(user._id || user.id)}
                        className="p-2 bg-gradient-to-r from-red-100 to-pink-100 text-red-600 rounded-lg hover:shadow transition transform hover:scale-105"
                        title="Delete User"
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Results Count */}
      {!isLoading && filteredUsers.length > 0 && (
        <div className="p-4 border-t border-gray-200 bg-gray-50">
          <p className="text-sm text-gray-600">
            Showing {filteredUsers.length} of {users.length} users
          </p>
        </div>
      )}
    </div>
  );
}