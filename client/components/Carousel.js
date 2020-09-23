import React from 'react'

const Carousel = props => {
  return (
    <div
      id="carouselExampleCaptions"
      className="carousel slide carousel-images"
      data-ride="carousel"
    >
      <ol className="carousel-indicators">
        <li
          data-target="#carouselExampleCaptions"
          data-slide-to="0"
          className="active"
        />
        <li data-target="#carouselExampleCaptions" data-slide-to="1" />
        <li data-target="#carouselExampleCaptions" data-slide-to="2" />
      </ol>
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img
            src="https://static.scientificamerican.com/sciam/cache/file/6BCD79A7-9598-4733-94A5766F26FB838A_source.jpg?w=590&h=800&F73981BB-84FA-4F1E-9E5A31218470A525"
            className="d-block w-100"
            alt="..."
          />
          <div className="carousel-caption d-none d-md-block">
            <h5>Seed 1</h5>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </div>
        </div>
        <div className="carousel-item">
          <img
            src="https://earthjustice.org/sites/default/files/styles/image_800x600/public/seeds_shutterstock_JoHo.jpg?itok=YXAIheex"
            className="d-block w-100"
            alt="..."
          />
          <div className="carousel-caption d-none d-md-block">
            <h5>Seed 2</h5>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </div>
        </div>
        <div className="carousel-item">
          <img
            src="https://api.time.com/wp-content/uploads/2014/07/five-seeds.jpg?w=800&quality=85"
            className="d-block w-100"
            alt="..."
          />
          <div className="carousel-caption d-none d-md-block">
            <h5>Seed 3</h5>
            <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur.
            </p>
          </div>
        </div>
      </div>
      <a
        className="carousel-control-prev"
        href="#carouselExampleCaptions"
        role="button"
        data-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true" />
        <span className="sr-only">Previous</span>
      </a>
      <a
        className="carousel-control-next"
        href="#carouselExampleCaptions"
        role="button"
        data-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true" />
        <span className="sr-only">Next</span>
      </a>
    </div>
  )
}

export default Carousel
