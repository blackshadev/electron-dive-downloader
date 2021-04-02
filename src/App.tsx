import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import Download from './pages/Download';
import store from './redux/store';
import { colors } from './styling';

const GlobalStyle = createGlobalStyle`
body {
  background-color: ${colors.background};
  color: ${colors.font};
}
`;

export default function App() {
  return (
    <>
      <GlobalStyle />

      <Provider store={store}>
        <Router>
          <Switch>
            <Route path="/" component={Download} />
          </Switch>
        </Router>
      </Provider>
    </>
  );
}
