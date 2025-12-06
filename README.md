# 📊 User Management CRUD Application

A full-stack CRUD (Create, Read, Update, Delete) application built with React, Node.js, Express, and MongoDB. Features user management, email notifications, and analytics dashboard.



## ✨ Features

### 🔧 Core CRUD Operations
- ✅ **Create**: Add new users with form validation
- ✅ **Read**: View all users in interactive table
- ✅ **Update**: Edit existing user information
- ✅ **Delete**: Remove users with confirmation

### 📧 Notification System
- Email notification functionality
- Real-time success feedback
- Notification logging system
- Demo mode for offline testing

### 📊 Analytics Dashboard
- Total users count
- Major location identification
- Users grouped by location
- Visual statistics display

### 🎨 Modern UI/UX
- Responsive design (Mobile & Desktop)
- AOS animations for smooth transitions
- Toast notifications for user feedback
- Tailwind CSS for styling
- Interactive filtering & search

## 🏗️ Tech Stack

### Frontend
- **React 18** - UI Library
- **Vite** - Build tool & dev server
- **Tailwind CSS** - Styling
- **AOS** - Animation library
- **React Toastify** - Notifications
- **React Icons** - Icon library
- **Axios** - HTTP client

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **CORS** - Cross-origin resource sharing
- **Dotenv** - Environment management

## 📁 Project Structure

user-management/
├── frontend/ # React application
│ ├── src/
│ │ ├── components/ # React components
│ │ │ ├── Layout.jsx
│ │ │ ├── UserForm.jsx
│ │ │ ├── UserTable.jsx
│ │ │ └── AnalyticsPanel.jsx
│ │ ├── services/ # API services
│ │ │ └── api.js
│ │ ├── App.jsx # Main component
│ │ └── main.jsx # Entry point
│ ├── public/
│ ├── package.json
│ └── vite.config.js
│
└── backend/ # Node.js API
├── models/ # MongoDB schemas
│ └── User.js
├── routes/ # API routes
│ ├── userRoutes.js
│ ├── notificationRoutes.js
│ └── analyticsRoutes.js
├── controllers/ # Business logic
│ ├── userController.js
│ ├── notificationController.js
│ └── analyticsController.js
├── server.js # Entry point
└── package.json
