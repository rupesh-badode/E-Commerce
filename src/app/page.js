import Image from "next/image"


export default function Homepage(){
    return(
        <div>
            <div id="carouselExample" className="carousel slide">
            <div className="carousel-inner">
                <div className="carousel-item active">
                <Image src="/slide-2.jpg" fill alt="carousel" className="d-block w-100" />
                <div className="carousel-caption d-none d-md-block text-dark">
                    <div className="fs-1 fw-bold">Super Market for fresh Products</div>
                    <p className="fs-6">Free Shipping  to first-time Customers Only ,After Promotion and Discount</p>
                </div>
                </div>
                <div className="carousel-item">
                <Image src="/slide-3.jpg" fill alt="img" className="d-block w-100" />
                </div>
                <div className="carousel-item">
                <Image src="/slide-1.jpg" fill  alt='carasil' className="d-block w-100"/>
                </div>
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>
            </div>
            <br></br>
            <div className="p-3 m-3">
                <h3>Featured Categoris</h3>
                <hr/>
                <div className="row">
                    <div className="col-6" >
                        <Image className="img-fluid rounded" alt="products" src="/pexels-cottonbro-4068314.jpg" width={200} height={200}/>
                    </div>
                    <div className="col-6">
                        <Image className="img-fluid rounded" alt="carasul" src="/pexels-ivan-samkov-7621020.jpg" width={200} height={200} />
                    </div>
                </div>
            </div>
        </div>
    )
}