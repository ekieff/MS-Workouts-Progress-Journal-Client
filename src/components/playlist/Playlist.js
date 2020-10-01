import React, { Component } from 'react'
import jwt_decode from 'jwt-decode'

class Playlist extends Component {
        constructor() {
          super()
          this.state = {
            name: '',
            email: '',
            errors: {},
            isAdmin: '',
            id: '',
          }
        }

    componentDidMount() {
        const token = localStorage.usertoken
        const decoded = jwt_decode(token)
        this.setState({
          name: decoded.name,
          email: decoded.email,
          isAdmin: decoded.isAdmin,
          id: decoded.id
        })
      }

    render() {
      return (
          <div>
          <h1>This is all the playlists view</h1>
          <h2>This user's isAdmin is {this.state.isAdmin}</h2>
          </div>
      )
    }
}

export default Playlist;