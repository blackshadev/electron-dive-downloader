import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import UserInformation from '../components/UserInformation';
import { isLoggedInSelector, logoutThunk } from '../redux/auth';

export default function User() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(isLoggedInSelector);
  const history = useHistory();

  if (!isLoggedIn) {
    history.replace('/login');
  }

  return (
    <>
      <UserInformation />
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          dispatch(logoutThunk());
        }}
      >
        Logout
      </button>
    </>
  );
}
