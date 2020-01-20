import React, { Component } from 'react';
import { notification, Icon } from 'antd';

const initState = {
  email: ''
};

class Map extends Component {
  state = { ...initState };

  //  Clear all state/fields values
  clearState = () => {
    this.setState({ ...initState });
  };
  //  Form validation
  validateForm = () => {
    const { email } = this.state;
    const isInvalid = !email;
    return isInvalid;
  };

  //  Get the typed values
  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };
  render() {
    const { email } = this.state;
    const openNotification = () => {
     this.clearState();
      notification.open({
        message: 'Successfully Sent!',
        description: 'We will get back to you soon!',
        icon: <Icon type='smile' theme='twoTone' />
      });
    };

    return (
      <div>
        {/*Section: Content*/}
        <section className='contact-section dark-grey-text'>
          {/* Form with header */}
          <div className='card'>
            {/* Grid row */}
            <div className='row'>
              {/* Grid column */}
              <div className='col-lg-8'>
                <div className='card-body form m-5'>
                  {/*Google map*/}
                  <div
                    id='map-container-google-1'
                    className='z-depth-1 map-container mb-5'
                  >
                    <iframe
                      src='https://maps.google.com/maps?q=manhatan&t=&z=13&ie=UTF8&iwloc=&output=embed'
                      frameBorder={0}
                      style={{ border: 0 }}
                      allowFullScreen
                    />
                  </div>
                  {/*Google Maps*/}
                  {/* Header */}
                  <h3 className='font-weight-bold dark-grey-text mt-4'>
                    <i className='fas fa-envelope pr-2 mr-1' />
                    Write to us:
                  </h3>
                  {/* Grid row */}
                  <div className='row'>
                    {/* Grid column */}
                    <div className='col-md-6'>
                      <div className='md-form mb-0'>
                        <input
                          type='text'
                          id='form-contact-name'
                          className='form-control'
                        />
                        <label htmlFor='form-contact-name'>
                          Your name
                        </label>
                      </div>
                    </div>
                    {/* Grid column */}
                    {/* Grid column */}
                    <div className='col-md-6'>
                      <div className='md-form mb-0'>
                        <input
                          type='email'
                          required
                          name='email'
                          id='form-contact-email'
                          className='form-control'
                          value={email}
                          onChange={this.handleChange}
                        />
                        <label htmlFor='form-contact-email' >
                          Your email
                        </label>
                      </div>
                    </div>
                    {/* Grid column */}
                  </div>
                  {/* Grid row */}
                  {/* Grid row */}
                  <div className='row'>
                    {/* Grid column */}
                    <div className='col-md-6'>
                      <div className='md-form mb-0'>
                        <input
                          type='text'
                          id='form-contact-phone'
                          className='form-control'
                        />
                        <label htmlFor='form-contact-phone' >
                          Your phone
                        </label>
                      </div>
                    </div>
                    {/* Grid column */}
                    {/* Grid column */}
                    <div className='col-md-6'>
                      <div className='md-form mb-0'>
                        <input
                          type='text'
                          id='form-contact-company'
                          className='form-control'
                        />
                        <label htmlFor='form-contact-company' >
                          Your company
                        </label>
                      </div>
                    </div>
                    {/* Grid column */}
                  </div>
                  {/* Grid row */}
                  {/* Grid row */}
                  <div className='row'>
                    {/* Grid column */}
                    <div className='col-md-12'>
                      <div className='md-form mb-0'>
                        <textarea
                          id='form-contact-message'
                          className='form-control md-textarea'
                          rows={3}
                          defaultValue={''}
                        />
                        <label htmlFor='form-contact-message'>
                          Your message
                        </label>
                        <button
                          onClick={openNotification}
                          type='button'
                          className='btn btn-elegant'
                          disabled={this.validateForm()}
                        >
                          Submit
                        </button>
                      </div>
                    </div>
                    {/* Grid column */}
                  </div>
                  {/* Grid row */}
                </div>
              </div>
              {/* Grid column */}
              {/* Grid column */}
              <div className='col-lg-4 mdb-color darken-2'>
                <div className='card-body contact text-center h-100 white-text'>
                  <h3 className='font-weight-bold my-4 pb-2 text-white'>
                    Contact information
                  </h3>
                  <ul className='text-lg-left list-unstyled ml-4'>
                    <li>
                      <p>
                        <i className='fas fa-map-marker-alt pr-2' />
                        Manhattan, 1920TH
                      </p>
                    </li>
                    <li>
                      <p>
                        <i className='fas fa-phone pr-2' />
                        +8801736781616
                      </p>
                    </li>
                    <li>
                      <p>
                        <i className='fas fa-envelope pr-2' />
                        syed.simanta06@gmail.com
                      </p>
                    </li>
                  </ul>
                  <hr className='hr-light my-4' />
                  <ul className='list-inline text-center list-unstyled'>
                    <li className='list-inline-item'>
                      <a className='p-2 fa-lg tw-ic'>
                        <i className='fab fa-twitter' />
                      </a>
                    </li>
                    <li className='list-inline-item'>
                      <a className='p-2 fa-lg li-ic'>
                        <i className='fab fa-linkedin-in'> </i>
                      </a>
                    </li>
                    <li className='list-inline-item'>
                      <a className='p-2 fa-lg ins-ic'>
                        <i className='fab fa-instagram'> </i>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              {/* Grid column */}
            </div>
            {/* Grid row */}
          </div>
          {/* Form with header */}
        </section>
        {/*Section: Content*/}
      </div>
    );
  }
}

export default Map;
