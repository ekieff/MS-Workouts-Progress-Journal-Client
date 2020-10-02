import React from 'react';
import {Link} from 'react-router-dom';

const Welcome = () => {
    return(
        <div className="welcomeDiv">
            <div>
            <h1 className="text-center">Welcome To MS Workouts Progress Journal</h1>
            <h3 className="text-center"><Link className="viewDetailLink" to= {{pathname: `/playlist`}}>View Playlists</Link></h3>
            <h3 className="text-center"><Link className="viewDetailLink" to= {{pathname: `/exercises`}}>View All Exercises</Link></h3>
            </div>
        </div>
    )
}
export default Welcome;