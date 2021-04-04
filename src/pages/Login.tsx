import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../components/Button';
import Input from '../components/Input';
import InputRow from '../components/InputRow';
import Row from '../components/Row';
import { useInput } from '../hooks/input';
import { authenticate, errorSelector } from '../redux/authSlice';

export default function Login() {
  const dispatch = useDispatch();
  const { bind: bindEmail } = useInput('');
  const { bind: bindPassword } = useInput('');
  const authenticateError = useSelector(errorSelector);

  return (
    <form>
      <InputRow label="E-mail" name="email">
        <Input name="email" {...bindEmail} />
      </InputRow>

      <InputRow label="Password" name="password">
        <Input name="password" type="password" {...bindPassword} />
      </InputRow>

      {authenticateError && <Row>{authenticateError}</Row>}

      <Button
        primary
        onClick={(e) => {
          e.preventDefault();

          dispatch(
            authenticate({
              email: bindEmail.value,
              password: bindPassword.value,
            })
          );
        }}
      >
        Login
      </Button>
    </form>
  );
}
