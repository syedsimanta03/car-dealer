import React from 'react'

const Services = () => {
  return (
    <div className='py-5'>
      <section className='p-md-3 mx-md-5 text-lg-left'>
        <h2 className='text-center mb-5'>Our Services</h2>
        <div className='row text-center d-flex justify-content-center mt-5'>
          <div className='col-lg-3 col-md-6 mb-lg-0 mb-5'>
            <i className='fas fa-map-marker-alt fa-3x indigo-text mb-4 animated pulse infinite'></i>
            <h4 className='mb-4'>Easy To Get</h4>
            <p className='text-muted px-2 mb-lg-0'>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
          </div>
          <div className='col-lg-3 col-md-6 mb-lg-0 mb-5'>
            <i className='far fa-map pink-text fa-3x mb-4 animated pulse infinite'></i>
            <h4 className='mb-4'>Free Pick Up</h4>
            <p className='text-muted px-2 mb-lg-0'>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
          </div>
          <div className='col-lg-3 col-md-6 mb-md-0 mb-5'>
            <i className='fas fa-globe-africa fa-3x amber-text mb-4 animated pulse infinite'></i>
            <h4 className='mb-4'>World Best Cars</h4>
            <p className='text-muted px-2 mb-md-0'>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
          </div>
          <div className='col-lg-3 col-md-6 mb-md-0 mb-5'>
            <i className='fas fa-street-view fa-3x green-text mb-4 animated pulse infinite'></i>
            <h4 className='mb-4'>Best User Care</h4>
            <p className='text-muted px-2 mb-md-0'>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Services
