import React, { useEffect, useState } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import './App.css';
//import components
import Signup from './components/user/Signup';
import Login from './components/user/Login';
import Profile from './components/user/Profile';
import Welcome from './components/user/Welcome';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const user = localStorage.getItem('jwtToken');
  return <Route {...rest}render={(props) => {
    return user ? <Component {...rest} {...props}/> :<Redirect to="/login" />
  }} />
}

function App() {
  return (
    <div className="App">
      <h1>This is the homepage</h1>
    </div>
  );
}

export default App;
