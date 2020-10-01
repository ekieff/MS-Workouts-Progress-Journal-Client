import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Navbar from './components/partials/Navbar'
import Landing from './components/partials/Landing'
import Login from './components/user/Login'
import Register from './components/user/Signup'
import Profile from './components/user/Profile'
import Playlist from './components/playlist/Playlist'
import Exercise from './components/exercise/Exercise'
import ExerciseId from './components/exercise/ExerciseId'
import PlaylistId from './components/playlist/PlaylistId'

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Navbar />
          <Route exact path="/" component={Landing} />
          <div className="container">
            <Route exact path="/signup" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/playlist" component={Playlist} />
            <Route exact path="/exercises" component={Exercise} />
            <Route exact path="/exercises/:id" component={ExerciseId} />
            <Route exact path="/playlist/:id" component={PlaylistId} />
          </div>
        </div>
      </Router>
    )
  }
}

export default App