import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import Button from '../components/Button';
import ErrorRow from '../components/ErrorRow';
import Input from '../components/Input';
import InputRow from '../components/InputRow';
import useInput from '../hooks/input';
import {
  authenticate,
  errorSelector,
  getRefreshToken,
  isLoggedInSelector,
  tryToken,
} from '../redux/auth';

export default function Login() {
  const router = useHistory();
  const dispatch = useDispatch();
  const { value: valueEmail, onChange: changeEmail } = useInput('');
  const { value: valuePassword, onChange: changePassword } = useInput('');
  const authenticateError = useSelector(errorSelector);
  const isLoggedIn = useSelector(isLoggedInSelector);
  const refreshtoken = useSelector(getRefreshToken);

  useEffect(() => {
    if (isLoggedIn) {
      router.replace('/');
    } else if (refreshtoken) {
      dispatch(tryToken());
    }
  }, [dispatch, isLoggedIn, router, refreshtoken]);

  return (
    <form>
      <InputRow label="E-mail" name="email">
        <Input
          className="-grow"
          name="email"
          value={valueEmail}
          onChange={changeEmail}
        />
      </InputRow>

      <InputRow label="Password" name="password">
        <Input
          className="-grow"
          name="password"
          type="password"
          value={valuePassword}
          onChange={changePassword}
        />
      </InputRow>

      {authenticateError && <ErrorRow>{authenticateError}</ErrorRow>}

      <Button
        primary
        onClick={(e) => {
          e.preventDefault();

          dispatch(
            authenticate({
              email: valueEmail,
              password: valuePassword,
            })
          );
        }}
      >
        Login
      </Button>
    </form>
  );
}
