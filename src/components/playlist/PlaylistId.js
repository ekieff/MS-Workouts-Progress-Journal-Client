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
          playlistName: '',
          exercises:[{id: '', exerciseTitle:'Sorry there are no exercises right now!'}],
          exerciseId:''
        }
        this.onDelete = this.onDelete.bind(this)
      }
      

      playlist = () => {
        axios.post(`${REACT_APP_SERVER_URL}/exercises/playlistExercises/show`, {
            playlistId: this.props.match.params.id
        }).then(response =>{
            this.setState({
                playlistName: response.data.playlistName,
                exercises: response.data.exerciseList
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
          console.log(this.props.match.params.id)
          console.log(e)
          console.log(e.target.value)
          const deleteExercise = {
              exerciseId: e.target.value,
              playlistId: this.props.match.params.id
          }
          axios.post(`${REACT_APP_SERVER_URL}/exercises/playlistExercises/delete`, {
            deleteExercise: deleteExercise
          }).then(response =>{
              console.log('deleted connection')
          }).catch(err =>{
              console.log(err)
          })
      }


    render() {
       
        console.log(this.state.exercises)
        const showExercises = this.state.exercises.map((exercise, i) =>{
            return(
                <div className ="container">
                    <div className="row">
                        <div className="col-md-6 mt-5 mx-auto">
                             <h1>{exercise.exerciseTitle}</h1>
                                 <button className = "btn btn-lg btn-primary btn-block"
                                         ><Link className="viewDetailLink" to={{pathname:`/exercises/${exercise.id}`}}>View this exercise</Link>
                                     </button>
                                     {this.state.isAdmin ? 
                                     <form value={exercise.id}>
                                         <input type='hidden' value = {exercise.id}/>
                                            <button type="submit"
                                                className = "btn btn-lg btn-primary btn-block" value={exercise.id} onClick={this.onDelete}
                                                >Remove this exercise
                                            </button>
                                    </form>
                                    : <div></div>}
                         </div>
                     </div>
                 </div>
                ) 
        })
        

        return (
            <div>
                <div className ="container">
                    <div className="row">
                        <div className="col-md-6 mt-5 mx-auto">
                            <h1>{this.state.playlistName}</h1>
                        </div>
                    </div>
                </div>
               {showExercises}
            </div>
        )
    }
}

export default PlaylistId;