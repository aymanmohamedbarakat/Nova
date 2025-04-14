import React, { useState } from "react";
import styles from "./index.module.css";
import { FaLeaf } from "react-icons/fa";
import slide1 from "../../../assets/001-001-01632-image-2_600x-ezgif.com-webp-to-jpg-converter-removebg-preview 1.png";
import slide2 from "../../../assets/50774-E.set-jpeg-ezgif.com-webp-to-jpg-converter-removebg-preview 1.png";
import slide3 from "../../../assets/CONFIG.4600764-jpeg-ezgif.com-webp-to-jpg-converter-removebg-preview 1.png";
import slide4 from "../../../assets/R612218W-jpeg-ezgif.com-webp-to-jpg-converter-removebg-preview 1.png";
import skinCareImg1 from "../../../assets/img1-middle-makali1.jpg";
import skinCareImg2 from "../../../assets/img2-middle-makali1.jpg";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
// import 'swiper/css/navigation';
import "swiper/css/autoplay";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function NewArrivals() {
  const [arrival, setArrival] = useState([
    { 
      id: 1, 
      image: slide1,
      title: "Summer Collection",
      itemCount: 24
    },
    { 
      id: 2, 
      image: slide2,
      title: "Men's Essentials",
      itemCount: 18
    },
    { 
      id: 3, 
      image: slide3,
      title: "Women's Fashion",
      itemCount: 32
    },
    { 
      id: 4, 
      image: slide4,
      title: "Accessories",
      itemCount: 15
    },
    { 
      id: 5, 
      image: slide3,
      title: "New Arrivals",
      itemCount: 10
    },
  ]);

  return (
    <div className="col-12 d-flex flex-column justify-content-center gap-5 mb-5 mt-5">
      <div id={styles.title}>
        <h1 className="text-center">New Arrivals</h1>
        <p className="text-center">our new arrivals to our weekly lineup</p>
        <div className={styles.leafContainer}>
          <div className={styles.line}></div>
          <div className={styles.leaf}>
            <FaLeaf />
          </div>
          <div className={styles.line}></div>
        </div>
      </div>

      <div className="col-12 container">
      <div className={styles.categorySliderContainer}>
      <div className={styles.sliderHeader}>
        <h3 className={styles.sliderTitle}>Shop by Category</h3>
        <div className={styles.navigationButtons}>
          <button className={`${styles.navButton} category-prev`}>
            <ChevronLeft size={20} />
          </button>
          <button className={`${styles.navButton} category-next`}>
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
      
      <Swiper
        modules={[Autoplay, Navigation, Pagination]}
        spaceBetween={20}
        slidesPerView={4}
        navigation={{
          nextEl: '.category-next',
          prevEl: '.category-prev',
        }}
        pagination={{
          clickable: true,
          dynamicBullets: true
        }}
        loop={true}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true
        }}
        breakpoints={{
          320: { slidesPerView: 1, spaceBetween: 10 },
          576: { slidesPerView: 2, spaceBetween: 15 },
          992: { slidesPerView: 3, spaceBetween: 20 },
          1200: { slidesPerView: 4, spaceBetween: 20 },
        }}
        className={styles.categorySwiper}
      >
        {arrival.map((item) => (
          <SwiperSlide key={item.id}>
            <div className={styles.categoryCard}>
              <Link to={"/products"} className={styles.categoryLink}>
                <div className={styles.imageContainer}>
                  <img
                    src={item.image}
                    alt={item.title}
                    className={styles.categoryImage}
                  />
                  <div className={styles.overlay}>
                    <div className={styles.categoryInfo}>
                      <h4 className={styles.categoryTitle}>{item.title}</h4>
                      <span className={styles.itemCount}>{item.itemCount} items</span>
                      <div className={styles.viewButton}>
                        Shop Now
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
        <div className="col-12 d-flex justify-content-center align-items-center ">
          <div className="d-flex flex-column flex-md-row gap-3">
            <div
              id={styles.skinCare}
              className="position-relative d-flex align-items-center"
            >
              <img src={skinCareImg1} alt="" />
              <div className="position-absolute px-5" id={styles.content}>
                <h2 className="m-0">The Brighter way to better skin</h2>
                <p className="text-muted m-0">
                  4 Step skincare for Brighter, Smoother, Younger looking skin
                </p>
                <button className="btn btn-light ">
                  <Link className="nav-link" to={"/products"}>
                    buy now - <span>$193.77</span>
                  </Link>
                </button>
              </div>
            </div>
            <div
              id={styles.skinCare}
              className="position-relative d-flex align-items-center"
            >
              <img src={skinCareImg2} alt="" />
              <div className="position-absolute px-5" id={styles.content}>
                <h2>Luminous, Instar-Ready Skin In A Few Drops</h2>
                <p className="text-muted">
                  Contains 4% Niacinamide & 100% natural Hyaluronic acid
                </p>
                <button className="btn btn-light ">
                  <Link className="nav-link" to={"/products"}>
                    buy now - <span>$193.77</span>
                  </Link>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
