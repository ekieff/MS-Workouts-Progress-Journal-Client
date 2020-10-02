import React, { Component } from 'react'
import axios from 'axios'
import jwt_decode from 'jwt-decode'
import queryString from 'query-string';
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
          exercises:[],
          exerciseId:''
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
      onDelete(e){
          e.preventDefault()
          this.setState ({
            exerciseId: e.target.input
          })
          const deleteExercise = {
              exerciseId: this.state.exerciseId,
              playlistId: this.props.match.params.id
          }
          axios.delete(`${REACT_APP_SERVER_URL}/exercises/playlistExercises/delete`, {
            deleteExercise: deleteExercise
          }).then(response =>{
              console.log(response)
          }).catch(err =>{
              console.log(err)
          })
      }


    render() {
        const playlist = this.state.playlist
        const showPlaylist = playlist.map((playlist, i) =>{
            return (
                <div className ="container">
                    <div className="row">
                    <div className="col-md-6 mt-5 mx-auto">
                <h1>{playlist.name}</h1>
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
                <form onSumbit={this.onDelete}>
            <input type ="hidden">{exercise.exercises.id}</input>
                <button type="submit"
                className = "btn btn-lg btn-primary btn-block"
                >Remove this exercise</button>
                </form>
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