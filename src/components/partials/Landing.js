import React, { Component } from 'react'
import Welcome from '../user/Welcome';

class Landing extends Component {
  render() {
    return (
      <div className="container">
        <div className="jumbotron mt-5">
          <div className="col-sm-8 mx-auto">
            <h1 className="text-center">WELCOME</h1>
            <Welcome/>
          </div>
        </div>
      </div>
    )
  }
}

export default Landing
