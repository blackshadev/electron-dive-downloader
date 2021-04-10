import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import Fonts from './Fonts';
import MainLayout from './layout/MainLayout';
import Download from './pages/Download';
import Log from './pages/Log';
import Login from './pages/Login';
import User from './pages/User';
import { initializeContext } from './redux/divecomputer/context';
import style from './styling';

const GlobalStyle = createGlobalStyle`
body {
  background-color: ${style.colors.background};
  color: ${style.colors.font};
  font-family: "Lato";
  padding: 0;
  margin: 0;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
}

#root {
  width: 100%;
  height: 100%;
}
`;

export default function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(initializeContext());
  }, [dispatch]);

  return (
    <>
      <GlobalStyle />
      <Fonts />

      <Router>
        <MainLayout>
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/user" component={User} />
            <Route path="/log" component={Log} />
            <Route path="/" component={Download} />
          </Switch>
        </MainLayout>
      </Router>
    </>
  );
}
