import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import UserInformation from '../components/UserInformation';
import { isLoggedInSelector, logout } from '../redux/auth';

export default function User() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(isLoggedInSelector);
  const history = useHistory();

  useEffect(() => {
    if (!isLoggedIn) {
      history.replace('/login');
    }
  }, [isLoggedIn, history]);

  return (
    <>
      <UserInformation />
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          dispatch(logout());
        }}
      >
        Logout
      </button>
    </>
  );
}
