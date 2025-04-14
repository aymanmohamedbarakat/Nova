// import React from "react";
// import { Route, Routes } from "react-router-dom";

// import HomePage from "./pages/HomePage";
// import MainHeader from "./components/MainHeader";
// import ShopPage from "./pages/ShopPage";
// import MainFooter from "./components/MainFooter";
// import ProductDetails from "./pages/ProductDetails";

// export default function App() {
//   return (
//     <div className="App">
//       <MainHeader />
//       <Routes>
//         <Route path="/">
//           <Route index element={<HomePage />} />
//           <Route path="shop">
//             <Route index element={<ShopPage />} />
//             <Route path="/shop/product/:product_id" element={<ProductDetails />} />
//           </Route>
//           <Route path="*" element={<h1>Error 404 || Page Not Found</h1>} />
//         </Route>
//       </Routes>
//       <MainFooter />
//     </div>
//   );
// }

// import React from "react";
// import { Route, Routes } from "react-router-dom";

// import HomePage from "./pages/HomePage";
// import MainHeader from "./components/MainHeader";
// import ShopPage from "./pages/ShopPage";
// import MainFooter from "./components/MainFooter";
// import ProductDetails from "./pages/ProductDetails";

// export default function App() {
//   return (
//     <div className="App">
//       <MainHeader />
//       <Routes>
//         <Route path="/">
//           <Route index element={<HomePage />} />
//           <Route path="products">
//             <Route index element={<ShopPage />} />
//             <Route path="/products/:product_id" element={<ProductDetails />} />
//           </Route>
//           <Route path="*" element={<h1>Error 404 || Page Not Found</h1>} />
//         </Route>
//       </Routes>
//       <MainFooter />
//     </div>
//   );
// }

// import React from "react";
// import { Route, Routes } from "react-router-dom";

// import HomePage from "./pages/HomePage";
// import MainHeader from "./components/MainHeader";
// import ShopPage from "./pages/ShopPage";
// import MainFooter from "./components/MainFooter";
// import ProductDetails from "./pages/ProductDetails";

// export default function App() {
//   return (
//     <div className="App">
//       <MainHeader />
//       <Routes>
//         <Route path="/" element={<HomePage />} />
//         <Route path="/products" element={<ShopPage />} />
//         <Route path="/products/:product_id" element={<ProductDetails />} />
//         <Route path="*" element={<h1>Error 404 || Page Not Found</h1>} />
//       </Routes>
//       <MainFooter />
//     </div>
//   );
// }

// // Modify App.jsx

// import React from "react";
// import { Route, Routes } from "react-router-dom";

// import HomePage from "./pages/HomePage";
// import MainHeader from "./components/MainHeader";
// import ShopPage from "./pages/ShopPage";
// import MainFooter from "./components/MainFooter";
// import ProductDetails from "./pages/ProductDetails";
// import CartPage from "./components/CartPage/CartPage";
// import WishlistPage from "./pages/WishlistPage/WishlistPage";
// // import CartPage from "./pages/CartPage"; // Import the new CartPage component

// export default function App() {
//   return (
//     <div className="App">
//       <MainHeader />
//       <Routes>
//         <Route path="/" element={<HomePage />} />
//         <Route path="/products" element={<ShopPage />} />
//         <Route path="/products/:product_id" element={<ProductDetails />} />
//         <Route path="/cart" element={<CartPage />} /> {/* Add the cart route */}
//         <Route path="/wishlist" element={<WishlistPage />} />
//         <Route path="*" element={<h1>Error 404 || Page Not Found</h1>} />
//       </Routes>
//       <MainFooter />
//     </div>
//   );
// }

// import React from "react";
// import { Route, Routes } from "react-router-dom";

// import HomePage from "./pages/HomePage";
// import MainHeader from "./components/MainHeader";
// import ShopPage from "./pages/ShopPage";
// import MainFooter from "./components/MainFooter";
// import ProductDetails from "./pages/ProductDetails";
// import CartPage from "./components/CartPage/CartPage";
// import WishlistPage from "./pages/WishlistPage/WishlistPage";
// import CheckoutPage from "./pages/CheckoutPage/CheckoutPage";
// import OrderConfirmationPage from "./pages/OrderConfirmationPage/OrderConfirmationPage";
// import LoginPage from "./components/LoginComponent";
// import RegisterPage from "./components/RegisterComponent";

// export default function App() {
//   return (
//     <div className="App">
//       <MainHeader />
//       <Routes>
//         <Route path="/" element={<HomePage />} />
//         <Route path="/products" element={<ShopPage />} />
//         <Route path="/products/:product_id" element={<ProductDetails />} />
//         <Route path="/cart" element={<CartPage />} />
//         <Route path="/wishlist" element={<WishlistPage />} />
//         <Route path="/checkout" element={<CheckoutPage />} />
//         <Route path="/order-confirmation/:orderId" element={<OrderConfirmationPage />} />
//         <Route path="/login" element={<LoginPage/>} />
//         <Route path="/register" element={<RegisterPage />} />
//         {/* <Route path="/account" element={<AccountPage />} /> */}
//         <Route path="/orders" element={<OrderConfirmationPage/>} />
//         <Route path="*" element={<h1>Error 404 || Page Not Found</h1>} />
//       </Routes>
//       <MainFooter />
//     </div>
//   );
// }

import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";

import HomePage from "./pages/HomePage";
import ShopPage from "./pages/ShopPage";
import ProductDetails from "./pages/ProductDetails";
import CartPage from "./components/CartPage/CartPage";
import WishlistPage from "./pages/WishlistPage/WishlistPage";
import CheckoutPage from "./pages/CheckoutPage/CheckoutPage";
import OrderConfirmationPage from "./pages/OrderConfirmationPage/OrderConfirmationPage";
import LoginPage from "./components/LoginComponent";
import RegisterPage from "./components/RegisterComponent";
import MainLayout from "./layout/MainLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import GuestRoute from "./components/GuestRoute";
import { useAuth } from "./store";

export default function App() {
  const { checkAuth, isAuthenticated } = useAuth();
  
  // This effect runs once when the app initializes
  useEffect(() => {
    // Check if user is authenticated when app loads
    const verifyAuthentication = async () => {
      await checkAuth();
    };
    
    verifyAuthentication();
  }, []);
  return (
    
    <Routes>
      {/* Routes with layout */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ShopPage />} />
        <Route path="/products/:product_id" element={<ProductDetails />} />
        <Route path="/contact" element={<h1>Contact Us</h1>} />
        <Route path="/blog" element={<h1>Blog</h1>} />
        <Route path="/about" element={<h1>About Us</h1>} />
        <Route path="/account" element={<h1>Account</h1>} />

        {/* Protected Routes */}

        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <CartPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/wishlist"
          element={
            <ProtectedRoute>
              <WishlistPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/checkout"
          element={
            <ProtectedRoute>
              <CheckoutPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/order-confirmation/:orderId"
          element={
            <ProtectedRoute>
              <OrderConfirmationPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/orders"
          element={
            <ProtectedRoute>
              <OrderConfirmationPage />
            </ProtectedRoute>
          }
        />
      </Route>

      {/* Routes without layout */}
      <Route
        path="/login"
        element={
          <GuestRoute>
            <LoginPage />
          </GuestRoute>
        }
      />

      <Route
        path="/register"
        element={
          <GuestRoute>
            <RegisterPage />
          </GuestRoute>
        }
      />

      {/* 404 */}
      <Route path="*" element={<h1>Error 404 || Page Not Found</h1>} />
    </Routes>
  );
}
