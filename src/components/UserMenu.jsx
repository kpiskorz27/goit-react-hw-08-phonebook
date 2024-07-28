import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../slices/authSlice';

const UserMenu = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);

  const handleLogout = () => {
    dispatch(logout());
  };

  if (!user) {
    return <p>Not logged in</p>;
  }

  return (
    <div>
      <p>{user.email}</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default UserMenu;
