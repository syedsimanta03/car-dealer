import React from 'react';
//import { Link } from 'react-router-dom';

import { Query, Mutation } from 'react-apollo';
import {
  GET_USER_CARS,
  DELETE_USER_CAR,
  GET_ALL_CARS,
  GET_CURRENT_USER,
  UPDATE_USER_CAR
} from '../../queries';
import Spinner from '../Spinner';
import CarItem from '../Car/CarItem';

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
    modal: false
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };
  // Delete user's car
  handleDelete = deleteUserCar => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete Car?'
    );
    if (confirmDelete) {
      deleteUserCar().then(({ data }) => {
        // console.log(data);
      });
    }
  };

  handleSubmit = (event, updateUserCar) => {
    event.preventDefault();
    updateUserCar().then(({ data }) => {
      //console.log(data);
      this.closeModal();
    });
  };

  loadCar = car => {
    this.setState({ ...car, modal: true });
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
        
          if (loading) return <Spinner />;
          if (error) return <div className='text-center'>Error</div>;
          // console.log(data);
          return (
            <div>
              {modal && (
                <EditCarModal
                  handleSubmit={this.handleSubmit}
                  recipe={this.state}
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
              <div className="row">
              {data.getUserCars.map(car => (
                <CarItem key={car._id} {...car}>
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
                      <div>
                        <button
                          className='button-primary'
                          onClick={() => this.loadCar(car)}
                        >
                          Update
                        </button>
                        <p
                          className='delete-button'
                          onClick={() => this.handleDelete(deleteUserCar)}
                        >
                          {attrs.loading ? 'deleting...' : 'X'}
                        </p>
                      </div>
                    )}
                  </Mutation>
                </CarItem>
              ))}
            </div>
            </div>
          );
        }}
      </Query>
    );
  }
}

const EditCarModal = ({ handleSubmit, car, handleChange, closeModal }) => (
  <Mutation
    mutation={UPDATE_USER_CAR}
    variables={{
      _id: car._id,
      name: car.name,
      imageUrl: car.imageUrl,
      category: car.category,
      description: car.description
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
                  placeholder
                  defaultValue={''}
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
                <textarea
                  name='features'
                  value={car.features}
                  onChange={handleChange}
                />
                <button
                  type='submit'
                  className='btn btn-outline-info btn-rounded btn-block my-4 waves-effect z-depth-0'
                  onClick={closeModal}
                >
                  SAVE
                </button>
              </form>
            </div>
          </div>
        </div>
      </React.Fragment>
    )}
  </Mutation>
);

export default UserAddedCars;
