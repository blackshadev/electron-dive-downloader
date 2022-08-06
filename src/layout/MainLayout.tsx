import { PropsWithChildren } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { darken } from 'polished';
import { isLoggedInSelector } from '../redux/auth';
import styling from '../styling';
import ApplicationErrors from '../components/ApplicationErrors';
import { ErrorNudgeDiv } from '../components/ErrorNudge';

const MainWrapper = styled.main`
  position: absolute;
  top: 0;
  display: flex;
  height: 100%;
  width: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;


const MainContainer = styled.section`
  display: flex;
  flex-direction: column;
  padding: ${styling.spacing.md};
  padding-bottom: ${styling.spacing.xl};
  box-sizing: border-box;
  max-width: 459px;
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

const ApplicationErrorSection = styled.section`
  position: fixed;
  bottom: ${styling.misc.navHeight};
  width: 100%;

  ${ErrorNudgeDiv} {
    margin: 0 ${styling.spacing.lg};
    margin-bottom: ${styling.spacing.md};
  }
`;

export default function MainLayout({ children }: PropsWithChildren<unknown>) {
  const isAuthenticated = useSelector(isLoggedInSelector);

  return (
    <>
      <MainWrapper>
        <MainContainer>{children}</MainContainer>
      </MainWrapper>
      <ApplicationErrorSection>
        <ApplicationErrors />
      </ApplicationErrorSection>
      <Nav>
        <NavLink to="/download">Download</NavLink>
        <NavLink to="/log">Log</NavLink>
        {isAuthenticated && <NavLink to="/user">User</NavLink>}
        {!isAuthenticated && <NavLink to="/login">Login</NavLink>}
      </Nav>
    </>
  );
}
