import React, { Component } from 'react';
import { Menu } from 'antd';
import { NavLink } from 'react-router-dom';

class NavbarUnAuth extends Component {
  render() {
    return (
      <Menu mode='horizontal'>
        <Menu.Item key='home'>
          <NavLink to='/' exact>
            Home
          </NavLink>
        </Menu.Item>
        <Menu.Item key='search'>
          <NavLink to='/search' exact>
            Search
          </NavLink>
        </Menu.Item>
        <Menu.Item key='mail'>
          <NavLink to='/signin' exact>
            Signin
          </NavLink>
        </Menu.Item>
        <Menu.Item key='signup'>
          <NavLink to='/signup' exact>
            Signup
          </NavLink>
        </Menu.Item>
      </Menu>
    );
  }
}

export default NavbarUnAuth;