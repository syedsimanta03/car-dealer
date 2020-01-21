import React, { Component } from 'react';
import Error from './../Error';
import CKEditor from 'react-ckeditor-component';

import { notification, Icon } from 'antd';
import { Mutation } from 'react-apollo';
import { ADD_CAR, GET_ALL_CARS, GET_USER_CARS } from '../../queries';
import { withRouter } from 'react-router-dom';
import withAuth from '../withAuth';

const initState = {
  name: '',
  price: '',
  imageUrl: '',
  category: '',
  description: '',
  features: '## ADD CAR FEATURES',
  username: '',
  mileages: '',
  rating: ''
};

class AddCar extends Component {
  state = { ...initState };

  //  Clear all state/fields values
  clearState = () => {
    this.setState({ ...initState });
  };

  // Notification
  openNotification = () => {
    this.clearState();
    notification.open({
      message: 'Car Added Successfully',
      description: 'Best of luck!',
      icon: <Icon type='check-circle' theme='twoTone' twoToneColor='#52c41a' />
    });
  };

  // Get user name following session detail
  componentDidMount() {
    this.setState({
      username: this.props.session.getCurrentUser.username
    });
  }

  // Form input change track to set state value
  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  // CKEditor
  handleEditorChange = event => {
    const newContent = event.editor.getData();
    this.setState({ features: newContent });
  };

  // When form on submit
  handleSubmit = (event, addCar) => {
    event.preventDefault();
    this.openNotification();
    addCar().then(({ data }) => {
      // console.log(data);
      this.clearState();
      this.props.history.push('/');
    });
  };

  // Validate form
  validateForm = () => {
    const {
      name,
      price,
      imageUrl,
      category,
      description,
      features,
      mileages
    } = this.state;
    const isInvalid =
      !name ||
      !price ||
      !imageUrl ||
      !category ||
      !description ||
      !features ||
      !mileages;
    return isInvalid;
  };

  // Update the query items number & add it to the root query
  updateCache = (cache, { data: { addCar } }) => {
    // Read the old cache data items count ex: maybe 5 items
    const { getAllCars } = cache.readQuery({
      query: GET_ALL_CARS
    });
    // Read GET_ALL_CARS query items count ex: maybe 5 items & add to data ex: maybe 6 items now by adding addCar's newly created item
    cache.writeQuery({
      query: GET_ALL_CARS,
      data: {
        getAllCars: [addCar, ...getAllCars]
      }
    });
  };

  render() {
    const {
      name,
      price,
      imageUrl,
      category,
      description,
      features,
      mileages,
      username,
      rating
    } = this.state;

    return (
      <Mutation
        mutation={ADD_CAR}
        variables={{
          name,
          price,
          imageUrl,
          category,
          description,
          features,
          mileages,
          rating,
          username
        }}
        update={this.updateCache}
        refetchQueries={() => [
          { query: GET_USER_CARS, variables: { username } }
        ]}
      >
        {(addCar, { data, loading, error }) => {
          return (
            <React.Fragment>
              <div className='container my-5'>
                <div className='card'>
                  <h5 className='card-header info-color white-text text-center py-4'>
                    <strong>ADD YOUR CAR</strong>
                  </h5>
                  <div className='card-body px-lg-5 pt-0'>
                    <form
                      className='md-form'
                      onSubmit={event => this.handleSubmit(event, addCar)}
                      style={{ color: '#757575' }}
                    >
                      <input
                        type='text'
                        id='input'
                        className='form-control'
                        placeholder='Car Name'
                        name='name'
                        value={name}
                        onChange={this.handleChange}
                      />
                      <input
                        type='number'
                        id='input'
                        className='form-control'
                        placeholder='Car Price'
                        name='price'
                        value={price}
                        onChange={this.handleChange}
                      />
                      <input
                        type='number'
                        id='input'
                        className='form-control'
                        placeholder='Rate condition out of 5(INT)'
                        name='rating'
                        value={rating}
                        onChange={this.handleChange}
                      />
                      <input
                        type='text'
                        id='input'
                        className='form-control'
                        placeholder='Image URL'
                        name='imageUrl'
                        value={imageUrl}
                        onChange={this.handleChange}
                      />
                      <div>
                        <select
                          className='mdb-select md-form mb-4 initialized'
                          id='select'
                          name='category'
                          value={category}
                          onChange={this.handleChange}
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
                        value={description}
                        onChange={this.handleChange}
                      />
                      <input
                        type='text'
                        id='input'
                        className='form-control'
                        placeholder='Mileages'
                        name='mileages'
                        value={mileages}
                        onChange={this.handleChange}
                      />
                      <CKEditor
                        name='features'
                        content={features}
                        events={{ change: this.handleEditorChange }}
                      />
                      <button
                        type='submit'
                        className='btn btn-outline-info btn-rounded btn-block my-4 waves-effect z-depth-0'
                        disabled={loading || this.validateForm()}
                      >
                        Submit my car
                      </button>
                      {error && <Error error={error} />}
                    </form>
                  </div>
                </div>
              </div>
            </React.Fragment>
          );
        }}
      </Mutation>
    );
  }
}

export default withAuth(session => session && session.getCurrentUser)(
  withRouter(AddCar)
);
