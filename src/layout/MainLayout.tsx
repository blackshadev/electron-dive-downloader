import React, { PropsWithChildren } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { darken } from 'polished';
import { isLoggedInSelector } from '../redux/auth';
import styling from '../styling';

const MainContainer = styled.main`
  padding: ${styling.spacing.md};
  padding-bottom: ${styling.spacing.xl};
`;

const Nav = styled.nav`
  display: flex;

  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: ${styling.colors.primary};

  a {
    text-align: center;
    line-height: ${styling.misc.navHeight};
    height: ${styling.misc.navHeight};
    flex-grow: 1;
    flex-basis: 0;
    display: block;
    background: transparent;
    border: 0;
    text-decoration: none;
    color: ${styling.colors.background};

    &:hover,
    &.active {
      background-color: ${darken(0.2, styling.colors.primary)};
    }
  }
`;

export default function MainLayout({ children }: PropsWithChildren<unknown>) {
  const isAuthenticated = useSelector(isLoggedInSelector);

  return (
    <>
      <MainContainer>{children}</MainContainer>
      <Nav>
        <NavLink to="/download">Download</NavLink>
        <NavLink to="/log">Log</NavLink>
        {isAuthenticated && <NavLink to="/user">User</NavLink>}
        {!isAuthenticated && <NavLink to="/login">Login</NavLink>}
      </Nav>
    </>
  );
}
