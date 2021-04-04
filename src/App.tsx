import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import Download from './pages/Download';
import Login from './pages/Login';
import store from './redux/store';
import style from './styling';

const GlobalStyle = createGlobalStyle`
body {
  background-color: ${style.colors.background};
  color: ${style.colors.font};
}
`;

export default function App() {
  return (
    <>
      <GlobalStyle />

      <Provider store={store}>
        <Router>
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/" component={Download} />
          </Switch>
        </Router>
      </Provider>
    </>
  );
}
