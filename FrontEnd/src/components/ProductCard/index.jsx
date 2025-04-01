import React from "react";
import { CiHeart, CiShoppingCart } from "react-icons/ci";
import { Link } from "react-router-dom";
import { useDetails } from "../../store";
import styles from "./index.module.css";

export default function ProductCard({
  id,
  title,
  price,
  imgUrl,
  discount_price,
}) {
  const { setActiveDetailsId } = useDetails();

  const handleShowDetails = (id) => {
    console.log("Product ID being passed:", id); // Log the product ID being passed
    if (!id) return; 
    setActiveDetailsId(id);
  };

  return (
    <div className="col-12 col-sm-6 col-lg-4">
      <div className={styles.productCard}>
        <div className={styles.imgContainer}>
          <img
            src={
              imgUrl ||
              "https://www.mobismea.com/upload/iblock/2a0/2f5hleoupzrnz9o3b8elnbv82hxfh4ld/No%20Product%20Image%20Available.png"
            }
            alt={title}
            className={styles.productImage}
          />
          <div className={styles.overlay}>
            <button className={styles.actionButton}>
              <CiShoppingCart />
            </button>
            <button className={styles.actionButton}>
              <CiHeart />
            </button>
          </div>

          {discount_price < price && <div className={styles.saleTag}>Sale</div>}
        </div>

        <div className={styles.productDetails}>
          <h5 className="mb-2 text-truncate">{title}</h5>
          <div className="d-flex align-items-center mb-3">
            <span className={styles.currentPrice}>${discount_price}</span>
            {discount_price < price && (
              <span className={styles.originalPrice}>${price}</span>
            )}
          </div>
          <Link
            to={`/shop/product/${id}`}
            onClick={() => handleShowDetails(id)}
          >
            <button className={`btn w-100 ${styles.ShowDetails}`}>
              Show Details
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
