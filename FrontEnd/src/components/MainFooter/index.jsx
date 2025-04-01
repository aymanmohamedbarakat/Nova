import React, { useState } from "react";
import styles from "./index.module.css";

export default function MainFooter() {
  const [linkSections] = useState([
    {
      id: "company",
      title: "Our Company",
      links: [
        { id: 1, name: "About Us", url: "/about" },
        { id: 2, name: "Our Stores", url: "/stores" },
        { id: 3, name: "Contact Us", url: "/contact" },
        { id: 4, name: "Size Guide", url: "/size-guide" },
        { id: 5, name: "My Account", url: "/account" },
      ],
    },
    {
      id: "service",
      title: "Customer Service",
      links: [
        { id: 1, name: "Privacy Policy", url: "/privacy" },
        { id: 2, name: "Theme FAQs", url: "/faq" },
        { id: 3, name: "Refund Policy", url: "/return" },
        { id: 4, name: "Term & Conditions", url: "/terms" },
        { id: 5, name: "Store Locations", url: "/locations" },
      ],
    },
  ]);

  return (
    <footer className="bg-dark text-white py-5">
      <div className="container">
        <div className="row" id={styles.footer}>
          {/* Company intro and contact section */}
          <div className="col-lg-5 col-md-12 mb-4 mb-lg-0">
            <h1 className="display-5 fw-bold mb-3">NOVA</h1>
            <p className="fst-italic mb-4">
              Our mission is to provide an unparalleled customer experience in
              the fashion industry, ensuring exceptional quality and service in
              every interaction.
            </p>

            <div className="mt-4">
              <p className="mb-2">
                <span className="fw-bold me-2 text-white">Phone:</span>
                +222-1800-2628
              </p>
              <p className="mb-2">
                <span className="fw-bold me-2 text-white">Address:</span>
                502 New Design Str, Melbourne, Australia
              </p>
              <p className="mb-2">
                <span className="fw-bold me-2 text-white">Email:</span>
                novasite@gmail.com
              </p>
            </div>
          </div>

          {/* Right side column with links and newsletter */}
          <div className="col-lg-7 col-md-8 col-12">
            {/* Links sections */}
            <div className="row mb-4">
              {linkSections.map((el) => (
                <div
                  className="col-md-6 mb-4 mb-md-0"
                  key={el.id}
                  id={styles.links}
                >
                  <h3 className="text-light fw-bold mb-3">{el.title}</h3>
                  <ul className="list-unstyled">
                    {el.links.map((link, index) => (
                      <li className="mb-2" key={`${el.id}-link-${index}`}>
                        <a href={link.url} className="text-decoration-none">
                          {link.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Newsletter section */}
            <div className="mt-3" id={styles.Newsletter}>
              <div className="col-12">
                <div className="d-flex flex-column">
                  <div className="input-group" style={{ maxWidth: "100%" }}>
                    <input
                      type="email"
                      className="form-control bg-dark text-white border-secondary rounded-pill me-2"
                      placeholder="Enter your e-mail"
                      aria-label="Email for newsletter"
                    />
                    <button
                      className="btn btn-light rounded-pill px-4"
                      type="button"
                    >
                      Subscribe
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
