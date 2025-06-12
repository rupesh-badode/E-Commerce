import Image from "next/image";
import LandingPage from "./components/landingPage";

export default function Homepage() {
  return (
    <>

      {/* Carousel Section */}
    <section className="container-fluid px-0">
      <div id="mainCarousel" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner">
          {[
            {
              img: "slide-1.jpg",
              caption: "Latest Fashion Trends",
              sub: "Explore the 2025 collection",
            },
            {
              img: "slide-2.jpg",
              caption: "Smart Gadgets",
              sub: "Upgrade your tech lifestyle",
            },
            {
              img: "slide-3.jpg",
              caption: "Unbeatable Prices",
              sub: "Deals you can't resist",
            },
          ].map((item, i) => (
            <div key={i} className={`carousel-item ${i === 0 ? "active" : ""}`}>
              <img
                src={item.img}
                className="d-block w-100"
                alt={`Slide ${i + 1}`}
                style={{ maxHeight: "600px", objectFit: "cover" }}
              />
              <div className="carousel-caption d-none d-md-block bg-dark bg-opacity-50 rounded p-3">
                <h3>{item.caption}</h3>
                <p>{item.sub}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Controls */}
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#mainCarousel"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#mainCarousel"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </section>


      <LandingPage/>
    </>
  );
}
