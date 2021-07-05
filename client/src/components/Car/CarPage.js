import React from 'react';
import { withRouter } from 'react-router-dom';
import { Query } from 'react-apollo';
import { GET_CAR } from '../../queries';
import LikeCar from './LikeCar';
import Spinner from './../Spinner';
import { Icon } from 'antd';
import Map from '../Map/Map';
import LazyLoad from 'react-lazyload';
import Checkout from '../Stripe/Checkout.js';

const CarPage = ({ match }) => {
  //  const {_id} = match.params -> getting id from withRouter(match props)
  const { _id } = match.params;
  return (
    <Query query={GET_CAR} variables={{ _id }}>
      {({ data, loading, error }) => {
     // console.log(data);
      
        if (loading) return <Spinner />;
        if (error) return <div>Error</div>;
        const {
          name,
          price,
          imageUrl,
          category,
          description,
          features,
          likes,
          username,
          mileages,
          rating
        } = data.getCar;
        return (
          <React.Fragment>
            <div className='row d-flex flex-wrap'>
              {/* Section: Block Content */}
              <section>
                {/* Grid row */}
                <div className='row'>
                  {/* Grid column */}
                  <div className='col-lg-8 col-sm-12'>
                    <div className='view zoom z-depth-1 rounded mb-4'>
                      <a href='#!'>
                        <LazyLoad height={200} offset={100}>
                          <img
                            src={imageUrl}
                            className='img-fix'
                            alt='sample'
                          />
                        </LazyLoad>
                        <div className='mask rgba-black-gradient d-md-flex align-items-end'>
                          <div className='text-bottom white-text p-4'>
                            <span className='badge badge-primary'>
                              <i className='fas fa-star'>&nbsp;{rating}</i>
                            </span>

                            <h3 className='card-title text-white font-weight-bold mt-2 mb-1'>
                              {name}
                              <LikeCar _id={_id} />
                            </h3>
                          </div>
                        </div>
                      </a>
                    </div>
                  </div>
                  <div className='col-lg-4'>
                    <div className='pt-5 mb-5 z-depth-1'>
                      <h3 className='text-center mb-5'>how it works</h3>
                      <hr />
                      <section className='p-md-3 mx-md-5'>
                        <div className='row'>
                          <div className='col-12 mb-5'>
                            <h4 className='font-weight-bold mb-3'>
                              <i className='fas fa-car indigo-text pr-2' />{' '}
                              Browse Online
                            </h4>
                            <p className='text-muted'>
                              Explore thousands of vehicles with new inventory
                              added every week.
                            </p>
                          </div>
                          <div className='col-12 mb-5'>
                            <h4 className='font-weight-bold mb-3'>
                              <i className='fas fa-file-alt green-text pr-2' />{' '}
                              Make It Yours
                            </h4>
                            <p className='text-muted'>
                              Find the one, choose your financing, appraise your
                              trade and sign.
                            </p>
                          </div>
                          <div className='col-12 mb-5'>
                            <h4 className='font-weight-bold mb-3'>
                              <i className='fas fa-truck-loading amber-text pr-2' />{' '}
                              Get It Delivered
                            </h4>
                            <p className='text-muted'>
                              Take delivery right at home, make sure the car is
                              right for you and enjoy.
                            </p>
                          </div>
                        </div>
                      </section>
                    </div>
                  </div>
                </div>
                {/* Grid row */}
              </section>
              {/* Section: Block Content */}
            </div>
            {/* Grid column */}
            <div className='row'>
              <div className='col-6 mx-auto'>
                <div>
                  <div className='card p-3'>
                    <strong className='text-muted text-center my-4'>
                      AutoCar Finace Calculator
                    </strong>
                    <hr />
                    <div className='d-flex justify-content-between align-items-center'>
                      <p>Price</p>
                      <p>${price}</p>
                    </div>
                    <div className='d-flex justify-content-between align-items-center'>
                      <p>Shipping</p>
                      <p>$300</p>
                    </div>
                    <div className='d-flex justify-content-between align-items-center'>
                      <p>Total Payment**</p>
                      <p>${price + 300}</p>
                    </div>
                    <div className='d-flex justify-content-center align-items-center mt-3'>
                      <Checkout
                        amount={price + 300}
                        description={name}
                        image='https://img.icons8.com/bubbles/100/000000/car.png'
                        locale='auto'
                        name='www.autocar.com'
                        label='Buy This Car'
                      />
                    </div>
                    <div className='d-flex justify-content-center align-items-center mt-3'>
                      <Icon type='car' size='large' />
                      &nbsp;Car Owner:{' '}
                      {username?.charAt(0).toUpperCase() + username.slice(1)}
                    </div>
                    <div className='d-flex justify-content-center align-items-center mt-1'>
                      <Icon type='phone' size='large' />
                      &nbsp;Questions? (222) 524-1300
                    </div>
                  </div>
                </div>
              </div>
              <div className='col-lg-6 col-md-12'>
                <div>
                  {/*Section: Content*/}
                  <section className='dark-grey-text'>
                    {/* Grid row */}
                    <div className='row'>
                      <div className='mb-4'>
                        <div className='card z-depth-0 bordered border-light'>
                          <div className='card-body p-0'>
                            <div className='row mx-0'>
                              <div className='col-md-8 grey lighten-4 rounded-left pt-4'>
                                <h5 className='font-weight-bold'>Car Check</h5>
                                <p className='font-weight-light text-muted mb-1'>
                                  Lorem ipsum dolor sit amet consectetur
                                  adipisicing elit. Quibusdam vitae, fuga
                                  similique quos aperiam tenetur quo ut rerum
                                  debitis.
                                </p>
                              </div>
                              <div className='col-md-4 text-center pt-4'>
                                <p className='h1 font-weight-normal'>$0</p>
                                <p className='h5 font-weight-light text-muted mb-4'>
                                  Free To Check
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className='mb-4'>
                        <div className='card z-depth-0 bordered border-light'>
                          <div className='card-body p-0'>
                            <div className='row mx-0'>
                              <div className='col-md-8 grey lighten-4 rounded-left pt-4'>
                                <h5 className='font-weight-bold'>Drive Test</h5>
                                <p className='font-weight-light text-muted mb-0'>
                                  Lorem ipsum dolor sit amet consectetur
                                  adipisicing elit. Quibusdam vitae, fuga
                                  similique quos aperiam tenetur quo ut rerum
                                  debitis.
                                </p>
                              </div>
                              <div className='col-md-4 text-center pt-4'>
                                <p className='h1 font-weight-normal'>
                                  ${price / 1000}
                                  <span className='font-small grey-text'>
                                    {' '}
                                    / OneTime
                                  </span>
                                </p>
                                <p className='h5 font-weight-light text-muted mb-4'>
                                  Depends On Car
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* Grid row */}
                  </section>
                  {/*Section: Content*/}
                </div>
              </div>
            </div>
            {/* Car Details */}
            <div className='container-fluid pt-5 my-5 shadow-sm'>
              <section className='p-md-3 mx-md-5'>
                <div className='row d-flex justify-content-center'>
                  <div className='col-md-6 text-center green-text'>
                    <h2 className='font-weight-bold pb-4'>Description</h2>
                    <i className='fas fa-car fa-6x mb-2' />
                    <p className='grey-text pt-4'>{description}</p>
                  </div>
                </div>
                <hr className='mx-5' />
                <div className='row'>
                  <div className='col-md-12 mb-5'>
                    <div className='mt-3'>
                      <h4 className='font-weight-bold mb-3'>Car Features</h4>
                      <p
                        className='text-muted mb-0'
                        dangerouslySetInnerHTML={{ __html: features }}
                      ></p>
                    </div>
                  </div>
                  <h4 className='font-weight-bold mb-3 mx-auto'>Car Details</h4>
                  <div className='col-md-12 mb-5 center'>
                    <div className='mt-3 row'>
                      <p className='d-flex text-muted mb-lg-0'>
                        &nbsp;
                        <Icon
                          className='mt-1'
                          type='check-circle'
                          theme='twoTone'
                          twoToneColor='#52c41a'
                        />
                        &nbsp;
                        <p>Name: {name}</p>
                      </p>
                      <p className='d-flex text-muted mb-lg-0'>
                        &nbsp;
                        <Icon
                          className='mt-1'
                          type='check-circle'
                          theme='twoTone'
                          twoToneColor='#52c41a'
                        />
                        &nbsp;
                        <p>Price: ${price}</p>
                      </p>
                      <p className='d-flex text-muted mb-lg-0'>
                        &nbsp;
                        <Icon
                          className='mt-1'
                          type='check-circle'
                          theme='twoTone'
                          twoToneColor='#52c41a'
                        />
                        &nbsp;
                        <p>Category: {category}</p>
                      </p>
                      <p className='d-flex text-muted mb-lg-0'>
                        &nbsp;
                        <Icon
                          className='mt-1'
                          type='check-circle'
                          theme='twoTone'
                          twoToneColor='#52c41a'
                        />
                        &nbsp;
                        <p>Mileages: {mileages}</p>
                      </p>
                      <p className='d-flex text-muted mb-lg-0'>
                        &nbsp;
                        <Icon
                          className='mt-1'
                          type='check-circle'
                          theme='twoTone'
                          twoToneColor='#52c41a'
                        />
                        &nbsp;
                        <p>Likes: {likes}</p>
                      </p>
                      <p className='d-flex text-muted mb-lg-0'>
                        &nbsp;
                        <Icon
                          className='mt-1'
                          type='check-circle'
                          theme='twoTone'
                          twoToneColor='#52c41a'
                        />
                        &nbsp;
                        <p>Rating: {rating}</p>
                      </p>
                    </div>
                  </div>
                </div>
              </section>
            </div>
            {/* Car Details */}
            {/* Contact Details */}
            <div className='d-flex justify-content-around align-items-center bg-white border-top p-5'>
              <p className='d-flex text-muted mb-lg-0'>
                <Icon
                  className='mt-1'
                  type='notification'
                  theme='filled'
                  twoToneColor='#4285f4'
                />
                &nbsp;
                <p className='font-weight-bold'>OUR HELP CENTER</p>
              </p>
              <p className='d-flex text-muted mb-lg-0'>
                <Icon
                  className='mt-1'
                  type='phone'
                  theme='filled'
                  twoToneColor='#4285f4'
                />
                &nbsp;
                <p className='font-weight-bold'>(22) 524-1240</p>
              </p>
            </div>
            {/* Contact Details */}
            <Map />
          </React.Fragment>
        );
      }}
    </Query>
  );
};

export default withRouter(CarPage);
