import React from 'react';

export default function Carousal() {
  return (
    <div
      id="carouselExampleFade"
      className="carousel slide carousel-fade"
      data-bs-ride="carousel"
      style={{ height: '50vh', width: '100%' }}
    >
      <div className="carousel-inner" style={{ height: '100%' }}>
        <div className="carousel-item active" style={{ height: '100%' }}>
          <img
            src="https://plus.unsplash.com/premium_photo-1661877360520-f70603f7c0d8?q=80&w=1934&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            className="d-block w-100 h-100"
            style={{ objectFit: 'cover' }}
            alt="Camping Gear"
          />
        </div>


        <div className="carousel-item" style={{ height: '100%' }}>
          <img
            src="car1.avif"
            className="d-block w-100 h-100"
            style={{ objectFit: 'cover' }}
            alt="Rental Car"
          />
        </div>

        <div className="carousel-item" style={{ height: '100%' }}>
          <img
            src="https://images.unsplash.com/photo-1636115305669-9096bffe87fd?q=80&w=1772&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            className="d-block w-100 h-100"
            style={{ objectFit: 'cover' }}
            alt="Equipment and Tools"
          />
        </div>

        <div className="carousel-item" style={{ height: '100%' }}>
          <img
            src="https://images.unsplash.com/photo-1620912738725-1e5f0e49e97d?q=80&w=1778&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            className="d-block w-100 h-100"
            style={{ objectFit: 'cover' }}
            alt="Clothing and Accessories"
          />
        </div>
        <div className="carousel-item" style={{ height: '100%' }}>
          <img
            src="https://plus.unsplash.com/premium_photo-1661645433820-24c8604e4db5?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            className="d-block w-100 h-100"
            style={{ objectFit: 'cover' }}
            alt="Jewelry and Accessories"
          />
        </div>

      </div>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleFade"
        data-bs-slide="prev"
      >
        <span
          className="carousel-control-prev-icon"
          aria-hidden="true"
        ></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleFade"
        data-bs-slide="next"
      >
        <span
          className="carousel-control-next-icon"
          aria-hidden="true"
        ></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
}
