import React, { Component } from 'react'
import jwt_decode from 'jwt-decode'
import axios from 'axios'
import {Link} from 'react-router-dom';
const REACT_APP_SERVER_URL = process.env.REACT_APP_SERVER_URL;


class Playlist extends Component {
        constructor() {
          super()
          this.state = {
            name: '',
            email: '',
            errors: {},
            isAdmin: '',
            id: '',
            playlists: [],
            newPlaylist:''
          }
          this.onChange = this.onChange.bind(this)
            this.onSubmitNew = this.onSubmitNew.bind(this)
        }

    playlist = () => {
        axios.get(`${REACT_APP_SERVER_URL}/exercises/playlist/all`,{
        }).then(response =>{
            this.setState({
                playlists: response.data
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
      onChange(e) {
        this.setState({ [e.target.name]: e.target.value })
      }
      onSubmitNew(e) {
        e.preventDefault()
    
        const newPlaylist = {
          name: this.state.newPlaylist
        }

        axios.post(`${REACT_APP_SERVER_URL}/exercises/playlist/new`, {
            name: newPlaylist.name,
        }).then(response =>{
            console.log(response)
        }).catch (err =>{
            console.log(err)
        })    
        }

    render() {
        const playlists = this.state.playlists
        console.log(playlists)
        const showPlaylists = playlists.map((playlist, i) =>{
            return (
                <div className ="container">
                    <div className="row">
                    <div className="col-md-6 mt-5 mx-auto">
                <h1>{playlist.name}</h1>
                <h3><Link className="viewDetailLink" to= {{pathname: `/playlist/${playlist.id}`}}>View this playlist's exercises</Link></h3>
                {/* <form onSubmit={this.onDelete}>
                    <input type="hidden" value={playlist.name}></input>
                <button type="submit"
                className = "btn btn-lg btn-primary btn-block"
                >Delete this playlist</button>
                </form> */}
                </div>
                </div>
                </div>
            )
        })
    
      return (
          <div>
              {showPlaylists}
              <div className="container">
        <div className="row">
          <div className="col-md-6 mt-5 mx-auto">
            <form noValidate onSubmit={this.onSubmitNew}>
              <h1 className="h3 mb-3 font-weight-normal">Create a new Playlist</h1>
              <div className="form-group">
                <label htmlFor="name">Name</label>
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
                Add another!
              </button>
            </form>
          </div>
        </div>
      </div>
          </div>
      )
    }
}

export default Playlist;