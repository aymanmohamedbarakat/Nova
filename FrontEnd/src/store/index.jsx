// import { create } from "zustand";



// export const domain = "http://127.0.0.1:5000";

// export const useSideHeader = create((set) => ({
//   index: false,
//   openSideHeader: () => set(() => ({ index: true })),
//   closeSideHeader: () => set(() => ({ index: false })),
// }));

// export const useDetails = create((set) => ({
//   isDetailsOpen: false,
//   activeDetailsId: null,

//   openDetails: (id) =>
//     set({
//       activeDetailsId: id,
//       isDetailsOpen: true,
//     }),

//   closeDetails: () =>
//     set({
//       activeDetailsId: null,
//       isDetailsOpen: false,
//     }),

//   setActiveDetailsId: (productId) => set({ activeDetailsId: productId}),
    
//   resetActiveDetailsId: () => set({ activeDetailsId: null }),
// }));

// // Add this to your store/index.jsx file

// export const useCart = create((set) => ({
//   cartItems: [],
//   totalItems: 0,
//   totalPrice: 0,

//   addToCart: (product, quantity = 1) => set((state) => {
//     // Check if item already exists in cart
//     const existingItemIndex = state.cartItems.findIndex(item => item.id === product.id);
//     let newCartItems = [...state.cartItems];
    
//     if (existingItemIndex >= 0) {
//       // Update quantity if item exists
//       newCartItems[existingItemIndex] = {
//         ...newCartItems[existingItemIndex],
//         quantity: newCartItems[existingItemIndex].quantity + quantity
//       };
//     } else {
//       // Add new item to cart
//       newCartItems.push({ ...product, quantity });
//     }
    
//     // Calculate new totals
//     const newTotalItems = newCartItems.reduce((sum, item) => sum + item.quantity, 0);
//     const newTotalPrice = newCartItems.reduce((sum, item) => {
//       const price = item.discount_price || item.price;
//       return sum + (price * item.quantity);
//     }, 0);
    
//     return { 
//       cartItems: newCartItems,
//       totalItems: newTotalItems,
//       totalPrice: newTotalPrice
//     };
//   }),

//   removeFromCart: (productId) => set((state) => {
//     const newCartItems = state.cartItems.filter(item => item.id !== productId);
    
//     // Calculate new totals
//     const newTotalItems = newCartItems.reduce((sum, item) => sum + item.quantity, 0);
//     const newTotalPrice = newCartItems.reduce((sum, item) => {
//       const price = item.discount_price || item.price;
//       return sum + (price * item.quantity);
//     }, 0);
    
//     return { 
//       cartItems: newCartItems,
//       totalItems: newTotalItems,
//       totalPrice: newTotalPrice
//     };
//   }),

//   updateQuantity: (productId, quantity) => set((state) => {
//     // Update quantity for specific item
//     const newCartItems = state.cartItems.map(item => 
//       item.id === productId ? { ...item, quantity: quantity } : item
//     );
    
//     // Calculate new totals
//     const newTotalItems = newCartItems.reduce((sum, item) => sum + item.quantity, 0);
//     const newTotalPrice = newCartItems.reduce((sum, item) => {
//       const price = item.discount_price || item.price;
//       return sum + (price * item.quantity);
//     }, 0);
    
//     return { 
//       cartItems: newCartItems,
//       totalItems: newTotalItems,
//       totalPrice: newTotalPrice
//     };
//   }),

//   clearCart: () => set({ 
//     cartItems: [],
//     totalItems: 0,
//     totalPrice: 0
//   })
// }));


// // Add this to your existing store/index.jsx file

// export const useWishlist = create((set) => ({
//   wishlistItems: [],
  
//   addToWishlist: (product) => set((state) => {
//     // Check if item already exists in wishlist
//     const existingItem = state.wishlistItems.find(item => item.id === product.id);
    
//     if (existingItem) {
//       // Item already in wishlist, return state unchanged
//       return state;
//     } else {
//       // Add new item to wishlist
//       return { 
//         wishlistItems: [...state.wishlistItems, product] 
//       };
//     }
//   }),

//   removeFromWishlist: (productId) => set((state) => ({
//     wishlistItems: state.wishlistItems.filter(item => item.id !== productId)
//   })),

