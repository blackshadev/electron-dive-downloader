import React from 'react';
import Button from '../components/Button';
import Input from '../components/Input';
import InputRow from '../components/InputRow';

export default function Login() {
  return (
    <form>
      <InputRow label="E-mail" name="email">
        <Input name="email" />
      </InputRow>

      <InputRow label="Password" name="password">
        <Input name="password" type="password" />
      </InputRow>

      <Button primary>Login</Button>
    </form>
  );
}
