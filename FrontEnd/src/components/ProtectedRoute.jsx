// components/ProtectedRoute.js
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../store";


export default function ProtectedRoute({ children }) {
  const isAuthenticated = useAuth((state) => state.isAuthenticated);
  const isLoading = useAuth((state) => state.isLoading);

  if (isLoading) return <div className="text-center py-10">Loading...</div>;

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

// import React, { useEffect } from 'react';
// import { Navigate, useLocation } from 'react-router-dom';
// import { useAuth } from '../store';

// const ProtectedRoute = ({ children }) => {
//   const { isAuthenticated, isLoading, checkAuth } = useAuth();
//   const location = useLocation();

//   useEffect(() => {
//     // Verify authentication when component mounts
//     if (!isAuthenticated && !isLoading) {
//       checkAuth();
//     }
//   }, []);

//   if (isLoading) {
//     // Show loading spinner while checking authentication
//     return (
//       <div className="d-flex justify-content-center align-items-center" style={{ height: "50vh" }}>
//         <div className="spinner-border" role="status">
//           <span className="visually-hidden">Loading...</span>
//         </div>
//       </div>
//     );
//   }

//   if (!isAuthenticated) {
//     // Redirect to login with return URL
//     return <Navigate to="/login" state={{ from: location.pathname }} replace />;
//   }

//   return children;
// };

// export default ProtectedRoute;