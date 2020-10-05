import React, { Component } from 'react'
import axios from 'axios'
import jwt_decode from 'jwt-decode'
const REACT_APP_SERVER_URL = process.env.REACT_APP_SERVER_URL;

class ExerciseId extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            email: '',
            errors: {},
            isAdmin: '',
            id: '',
            exercise: [],
            newPlaylist:'',
            exerciseId: parseInt(this.props.match.params.id),
            exerciseTitle:'',
            type:'',
            videoAddress:''
        }
        this.onChange = this.onChange.bind(this)
        this.onDelete = this.onDelete.bind(this)
        this.addtoPlaylist = this.addtoPlaylist.bind(this)
        this.onUpdate = this.onUpdate.bind(this)
    }
    
    exercise = () => {
        console.log(this.props.match.params.id)
        axios.post(`${REACT_APP_SERVER_URL}/exercises/exercise/show`, {
            exerciseId: this.props.match.params.id
        }).then(response =>{
            this.setState({
                exercise: response.data,
                exerciseTitle: response.data.exerciseTitle,
                type: response.data.type,
                videoAddress: response.data.videoAddress
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
          id: decoded.id,
        })
        
      }
      onChange(e) {
        this.setState({ [e.target.name]: e.target.value })
      }
      //ondelete
      onDelete(e){
          e.preventDefault()
          console.log(this.state.exerciseId)
          axios.delete(`${REACT_APP_SERVER_URL}/exercises/exercise/delete`, {
            exerciseId:this.state.exerciseId
        }).then(response =>{
            console.log('Deleted')
        }).catch(err =>{
            console.log(err)
        })
      }

      //onupdate
      onUpdate(e){
        e.preventDefault()
        const exercise = {
            exerciseTitle: this.state.exerciseTitle,
            type: this.state.type,
            videoAddress: this.state.videoAddress,
            id: parseInt(this.state.exerciseId)
        }
        axios.post(`${REACT_APP_SERVER_URL}/exercises/exercise/update`, {
            exercise:exercise,
            id: exercise.id

        }).then(response =>{
            console.log('Edited')
        }).catch(err =>{
            console.log(err)
        })
        }

      //addtoplaylist
      addtoPlaylist(e){
        e.preventDefault()

        axios.post(`${REACT_APP_SERVER_URL}/exercises/playlistExercises/new`, {
            playlistId: this.state.newPlaylist,
            exerciseId: parseInt(this.state.exerciseId)
        }).then(response =>{
            console.log('Created')
        }).catch(err =>{
            console.log(err)
        })
    }
    render() {
    const adminLinks =(
      <div>
      <form onSubmit ={this.onDelete}>
                    <button type="submit"
                className = "btn btn-lg btn-primary btn-block"
                >Delete this exercise</button>
                </form>
        <div className="container">
        <div className="row">
          <div className="col-md-6 mt-5 mx-auto">
            <form noValidate onSubmit={this.onUpdate}>
              <h1 className="h3 mb-3 font-weight-normal">Edit this Exercise</h1>
              <div className="form-group">
                <label htmlFor="name">Exercise Title</label>
                <input
                  type="text"
                  className="form-control"
                  name="exerciseTitle"
                  placeholder="Enter a new title"
                  value={this.state.exerciseTitle}
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
            <form noValidate onSubmit={this.addtoPlaylist}>
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
        
      return (
          <div>
        <div className ="container">
                    <div className="row">
                    <div className="col-md-6 mt-5 mx-auto">
                        <h1>{this.state.exerciseTitle}</h1>
                        <h3>Type: {this.state.type}</h3>
                        <p>{this.state.videoAddress}</p>
                    </div>
                    </div>
                    </div>
          {this.state.isAdmin ? adminLinks : <div></div>}
        </div>
        
      )
    }
}

export default ExerciseId;