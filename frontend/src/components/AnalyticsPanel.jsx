
import React from 'react';
import { FiUsers, FiMapPin, FiTrendingUp, FiPieChart } from 'react-icons/fi';

export default function AnalyticsPanel({ analytics, isLoading = false }) {
  if (!analytics) return null;

  const { totalUsers, majorLocation, usersByLocation = [] } = analytics;

  // Calculate percentage for each location
  const locationData = usersByLocation.map(item => ({
    ...item,
    percentage: totalUsers > 0 ? Math.round((item.count / totalUsers) * 100) : 0
  }));

  // Sort locations by count (descending)
  const sortedLocations = [...locationData].sort((a, b) => b.count - a.count);

  return (
    <div 
      className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
      data-aos="fade-up"
    >
      {/* Total Users Card */}
      <div 
        className="bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-2xl p-6 shadow-2xl transform hover:scale-[1.02] transition-all duration-300"
        data-aos="zoom-in"
      >
        <div className="flex justify-between items-start">
          <div>
            <p className="text-blue-100 font-medium mb-2">Total Users</p>
            <p className="text-4xl font-bold mb-2">{isLoading ? '...' : totalUsers}</p>
            <p className="text-blue-200 text-sm">Registered in system</p>
          </div>
          <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center">
            <FiUsers className="text-2xl" />
          </div>
        </div>
        {!isLoading && totalUsers > 0 && (
          <div className="mt-6">
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm">Growth</span>
              <span className="text-sm font-semibold">+12%</span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-2">
              <div className="bg-white rounded-full h-2 w-3/4"></div>
            </div>
          </div>
        )}
      </div>

      {/* Major Location Card */}
      <div 
        className="bg-gradient-to-br from-green-500 to-emerald-600 text-white rounded-2xl p-6 shadow-2xl transform hover:scale-[1.02] transition-all duration-300"
        data-aos="zoom-in"
        data-aos-delay="100"
      >
        <div className="flex justify-between items-start">
          <div>
            <p className="text-emerald-100 font-medium mb-2">Major Location</p>
            <p className="text-3xl font-bold mb-2">
              {isLoading ? '...' : (majorLocation || 'N/A')}
            </p>
            {majorLocation && (
              <p className="text-emerald-200 text-sm">Most users from this location</p>
            )}
          </div>
          <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center">
            <FiMapPin className="text-2xl" />
          </div>
        </div>
        {!isLoading && majorLocation && (
          <div className="mt-6">
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm">Users</span>
              <span className="text-sm font-semibold">
                {sortedLocations[0]?.count || 0}
              </span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-2">
              <div className="bg-white rounded-full h-2 w-2/3"></div>
            </div>
          </div>
        )}
      </div>

      {/* Users by Location Card */}
      <div 
        className="bg-white rounded-2xl p-6 shadow-2xl border border-gray-200 transform hover:scale-[1.02] transition-all duration-300"
        data-aos="zoom-in"
        data-aos-delay="200"
      >
        <div className="flex justify-between items-center mb-4">
          <div>
            <p className="text-gray-400 font-medium mb-1">Users by Location</p>
            <div className="flex items-center gap-2">
              <FiPieChart className="text-purple-600" />
              <p className="text-2xl font-bold text-gray-800">
                {sortedLocations.length}
              </p>
              <span className="text-gray-500">locations</span>
            </div>
          </div>
          <div className="w-12 h-12 bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl flex items-center justify-center">
            <FiTrendingUp className="text-purple-600" />
          </div>
        </div>

        <div className="space-y-3 max-h-64 overflow-y-auto pr-2">
          {isLoading ? (
            <div className="text-center py-4">
              <div className="inline-block w-6 h-6 border-2 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
              <p className="text-gray-500 mt-2">Loading location data...</p>
            </div>
          ) : sortedLocations.length === 0 ? (
            <div className="text-center py-4">
              <p className="text-gray-500">No location data available</p>
            </div>
          ) : (
            sortedLocations.map((location, index) => (
              <div 
                key={location._id || location.location || index}
                className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-xl transition"
                data-aos="fade-right"
                data-aos-delay={index * 50}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-blue-100 to-purple-100 flex items-center justify-center">
                    <span className="text-sm font-semibold text-purple-600">
                      {location.location?.charAt(0) || '?'}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">
                      {location.location || 'Unknown'}
                    </p>
                    <p className="text-xs text-gray-500">{location.percentage}% of total</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold text-gray-900">{location.count}</p>
                  <p className="text-xs text-gray-500">users</p>
                </div>
              </div>
            ))
          )}
        </div>

        {!isLoading && sortedLocations.length > 0 && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Total across all locations</span>
              <span className="font-semibold text-gray-900">{totalUsers} users</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}