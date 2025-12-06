
import React, { useEffect } from 'react';
import { FiUsers, FiBell, FiUser } from 'react-icons/fi';

export default function Layout({ children }) {
  useEffect(() => {
    // Initialize AOS animations
    if (typeof window !== 'undefined') {
      import('aos').then((AOS) => {
        AOS.default.init({
          duration: 800,
          easing: 'ease-in-out',
          once: true,
          mirror: false
        });
      });
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <header 
        className="bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
        data-aos="fade-down"
      >
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-white/20 rounded-lg shadow-md">
                <FiUsers className="text-2xl" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">User Management Dashboard</h1>
                <p className="text-blue-100 text-sm">Manage your users efficiently</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <button className="relative p-2 hover:bg-white/10 rounded-full transition">
                <FiBell className="text-xl" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
              </button>
              <div className="flex items-center space-x-2 bg-white/10 px-3 py-2 rounded-lg">
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                  <FiUser className="text-blue-600" />
                </div>
                <span className="font-medium hidden md:block">Admin</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Animated background elements */}
        <div className="fixed top-0 right-0 w-64 h-64 bg-blue-300 rounded-full filter blur-3xl opacity-10 -z-10"></div>
        <div className="fixed bottom-0 left-0 w-64 h-64 bg-purple-300 rounded-full filter blur-3xl opacity-10 -z-10"></div>
        
        {children}
      </main>

      <footer 
        className="bg-gradient-to-r from-blue-600/90 to-purple-600/90 text-white py-4 mt-8"
        data-aos="fade-up"
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <p className="text-sm">© 2024 User Management System. All rights reserved.</p>
            <div className="flex space-x-4 mt-2 md:mt-0">
              <a href="#" className="text-sm hover:text-blue-200 transition">Privacy Policy</a>
              <a href="#" className="text-sm hover:text-blue-200 transition">Terms of Service</a>
              <a href="#" className="text-sm hover:text-blue-200 transition">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}