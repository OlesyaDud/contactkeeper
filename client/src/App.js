import React, {Fragment} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './App.css';
import Navbar from './components/layout/Navbar';
import Alerts from './components/layout/Alerts';
import Home from './components/pages/Home';
import About from './components/pages/About';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import { Container } from '@material-ui/core';
import PrivateRoute from './components/routing/PrivateRoute';
import setAuthToken from './utils/setAuthToken';

import ContactState from './context/contact/ContactState';
import AuthState from './context/auth/AuthState';
import AlertState from './context/alert/AlertState';

if(localStorage.token) {
  setAuthToken(localStorage.token);
}

const App =()=> {
  return (
    <AuthState>
    <ContactState>
    <AlertState>
          <Router>
            <Fragment>
            <Navbar />
              <Container maxWidth="sm">
              <Alerts />
                <Switch>
                  <PrivateRoute exact path="/" component = {Home} />
                  <Route exact path="/register" component = {Register} />
                  <Route exact path="/login" component = {Login} />
                </Switch>
              </Container>
            </Fragment>
          </Router>
    </AlertState>     
    </ContactState>
    </AuthState>
  );
}

export default App;
