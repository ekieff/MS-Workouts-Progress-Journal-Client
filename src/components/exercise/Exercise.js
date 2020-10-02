import React, { Component } from 'react'
import axios from 'axios'
import jwt_decode from 'jwt-decode'
import {Link} from 'react-router-dom';
const REACT_APP_SERVER_URL = process.env.REACT_APP_SERVER_URL;


class Exercise extends Component {
    constructor() {
        super()
        this.state = {
            name: '',
            email: '',
            errors: {},
            isAdmin: '',
            id: '',
            exercises: [],
        }
    }
    exercise = () => {
        axios.get(`${REACT_APP_SERVER_URL}/exercises/exercise/all`,{
        }).then(response =>{
            this.setState({
                exercises: response.data
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
        const exercises = this.state.exercises
        const showExercises = exercises.map((exercise, i) =>{
            return (
                <div className ="container">
                    <div className="row">
                    <div className="col-md-6 mt-5 mx-auto">
                <h1>{exercise.exerciseTitle}</h1>
                <h3><Link className="viewDetailLink" to= {{pathname: `/exercises/${exercise.id}`}}>Add this exercise to a playlist</Link></h3>
                <button type="submit"
                className = "btn btn-lg btn-primary btn-block"
                >Delete this exercise</button>
                </div>
                </div>
                </div>
            )
        })
      return (
          <div>
              {showExercises}
          </div>
      )
    }
}

export default Exercise;
