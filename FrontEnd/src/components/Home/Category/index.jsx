import React, { useState } from "react";
import styles from "./index.module.css";
import menCategoryImg from "../../../assets/men.jpg";
import womenCategoryImg from "../../../assets/women.jpg";
import childrenCategoryImg from "../../../assets/children.jpg";
import { Link } from "react-router-dom";

export default function Category() {
  const [cateSec, setCateSec] = useState([
    { id: 1, title: "Men's Collection", image: menCategoryImg },
    { id: 2, title: "Women's Collection", image: womenCategoryImg },
    { id: 3, title: "Children's Collection", image: childrenCategoryImg },
  ]);

  return (
    <div id={styles.Category} className="py-4 py-md-5">
      <div id={styles.title} className="mb-4">
        <div className={`${styles.leafContainer} px-2`}>
          <div className={styles.line}></div>
          <div className={styles.leaf}>
            <h2 className="fs-4 fs-md-5">Categories</h2>
          </div>
          <div className={styles.line}></div>
        </div>
      </div>

      <div className="container" id={styles.CategorySections}>
        <div className="row justify-content-center g-4">
          {cateSec.map((el) => (
            <div key={el.id} className="col-12 col-sm-6 col-lg-4">
              <div className={styles.imageContainer}>
                <img
                  src={el.image}
                  alt={`${el.title} category`}
                  className="img-fluid"
                />
                <div className={styles.overlay}>
                  <h3 className={`${styles.categoryTitle} fs-5 fs-md-4`}>
                    {el.title}
                  </h3>
                  <Link to={"/products"}>
                    <button className={`${styles.shopButton} px-3 py-2`}>
                      Shop Now
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
