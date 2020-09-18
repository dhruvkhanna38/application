import React, { Component } from 'react';
import {login} from "../services/auth.js";
import {Redirect} from 'react-router-dom';

class Login extends Component {

    constructor(props){
        super(props);
        this.state = {
            email :'',
            password : ''
        }
        this.emailInputRef = React.createRef();
        this.passwordInputRef = React.createRef();
    }

    
    login = async (event)=>{
        event.preventDefault();
        try{
            await login(this.state)
            this.props.history.push('/profile');
        }catch(error){
            alert("Invalid Credentials");
        }
    }

    updateCredentials = ()=>{
        this.setState({
            email:this.emailInputRef.current.value, 
            password:this.passwordInputRef.current.value
        });
    }
    
    
    render() {
        return (
            <div className="container">
                <div className="row my-4">
                    <div className="col-12">
                        <h3>
                            Login
                        </h3>
                        <hr />
                    </div>
                </div>
                <div className="col-12">
                    <form onSubmit={this.login}>
                        <div className="form-group row">
                            <label htmlFor="email" className="col-sm-3 col-form-label">Email</label>
                            <div className="col-sm-9">
                                <input type="email" className="form-control" name="email" id="email" placeholder="Enter Email" ref={this.emailInputRef} onChange={this.updateCredentials} />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="password" className="col-sm-3 col-form-label">Password</label>
                            <div className="col-sm-9">
                                <input type="password" className="form-control" name="password" id="password" placeholder="Enter Password" ref={this.passwordInputRef} onChange={this.updateCredentials}/>
                            </div>
                        </div>
                        <div className="form-group row">
                            <button className="btn btn-primary w-100">Login</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default Login;