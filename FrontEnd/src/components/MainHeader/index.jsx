// import React, { useState, useEffect } from "react";
// import logoImg from "../../assets/Logo.png";
// import { Link } from "react-router-dom";
// import { CiHeart, CiShoppingCart, CiUser } from "react-icons/ci";
// import { IoIosMenu } from "react-icons/io";
// import SideHeader from "../SideHeader";
// import { useSideHeader } from "../../store";
// import { FaSearch } from "react-icons/fa";
// import styles from "./index.module.css";
// import { Search, ShoppingCart } from "lucide-react";

// export default function MainHeader() {
//   const { index, openSideHeader } = useSideHeader();
//   const [scrolled, setScrolled] = useState(false);
//   const [searchFocused, setSearchFocused] = useState(false);
//   // Navigation links with useState
//   const [navLinks, setNavLinks] = useState([
//     { id: 1, path: "/", name: "Home" },
//     { id: 2, path: "/products", name: "Shop" },
//     { id: 3, path: "/about", name: "About" },
//     { id: 4, path: "/contact", name: "Contact" },
//     { id: 5, path: "/blog", name: "Blog" },
//   ]);

//   // Icon links with useState
//   const [iconLinks, setIconLinks] = useState([
//     {
//       id: 1,
//       path: "/wishlist",
//       icon: <CiHeart className="fs-4 text-dark hover-icon" />,
//       label: "Wishlist",
//       badge: 0,
//     },
//     {
//       id: 2,
//       path: "/cart",
//       icon: <CiShoppingCart className="fs-4 text-dark hover-icon" />,
//       label: "Cart",
//       badge: 2,
//     },
//     {
//       id: 3,
//       path: "/account",
//       icon: <CiUser className="fs-4 text-dark hover-icon" />,
//       label: "Account",
//       badge: null,
//     },
//   ]);

//   useEffect(() => {
//     const handleScroll = () => {
//       const isScrolled = window.scrollY > 10;
//       if (isScrolled !== scrolled) {
//         setScrolled(isScrolled);
//       }
//     };

//     window.addEventListener("scroll", handleScroll);

//     return () => {
//       window.removeEventListener("scroll", handleScroll);
//     };
//   }, [scrolled]);

//   return (
//     <header
//       className={`sticky-top bg-white ${scrolled ? styles.scrolled : ""}`}
//     >
//       <div className="container d-flex justify-content-between align-items-center py-3">
//         <Link to="/" className="navbar-brand">
//           <img src={logoImg} alt="Logo" height="80" />
//         </Link>
//         {/* Navigation - Desktop */}
//         <nav className="d-none d-md-flex">
//           <ul
//             className="d-flex m-0 p-0 gap-3 list-unstyled"
//             id={styles.navList}
//           >
//             {navLinks.map((el, index) => {
//               return (
//                 <li
//                   key={el.id}
//                   className="position-relative"
//                   id={styles.navItem}
//                 >
//                   <Link to={el.path} id={styles.navLink}>
//                     {el.name}
//                   </Link>
//                 </li>
//               );
//             })}
//           </ul>
//         </nav>

//         {/* Search - Desktop */}
//         <div
//           className={`d-none d-lg-block position-relative ${
//             styles.searchContainer
//           } ${searchFocused ? styles.focused : ""}`}
//           id={``}
//         >
//           <input
//             className=" rounded-pill"
//             id={styles.searchInput}
//             placeholder="Search products..."
//             onFocus={() => setSearchFocused(true)}
//             onBlur={() => setSearchFocused(false)}
//           />
//           <button
//             className="btn position-absolute end-0 top-0 bottom-0"
//             id={styles.searchButton}
//           >
//             <FaSearch />
//           </button>
//         </div>

//         {/* Search - Mobile */}
//         <div className="container d-block d-lg-none pb-3">
//           <div className="" id={styles.mobileSearchContainer}>
//             <input
//               className=""
//               id={styles.searchInput}
//               placeholder="Search products..."
//             />
//             <button className="" id={styles.searchButton}><FaSearch /></button>
//           </div>
//         </div>