//   isInWishlist: (productId) => {
//     // This is a derived state - not stored but calculated
//     const state = useWishlist.getState();
//     return state.wishlistItems.some(item => item.id === productId);
//   },

//   clearWishlist: () => set({ wishlistItems: [] })
// }));

// export const useAuth = create((set) => ({
//   user: null,
//   isAuthenticated: false,
//   isLoading: false,
//   error: null,
  
//   login: async (username, password) => {
//     set({ isLoading: true, error: null });
//     try {
//       // Replace with your actual API call
//       const response = await axios.post(`${domain}/login`, { username, password });
//       const userData = response.data;
      
//       set({ 
//         user: userData, 
//         isAuthenticated: true, 
//         isLoading: false,
//         error: null
//       });
      
//       // Store token in localStorage for persistence
//       localStorage.setItem('authToken', userData.token);
//       return true;
//     } catch (error) {
//       set({ 
//         user: null, 
//         isAuthenticated: false, 
//         isLoading: false,
//         error: error.response?.data?.message || 'Login failed. Please check your credentials.'
//       });
//       return false;
//     }
//   },
  
//   register: async (userData) => {
//     set({ isLoading: true, error: null });
//     try {
//       const response = await axios.post(`${domain}/register`, userData);
//       set({ isLoading: false });
//       return response.data;
//     } catch (error) {
//       set({ 
//         isLoading: false,
//         error: error.response?.data?.message || 'Registration failed. Please try again.'
//       });
//       throw error;
//     }
//   },
  
//   logout: () => {
//     // Clear auth token
//     localStorage.removeItem('authToken');
//     set({ 
//       user: null, 
//       isAuthenticated: false,
//       error: null
//     });
//   },
  
//   // Check if user is logged in (e.g., on app startup)
//   checkAuth: async () => {
//     const token = localStorage.getItem('authToken');
//     if (!token) {
//       set({ user: null, isAuthenticated: false });
//       return false;
//     }
    
//     set({ isLoading: true });
//     try {
//       // Verify token validity with backend
//       const response = await axios.get(`${domain}/verify-token`, {
//         headers: { 'Authorization': `Bearer ${token}` }
//       });
      
//       set({ 
//         user: response.data, 
//         isAuthenticated: true,
//         isLoading: false,
//         error: null
//       });
//       return true;
//     } catch (error) {
//       // Token invalid or expired
//       localStorage.removeItem('authToken');
//       set({ 
//         user: null, 
//         isAuthenticated: false,
//         isLoading: false,
//         error: 'Session expired. Please login again.'
//       });
//       return false;
//     }
//   }
// }));

// export const useOrder = create((set) => ({
//   orders: [],
//   currentOrder: null,
//   isLoading: false,
//   error: null,
  
//   fetchOrders: async () => {
//     const token = localStorage.getItem('authToken');
//     if (!token) return;
    
//     set({ isLoading: true });
//     try {
//       const response = await axios.get(`${domain}/orders`, {
//         headers: { 'Authorization': `Bearer ${token}` }
//       });
//       set({ orders: response.data, isLoading: false });
//     } catch (error) {
//       set({ 
//         isLoading: false, 
//         error: error.response?.data?.message || 'Failed to fetch orders.'
//       });
//     }
//   },
  
//   placeOrder: async (orderData) => {
//     const token = localStorage.getItem('authToken');
//     if (!token) {
//       set({ error: 'You must be logged in to place an order.' });
//       return null;
//     }
    
//     set({ isLoading: true, error: null });
//     try {
//       const response = await axios.post(`${domain}/orders`, orderData, {
//         headers: { 'Authorization': `Bearer ${token}` }
//       });
      
//       set({ 
//         orders: [response.data, ...useOrder.getState().orders],
//         currentOrder: response.data,
//         isLoading: false 
//       });
      
//       return response.data;
//     } catch (error) {
//       set({ 
//         isLoading: false, 
//         error: error.response?.data?.message || 'Failed to place order.'
//       });
//       return null;
//     }
//   },
  
//   getOrderDetails: async (orderId) => {
//     const token = localStorage.getItem('authToken');
//     if (!token) return null;
    
