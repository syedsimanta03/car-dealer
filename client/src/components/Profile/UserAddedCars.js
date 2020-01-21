import React from 'react';
import CKEditor from 'react-ckeditor-component';
import { Link } from 'react-router-dom';
import { Query, Mutation } from 'react-apollo';
import {
  GET_USER_CARS,
  DELETE_USER_CAR,
  GET_ALL_CARS,
  GET_CURRENT_USER,
  UPDATE_USER_CAR
} from '../../queries';
import Spinner from '../Spinner';
import LazyLoad from 'react-lazyload';
import { Modal, Icon, Empty, message } from 'antd';

const { confirm } = Modal;
const key = 'updatable';

class UserAddedCars extends React.Component {
  state = {
    _id: '',
    name: '',
    price: '',
    imageUrl: '',
    category: '',
    description: '',
    features: '',
    mileages: '',
    rating: '',
    modal: false,
    visible: 3
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };
  // Delete user's car
  handleDelete = deleteUserCar => {
    confirm({
      title: 'Do you want to delete this item?',
      content: 'Click on OK to delete',
      onOk() {
        deleteUserCar().then(({ data }) => {
          // console.log(data);
        });
      },
      onCancel() {}
    });
  };
  // Update/Edit carMessage
  openMessage = () => {
    message.loading({ content: 'Loading...', key });
    setTimeout(() => {
      message.success({
        content: 'Thanks For Updating The Car!',
        key,
        duration: 2
      });
    }, 1000);
  };

  handleSubmit = (event, updateUserCar) => {
    event.preventDefault();
    updateUserCar().then(({ data }) => {
      //console.log(data);
      this.closeModal();
      this.openMessage();
    });
  };

  // CKEditor
  handleEditorChange = event => {
    const newContent = event.editor.getData();
    this.setState({ features: newContent });
  };

  loadCar = car => {
    this.setState({ ...car, modal: true });
  };

  loadMore = () => {
    this.setState(prev => {
      return { visible: prev.visible + 3 };
    });
  };
  closeModal = () => {
    this.setState({ modal: false });
  };
  render() {
    // username is coming from Profile.js props
    const { username } = this.props;
    //console.log(props);

    const { modal } = this.state;

    return (
      <Query query={GET_USER_CARS} variables={{ username }}>
        {({ data, loading, error }) => {
          console.log(data);

          if (loading) return <Spinner />;
          if (error) return <div className='text-center'>Error</div>;
          // console.log(data);
          return (
            <div>
              <h3 class='text-center text-white text-uppercase aqua-gradient p-3 mb-5'>
                {username}'s added cars
                <strong className='badge badge-primary mb-1 ml-2'>
                  {data.getUserCars.length}
                </strong>
              </h3>
              {modal ? (
                <EditCarModal
                  handleSubmit={this.handleSubmit}
                  car={this.state}
                  closeModal={this.closeModal}
                  handleChange={this.handleChange}
                  id='edit'
                />
              ) : (
                <Empty
                  className='text-center mb-5'
                  description={<span>Nothing To Edit...</span>}
                />
              )}

              {!data.getUserCars.length && (
                <p>
                  <strong className='text-center'>
                    You have not added any Car yet
                  </strong>
                </p>
              )}
              {data.getUserCars
                .slice(0, this.state.visible)
                .map((car, index) => (
                  <React.Fragment>
                    <div key={car._id}>
                      <div className='row usercar mb-3 d-flex justify-content-between align-items-center'>
                        <div className='col-lg-4 col-md-12 col-sm-12'>
                          <LazyLoad>
                            <Link to={`/cars/${car._id}`}>
                              <div className='view view-cascade'>
                                <img
                                  className='card-img-top img-shadow'
                                  src={car.imageUrl}
                                  alt='Cardp'
                                  height='300'
                                  width='100'
                                />
                              </div>
                            </Link>
                          </LazyLoad>
                        </div>
                        <div className='col-lg-4 col-md-12 col-sm-12 mt-4 mt-lg-0'>
                          <p className='d-flex align-items-center'>
                            <Icon
                              className='mr-2'
                              type='right-circle'
                              theme='twoTone'
                              twoToneColor='#52c41a'
                            />
                            Car Name: {car.name}
                          </p>
                          <p className='d-flex align-items-center'>
                            <Icon
                              className='mr-2'
                              type='right-circle'
                              theme='twoTone'
                              twoToneColor='#52c41a'
                            />
                            Car Price: ${car.price}
                          </p>
                          <p className='d-flex align-items-center'>
                            <Icon
                              className='mr-2'
                              type='right-circle'
                              theme='twoTone'
                              twoToneColor='#52c41a'
                            />
                            Car Category: {car.category}
                          </p>
                          <p className='d-flex align-items-center'>
                            <Icon
                              className='mr-2'
                              type='right-circle'
                              theme='twoTone'
                              twoToneColor='#52c41a'
                            />
                            Car Likes: {car.likes}
                          </p>
                          <p className='d-flex align-items-center'>
                            <Icon
                              className='mr-2'
                              type='right-circle'
                              theme='twoTone'
                              twoToneColor='#52c41a'
                            />
                            Car Rating: {car.rating}
                          </p>
                        </div>

                        <Mutation
                          mutation={DELETE_USER_CAR}
                          variables={{ _id: car._id }}
                          refetchQueries={() => [
                            { query: GET_ALL_CARS },
                            { query: GET_CURRENT_USER }
                          ]}
                          update={(cache, { data: { deleteUserCar } }) => {
                            // Read old cache data query
                            const { getUserCars } = cache.readQuery({
                              query: GET_USER_CARS,
                              variables: { username }
                            });
                            // Update/write data query after CRUD according to the below filter
                            cache.writeQuery({
                              query: GET_USER_CARS,
                              variables: { username },
                              data: {
                                getUserCars: getUserCars.filter(
                                  car => car._id !== deleteUserCar._id
                                )
                              }
                            });
                          }}
                        >
                          {(deleteUserCar, attrs = {}) => (
                            <div className='col-lg-4 col-md-12 col-sm-12 d-flex justify-content-between align-items-center'>
                              <button
                                className='btn btn-info btn-rounded'
                                onClick={() => this.loadCar(car)}
                              >
                                <i class='fas fa-magic mr-1'></i>Edit
                              </button>
                              <Link to={`/cars/${car._id}`}>
                                <button className='btn btn-primary btn-rounded'>
                                  <i class='fas fa-eye mr-1'></i>View
                                </button>
                              </Link>
                              <button
                                className='btn btn-danger btn-rounded'
                                onClick={() => this.handleDelete(deleteUserCar)}
                              >
                                <i class='fas fa-trash-alt mr-1'></i>
                                {attrs.loading ? 'deleting...' : 'Delete'}
                              </button>
                            </div>
                          )}
                        </Mutation>
                      </div>
                    </div>
                  </React.Fragment>
                ))}

              {this.state.visible < data.getUserCars.length && (
                <div className='row mx-auto'>
                  <button
                    onClick={this.loadMore}
                    type='button'
                    className='btn btn-info mx-auto my-5'
                  >
                    Load more
                  </button>
                </div>
              )}
            </div>
          );
        }}
      </Query>
    );
  }
}

