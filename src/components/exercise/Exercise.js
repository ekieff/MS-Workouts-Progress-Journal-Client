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
            newTitle: '',
            newType: '',
            newWebsite:''
        }
        this.onChange = this.onChange.bind(this)
        this.onSubmitNew = this.onSubmitNew.bind(this)
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
    onChange(e) {
        this.setState({ [e.target.name]: e.target.value })
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
    onSubmitNew(e){
        e.preventDefault()
        const newExercise ={
            exerciseTitle: this.state.newTitle,
            type: this.state.newType,
            videoAddress: this.state.newWebsite
        }
        axios.post(`${REACT_APP_SERVER_URL}/exercises/exercise/new`, {
            newExercise:newExercise
        }).then(response =>{
            console.log(response)
        }).catch(err =>{
            console.log(err)
        })
    }
    onDelete(e){
        e.preventDefault()
        const deleteExercise ={
          ExerciseId: e.target.value
        }
        axios.post(`${REACT_APP_SERVER_URL}/exercises/exercise/delete`, {
          exerciseId: deleteExercise,
        }).then(response =>{
          console.log('deleted a playlist')
        }).catch(err =>{
          console.log(err)
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
                <h3><Link className="viewDetailLink" to= {{pathname: `/exercises/${exercise.id}`}}>View this exercise</Link></h3>
                {this.state.isAdmin ? 
                <button type="submit" value ={exercise.id}
                className = "btn btn-lg btn-primary btn-block" onClick={this.onDelete}
                >Delete this exercise</button>
                : <div></div>}
                </div>
                </div>
                </div>
            )
        })
        const adminLinks =(
            <div className="container">
        <div className="row">
          <div className="col-md-6 mt-5 mx-auto">
            <form noValidate onSubmit={this.onSubmitNew}>
              <h1 className="h3 mb-3 font-weight-normal">Create a new Exercise</h1>
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  className="form-control"
                  name="newTitle"
                  placeholder="Enter a new Title"
                  value={this.state.newTitle}
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="type">Type</label>
                <input
                  type="text"
                  className="form-control"
                  name="newType"
                  placeholder="Enter a type(seated or standing)"
                  value={this.state.newType}
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="website">Website URL</label>
                <input
                  type="text"
                  className="form-control"
                  name="newWebsite"
                  placeholder="Enter the website"
                  value={this.state.newWebsite}
                  onChange={this.onChange}
                />
              </div>
              <button
                type="submit"
                className="btn btn-lg btn-primary btn-block"
              >
                Add another!
              </button>
            </form>
          </div>
        </div>
      </div>

        )
      return (
          <div>
              {showExercises}
              {this.state.isAdmin ? adminLinks : <div></div>}
              
          </div>
      )
    }
}

export default Exercise;
