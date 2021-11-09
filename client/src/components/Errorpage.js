import React from 'react'
import {NavLink} from 'react-router-dom'

const Errorpage = () => {
    return (
      <div className="container-fluid pt-3">
            <h1>This is Error page</h1>
            <NavLink to="/">Back to Home Page</NavLink>
        </div>
        
    );
}

export default Errorpage