const EditCarModal = ({
  handleSubmit,
  handleEditorChange,
  car,
  handleChange,
  closeModal
}) => (
  <Mutation
    mutation={UPDATE_USER_CAR}
    variables={{
      _id: car._id,
      name: car.name,
      price: car.price,
      imageUrl: car.imageUrl,
      category: car.category,
      description: car.description,
      features: car.features,
      mileages: car.mileages,
      rating: car.rating
    }}
  >
    {updateUserCar => (
      <React.Fragment>
        <div className='container my-5'>
          <div className='card'>
            <h5 className='card-header info-color white-text text-center py-4'>
              <strong className='text-center'>EDIT YOUR CAR</strong>
            </h5>
            <div className='card-body px-lg-5 pt-0'>
              <form
                className='md-form'
                onSubmit={event => handleSubmit(event, updateUserCar)}
                style={{ color: '#757575' }}
              >
                <input
                  type='text'
                  id='input'
                  className='form-control'
                  placeholder='Car Name'
                  name='name'
                  value={car.name}
                  onChange={handleChange}
                />
                <input
                  type='number'
                  id='input'
                  className='form-control'
                  placeholder='Car Price'
                  name='price'
                  value={car.price}
                  onChange={handleChange}
                />
                <input
                  type='number'
                  id='input'
                  className='form-control'
                  placeholder='Rate condition out of 5(INT)'
                  name='rating'
                  value={car.rating}
                  onChange={handleChange}
                />
                <input
                  type='text'
                  id='input'
                  className='form-control'
                  placeholder='Image URL'
                  name='imageUrl'
                  value={car.imageUrl}
                  onChange={handleChange}
                />
                <div>
                  <select
                    className='mdb-select md-form mb-4 initialized'
                    id='select'
                    name='category'
                    value={car.category}
                    onChange={handleChange}
                  >
                    <option value disabled selected>
                      Choose your category
                    </option>
                    <option value='Sedan'>Sedan</option>
                    <option value='Truck'>Truck</option>
                    <option value='Sports'>Sports</option>
                  </select>
                </div>
                <textarea
                  className='form-control md-textarea'
                  id='textarea'
                  placeholder='Car Description'
                  name='description'
                  value={car.description}
                  onChange={handleChange}
                />
                <input
                  type='text'
                  id='input'
                  className='form-control'
                  placeholder='Mileages'
                  name='mileages'
                  value={car.mileages}
                  onChange={handleChange}
                />
                <CKEditor
                  name='features'
                  content={car.features}
                  events={{ change: handleEditorChange }}
                />
                <div className='row mt-5 justify-content-between align-items-center'>
                  <button type='submit' className='btn-primary b-fix'>
                    Update
                  </button>
                  <button className='btn-danger b-fix' onClick={closeModal}>
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </React.Fragment>
    )}
  </Mutation>
);

export default UserAddedCars;