//         <div className="d-none d-md-flex">
//           <ul
//             className="d-flex list-unstyled m-0 p-0 gap-1"
//             id={styles.iconList}
//           >
//             {iconLinks.map((el, index) => {
//               return (
//                 <li
//                   key={el.id}
//                   className="position-relative"
//                   id={styles.iconItem}
//                 >
//                   <Link
//                     to={el.path}
//                     className="d-flex align-items-center justify-content-center position-relative"
//                     id={styles.iconLink}
//                     aria-label={el.label}
//                   >
//                     {el.icon}
//                     {el.badge !== null && el.badge > 0 && (
//                       <span
//                         id={styles.badge}
//                         className="badge bg-dark position-absolute d-flex align-items-center justify-content-center"
//                       >
//                         {el.badge}
//                       </span>
//                     )}
//                   </Link>
//                 </li>
//               );
//             })}
//           </ul>
//         </div>

//         <button
//           className="btn d-block d-md-none border-0"
//           onClick={openSideHeader}
//           aria-label="Open menu"
//         >
//           <IoIosMenu className="text-dark fs-1" />
//         </button>
//       </div>
//       {index && <SideHeader />}
//     </header>
//   );
// }


// Modify components/MainHeader/index.jsx

// import React, { useState, useEffect } from "react";
// import logoImg from "../../assets/Logo.png";
// import { Link, useLocation } from "react-router-dom";
// import { CiHeart, CiShoppingCart, CiUser } from "react-icons/ci";
// import { IoIosMenu } from "react-icons/io";
// import SideHeader from "../SideHeader";

// import { FaSearch } from "react-icons/fa";
// import styles from "./index.module.css";
// import { useCart, useSideHeader, useWishlist } from "../../store";

// export default function MainHeader() {
//   const { index, openSideHeader } = useSideHeader();
//   const { totalItems } = useCart(); // Get the cart total items count
//   const [scrolled, setScrolled] = useState(false);
//   const [searchFocused, setSearchFocused] = useState(false);
//   const { wishlistItems, isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();
//   const location = useLocation();
//   const isShopPage = location.pathname === '/products';
 
//   // Navigation links with useState
//   const [navLinks, setNavLinks] = useState([
//     { id: 1, path: "/", name: "Home" },
//     { id: 2, path: "/products", name: "Shop" },
//     { id: 3, path: "/about", name: "About" },
//     { id: 4, path: "/contact", name: "Contact" },
//     { id: 5, path: "/blog", name: "Blog" },
//   ]);

//   // Icon links with useState
//   const [iconLinks, setIconLinks] = useState([
//     {
//       id: 1,
//       path: "/wishlist",
//       icon: <CiHeart className="fs-4 text-dark hover-icon" />,
//       label: "Wishlist",
//       badge: wishlistItems.length,  // Update this to reflect the number of items in wishlist
//     },
//     {
//       id: 2,
//       path: "/cart",
//       icon: <CiShoppingCart className="fs-4 text-dark hover-icon" />,
//       label: "Cart",
//       badge: totalItems, // Use the cart total items count
//     },
//     {
//       id: 3,
//       path: "/account",
//       icon: <CiUser className="fs-4 text-dark hover-icon" />,
//       label: "Account",
//       badge: null,
//     },
//   ]);

//   // Update icon links when totalItems changes
//   useEffect(() => {
//     setIconLinks(prev => 
//       prev.map(link => 
//         link.id === 2 ? { ...link, badge: totalItems } : link
//       )
//     );
//   }, [totalItems]);

//   useEffect(() => {
//     setIconLinks(prev =>
//       prev.map(link =>
//         link.id === 1 ? { ...link, badge: wishlistItems.length } : link  // Update badge for wishlist
//       )
//     );
//   }, [wishlistItems]);
  

//   const handleWishlistClick = (product) => {
//     if (isInWishlist(product.id)) {
//       removeFromWishlist(product.id);
//     } else {
//       addToWishlist(product);
//     }
//   };

//   useEffect(() => {
//     const handleScroll = () => {
//       const isScrolled = window.scrollY > 10;
//       if (isScrolled !== scrolled) {
//         setScrolled(isScrolled);
//       }
//     };

//     window.addEventListener("scroll", handleScroll);

//     return () => {
//       window.removeEventListener("scroll", handleScroll);
//     };
//   }, [scrolled]);

