import axios from "axios";
import { domain } from "../../store";

// Register a new user
export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${domain}/register`, userData);
    return response.data;
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
};

// Login user
export const loginUser = async (credentials) => {
  try {
    const response = await axios.post(`${domain}/login`, credentials);
    return response.data;
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};

// Verify token (check if user is authenticated)
export const verifyToken = async () => {
  try {
    const response = await axios.get(`${domain}/verify-token`);
    return response.data;
  } catch (error) {
    console.error("Error verifying token:", error);
    throw error;
  }
};