{loading ? (
    Array.from({ length: 8 }).map((_, index) => (
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
  ) : (
    products.map(product => (
      <div key={product.id} className="card col-12 col-sm-6 col-md-4 col-lg-3 m-3" draggable onDragStart={(e)=>e.dataTransfer.setData("product",JSON.stringify(product))}>
        
      </div>
    ))
  )}
  