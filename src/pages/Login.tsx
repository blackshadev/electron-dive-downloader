import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../components/Button';
import ErrorRow from '../components/ErrorRow';
import Input from '../components/Input';
import InputRow from '../components/InputRow';
import { useInput } from '../hooks/input';
import { authenticate, errorSelector } from '../redux/authSlice';

export default function Login() {
  const dispatch = useDispatch();
  const { value: valueEmail, onChange: changeEmail } = useInput('');
  const { value: valuePassword, onChange: changePassword } = useInput('');
  const authenticateError = useSelector(errorSelector);

  return (
    <form>
      <InputRow label="E-mail" name="email">
        <Input name="email" value={valueEmail} onChange={changeEmail} />
      </InputRow>

      <InputRow label="Password" name="password">
        <Input
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
