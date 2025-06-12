"use client";
import { useEffect } from "react";
import AOS from "aos";
import 'aos/dist/aos.css';
import Image from "next/image";

export default function LandingPage() {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-dark text-white text-center py-5">
        <div className="container">
          <h1 className="display-4" data-aos="fade-up">Welcome to TrendKart</h1>
          <p className="lead" data-aos="fade-up" data-aos-delay="200">
            Discover the best deals on trending products!
          </p>
          <a href="/shop" className="btn btn-outline-light mt-3" data-aos="zoom-in" data-aos-delay="400">
            Shop Now
          </a>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-5 bg-light">
        <div className="container">
          <h2 className="text-center mb-4" data-aos="fade-up">Featured Products</h2>
          <div className="row">
            {[
              { name: "Smart Watch", price: "$49", img: "/watch.webp" },
              { name: "Wireless Headphones", price: "$79", img: "/headphon.jpg" },
              { name: "Casual Sneakers", price: "$59", img: "/snaker.jpeg"},
            ].map((product, idx) => (
              <div key={idx} className="col-md-4 mb-4" data-aos="fade-up" data-aos-delay={idx * 200}>
                <div className="card h-100 shadow-sm">
                  <Image src={product.img ? product.img : "/placeholder.jpg"} className="card-img-top" width="auto" height="auto" alt={product.name} />
                  <div className="card-body">
                    <h5 className="card-title">{product.name}</h5>
                    <p className="card-text">{product.price}</p>
                    <a href="/shop" className="btn btn-primary">Buy Now</a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary text-white text-center py-5">
        <h3 data-aos="zoom-in">Join Now & Get Exclusive Offers!</h3>
        <a href="/signup" className="btn btn-light mt-3" data-aos="fade-up">Sign Up</a>
      </section>
    </div>
  );
}
