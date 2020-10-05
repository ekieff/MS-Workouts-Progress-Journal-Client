import React, { Component } from 'react'
import jwt_decode from 'jwt-decode'

class Profile extends Component {
  constructor() {
    super()
    this.state = {
      name: '',
      email: '',
      errors: {},
      start:'',
      end:'',
      timezone:'',
      title:'',
      description:'',
      location:'',
    }
  }

  componentDidMount() {
    const token = localStorage.usertoken
    const decoded = jwt_decode(token)
    this.setState({
      name: decoded.name,
      email: decoded.email
    })
  }

  render() {
    return (
  <div>
      <div className="container">
        <div className="jumbotron mt-5">
          <div className="col-sm-8 mx-auto">
            <h1 className="text-center">PROFILE</h1>
          </div>
          <table className="table col-md-6 mx-auto">
            <tbody>
              <tr>
                <td>Name</td>
                <td>{this.state.name}</td>
              </tr>
              <tr>
                <td>Email</td>
                <td>{this.state.email}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div title="Add to Calendar" class="addeventatc">
        Make an appointment to stay committed to your health!
        <span class="start">04/26/2020 06:00 PM</span>
        <span class="end">04/26/2020 11:00 PM</span>
        <span class="timezone">America/Los_Angeles</span>
        <span class="title">Spending 30 minutes with MS Workouts</span>
        <span class="description">I'm taking the fight to the muscles!</span>
        <span class="location">'www.msworkouts.com/progressjournal'</span>
  </div>
</div>
    )
  }
}

export default Profile