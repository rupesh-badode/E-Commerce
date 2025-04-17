import Image from "next/image";

export default function Homepage() {
  return (
    <div>
      <div
        id="carouselExample"
        className="carousel slide"
        data-bs-ride="carousel"
        data-bs-interval="3000"
      >
        <div className="carousel-inner">
          <div className="carousel-item active">
            <div style={{ position: "relative", height: "500px" }}>
              <Image
                src="/slide-2.jpg"
                alt="Slide 1"
                fill
                style={{ objectFit: "cover" }}
              />
              <div className="carousel-caption d-none d-md-block text-dark">
                <div className="fs-1 fw-bold">Super Market for fresh Products</div>
                <p className="fs-6">
                  Free Shipping to first-time Customers Only, After Promotion and Discount
                </p>
              </div>
            </div>
          </div>
          <div className="carousel-item">
            <div style={{ position: "relative", height: "500px" }}>
              <Image
                src="/slide-3.jpg"
                alt="Slide 2"
                fill
                style={{ objectFit: "cover" }}
              />
            </div>
          </div>
          <div className="carousel-item">
            <div style={{ position: "relative", height: "500px" }}>
              <Image
                src="/slide-1.jpg"
                alt="Slide 3"
                fill
                style={{ objectFit: "cover" }}
              />
            </div>
          </div>
        </div>

        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExample"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true" />
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExample"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true" />
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
}
