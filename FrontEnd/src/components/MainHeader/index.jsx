import React, { useState, useEffect } from "react";
import logoImg from "../../assets/Logo.png";
import { Link } from "react-router-dom";
import { CiHeart, CiShoppingCart, CiUser } from "react-icons/ci";
import { IoIosMenu } from "react-icons/io";
import SideHeader from "../SideHeader";
import { useSideHeader } from "../../store";
import { FaSearch } from "react-icons/fa";
import styles from "./index.module.css";
import { Search, ShoppingCart } from "lucide-react";

export default function MainHeader() {
  const { index, openSideHeader } = useSideHeader();
  const [scrolled, setScrolled] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  // Navigation links with useState
  const [navLinks, setNavLinks] = useState([
    { id: 1, path: "/", name: "Home" },
    { id: 2, path: "/shop", name: "Shop" },
    { id: 3, path: "/about", name: "About" },
    { id: 4, path: "/contact", name: "Contact" },
    { id: 5, path: "/blog", name: "Blog" },
  ]);

  // Icon links with useState
  const [iconLinks, setIconLinks] = useState([
    {
      id: 1,
      path: "/wishlist",
      icon: <CiHeart className="fs-4 text-dark hover-icon" />,
      label: "Wishlist",
      badge: 0,
    },
    {
      id: 2,
      path: "/cart",
      icon: <CiShoppingCart className="fs-4 text-dark hover-icon" />,
      label: "Cart",
      badge: 2,
    },
    {
      id: 3,
      path: "/account",
      icon: <CiUser className="fs-4 text-dark hover-icon" />,
      label: "Account",
      badge: null,
    },
  ]);

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

  return (
    <header
      className={`sticky-top bg-white ${scrolled ? styles.scrolled : ""}`}
    >
      <div className="container d-flex justify-content-between align-items-center py-3">
        <Link to="/" className="navbar-brand">
          <img src={logoImg} alt="Logo" height="80" />
        </Link>
        {/* Navigation - Desktop */}
        <nav className="d-none d-md-flex">
          <ul
            className="d-flex m-0 p-0 gap-3 list-unstyled"
            id={styles.navList}
          >
            {navLinks.map((el, index) => {
              return (
                <li
                  key={el.id}
                  className="position-relative"
                  id={styles.navItem}
                >
                  <Link to={el.path} id={styles.navLink}>
                    {el.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Search - Desktop */}
        <div
          className={`d-none d-lg-block position-relative ${
            styles.searchContainer
          } ${searchFocused ? styles.focused : ""}`}
          id={``}
        >
          <input
            className=" rounded-pill"
            id={styles.searchInput}
            placeholder="Search products..."
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
          />
          <button
            className="btn position-absolute end-0 top-0 bottom-0"
            id={styles.searchButton}
          >
            <FaSearch />
          </button>
        </div>

        {/* Search - Mobile */}
        <div className="container d-block d-lg-none pb-3">
          <div className="" id={styles.mobileSearchContainer}>
            <input
              className=""
              id={styles.searchInput}
              placeholder="Search products..."
            />
            <button className="" id={styles.searchButton}><FaSearch /></button>
          </div>
        </div>

        <div className="d-none d-md-flex">
          <ul
            className="d-flex list-unstyled m-0 p-0 gap-1"
            id={styles.iconList}
          >
            {iconLinks.map((el, index) => {
              return (
                <li
                  key={el.id}
                  className="position-relative"
                  id={styles.iconItem}
                >
                  <Link
                    to={el.path}
                    className="d-flex align-items-center justify-content-center position-relative"
                    id={styles.iconLink}
                    aria-label={el.label}
                  >
                    {el.icon}
                    {el.badge !== null && el.badge > 0 && (
                      <span
                        id={styles.badge}
                        className="badge bg-dark position-absolute d-flex align-items-center justify-content-center"
                      >
                        {el.badge}
                      </span>
                    )}
                  </Link>
                </li>
              );
            })}
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

// import React, { useState, useEffect } from "react";
// import logoImg from "../../assets/Logo.png";
// import { Link } from "react-router-dom";
// import { CiHeart, CiShoppingCart, CiUser } from "react-icons/ci";
// import { IoIosMenu } from "react-icons/io";
// import SideHeader from "../SideHeader";
// import { useSideHeader } from "../../store";
// import { FaSearch } from "react-icons/fa";
// import styles from "./index.module.css";

// export default function MainHeader() {
//   const { index, openSideHeader } = useSideHeader();
//   const [scrolled, setScrolled] = useState(false);
//   const [searchFocused, setSearchFocused] = useState(false);

//   // Navigation links with useState
//   const [navLinks, setNavLinks] = useState([
//     { id: 1, path: "/", label: "Home" },
//     { id: 2, path: "/shop", label: "Shop" },
//     { id: 3, path: "/about", label: "About" },
//     { id: 4, path: "/contact", label: "Contact" },
//     { id: 5, path: "/blog", label: "Blog" },
//   ]);

//   // Icon links with useState
//   const [iconLinks, setIconLinks] = useState([
//     {
//       id: 1,
//       path: "/wishlist",
//       icon: <CiHeart className="fs-4" />,
//       label: "Wishlist",
//       badge: 0,
//     },
//     {
//       id: 2,
//       path: "/cart",
//       icon: <CiShoppingCart className="fs-4" />,
//       label: "Cart",
//       badge: 2,
//     },
//     {
//       id: 3,
//       path: "/account",
//       icon: <CiUser className="fs-4" />,
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
//       className={`sticky-top bg-white ${styles.header} ${
//         scrolled ? styles.scrolled : ""
//       }`}
//     >
//       <div className="container">
//         <div className="d-flex justify-content-between align-items-center py-3">
//           {/* Logo */}
//           <Link to="/" className={styles.logoContainer}>
//             <img src={logoImg} alt="Logo" className={styles.logo} />
//           </Link>

//           {/* Navigation - Desktop */}
//           <nav className="d-none d-md-flex">
//             <ul className={styles.navList}>
//               {navLinks.map((link) => (
//                 <li key={link.id} className={styles.navItem}>
//                   <Link
//                     to={link.path}
//                     className={styles.navLink}
//                   >
//                     {link.label}
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </nav>

//           {/* Search - Desktop */}
//           <div className={`d-none d-lg-block position-relative ${styles.searchContainer} ${searchFocused ? styles.focused : ''}`}>
//             <input
//               className={styles.searchInput}
//               placeholder="Search products..."
//               onFocus={() => setSearchFocused(true)}
//               onBlur={() => setSearchFocused(false)}
//             />
//             <button className={styles.searchButton}>
//               <FaSearch />
//             </button>
//           </div>

//           {/* Icons - Desktop */}
//           <div className="d-none d-md-flex">
//             <ul className={styles.iconList}>
//               {iconLinks.map((link) => (
//                 <li key={link.id} className={styles.iconItem}>
//                   <Link
//                     to={link.path}
//                     className={styles.iconLink}
//                     aria-label={link.label}
//                   >
//                     {link.icon}
//                     {link.badge !== null && link.badge > 0 && (
//                       <span className={styles.badge}>{link.badge}</span>
//                     )}
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* Mobile Menu Button */}
//           <button
//             className={styles.mobileMenuButton}
//             onClick={openSideHeader}
//             aria-label="Open menu"
//           >
//             <IoIosMenu className="fs-1" />
//           </button>
//         </div>
//       </div>

//       {/* Mobile Search Bar */}
//       <div className="container d-block d-lg-none pb-3">
//         <div className={styles.mobileSearchContainer}>
//           <input
//             className={styles.searchInput}
//             placeholder="Search products..."
//           />
//           <button className={styles.searchButton}>
//             <FaSearch />
//           </button>
//         </div>
//       </div>

//       {/* Mobile Sidebar */}
//       {index && <SideHeader />}
//     </header>
//   );
// }