//     set({ isLoading: true });
//     try {
//       const response = await axios.get(`${domain}/orders/${orderId}`, {
//         headers: { 'Authorization': `Bearer ${token}` }
//       });
//       set({ currentOrder: response.data, isLoading: false });
//       return response.data;
//     } catch (error) {
//       set({ 
//         isLoading: false, 
//         error: error.response?.data?.message || 'Failed to fetch order details.'
//       });
//       return null;
//     }
//   },
  
//   clearCurrentOrder: () => set({ currentOrder: null })
// }));

// import { create } from "zustand"

// import axios from "axios"
// import { ShopRepo } from "../data/repo/ShopRepo"

// export const domain = "http://127.0.0.1:5000"

// // Add axios interceptor to include token in all requests
// axios.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("authToken")
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`
//     }
//     return config
//   },
//   (error) => Promise.reject(error),
// )

// export const useSideHeader = create((set) => ({
//   index: false,
//   openSideHeader: () => set(() => ({ index: true })),
//   closeSideHeader: () => set(() => ({ index: false })),
// }))

// export const useDetails = create((set) => ({
//   isDetailsOpen: false,
//   activeDetailsId: null,

//   openDetails: (id) =>
//     set({
//       activeDetailsId: id,
//       isDetailsOpen: true,
//     }),

//   closeDetails: () =>
//     set({
//       activeDetailsId: null,
//       isDetailsOpen: false,
//     }),

//   setActiveDetailsId: (productId) => set({ activeDetailsId: productId }),

//   resetActiveDetailsId: () => set({ activeDetailsId: null }),
// }))

// // Updated Cart store with authentication check
// export const useCart = create((set, get) => ({
//   cartItems: [],
//   totalItems: 0,
//   totalPrice: 0,

//   // Initialize cart from localStorage if available
//   initCart: () => {
//     const savedCart = localStorage.getItem("userCart")
//     if (savedCart) {
//       try {
//         const parsedCart = JSON.parse(savedCart)
//         set({
//           cartItems: parsedCart.cartItems || [],
//           totalItems: parsedCart.totalItems || 0,
//           totalPrice: parsedCart.totalPrice || 0,
//         })
//       } catch (error) {
//         console.error("Error parsing saved cart:", error)
//       }
//     }
//   },

//   // Save cart to localStorage
//   saveCart: () => {
//     const { cartItems, totalItems, totalPrice } = get()
//     localStorage.setItem(
//       "userCart",
//       JSON.stringify({
//         cartItems,
//         totalItems,
//         totalPrice,
//       }),
//     )
//   },

//   addToCart: (product, quantity = 1) =>
//     set((state) => {
//       // Check if item already exists in cart
//       const existingItemIndex = state.cartItems.findIndex((item) => item.id === product.id)
//       const newCartItems = [...state.cartItems]

//       if (existingItemIndex >= 0) {
//         // Update quantity if item exists
//         newCartItems[existingItemIndex] = {
//           ...newCartItems[existingItemIndex],
//           quantity: newCartItems[existingItemIndex].quantity + quantity,
//         }
//       } else {
//         // Add new item to cart
//         newCartItems.push({ ...product, quantity })
//       }

//       // Calculate new totals
//       const newTotalItems = newCartItems.reduce((sum, item) => sum + item.quantity, 0)
//       const newTotalPrice = newCartItems.reduce((sum, item) => {
//         const price = item.discount_price || item.price
//         return sum + price * item.quantity
//       }, 0)

//       const newState = {
//         cartItems: newCartItems,
//         totalItems: newTotalItems,
//         totalPrice: newTotalPrice,
//       }

//       // Save to localStorage
//       localStorage.setItem("userCart", JSON.stringify(newState))

//       return newState
//     }),

//   removeFromCart: (productId) =>
//     set((state) => {
//       const newCartItems = state.cartItems.filter((item) => item.id !== productId)

//       // Calculate new totals
//       const newTotalItems = newCartItems.reduce((sum, item) => sum + item.quantity, 0)
//       const newTotalPrice = newCartItems.reduce((sum, item) => {
//         const price = item.discount_price || item.price
//         return sum + price * item.quantity
//       }, 0)

//       const newState = {
//         cartItems: newCartItems,
//         totalItems: newTotalItems,
//         totalPrice: newTotalPrice,
//       }

//       // Save to localStorage
//       localStorage.setItem("userCart", JSON.stringify(newState))

//       return newState
//     }),

//   updateQuantity: (productId, quantity) =>
//     set((state) => {
//       // Update quantity for specific item
//       const newCartItems = state.cartItems.map((item) =>
//         item.id === productId ? { ...item, quantity: quantity } : item,
//       )

//       // Calculate new totals
//       const newTotalItems = newCartItems.reduce((sum, item) => sum + item.quantity, 0)
//       const newTotalPrice = newCartItems.reduce((sum, item) => {
//         const price = item.discount_price || item.price
//         return sum + price * item.quantity
//       }, 0)

//       const newState = {
//         cartItems: newCartItems,
//         totalItems: newTotalItems,
//         totalPrice: newTotalPrice,
//       }

//       // Save to localStorage
//       localStorage.setItem("userCart", JSON.stringify(newState))

//       return newState
//     }),

//   clearCart: () => {
//     localStorage.removeItem("userCart")
//     return {
//       cartItems: [],
//       totalItems: 0,
//       totalPrice: 0,
//     }
//   },
// }))

// // Updated Wishlist store with user-specific data
// export const useWishlist = create((set, get) => ({
//   wishlistItems: [],
//   isLoading: false,
//   error: null,

//   // Initialize wishlist from API for authenticated user
//   fetchWishlist: async () => {
//     const { user } = useAuth.getState()
//     if (!user) return

//     set({ isLoading: true, error: null })
//     try {
//       const wishlistData = await ShopRepo.getWishlist(user.id)
//       set({
//         wishlistItems: wishlistData || [],
//         isLoading: false,
//       })
//     } catch (error) {
//       set({
//         isLoading: false,
//         error: error.message || "Failed to load wishlist",
//       })
//     }
//   },

//   addToWishlist: async (product) => {
//     set({ isLoading: true, error: null })
//     try {
//       // Call API to add to wishlist
//       await ShopRepo.addToWishlist(product.id)

//       // Update local state
//       set((state) => ({
//         wishlistItems: [...state.wishlistItems, product],
//         isLoading: false,
//       }))
//     } catch (error) {
//       set({
//         isLoading: false,
//         error: error.message || "Failed to add to wishlist",
//       })
//     }
//   },

//   removeFromWishlist: async (productId) => {
//     const { user } = useAuth.getState()
//     if (!user) return

//     set({ isLoading: true, error: null })
//     try {
//       // Call API to remove from wishlist
//       await ShopRepo.removeFromWishlist(user.id, productId)

//       // Update local state
//       set((state) => ({
//         wishlistItems: state.wishlistItems.filter((item) => item.id !== productId),
//         isLoading: false,
//       }))
//     } catch (error) {
//       set({
//         isLoading: false,
//         error: error.message || "Failed to remove from wishlist",
//       })
//     }
//   },

//   isInWishlist: (productId) => {
//     return get().wishlistItems.some((item) => item.id === productId)
//   },

//   clearWishlist: () => set({ wishlistItems: [] }),
// }))



import { create } from "zustand";
import axios from "axios";
import { ShopRepo } from "../data/repo/ShopRepo";

export const domain = "http://127.0.0.1:5000";

// Add axios interceptor to include token in all requests
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const useSideHeader = create((set) => ({
  index: false,
  openSideHeader: () => set(() => ({ index: true })),
  closeSideHeader: () => set(() => ({ index: false })),
}));

export const useDetails = create((set) => ({
  isDetailsOpen: false,
  activeDetailsId: null,

  openDetails: (id) =>
    set({
      activeDetailsId: id,
      isDetailsOpen: true,
    }),

  closeDetails: () =>
    set({
      activeDetailsId: null,
      isDetailsOpen: false,
    }),

  setActiveDetailsId: (productId) => set({ activeDetailsId: productId }),

  resetActiveDetailsId: () => set({ activeDetailsId: null }),
}));

// Updated Cart store with authentication check
export const useCart = create((set, get) => ({
  cartItems: [],
  totalItems: 0,
  totalPrice: 0,
  // Initialize cart from localStorage if available
  initCart: () => {
    const savedCart = localStorage.getItem("userCart");
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        set({
          cartItems: parsedCart.cartItems || [],
          totalItems: parsedCart.totalItems || 0,
          totalPrice: parsedCart.totalPrice || 0,
        });
      } catch (error) {
        console.error("Error parsing saved cart:", error);
      }
    }
  },
  // Save cart to localStorage
  saveCart: () => {
    const { cartItems, totalItems, totalPrice } = get();
    localStorage.setItem(
      "userCart",
      JSON.stringify({
        cartItems,
        totalItems,
        totalPrice,
      })
    );
  },
  addToCart: (product, quantity = 1) =>
    set((state) => {
      // Check if item already exists in cart
      const existingItemIndex = state.cartItems.findIndex((item) => item.id === product.id);
      const newCartItems = [...state.cartItems];
      if (existingItemIndex >= 0) {
        // Update quantity if item exists
        newCartItems[existingItemIndex] = {
          ...newCartItems[existingItemIndex],
          quantity: newCartItems[existingItemIndex].quantity + quantity,
        };
      } else {
        // Add new item to cart
        newCartItems.push({ ...product, quantity });
      }
      // Calculate new totals
      const newTotalItems = newCartItems.reduce((sum, item) => sum + item.quantity, 0);
      const newTotalPrice = newCartItems.reduce((sum, item) => {
        const price = item.discount_price || item.price;
        return sum + price * item.quantity;
      }, 0);
      const newState = {
        cartItems: newCartItems,
        totalItems: newTotalItems,
        totalPrice: newTotalPrice,
      };
      // Save to localStorage
      localStorage.setItem("userCart", JSON.stringify(newState));
      return newState;
    }),
  removeFromCart: (productId) =>
    set((state) => {
      const newCartItems = state.cartItems.filter((item) => item.id !== productId);
      // Calculate new totals
      const newTotalItems = newCartItems.reduce((sum, item) => sum + item.quantity, 0);
      const newTotalPrice = newCartItems.reduce((sum, item) => {
        const price = item.discount_price || item.price;
        return sum + price * item.quantity;
      }, 0);
      const newState = {
        cartItems: newCartItems,
        totalItems: newTotalItems,
        totalPrice: newTotalPrice,
      };
      // Save to localStorage
      localStorage.setItem("userCart", JSON.stringify(newState));
      return newState;
    }),
  updateQuantity: (productId, quantity) =>
    set((state) => {
      // Update quantity for specific item
      const newCartItems = state.cartItems.map((item) =>
        item.id === productId ? { ...item, quantity: quantity } : item
      );
      // Calculate new totals
      const newTotalItems = newCartItems.reduce((sum, item) => sum + item.quantity, 0);
      const newTotalPrice = newCartItems.reduce((sum, item) => {
        const price = item.discount_price || item.price;
        return sum + price * item.quantity;
      }, 0);
      const newState = {
        cartItems: newCartItems,
        totalItems: newTotalItems,
        totalPrice: newTotalPrice,
      };
      // Save to localStorage
      localStorage.setItem("userCart", JSON.stringify(newState));
      return newState;
    }),
  clearCart: () => 
    set(() => {
      localStorage.removeItem("userCart");
      return {
        cartItems: [],
        totalItems: 0,
        totalPrice: 0,
      };
    })
}));

// Updated Wishlist store with API integration
export const useWishlist = create((set, get) => ({
  wishlistItems: [],
  isLoading: false,
  error: null,

  // Initialize wishlist from API
  fetchWishlist: async () => {
    // Skip if not authenticated
    if (!localStorage.getItem("authToken")) return;
    
    set({ isLoading: true, error: null });
    try {
      const wishlistData = await ShopRepo.getWishlist();
      set({
        wishlistItems: wishlistData || [],
        isLoading: false,
      });
    } catch (error) {
      set({
        isLoading: false,
        error: error.message || "Failed to load wishlist",
      });
    }
  },

  addToWishlist: async (product) => {
    set({ isLoading: true, error: null });
    try {
      // Call API to add to wishlist
      await ShopRepo.addProductToWishlist(product.id);

      // Update local state
      set((state) => ({
        wishlistItems: [...state.wishlistItems, product],
        isLoading: false,
      }));
    } catch (error) {
      set({
        isLoading: false,
        error: error.message || "Failed to add to wishlist",
      });
      throw error;
    }
  },

  removeFromWishlist: async (productId) => {
    set({ isLoading: true, error: null });
    try {
      // Call API to remove from wishlist
      await ShopRepo.removeProductFromWishlist(productId);

      // Update local state
      set((state) => ({
        wishlistItems: state.wishlistItems.filter((item) => item.id !== productId),
        isLoading: false,
      }));
    } catch (error) {
      set({
        isLoading: false,
        error: error.message || "Failed to remove from wishlist",
      });
      throw error;
    }
  },

  isInWishlist: (productId) => {
    return get().wishlistItems.some((item) => item.id === productId);
  },

  clearWishlist: () => set({ wishlistItems: [] }),
}));

// Update to the useAuth store
export const useAuth = create((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  
  // Add isAdmin computed property
  get isAdmin() {
    return this.user?.isAdmin === true;
  },
  
  login: async (username, password) => {
    set({ isLoading: true, error: null });
    try {
      const response = await ShopRepo.login({ username, password });
      
      // Store token
      localStorage.setItem('authToken', response.access_token);
      
      // Get user info
      const userData = await ShopRepo.verifyAuth();
      
      set({ 
        user: userData,
        isAuthenticated: true,
        isLoading: false,
        error: null
      });
      
      // Initialize user data (wishlist, etc.)
      useWishlist.getState().fetchWishlist();
      
      return true;
    } catch (error) {
      set({ 
        isLoading: false, 
        error: error.response?.data?.message || error.message || "Login failed"
      });
      return false;
    }
  },
  
  register: async (userData) => {
    set({ isLoading: true, error: null });
    try {
      const response = await ShopRepo.register(userData);
      
      // Store token if registration automatically logs in
      if (response.access_token) {
        localStorage.setItem('authToken', response.access_token);
        
        // Get user info
        const userData = await ShopRepo.verifyAuth();
        
        set({ 
          user: userData,
          isAuthenticated: true,
          isLoading: false,
          error: null
        });
        
        // Initialize user data
        useWishlist.getState().fetchWishlist();
      }
      
      set({ isLoading: false });
      return true;
    } catch (error) {
      set({ 
        isLoading: false, 
        error: error.response?.data?.message || error.message || "Registration failed"
      });
      return false;
    }
  },
  
  logout: () => {
    // Clear token
    localStorage.removeItem('authToken');
    
    // Clear cart
    useCart.getState().clearCart();
    
    // Clear wishlist
    useWishlist.getState().clearWishlist();
    
    // Reset auth state
    set({
      user: null,
      isAuthenticated: false,
      error: null
    });
  },
  
// Update the checkAuth function in your useAuth store
checkAuth: async () => {
  const token = localStorage.getItem('authToken');
  
  if (!token) {
    set({ 
      isLoading: false, 
      isAuthenticated: false, 
      user: null 
    });
    return false;
  }
  
  set({ isLoading: true });
  
  try {
    // Verify token and get user data
    const userData = await ShopRepo.verifyAuth();
    
    set({
      user: userData,
      isAuthenticated: true,
      isLoading: false,
      error: null
    });
    
    // Initialize user data
    useWishlist.getState().fetchWishlist();
    
    return true;
  } catch (error) {
    console.error("Auth check failed:", error);
    
    // Only clear token if it's specifically an authentication error
    // (e.g., 401 Unauthorized)
    if (error?.response?.status === 401) {
      localStorage.removeItem('authToken');
    }
    
    set({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      // Don't show error to user unless it's specifically needed
      error: null
    });
    
    return false;
  }
},
  
  updateProfile: async (profileData) => {
    set({ isLoading: true, error: null });
    try {
      // Using direct axios call since ShopRepo.updateProfile is commented out
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
      
      set({
        user: response.data,
        isLoading: false
      });
      return true;
    } catch (error) {
      set({
        isLoading: false,
        error: error.response?.data?.message || error.message || "Failed to update profile"
      });
      return false;
    }
  },
  
  clearError: () => set({ error: null })
}));