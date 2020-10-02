import React, {Component} from 'react';
import {Link} from 'react-router-dom';

const PlaylistShow = (props) => {
    return(
        <div>
            <h1>{props.playlist.name}</h1>
        </div>
    )
}

export default PlaylistShow