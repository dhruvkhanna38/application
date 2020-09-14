import React from 'react';
import NavBar from './NavBar';
import Home from "./Home";
import Login from "./Login";
import Meetings from "./Meetings";
import Signup from "./Signup";
import { Route, withRouter, BrowserRouter} from 'react-router-dom';
import Calender from "./Calender";

class App extends React.Component {

    constructor(props){
        super(props);
    }


    render(){
        return (
        <BrowserRouter>
            <div>
                <NavBar />
                <Route path="/" exact>
                    <Home />
                </Route>
                <Route path="/login" exact>
                    <Login />
                </Route>
                <Route path="/meetings">
                    <Meetings />
                </Route>
                <Route path="/signup">
                    <Signup />
                </Route>
                <Route path="/calender">
                    <Calender />
                </Route>
            </div>
        </BrowserRouter>
    );
    }
    //WARNING! To be deprecated in React v17. Use componentDidMount instead.
    
}

export default withRouter(App);