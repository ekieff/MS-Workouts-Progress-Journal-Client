import React, { Component } from 'react'
import axios from 'axios'
import jwt_decode from 'jwt-decode'
const REACT_APP_SERVER_URL = process.env.REACT_APP_SERVER_URL;

class ExerciseId extends Component {
    constructor() {
        super()
        this.state = {
            name: '',
            email: '',
            errors: {},
            isAdmin: '',
            id: '',
            exercise: [],
        }
    }
    
    exercise = () => {
        console.log(this.props.match.params.id)
        axios.post(`${REACT_APP_SERVER_URL}/exercises/exercise/show`, {
            exerciseId: this.props.match.params.id
        }).then(response =>{
            this.setState({
                exercise: response.data
            })
        }).catch (err =>{
            console.log(err)
        })
    
    }
    componentWillMount(){
        this.exercise()
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
        <div className ="container">
                    <div className="row">
                    <div className="col-md-6 mt-5 mx-auto">
                        <h1>{this.state.exercise.exerciseTitle}</h1>
                        <h3>Type: {this.state.exercise.type}</h3>
                        <p>{this.state.exercise.videoAddress}</p>
                    </div>
                    </div>
                    </div>
                    <button type="submit"
                className = "btn btn-lg btn-primary btn-block"
                >Delete this exercise</button>
        <div className="container">
        <div className="row">
          <div className="col-md-6 mt-5 mx-auto">
            <form noValidate onSubmit={this.onSubmit}>
              <h1 className="h3 mb-3 font-weight-normal">Edit this Exercise</h1>
              <div className="form-group">
                <label htmlFor="name">Exercise Title</label>
                <input
                  type="text"
                  className="form-control"
                  name="exerciseTitle"
                  placeholder="Enter a new title"
                  value={this.state.exercise.exerciseTitle}
                  onChange={this.onChange}
                />
                <label htmlFor="name">Exercise Type</label>
                <input
                  type="text"
                  className="form-control"
                  name="type"
                  placeholder="Seated or Standing?"
                  value={this.state.exercise.type}
                  onChange={this.onChange}
                />
                <label htmlFor="name">Exercise Title</label>
                <input
                  type="text"
                  className="form-control"
                  name="videoAddress"
                  placeholder="Change Hosting platform"
                  value={this.state.exercise.videoAddress}
                  onChange={this.onChange}
                />
              </div>
              <button
                type="submit"
                className="btn btn-lg btn-primary btn-block"
              >
                Update!
              </button>
            </form>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-md-6 mt-5 mx-auto">
            <form noValidate onSubmit={this.onSubmit}>
              <h1 className="h3 mb-3 font-weight-normal">Add to a Playlist</h1>
              <div className="form-group">
                <label htmlFor="name">Playlist</label>
                <input
                  type="text"
                  className="form-control"
                  name="newPlaylist"
                  placeholder="Enter a new name"
                  value={this.state.newPlaylist}
                  onChange={this.onChange}
                />
              </div>
              <button
                type="submit"
                className="btn btn-lg btn-primary btn-block"
              >
                Add!
              </button>
            </form>
          </div>
        </div>
      </div>
        </div>
        
      )
    }
}

export default ExerciseId;