
import React, { useState } from 'react';
import { FiUser, FiMail, FiMapPin, FiSave, FiPlus, FiX } from 'react-icons/fi';

const emptyForm = { 
  name: "", 
  email: "", 
  location: "",
  phone: "",
  status: "active" 
};

export default function UserForm({ editingUser, onSubmit, onCancel, isLoading = false }) {
  
  const [form, setForm] = useState(() => {
    if (editingUser) {
      return {
        name: editingUser.name || "",
        email: editingUser.email || "",
        location: editingUser.location || "",
        phone: editingUser.phone || "",
        status: editingUser.status || "active"
      };
    }
    return emptyForm;
  });
  
  const [errors, setErrors] = useState({});

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
   
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};
    
    if (!form.name.trim()) newErrors.name = 'Name is required';
    if (!form.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = 'Email is invalid';
    if (!form.location.trim()) newErrors.location = 'Location is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle submit
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit(form);
      if (!editingUser) {
        // Reset form for adding new user
        setForm(emptyForm);
        setErrors({});
      }
    }
  };

  // Handle cancel - reset form
  const handleCancel = () => {
    setForm(emptyForm);
    setErrors({});
    onCancel();
  };

  const locations = ['Dubai', 'Pune', 'Kolhapur', 'Mumbai', 'Delhi', 'Bangalore', 'Hyderabad'];

  return (
    <div 
      className="bg-white shadow-2xl rounded-2xl p-6 mb-8 border border-gray-200"
      data-aos="fade-up"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            {editingUser ? <FiSave className="text-blue-600" /> : <FiPlus className="text-blue-600" />}
            {editingUser ? "Edit User" : "Add New User"}
          </h2>
          <p className="text-gray-600">
            {editingUser ? 'Update user information' : 'Fill in the details to add a new user'}
          </p>
        </div>
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-lg ${editingUser ? 'bg-gradient-to-r from-yellow-500 to-orange-500' : 'bg-gradient-to-r from-blue-500 to-purple-500'}`}>
          {editingUser ? <FiSave className="text-white text-xl" /> : <FiPlus className="text-white text-xl" />}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Name Field */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 flex items-center gap-2">
              <FiUser className="text-gray-400" />
              Full Name *
            </label>
            <div className="relative">
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Enter full name"
                className={`w-full px-4 py-3 pl-10 border rounded-xl focus:ring-2 focus:outline-none transition-all ${errors.name ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200'}`}
                required
                disabled={isLoading}
              />
              <FiUser className="absolute left-3 top-3.5 text-gray-400" />
            </div>
            {errors.name && <p className="text-red-500 text-sm animate-pulse">{errors.name}</p>}
          </div>

          {/* Email Field */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 flex items-center gap-2">
              <FiMail className="text-gray-400" />
              Email Address *
            </label>
            <div className="relative">
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Enter email address"
                className={`w-full px-4 py-3 pl-10 border rounded-xl focus:ring-2 focus:outline-none transition-all ${errors.email ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200'}`}
                required
                disabled={isLoading || editingUser}
              />
              <FiMail className="absolute left-3 top-3.5 text-gray-400" />
            </div>
            {errors.email && <p className="text-red-500 text-sm animate-pulse">{errors.email}</p>}
            {editingUser && <p className="text-gray-500 text-xs mt-1">Email cannot be changed</p>}
          </div>

          {/* Location Field */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 flex items-center gap-2">
              <FiMapPin className="text-gray-400" />
              Location *
            </label>
            <div className="relative">
              <select
                name="location"
                value={form.location}
                onChange={handleChange}
                className={`w-full px-4 py-3 pl-10 border rounded-xl focus:ring-2 focus:outline-none appearance-none transition-all ${errors.location ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200'}`}
                required
                disabled={isLoading}
              >
                <option value="">Select a location</option>
                {locations.map((loc) => (
                  <option key={loc} value={loc}>{loc}</option>
                ))}
              </select>
              <FiMapPin className="absolute left-3 top-3.5 text-gray-400" />
              <div className="absolute right-3 top-3.5 pointer-events-none">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
            {errors.location && <p className="text-red-500 text-sm animate-pulse">{errors.location}</p>}
          </div>

          {/* Phone Field */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <input
              name="phone"
              type="tel"
              value={form.phone}
              onChange={handleChange}
              placeholder="Enter phone number (optional)"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:border-blue-500 focus:ring-blue-200 focus:outline-none transition-all"
              disabled={isLoading}
            />
          </div>

          {/* Status Field */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Status
            </label>
            <div className="flex space-x-4">
              {['active', 'inactive', 'pending'].map((status) => (
                <label key={status} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="status"
                    value={status}
                    checked={form.status === status}
                    onChange={handleChange}
                    className="hidden"
                    disabled={isLoading}
                  />
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${form.status === status ? 'border-blue-500' : 'border-gray-300'}`}>
                    {form.status === status && (
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    )}
                  </div>
                  <span className="text-sm capitalize">{status}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex justify-end space-x-4 pt-4 border-t border-gray-200">
          {editingUser && (
            <button
              type="button"
              onClick={handleCancel}
              disabled={isLoading}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all duration-300 font-medium flex items-center gap-2 disabled:opacity-50"
            >
              <FiX />
              Cancel
            </button>
          )}
          <button
            type="submit"
            disabled={isLoading}
            className={`px-6 py-3 text-white rounded-xl hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300 font-medium flex items-center gap-2 ${editingUser ? 'bg-gradient-to-r from-yellow-500 to-orange-500' : 'bg-gradient-to-r from-blue-600 to-purple-600'}`}
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                {editingUser ? 'Updating...' : 'Adding...'}
              </>
            ) : (
              <>
                {editingUser ? <FiSave /> : <FiPlus />}
                {editingUser ? 'Update User' : 'Add User'}
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}