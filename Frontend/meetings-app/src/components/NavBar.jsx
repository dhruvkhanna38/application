import React from 'react';
import { Link } from 'react-router-dom';
import {isLoggedIn, logout} from "../services/auth.js"
import { Redirect , withRouter} from 'react-router-dom'

class NavBar extends React.Component {
    constructor(props){
        super(props);
    }

    logoutFunction = async()=>{
        await logout();
        this.props.history.push("/");
    }
    

    // b4-navbar-minimal-ul
    render (){
        return (
            <nav className="navbar navbar-expand navbar-dark bg-dark">
            <ul className="nav navbar-nav">
                <li className="nav-item active">
                    <Link className="nav-link" to="/">Home</Link>
                </li>
               <li className="nav-item active">
                  {isLoggedIn?<Link className="nav-link" to="/meetings">Meetings</Link>:''}
                </li>
                <li className="nav-item active">
                  {isLoggedIn?<Link className="nav-link" to="/calender">Calender</Link>:''}
                </li>
            </ul>
            <ul className="nav navbar-nav navbar-right" >
                <li className="nav-item active">
                   {!isLoggedIn?<Link className="nav-link" to="/login">Login</Link>:''}
                </li>
                <li className="nav-item active">
                   {!isLoggedIn?<Link className="nav-link" to="/signup">Signup</Link>:''}
                </li>
                <li className="nav-item active">
                    {isLoggedIn?<button onClick={this.logoutFunction} className="btn btn-sm btn-info">Logout</button>:''}
                </li>
            </ul>
        </nav>)
    }
}

export default withRouter(NavBar);