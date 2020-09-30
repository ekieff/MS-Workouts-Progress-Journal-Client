import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import jwt_decode from 'jwt-decode';

class Landing extends Component {
  logOut(e) {
    e.preventDefault();
    localStorage.removeItem("usertoken");
    this.props.history.push(`/`);
  }
  // constructor() {
  //   super()
  //   this.state = {
  //     isAdmin: '',
  //     name: '',
  //     email: '',
  //     errors: {}
  //   }
  // }

  // componentDidMount() {
  //   const token = localStorage.usertoken
  //   const decoded = jwt_decode(token)
  //   this.setState({
  //     name: decoded.name,
  //     email: decoded.email,
  //     isAdmin: decoded.isAdmin,
  //   })
  // }

  render() {
    
    const loginRegLink = (
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link to="/login" className="nav-link">
            Login
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/signup" className="nav-link">
            Register
          </Link>
        </li>
      </ul>
    );

    const userLink = (
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link to="/profile" className="nav-link">
            User
          </Link>
        </li>
        <li className="nav-item">
          <a href="" onClick={this.logOut.bind(this)} className="nav-link">
            Logout
          </a>
        </li>
      </ul>
    );
    const adminLink = (
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link to="/profile" className="nav-link">
            User
          </Link>
        </li>
        <li className="nav-item">
          <a href="" onClick={this.logOut.bind(this)} className="nav-link">
            Logout
          </a>
        </li>
      </ul>
    );

    function displayNav(){
      if (localStorage.usertoken){
        if (this.state.isAdmin){
          return userLink
        } else {
          return adminLink
        }
      } else {
        return loginRegLink
      }
    }
    return (
      <nav
        className="navbar navbar-expand-lg navbar-dark bg-dark rounded"
        style={{ height: "70px" }}
      >
        
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarsExample10"
          aria-controls="navbarsExample10"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div
          className="collapse navbar-collapse justify-content-md-center"
          id="navbarsExample10"
        >
          <ul className="navbar-nav" style={{ float: "left" }}>
            <li className="nav-item">
              <Link to="/" className="nav-link">
                Main Page
              </Link>
            </li>
          </ul>
        </div>
        {localStorage.usertoken ? userLink : loginRegLink}
      </nav>
    );
  }
}

export default withRouter(Landing);