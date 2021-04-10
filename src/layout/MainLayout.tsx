import React, { PropsWithChildren } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { isLoggedInSelector } from '../redux/auth';
import styling from '../styling';

const MainContainer = styled.main`
  padding: ${styling.spacing.md};
  padding-bottom: ${styling.spacing.xl};
`;

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;

  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: ${styling.spacing.md};

  background: ${styling.colors.primary};

  a {
    background: transparent;
    border: 0;
    text-decoration: none;
    color: ${styling.colors.background};
  }
`;

export default function MainLayout({ children }: PropsWithChildren<unknown>) {
  const isAuthenticated = useSelector(isLoggedInSelector);

  return (
    <>
      <MainContainer>{children}</MainContainer>
      <Nav>
        <Link to="/">Download</Link>
        <Link to="/log">Log</Link>
        {isAuthenticated && <Link to="/user">User</Link>}
        {!isAuthenticated && <Link to="/login">Login</Link>}
      </Nav>
    </>
  );
}
