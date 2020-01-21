import React from 'react';
//import { Link } from 'react-router-dom';
import { Query, Mutation } from 'react-apollo';
import {
  GET_USER_CARS,
  DELETE_USER_CAR,
  GET_ALL_CARS,
  GET_CURRENT_USER,
} from '../../queries';
import Spinner from '../Spinner';
import EditCarModal from '../Car/EditCarModal';
import LazyLoad from 'react-lazyload';
import { Modal, Icon } from 'antd';

const { confirm } = Modal;
class UserAddedCars extends React.Component {
  state = {
    _id: '',
    name: '',
    price: '',
    imageUrl: '',
    category: '',
    description: '',
    features: '',
    username: '',
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

  handleSubmit = (event, updateUserCar) => {
    event.preventDefault();
    updateUserCar().then(({ data }) => {
      //console.log(data);
      this.closeModal();
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
              {modal && (
                <EditCarModal
                  handleSubmit={this.handleSubmit}
                  car={this.state}
                  closeModal={this.closeModal}
                  handleChange={this.handleChange}
                />
              )}
              <h3 class='text-center text-white text-uppercase aqua-gradient p-3 mb-5'>
                {username}'s added cars
                <strong className='badge badge-primary mb-1 ml-2'>
                  {data.getUserCars.length}
                </strong>
              </h3>
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
                            <img
                              className='card-img-top img-shadow'
                              src={car.imageUrl}
                              alt='Cardp'
                              height='300'
                              width='100'
                            />
                          </LazyLoad>
                        </div>
                        <div className='col-lg-4 col-md-12 col-sm-12'>
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
                                className='btn-info b-fix shadow-sm'
                                onClick={() => this.loadCar(car)}
                              >
                                Edit
                              </button>
                              <button
                                className='btn-danger b-fix shadow-sm'
                                onClick={() => this.handleDelete(deleteUserCar)}
                              >
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



export default UserAddedCars;