//   return (
//     // Rest of your MainHeader component remains the same
//     <header
//       className={`sticky-top bg-white ${scrolled ? styles.scrolled : ""}`}
//     >
//       <div className="container d-flex justify-content-between align-items-center py-3">
//         <Link to="/" className="navbar-brand">
//           <img src={logoImg} alt="Logo" height="80" />
//         </Link>
//         {/* Navigation - Desktop */}
//         <nav className="d-none d-md-flex">
//           <ul
//             className="d-flex m-0 p-0 gap-3 list-unstyled"
//             id={styles.navList}
//           >
//             {navLinks.map((el, index) => {
//               return (
//                 <li
//                   key={el.id}
//                   className="position-relative"
//                   id={styles.navItem}
//                 >
//                   <Link to={el.path} id={styles.navLink}>
//                     {el.name}
//                   </Link>
//                 </li>
//               );
//             })}
//           </ul>
//         </nav>

//         {isShopPage && (
//         <div
//           className={`d-none d-lg-block position-relative ${styles.searchContainer} ${searchFocused ? styles.focused : ""}`}
//         >
//           <input
//             className="rounded-pill"
//             id={styles.searchInput}
//             placeholder="Search products..."
//             onFocus={() => setSearchFocused(true)}
//             onBlur={() => setSearchFocused(false)}
//           />
//           <button
//             className="btn position-absolute end-0 top-0 bottom-0"
//             id={styles.searchButton}
//           >
//             <FaSearch />
//           </button>
//         </div>
//       )}

//       {/* Search - Mobile */}
//       {isShopPage && (
//         <div className="container d-block d-lg-none pb-3">
//           <div className="" id={styles.mobileSearchContainer}>
//             <input
//               className=""
//               id={styles.searchInput}
//               placeholder="Search products..."
//             />
//             <button className="" id={styles.searchButton}><FaSearch /></button>
//           </div>
//         </div>
//       )}
//         <div className="d-none d-md-flex">
//           <ul
//             className="d-flex list-unstyled m-0 p-0 gap-1"
//             id={styles.iconList}
//           >
//             {iconLinks.map((el, index) => {
//               return (
//                 <li
//                   key={el.id}
//                   className="position-relative"
//                   id={styles.iconItem}
//                 >
//                   <Link
//                     to={el.path}
//                     className="d-flex align-items-center justify-content-center position-relative"
//                     id={styles.iconLink}
//                     aria-label={el.label}
//                   >
//                     {el.icon}
//                     {el.badge !== null && el.badge > 0 && (
//                       <span
//                         id={styles.badge}
//                         className="badge bg-dark position-absolute d-flex align-items-center justify-content-center"
//                       >
//                         {el.badge}
//                       </span>
//                     )}
//                   </Link>
//                 </li>
//               );
//             })}
//           </ul>
//         </div>

//         <button
//           className="btn d-block d-md-none border-0"
//           onClick={openSideHeader}
//           aria-label="Open menu"
//         >
//           <IoIosMenu className="text-dark fs-1" />
//         </button>
//       </div>
//       {index && <SideHeader />}
//     </header>
//   );
// }

import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { CiHeart, CiShoppingCart, CiUser } from "react-icons/ci";
import { IoIosMenu } from "react-icons/io";
import { FaSearch } from "react-icons/fa";
import SideHeader from "../SideHeader";
import styles from "./index.module.css";
import { useCart, useSideHeader, useWishlist, useAuth } from "../../store";
import logoImg from "../../assets/Logo.png";

