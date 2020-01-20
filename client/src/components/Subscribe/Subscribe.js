import React, { Fragment, Component } from 'react';
import { notification, Icon } from 'antd';

const initState = {
  email: ''
};

class Subscribe extends Component {
  state = { ...initState };

  //  Clear all state/fields values
  clearState = () => {
    this.setState({ ...initState });
  };
  // Notification
  openNotification = () => {
    this.clearState();
    notification.open({
      message: 'Successfully Subscribed',
      description: 'Thanks for subscribing our newsletter',
      icon: <Icon type='check-circle' theme='twoTone' twoToneColor='#52c41a' />
    });
  };

  //  Form validation
  validateForm = () => {
    const {email } = this.state;
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
    return (
      <Fragment>
        <div className='bg-cover'>
          <h3 className='text-center text-white'>News and Updates</h3>
          <p className='text-center'>
            Subscribe to our newsletter and receive the latest news from
            AutoCar.
          </p>
          <div className='form-row'>
            <div className='col-md-4 ml-auto'>
              <div className='input-group input-group-lg z-depth-1'>
                <div className='input-group-prepend'>
                  <span className='input-group-text rgba-white-light border-0'>
                    <i className='fa fa-envelope white-text'></i>
                  </span>
                </div>
                <input
                  required
                  type='email'
                  name='email'
                  className='form-control form-control-lg rgba-white-light white-text border-0 z-depth-0'
                  placeholder='Email Address'
                  value={email}
                  onChange={this.handleChange}
                />
              </div>
            </div>

            <div className='col-md-2 mr-auto'>
              <button
                disabled={this.validateForm()}
                className='btn btn-block btn-primary'
                onClick={this.openNotification}
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default Subscribe;
