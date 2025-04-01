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

import React from "react";
import { Route, Routes } from "react-router-dom";

import HomePage from "./pages/HomePage";
import MainHeader from "./components/MainHeader";
import ShopPage from "./pages/ShopPage";
import MainFooter from "./components/MainFooter";
import ProductDetails from "./pages/ProductDetails";

export default function App() {
  return (
    <div className="App">
      <MainHeader />
      <Routes>
        <Route path="/">
          <Route index element={<HomePage />} />
          <Route path="shop">
            <Route index element={<ShopPage />} />
            <Route
              path="product/:productId" // Use :productId instead of :id
              element={<ProductDetails />}
            />
          </Route>
          <Route path="*" element={<h1>Error 404 || Page Not Found</h1>} />
        </Route>
      </Routes>
      <MainFooter />
    </div>
  );
}
