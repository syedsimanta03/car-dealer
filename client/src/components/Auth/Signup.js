import React, { Component, Fragment } from 'react';
import { Mutation } from 'react-apollo';
import { SIGNUP_USER } from '../../queries';
import Error from '../Error';
import { withRouter } from 'react-router-dom';
import { Form, Icon, Input, Checkbox, Row, Col } from 'antd';


const initState = {
  username: '',
  email: '',
  password: '',
  passwordConfirmation: ''
};

class Signup extends Component {
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

  //  Save user to DB on submit, set localstorage token, clean state, refetch current user info
  handleSubmit = (event, signupUser) => {
    event.preventDefault();
    signupUser().then(async ({ data }) => {
      //console.log(data);
      localStorage.setItem('token', data.signupUser.token);
      await this.props.refetch();
      this.clearState();
      this.props.history.push('/');
    });
  };

  //  Form validation
  validateForm = () => {
    const { username, email, password, passwordConfirmation } = this.state;
    const isInvalid =
      !username || !email || !password || password !== passwordConfirmation;
    return isInvalid;
  };

  render() {
    const { username, email, password, passwordConfirmation } = this.state;

    return (
      <Fragment>
        <h2 className='t-center mt-5'>Signup Today!</h2>
        <div className='cardcontainer'>
          <Mutation
            mutation={SIGNUP_USER}
            variables={{ username, email, password }}
          >
            {(signupUser, { data, loading, error }) => {
              return (
                <Form
                  className='mt-4'
                  onSubmit={event => this.handleSubmit(event, signupUser)}
                >
                  <Row>
                    <Col span={12} offset={12}>
                      <Icon
                        type='user-add'
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
                      <Icon type='mail' style={{ color: 'rgba(0,0,0,.25)' }} />
                    }
                    type='email'
                    name='email'
                    placeholder='Email Address'
                    value={email}
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
                  <Input
                    prefix={
                      <Icon type='lock' style={{ color: 'rgba(0,0,0,.25)' }} />
                    }
                    type='password'
                    name='passwordConfirmation'
                    placeholder='Confirm Password'
                    value={passwordConfirmation}
                    onChange={this.handleChange}
                    className='mt-3'
                  />
                  <Row>
                    <Checkbox className='mt-3'>
                      Send me newsletter & Offers
                    </Checkbox>
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

export default withRouter(Signup);
