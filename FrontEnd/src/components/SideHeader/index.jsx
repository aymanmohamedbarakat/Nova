// import React from "react";
// import styles from "../MainHeader/index.module.css";
// import { useSideHeader } from "../../store";

// export default function SideHeader() {
//   const { closeSideHeader } = useSideHeader();
//   return (
//     <div className="overlay d-flex d-md-none" id={styles.overlay} onClick={closeSideHeader}>
//       <div id={styles.content} onClick={(e) => e.stopPropagation()}></div>
//     </div>
//   );
// }


import React from "react";
import styles from "../MainHeader/index.module.css";
import { useSideHeader } from "../../store";
import { Link } from "react-router-dom";
import { CiHeart, CiShoppingCart, CiUser } from "react-icons/ci";
import { useCart, useWishlist, useAuth } from "../../store";

export default function SideHeader() {
  const { closeSideHeader } = useSideHeader();
  const { totalItems } = useCart();
  const { wishlistItems } = useWishlist();
  const { isAuthenticated, user, logout } = useAuth();
  
  // Check if user has admin role
  const isAdmin = user?.role === 'admin' || user?.isAdmin === true;
  
  const navLinks = [
    { id: 1, path: "/", name: "Home" },
    { id: 2, path: "/products", name: "Shop" },
    { id: 3, path: "/about", name: "About" },
    { id: 4, path: "/contact", name: "Contact" },
    { id: 5, path: "/blog", name: "Blog" },
  ];
  
  const iconLinks = [
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
  ];

  return (
    <div className="overlay d-flex d-md-none" id={styles.overlay} onClick={closeSideHeader}>
      <div id={styles.content} onClick={(e) => e.stopPropagation()}>
        <div className="p-4">
          <div className="d-flex justify-content-end mb-4">
            <button 
              className="btn-close" 
              onClick={closeSideHeader}
              aria-label="Close menu"
            ></button>
          </div>
          
          {/* Mobile Navigation Links */}
          <nav className="mb-4">
            <ul className="list-unstyled">
              {navLinks.map((link) => (
                <li key={link.id} className="mb-3">
                  <Link 
                    to={link.path} 
                    className="text-decoration-none text-dark fs-5"
                    onClick={closeSideHeader}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          
          {/* Icon Links */}
          <div className="d-flex flex-column gap-3 mb-4">
            {iconLinks.map((link) => (
              <Link 
                key={link.id}
                to={link.path}
                className="d-flex align-items-center text-decoration-none text-dark"
                onClick={closeSideHeader}
              >
                {link.icon}
                <span className="ms-2">{link.label}</span>
                {link.badge > 0 && (
                  <span className="badge bg-dark ms-2">{link.badge}</span>
                )}
              </Link>
            ))}
            
            {/* Account Section */}
            {isAuthenticated ? (
              <div className="mt-3">
                <div className="d-flex align-items-center mb-2">
                  <CiUser className="fs-4 text-dark" />
                  <span className="ms-2 fw-bold">{user?.name || "User"}</span>
                </div>
                <div className="ms-4 d-flex flex-column gap-2">
                  <Link 
                    to="/orders" 
                    className="text-decoration-none text-dark"
                    onClick={closeSideHeader}
                  >
                    Orders
                  </Link>
                  {isAdmin && (
                    <Link 
                      to="/admin" 
                      className="text-decoration-none text-dark"
                      onClick={closeSideHeader}
                    >
                      Admin
                    </Link>
                  )}
                  <button 
                    className="btn btn-link text-danger p-0 text-decoration-none text-start"
                    onClick={() => {
                      logout();
                      closeSideHeader();
                    }}
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <Link 
                to="/register" 
                className="d-flex align-items-center text-decoration-none text-dark"
                onClick={closeSideHeader}
              >
                <CiUser className="fs-4 text-dark" />
                <span className="ms-2">Login / Register</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}