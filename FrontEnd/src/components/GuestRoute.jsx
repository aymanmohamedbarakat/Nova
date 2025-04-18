// components/GuestRoute.js
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../store";

export default function GuestRoute({ children }) {
  const isAuthenticated = useAuth((state) => state.isAuthenticated);
  const isLoading = useAuth((state) => state.isLoading);

  if (isLoading) return <div className="text-center py-10">Loading...</div>;

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
}
