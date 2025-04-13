import React, { useEffect, useState } from "react";
import styles from "./index.module.css";
import ProductCard from "../../components/ProductCard";
import { Link } from "react-router-dom";
import {
  Home,
  ChevronRight,
  ShoppingBag,
  Filter,
  ChevronDown,
  Search,
} from "lucide-react";
import { LayoutGrid, SlidersHorizontal, List } from "lucide-react";
import { ShopRepo } from "../../data/repo/ShopRepo";
import { domain } from "../../store";

export default function ShopPage() {
  const [cats, setCats] = useState([
    { id: 1, name: "Male", products: 10 },
    { id: 2, name: "Female", products: 20 },
  ]);
  const [productsTotal, setProductsTotal] = useState(0);
  const [productPerPage, setProductPerPage] = useState(5);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  // Get Product From Api
  useEffect(() => {

    ShopRepo.products_index(activePage, productPerPage).then((result) => {
      console.log("API Result:", result);
      setAllProducts(result.data);
      setFilteredProducts(result.data);

      if (activePage === 1) {
        setProductsTotal(result.total);
      }

    });
  }, [activePage, productPerPage]);

  useEffect(() => {
    if (!Array.isArray(allProducts)) return;
    if (selectedCategories.length === 0) {
      setFilteredProducts(allProducts);
    } else {
      const filtered = allProducts.filter((product) =>
        selectedCategories.includes(product.category)
      );
      setFilteredProducts(filtered);
      setProductsTotal(filtered.length);
    }
  }, [selectedCategories, allProducts]);


  useEffect(() => {
    ShopRepo.getAllProducts().then((allProductsData) => {
      if (allProductsData && Array.isArray(allProductsData)) {
        const updatedCats = cats.map((el) => {
          const count = allProductsData.filter(
            (product) => product.category === el.name
          ).length;

          return {
            ...el,
            products: count,
          };
        });

        setCats(updatedCats);
      }
    });
  }, [allProducts]); 

  useEffect(() => {
    setActivePage(1);
  }, [productPerPage]);

  const handleCategoryChange = (categoryName) => {
    setSelectedCategories((disapleProduct) => {
      if (disapleProduct.includes(categoryName)) {
        return disapleProduct.filter((category) => category !== categoryName);
      } else {
        return [...disapleProduct, categoryName];
      }
    });
  };

  return (
    <>
      {/* Hero Section with Breadcrumb */}
      <div className="container-fluid bg-light py-4 mb-4">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-8">
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb mb-0">
                  <li className="breadcrumb-item">
                    <Link
                      to="/"
                      className="text-decoration-none d-flex align-items-center"
                    >
                      <Home size={14} className="me-1" />
                      <span>Home</span>
                    </Link>
                  </li>
                  <li className="breadcrumb-item active fw-medium d-flex align-items-center">
                    <ShoppingBag size={14} className="me-1" />
                    <span>Shop</span>
                  </li>
                  <li
                    className="breadcrumb-item active fw-medium d-flex align-items-center"
                    aria-current="page"
                  >
                    Collection
                  </li>
                </ol>
              </nav>
            </div>
            <div className="col-md-4 d-none d-md-block">
              <div className="text-end d-flex align-items-center justify-content-end">
                <Filter size={16} className="text-muted me-2" />
                <p className="text-muted mb-0">
                  Showing <span className="fw-medium">{productsTotal}</span>
                  products
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile CategoryFilter */}
      <div className="container d-md-none mb-4">
        <div className="card shadow-sm border-0">
          <div className="card-body p-0">
            <button
              className="btn w-100 d-flex justify-content-between align-items-center p-3"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#mobileCategoryFilters"
            >
              <span className="fw-medium">Filter by Category</span>
              <ChevronDown size={16} />
            </button>
            <div className="collapse border-top" id="mobileCategoryFilters">
              <div className="p-3">
                <div className="position-relative mb-3">
                  <input
                    type="search"
                    placeholder="Search categories"
                    className="form-control form-control-sm rounded-pill ps-4 pe-4"
                  />
                  <Search
                    size={14}
                    className="position-absolute top-50 start-0 translate-middle-y ms-2 text-muted"
                  />
                </div>
                <div className="row g-2">
                  {cats &&
                    Array.isArray(cats) &&
                    cats.map((el) => {
                      // Count products that match this category
                      const categoryProductCount =
                        allProducts && Array.isArray(allProducts)
                          ? allProducts.filter(
                              (product) => product.category === el.name
                            ).length
                          : 0;

                      return (
                        <div key={el.id} className="col-6">
                          <div className="form-check d-flex align-items-center gap-2">
                            <input
                              type="checkbox"
                              id={`mobile-cat-${el.id}`}
                              className="form-check-input"
                              checked={selectedCategories.includes(el.name)}
                              onChange={() => handleCategoryChange(el.name)}
                            />
                            <label
                              className="form-check-label d-flex align-items-center gap-2"
                              htmlFor={`mobile-cat-${el.id}`}
                            >
                              <span>{el.name}</span>
                              <span className="badge bg-secondary rounded-pill">
                                {categoryProductCount}
                              </span>
                            </label>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MainContentShop */}
      <div className="container mb-5">
        <div className="row g-4">
          {/* Sidebar - Categories */}
          <div className="col-md-3 d-none d-md-block">
            <div
              className="card shadow-sm border-0 sticky-md-top"
              id={styles.categoriesCard}
            >
              <div className="card-header bg-white border-0 py-3">
                <h5 className="mb-0 fw-bold">Categories</h5>
              </div>
              <div className="card-body">
                <div className="position-relative mb-3">
                  <input
                    type="search"
                    placeholder="Search categories"
                    className="form-control form-control-sm rounded-pill ps-4 pe-4"
                    value={searchQuery} 
                    onChange={(e) => setSearchQuery(e.target.value)} 
                  />
                  <i className="bi bi-search position-absolute top-50 start-0 translate-middle-y ms-2 text-muted small"></i>
                </div>
                <div className="d-flex flex-column gap-2 mt-3">
                  {cats &&
                    Array.isArray(cats) &&
                    cats.map((el) => {
                      const categoryProductCount = allProducts.filter(
                        (product) => product.category === el.name
                      ).length;

                      return (
                        <div
                          key={el.id}
                          className="form-check d-flex align-items-center"
                        >
                          <input
                            type="checkbox"
                            className="form-check-input me-2"
                            id={`cat-${el.id}`}
                            checked={selectedCategories.includes(el.name)}
                            onChange={() => handleCategoryChange(el.name)}
                          />
                          <label
                            className="form-check-label d-flex w-100 justify-content-between"
                            htmlFor={`cat-${el.id}`}
                          >
                            <span>{el.name}</span>
                            <span className="badge bg-light text-dark rounded-pill">
                              {categoryProductCount}
                            </span>
                          </label>
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
          </div>

          {/* ProductsSection */}
          <div className="col-md-9">
            {/* ProductsHeader */}
            <div className="card shadow-sm border-0 mb-4">
              <div className="card-body p-3 d-flex flex-wrap justify-content-between align-items-center gap-3">
                <div className="d-flex align-items-center">
                  <div className="me-3">
                    <p className="text-muted small d-block d-md-none">
                      Showing {productsTotal} products
                    </p>
                    <div className="d-flex align-items-center gap-2">
                      <span className="d-none d-md-inline fw-medium">
                        View:
                      </span>
                      <div className="btn-group" role="group">
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-secondary active d-flex align-items-center justify-content-center"
                          aria-label="Grid view"
                        >
                          <LayoutGrid size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* ProductsGrid */}
            <div className="row g-4">
              {filteredProducts &&
              Array.isArray(filteredProducts) &&
              filteredProducts.length > 0 ? (
                filteredProducts.map((el) => (
                  <ProductCard
                    key={el.id}
                    product_id={el.id}
                    title={el.title}
                    price={el.price}
                    discount_price={el.discount_price}
                    imgUrl={el.image1}
                  />
                ))
              ) : (
                <div className="col-12">
                  <div className="card shadow-sm border-0 py-5">
                    <div className="card-body text-center">
                      <i className="bi bi-search display-1 text-muted mb-3"></i>
                      <h3>No products found</h3>
                      <p className="text-muted">
                        Try adjusting your search or filter to find what you're
                        looking for.
                      </p>
                      <button
                        className="btn btn-outline-dark rounded-pill px-4 mt-2"
                        onClick={() => setSelectedCategories([])}
                      >
                        Clear all filters
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Pagination */}
            {/* Pagination */}
            {filteredProducts.length > 0 && (
              <div className="card shadow-sm border-0 mt-4">
                <div className="card-body p-3">
                  <div className="d-flex flex-column flex-md-row justify-content-between align-items-center gap-3">
                    <nav aria-label="Product pagination">
                      <ul className="pagination pagination-sm mb-0 flex-wrap justify-content-center">
                        {activePage > 1 && (
                          <li className="page-item">
                            <a
                              className="page-link rounded-start"
                              aria-label="Previous"
                              onClick={(e) => {
                                e.preventDefault();
                                setActivePage(activePage - 1);
                              }}
                              href="#"
                            >
                              <span aria-hidden="true">&laquo;</span>
                            </a>
                          </li>
                        )}

                        {/* استخدام Array.from بدلاً من Array().fill() */}
                        {Array.from({
                          // استخدم result.total مباشرة وليس طول المصفوفة
                          length: Math.max(
                            1,
                            Math.ceil(productsTotal / productPerPage)
                          ),
                        }).map((_, index) => (
                          <li
                            key={index}
                            className={`page-item ${
                              activePage === index + 1 ? "active" : ""
                            }`}
                          >
                            <a
                              className="page-link"
                              href="#"
                              onClick={(e) => {
                                e.preventDefault();
                                setActivePage(index + 1);
                              }}
                            >
                              {index + 1}
                            </a>
                          </li>
                        ))}

                        {activePage <
                          Math.ceil(productsTotal / productPerPage) && (
                          <li className="page-item">
                            <a
                              className="page-link rounded-end"
                              aria-label="Next"
                              onClick={(e) => {
                                e.preventDefault();
                                setActivePage(activePage + 1);
                              }}
                              href="#"
                            >
                              <span aria-hidden="true">&raquo;</span>
                            </a>
                          </li>
                        )}
                      </ul>
                    </nav>

                    {/* الجزء الخاص بعدد العناصر في الصفحة */}
                    <div className="d-flex align-items-center">
                      <label
                        htmlFor="items-per-page"
                        className="me-2 text-muted mb-0"
                      >
                        Show:
                      </label>
                      <select
                        id="items-per-page"
                        className={`form-select form-select-sm rounded-pill ${styles.select}`}
                        value={productPerPage}
                        onChange={(e) => {
                          const newPageSize = parseInt(e.target.value);
                          setProductPerPage(newPageSize);
                        }}
                      >
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="20">20</option>
                        <option value="50">50</option>
                        <option value="100">100</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
///////////////////////////////////////////////////////
