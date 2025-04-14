// import { indexCategories } from "../apis/index_categories";
// import { getAllProducts } from "../apis/index_getAllProducts";
// import { indexProduct } from "../apis/index_product";
// import { indexProductDetails } from "../apis/index_productDetails";
// import {
//   getUserWishlist,
//   addToWishlist,
//   removeFromWishlist,
// } from "../apis/index_wishlist";

// export const ShopRepo = {
//   // Existing methods
//   categories_index: async () => {
//     return await indexCategories();
//   },

//   products_index: async (page = 1, perPage = 5) => {
//     return await indexProduct(page, perPage);
//   },

//   getAllProducts: async () => {
//     return await getAllProducts();
//   },

//   productDetails: async (productId) => {
//     return await indexProductDetails(productId);
//   },

//   // Wishlist methods
//   getWishlist: async (userId) => {
//     return await getUserWishlist(userId);
//   },

//   addProductToWishlist: async (userId, productId) => {
//     return await addToWishlist(userId, productId);
//   },

//   removeProductFromWishlist: async (userId, productId) => {
//     return await removeFromWishlist(userId, productId);
//   },
// };
// import { indexCategories } from "../apis/index_categories";
// import { getAllProducts } from "../apis/index_getAllProducts";
// import { indexProduct } from "../apis/index_product";
// import { indexProductDetails } from "../apis/index_productDetails";
// import {
//   getUserWishlist,
//   addToWishlist,
//   removeFromWishlist,
// } from "../apis/index_wishlist";
// import {
//   getUserOrders,
//   getOrderDetails,
//   placeOrder,
// } from "../apis/index_order";
// import { registerUser, loginUser, verifyToken } from "../apis/index_auth";

// export const ShopRepo = {
//   // Product methods
//   categories_index: async () => {
//     return await indexCategories();
//   },

//   products_index: async (page = 1, perPage = 5) => {
//     return await indexProduct(page, perPage);
//   },

//   getAllProducts: async () => {
//     return await getAllProducts();
//   },

//   productDetails: async (productId) => {
//     return await indexProductDetails(productId);
//   },

//   // Wishlist methods
//   getWishlist: async () => {
//     return await getUserWishlist();
//   },

//   addProductToWishlist: async (productId) => {
//     return await addToWishlist(productId);
//   },

//   removeProductFromWishlist: async (productId) => {
//     return await removeFromWishlist(productId);
//   },

//   // Order methods
//   getUserOrders: async () => {
//     return await getUserOrders();
//   },

//   getOrderDetails: async (orderId) => {
//     return await getOrderDetails(orderId);
//   },

//   placeOrder: async (orderData) => {
//     return await placeOrder(orderData);
//   },

//   // Auth methods
//   register: async (userData) => {
//     return await registerUser(userData);
//   },

//   login: async (credentials) => {
//     return await loginUser(credentials);
//   },

//   verifyAuth: async () => {
//     return await verifyToken();
//   },
//   // updateProfile: async (profileData) => {
//   //   try {
//   //     const token = localStorage.getItem("authToken");
//   //     if (!token) {
//   //       throw new Error("No auth token found");
//   //     }

//   //     const response = await axios.put(
//   //       `${domain}/update-profile`,
//   //       profileData,
//   //       {
//   //         headers: {
//   //           Authorization: `Bearer ${token}`,
//   //         },
//   //       }
//   //     );

//   //     return response.data; // البيانات بعد التحديث
//   //   } catch (error) {
//   //     console.error("Error updating profile:", error);
//   //     throw error;
//   //   }
//   // },
// };


import axios from "axios";
import { domain } from "../../store";
import { indexCategories } from "../apis/index_categories";
import { getAllProducts } from "../apis/index_getAllProducts";
import { indexProduct } from "../apis/index_product";
import { indexProductDetails } from "../apis/index_productDetails";
import {
  getUserWishlist,
  addToWishlist,
  removeFromWishlist,
} from "../apis/index_wishlist";
import {
  getUserOrders,
  getOrderDetails,
  placeOrder,
} from "../apis/index_order";
import { registerUser, loginUser, verifyToken } from "../apis/index_auth";

export const ShopRepo = {
  // Product methods
  categories_index: async () => {
    return await indexCategories();
  },

  products_index: async (page = 1, perPage = 5) => {
    return await indexProduct(page, perPage);
  },

  getAllProducts: async () => {
    return await getAllProducts();
  },

  productDetails: async (productId) => {
    return await indexProductDetails(productId);
  },

  // Wishlist methods
  getWishlist: async () => {
    return await getUserWishlist();
  },

  addProductToWishlist: async (productId) => {
    return await addToWishlist(productId);
  },

  removeProductFromWishlist: async (productId) => {
    return await removeFromWishlist(productId);
  },

  // Order methods
  getUserOrders: async () => {
    return await getUserOrders();
  },

  getOrderDetails: async (orderId) => {
    return await getOrderDetails(orderId);
  },

  placeOrder: async (orderData) => {
    return await placeOrder(orderData);
  },

  // Auth methods
  register: async (userData) => {
    return await registerUser(userData);
  },

  login: async (credentials) => {
    return await loginUser(credentials);
  },

  verifyAuth: async () => {
    return await verifyToken();
  },
  
  // Adding updateProfile method
  updateProfile: async (profileData) => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        throw new Error("No auth token found");
      }

      const response = await axios.put(
        `${domain}/update-profile`,
        profileData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      console.error("Error updating profile:", error);
      throw error;
    }
  },
};