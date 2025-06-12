"use client";
import { useEffect, useRef, useState } from "react";
import Menu from "../menu/page";
import axios from "axios";
import Image from "next/image";
import { motion } from "framer-motion";
import { useCart } from "../cart/CartContext";
import { useAuth } from "../context/AuthContext";



export default function Shop() {
  const { isLoggedIn } = useAuth();
  console.log("isLoggedIn:", isLoggedIn);
  const { addToCart } = useCart();

  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("");
  const [sortOrder, setsortOrder] = useState("");
  const [products, setProducts] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const modalRef =  useRef(null);

  const handleQuicklook = async(product)=>{
    setSelectedProduct(product);
    setTimeout(async()=>{
      const { Modal } = await import("bootstrap/dist/js/bootstrap.bundle.min.js");
      new Modal(modalRef.current).show();
    },0)
  };

  useEffect(() => {
    setLoading(true);
    const url = category
      ? `https://fakestoreapi.com/products/category/${category}`
      : `https://fakestoreapi.com/products`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        let sortedData = [...data];
        if (sortOrder) {
          const [field, order] = sortOrder.split("-");
          sortedData.sort((a, b) => {
            if (field === "name") {
              return order === "asc"
                ? a.title.localeCompare(b.title)
                : b.title.localeCompare(a.title);
            }
            if (field === "price") {
              return order === "asc" ? a.price - b.price : b.price - a.price;
            }
            if (field === "rating") {
              return order === "asc"
                ? a.rating.rate - b.rating.rate
                : b.rating.rate - a.rating.rate;
            }
          });
        }
        setProducts(sortedData);
        setSelectedProduct(null);
        setLoading(false);
      });
  }, [category, sortOrder]);



  function AddtoCartClick(e) {
    axios
      .get(`https://fakestoreapi.com/products/${e.currentTarget.name}`)
      .then((res) => {
        addToCart(res.data);
        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 2000);
      });
  }

  // ✅ Check for login first
  if (!isLoggedIn) {
    return (
      <div className="container">
        <div className="alert alert-danger" role="alert">
          Please <a href="/signin" className="alert-link">sign in</a> to access the shop.
        </div>
      </div>
    );
  }

  // ✅ Authenticated user content
  return (
    <div className="container">
      {showAlert && (
        <div className="alert alert-success alert-dismissible fade show" role="alert">
          <span className="bi bi-cart-dash-fill"> Product added to cart successfully!</span>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"
            onClick={() => setShowAlert(false)}
          ></button>
        </div>
      )}

      <div className="row">
        <div className="col-12 col-sm-3 col-md-2">
          <Menu
            onCategoryChange={(category) => setCategory(category)}
            onSortChange={(sortOrder) => setsortOrder(sortOrder)}
          />
        </div>

        <div className="col-12 col-sm-9 col-md-10">
          <motion.div
            className="row shadow rounded justify-content-center"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            <div
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                const droppedData = e.dataTransfer.getData("product");
                if (droppedData) {
                  const product = JSON.parse(droppedData);
                  addToCart(product);
                  setShowAlert(true);
                  setTimeout(() => setShowAlert(false), 2000);
                }
              }}
              className="border border-primary rounded p-3 m-4 text-center bg-light"
            >
              🛒 Drag products here to add to cart
            </div>

            {loading
              ? Array.from({ length: 8 }).map((_, index) => (
                  <div key={index} className="card col-12 col-sm-6 col-md-4 col-lg-3 m-3 p-3">
                    <div className="placeholder-glow">
                      <div className="bg-secondary placeholder w-100 mb-3" style={{ height: "150px" }}></div>
                      <span className="placeholder col-8 mb-2"></span>
                      <span className="placeholder col-6 mb-2"></span>
                      <span className="placeholder col-10 mb-2"></span>
                      <div className="d-flex justify-content-between">
                        <span className="placeholder col-5"></span>
                        <span className="placeholder col-5"></span>
                      </div>
                    </div>
                  </div>
                ))
              : products.map((product) => (
                  <div
                    key={product.id}
                    className="card col-12 col-sm-6 col-md-4 col-lg-3 m-3"
                    draggable
                    onDragStart={(e) => e.dataTransfer.setData("product", JSON.stringify(product))}
                  >
                    <div className="card-header text-center">
                      <Image
                        className="img-fluid"
                        alt="product"
                        src={product.image}
                        width="150"
                        height="150"
                      />
                      <div className="text-body-tertiary">{product.category}</div>
                    </div>
                    <div className="card-body">
                      <div className="card-title fw-bold">{product.title}</div>
                      <div className="text-sm text-yellow-600 mt-2">
                        {"⭐".repeat(Math.round(product.rating.rate))}
                        <span className="text-gray-600 ml-1">
                          ({product.rating.rate} / 5 from {product.rating.count} reviews)
                        </span>
                      </div>
                      <div className="fw-bold">
                        <span>&#8377;</span>
                        {product.price}
                      </div>
                    </div>
                    <div className="card-footer">
                      <button className="btn btn-primary me-1" name={product.id} onClick={AddtoCartClick}>
                        Add to Cart
                      </button>
                      <button
                        className="btn btn-outline-success"
                        onClick={() => handleQuicklook(product)}
                      >
                        <span className="bi bi-eye"></span>
                      </button>
                    </div>
                  </div>
                ))}
          </motion.div>
        </div>
      </div>

      {/* Modal */}
      {selectedProduct && (
        <div className="modal fade p-2" ref={modalRef} id="Quicklook" tabIndex="-1">
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{selectedProduct.title}</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body d-flex flex-wrap">
                <div className="col-md-5 text-center">
                  <Image
                    src={selectedProduct.image}
                    alt={selectedProduct.title}
                    className="img-fluid"
                    width={300}
                    height={300}
                  />
                </div>
                <div className="col-md-7 px-4">
                  <p className="text-muted">{selectedProduct.category}</p>
                  <p>{selectedProduct.description}</p>
                  <div className="fw-bold text-success h5 mb-3">₹{selectedProduct.price}</div>
                  <div className="mb-2">
                    {"⭐".repeat(Math.round(selectedProduct.rating.rate))} ({selectedProduct.rating.count} reviews)
                  </div>
                  <button
                    className="btn btn-primary"
                    onClick={() => {
                      addToCart(selectedProduct);
                      setShowAlert(true);
                      setTimeout(() => setShowAlert(false), 2000);
                    }}
                    data-bs-dismiss="modal"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
