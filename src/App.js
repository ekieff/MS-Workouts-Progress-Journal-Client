import React, { useEffect, useState } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import setAuthToken from './components/utils/setAuthToken';
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
  let [currentUser, setCurrentUser] = useState("");
  let [isAuthenticated, setIsAuthenticated] = useState(true);

  useEffect(() => {
    let token;
    if(!localStorage.getItem('jwtToken')) {
      setIsAuthenticated(false);
    } else {
      token = jwt_decode(localStorage.getItem('jwtToken'));
      setAuthToken(localStorage.jwtToken);
      setCurrentUser(token);
      setIsAuthenticated(true);
    }
  }, []);

  let nowCurrentUser = (userData) => {
    console.log('nowCurrentUser is working')
    setCurrentUser(userData);
    setIsAuthenticated(true);
  };


  const handleLogout = () => {
    if (localStorage.getItem('jwtToken')) {
      localStorage.removeItem('jwtToken');
      setCurrentUser(null);
      setIsAuthenticated(false);
    }
  }

  console.log('Current User', currentUser);
  // console.log('Authenticated', isAuthenticated);

  return (
    <div>
    <div className="container mt-5">
      <Switch>
        <Route path="/signup" component={ Signup } />
        <Route 
          path="/login" 
          render={ (props) => <Login {...props} nowCurrentUser={nowCurrentUser} setIsAuthenticated={setIsAuthenticated} user={currentUser}/>}  
        />
        <PrivateRoute path="/profile" component={ Profile } user={currentUser} />

        <Route exact path="/" component={ Welcome } />
        
      </Switch>
    </div>
  </div>
  );
}

export default App;
