import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import UserInformation from '../components/UserInformation';
import { isLoggedInSelector, logout } from '../redux/auth';

export default function User() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(isLoggedInSelector);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login', { replace: true });
    }
  }, [isLoggedIn, navigate]);

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
