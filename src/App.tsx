import React from 'react';

import { Provider } from 'react-redux';
import {
  HashRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import Fonts from './Fonts';
import MainLayout from './layout/MainLayout';
import Download from './pages/Download';
import Log from './pages/Log';
import Login from './pages/Login';
import User from './pages/User';
import store from './redux/store';
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
  position: absolute;
}
`;

export default function App() {
  return (
    <>
      <Provider store={store}>
        <GlobalStyle />
        <Fonts />

        <Router>
          <MainLayout>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/user" element={<User />} />
              <Route path="/log" element={<Log />} />
              <Route path="/download" element={<Download />} />
              <Route path="/" element={<Navigate replace to="/download" />} />
            </Routes>
          </MainLayout>
        </Router>
      </Provider>
    </>
  );
}
