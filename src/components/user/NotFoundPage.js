import React, { Component } from 'react'
import jwt_decode from 'jwt-decode'
import {Link} from 'react-router-dom';

class NotFoundPage extends Component {
    render(){
        return(
            <div>
            <h1>Sorry, that's not a valid page, try going back to the homepage</h1>
            <Link className="viewDetailLink" to= {{pathname: `/profile`}}>Go back home</Link>
            </div>
        )
    }
}

export default NotFoundPage