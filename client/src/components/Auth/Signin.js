import React, { Component, Fragment } from 'react';
import { Mutation } from 'react-apollo';
import { SIGNIN_USER } from '../../queries';
import Error from '../Error';
import { withRouter } from 'react-router-dom';
import { Form, Icon, notification, Input, Checkbox, Row, Col } from 'antd';

const initState = {
  username: 'sam',
  password: '1234test'
};

class Signin extends Component {
  // Notification
  openNotification = () => {
    this.clearState();
    notification.open({
      message: 'Loggedin Successfully',
      description: 'Add your awesome car!',
      icon: <Icon type='check-circle' theme='twoTone' twoToneColor='#52c41a' />
    });
  };
  state = { ...initState };

  //  Clear all state/fields values
  clearState = () => {
    this.setState({ ...initState });
  };
  //  Get the typed values
  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  //  After signin create localstorage token, clean state, refetch current user info
  handleSubmit = (event, signinUser) => {
    event.preventDefault();
    this.openNotification()
    signinUser().then(async ({ data }) => {
      // console.log(data);
      localStorage.setItem('token', data.signinUser.token);
      await this.props.refetch();
      this.clearState();
      this.props.history.push('/profile');
    });
  };

  //  Form validation
  validateForm = () => {
    const { username, password } = this.state;
    const isInvalid = !username || !password;
    return isInvalid;
  };

  render() {
    const { username, password } = this.state;
    return (
      <Fragment>
        <h2 className='t-center mt-5'>Signin Today!</h2>
        <div className='cardcontainer'>
          <Mutation mutation={SIGNIN_USER} variables={{ username, password }}>
            {(signinUser, { data, loading, error }) => {
              return (
                <Form
                  className='mt-4'
                  onSubmit={event => this.handleSubmit(event, signinUser)}
                >
                  <Row>
                    <Col span={12} offset={12}>
                      <Icon
                        type='user'
                        style={{ fontSize: '40px' }}
                        theme='outlined'
                      />
                    </Col>
                  </Row>

                  <Input
                    prefix={
                      <Icon type='user' style={{ color: 'rgba(0,0,0,.25)' }} />
                    }
                    type='text'
                    name='username'
                    placeholder='Username'
                    value={username}
                    onChange={this.handleChange}
                    className='mt-3'
                  />

                  <Input
                    prefix={
                      <Icon type='lock' style={{ color: 'rgba(0,0,0,.25)' }} />
                    }
                    type='password'
                    name='password'
                    placeholder='Password'
                    value={password}
                    onChange={this.handleChange}
                    className='mt-3'
                  />

                  <Row>
                    <Checkbox className='mt-3'>Remember me next time</Checkbox>
                  </Row>
                  <button
                    type='submit'
                    disabled={loading || this.validateForm()}
                    className='btn btn-outline-primary waves-effect mt-4'
                    size='large'
                  >
                    Submit
                  </button>
                  {error && <Error error={error} />}
                </Form>
              );
            }}
          </Mutation>
        </div>
      </Fragment>
    );
  }
}

export default withRouter(Signin);
