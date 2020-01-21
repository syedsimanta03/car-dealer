import React from 'react';
import UnAuth from './UnAuth';
import Auth from './Auth';
import './index.css';

// session props coming from index.js withSession component linked
const Navbar = ({ session }) => (
  <nav>
    {session && session.getCurrentUser ? <NavbarAuth session={session} /> : <NavbarUnAuth />}
  </nav>
);

const NavbarAuth = () => (
  <nav className='menuBar'>
    <div className='logo'>
      {/* eslint-disable-next-line */}
      <a href='/'>Autocar</a>
    </div>
    <div className='menuCon'>
      <div>
        <Auth />
      </div>
    </div>
  </nav>
);
const NavbarUnAuth = () => (
  <nav className='menuBar'>
    <div className='logo'>
      {/* eslint-disable-next-line */}
      <a href='/'>Autcars</a>
    </div>
    <div className='menuCon'>
      <div>
        <UnAuth />
      </div>
    </div>
  </nav>
);

export default Navbar;
