import React, { Component } from 'react'
import axios from 'axios'
import jwt_decode from 'jwt-decode'
import queryString from 'query-string';
import PlaylistShow from './PlaylistShow.js'
import {Link} from 'react-router-dom';
const REACT_APP_SERVER_URL = process.env.REACT_APP_SERVER_URL;



class PlaylistId extends Component {
    constructor() {
        super()
        this.state = {
          name: '',
          email: '',
          errors: {},
          isAdmin: '',
          id: '',
          playlist: [],
          exercises:[]
        }
      }
      

      playlist = () => {
        axios.post(`${REACT_APP_SERVER_URL}/exercises/playlistExercises/show`, {
            playlistId: this.props.match.params.id
        }).then(response =>{
            this.setState({
                playlist: response.data
            })
        }).catch (err =>{
            console.log(err)
        })
    
    }
    componentWillMount(){
        this.playlist()
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
        const playlist = this.state.playlist
        const showPlaylist = playlist.map((exercise, i) =>{
            return (
                <div className ="container">
                    <div className="row">
                    <div className="col-md-6 mt-5 mx-auto">
                <h1>{exercise.name}</h1>
                </div>
                </div>
                </div>
            )
        })
        const exercises = this.state.playlist
        
        const showExercises = exercises.map((exercise, i) =>{
            return(
                <div className ="container">
                    <div className="row">
                    <div className="col-md-6 mt-5 mx-auto">
                <h1>{exercise.exercises.exerciseTitle}</h1>
                <button type="submit"
                className = "btn btn-lg btn-primary btn-block"
                >Remove this exercise</button>
                </div>
                </div>
                </div>
            )
        })

        return (
            <div>
          {showPlaylist}
          {showExercises}
          
          </div>
        )
    }
}

export default PlaylistId;