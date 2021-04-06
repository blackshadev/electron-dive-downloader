import React, { PropsWithChildren } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { isLoggedInSelector } from '../redux/authSlice';
import styling from '../styling';

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  margin-bottom: ${styling.spacing.md};
`;

export default function MainLayout({ children }: PropsWithChildren<unknown>) {
  const isAuthenticated = useSelector(isLoggedInSelector);

  return (
    <>
      <Nav>
        <Link to="/">Download</Link>
        {isAuthenticated && <Link to="/user">User</Link>}
        {isAuthenticated && <Link to="/logout">Logout</Link>}
        {!isAuthenticated && <Link to="/login">Login</Link>}
      </Nav>
      <main>{children}</main>
    </>
  );
}
