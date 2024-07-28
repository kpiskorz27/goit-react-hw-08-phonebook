import React from 'react';
import { NavLink } from 'react-router-dom';
import UserMenu from './UserMenu';
import '../styles/navigation.css';

const Navigation = () => {
  return (
    <nav>
      <NavLink to="/register">Register</NavLink>
      <NavLink to="/login">Login</NavLink>
      <NavLink to="/contacts">Contacts</NavLink>
      <UserMenu />
    </nav>
  );
};

export default Navigation;
