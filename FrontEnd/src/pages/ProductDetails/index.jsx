import React, { useEffect, useState } from "react";
import Ring from "../../assets/Ring.png";
import styles from "./index.module.css";
import { useDetails } from "../../store";
import { ShopRepo } from "../../data/repo/ShopRepo";
import { useParams } from "react-router-dom";

export default function ProductDetails() {
  const params = useParams();
  const { productId } = params; // Get productId from URL parameters
  const [productDetails, setProductDetails] = useState();

  useEffect(() => {
    console.log("Params from URL:", params); // Log URL parameters
  }, []);

  useEffect(() => {
    if (productId) {
      ShopRepo.productDetails(productId).then((res) => {
        console.log("Product details response:", res.data);
        setProductDetails(res.data);
      });
    }
  }, [productId]);

  return (
    <div
      className="container col-12 d-flex flex-column flex-lg-row justify-content-between align-items-center"
      id={styles.productDetails}
    >
      <div className="col-12 col-lg-6" id={styles.Details}>
        <img
          src={
            productDetails?.image1 ||
            "https://www.mobismea.com/upload/iblock/2a0/2f5hleoupzrnz9o3b8elnbv82hxfh4ld/No%20Product%20Image%20Available.png"
          }
          alt=""
        />
      </div>
      <div
        className="col-12 col-lg-6 d-flex flex-column justify-content-between gap-5"
        id={styles.Details}
      >
        <div className="title">
          <h2 className="fw-bold">{productDetails?.title || "Unknown"}</h2>
          <span className="stars fs-3" id={styles.stars}>
            ★★★★☆
          </span>
        </div>
        <div className="price">
          <div className="d-flex align-items-center gap-2">
            <h5 className="fs-3 text-primary mb-0">
              ${productDetails?.discount_price || "100"}
            </h5>
            <del className="text-muted fs-5">${productDetails?.price || "200"}</del>
            <span className="badge bg-danger"></span>
          </div>
        </div>
        <p className="fs-5">{productDetails?.description || "loream"}</p>

        <div className="btn-group d-flex gap-5">
          <button className="btn btn-primary p-3">Add to Cart</button>
          <button className="btn btn-secondary p-3">Buy Now</button>
        </div>
      </div>
    </div>
  );
}
