import axios from "axios";
import { domain } from "../../store";

// Get user's wishlist
export const getUserWishlist = async () => {
  try {
    const response = await axios.get(`${domain}/wishlist`);
    return response.data;
  } catch (error) {
    console.error("Error fetching wishlist:", error);
    throw error;
  }
};

// Add product to wishlist
export const addToWishlist = async (productId) => {
  try {
    const response = await axios.post(`${domain}/wishlist`, {
      product_id: productId
    });
    
    return response.data;
  } catch (error) {
    console.error("Error adding to wishlist:", error);
    throw error;
  }
};

// Remove product from wishlist
export const removeFromWishlist = async (productId) => {
  try {
    const response = await axios.delete(`${domain}/wishlist/${productId}`);
    return response.data;
  } catch (error) {
    console.error("Error removing from wishlist:", error);
    throw error;
  }
};