export default function MainHeader() {
  const { index, openSideHeader } = useSideHeader();
  const { totalItems } = useCart();
  const { wishlistItems } = useWishlist();
  const location = useLocation();
  const isShopPage = location.pathname === "/products";
  const [scrolled, setScrolled] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  // Check if user has admin role
  const isAdmin = user?.role === 'admin' || user?.isAdmin === true;

  const logoutAndRedirect = () => {
    logout();
    navigate("/register");
  };

  const [navLinks] = useState([
    { id: 1, path: "/", name: "Home" },
    { id: 2, path: "/products", name: "Shop" },
    { id: 3, path: "/about", name: "About" },
    { id: 4, path: "/contact", name: "Contact" },
    { id: 5, path: "/blog", name: "Blog" },
  ]);

  const [iconLinks, setIconLinks] = useState([
    {
      id: 1,
      path: "/wishlist",
      icon: <CiHeart className="fs-4 text-dark hover-icon" />,
      label: "Wishlist",
      badge: wishlistItems.length,
    },
    {
      id: 2,
      path: "/cart",
      icon: <CiShoppingCart className="fs-4 text-dark hover-icon" />,
      label: "Cart",
      badge: totalItems,
    },
    {
      id: 3,
      path: null,
      icon: (
        <div className="position-relative dropdown">
          <CiUser className="fs-4 text-dark hover-icon dropdown-toggle" 
                 data-bs-toggle="dropdown" 
                 aria-expanded="false" />
          {isAuthenticated && (
            <div
              className="dropdown-menu dropdown-menu-end p-3 bg-white shadow rounded"
              style={{ minWidth: "160px" }}
            >
              <p className="mb-2 fw-bold">Hello, {user?.username || "User"}</p>
              <button
                className="dropdown-item text-start w-100 p-1"
                onClick={() => navigate("/wishlist")}
              >
                Wishlist
              </button>
              <button
                className="dropdown-item text-start w-100 p-1"
                onClick={() => navigate("/orders")}
              >
                Orders
              </button>
              {isAdmin && (
                <button
                  className="dropdown-item text-start w-100 p-1"
                  onClick={() => navigate("/admin")}
                >
                  Admin
                </button>
              )}
              <hr className="my-2" />
              <button
                className="dropdown-item text-danger text-start w-100 p-1"
                onClick={logoutAndRedirect}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      ),
      label: "Account",
      badge: null,
    },
  ]);

  useEffect(() => {
    setIconLinks((prev) =>
      prev.map((link) =>
        link.id === 2 ? { ...link, badge: totalItems } : link
      )
    );
  }, [totalItems]);

  useEffect(() => {
    setIconLinks((prev) =>
      prev.map((link) =>
        link.id === 1 ? { ...link, badge: wishlistItems.length } : link
      )
    );
  }, [wishlistItems]);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrolled]);

  // Initialize cart on component mount
  useEffect(() => {
    const initializeApp = async () => {
      // Initialize cart data
      useCart.getState().initCart();
    };
    
    initializeApp();
  }, []);

  return (
    <header className={`sticky-top bg-white ${scrolled ? styles.scrolled : ""}`}>
      <div className="container d-flex justify-content-between align-items-center py-3">
        <Link to="/" className="navbar-brand">
          <img src={logoImg} alt="Logo" height="80" />
        </Link>

        {/* Navigation */}
        <nav className="d-none d-md-flex">
          <ul className="d-flex m-0 p-0 gap-3 list-unstyled" id={styles.navList}>
            {navLinks.map((el) => (
              <li key={el.id} id={styles.navItem}>
                <Link to={el.path} id={styles.navLink}>
                  {el.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {isShopPage && (
          <div
            className={`d-none d-lg-block position-relative ${styles.searchContainer} ${searchFocused ? styles.focused : ""}`}
          >
            <input
              className="rounded-pill"
              id={styles.searchInput}
              placeholder="Search products..."
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
            />
            <button className="btn position-absolute end-0 top-0 bottom-0" id={styles.searchButton}>
              <FaSearch />
            </button>
          </div>
        )}

        <div className="d-none d-md-flex">
          <ul className="d-flex list-unstyled m-0 p-0 gap-1" id={styles.iconList}>
            {iconLinks.map((el) => (
              <li key={el.id} className="position-relative" id={styles.iconItem}>
                {el.path ? (
                  <Link to={el.path} id={styles.iconLink}>
                    {el.icon}
                    {el.badge !== null && el.badge > 0 && (
                      <span id={styles.badge} className="badge bg-dark position-absolute">
                        {el.badge}
                      </span>
                    )}
                  </Link>
                ) : (
                  <div id={styles.iconLink}>
                    {el.icon}
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>

        <button
          className="btn d-block d-md-none border-0"
          onClick={openSideHeader}
          aria-label="Open menu"
        >
          <IoIosMenu className="text-dark fs-1" />
        </button>
      </div>

      {index && <SideHeader />}
    </header>
  );
}