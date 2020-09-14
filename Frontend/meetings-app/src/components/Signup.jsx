import React, { Component } from 'react';
import {signup} from "../services/auth.js"

class Signup extends Component {

    constructor(props){
        super(props);
        this.state = {
            email :'',
            password : ''
        }
        this.emailInputRef = React.createRef();
        this.passwordInputRef = React.createRef();
        this.nameInputRef = React.createRef();
    }

    signup = (event)=>{
        event.preventDefault();
        signup(this.state);
    }

    updateCredentials = ()=>{
        this.setState({
            email:this.emailInputRef.current.value, 
            password:this.passwordInputRef.current.value,
            name:this.nameInputRef.current.value
        });
    }
    
    
    render() {
        return (
            <div className="container">
                <div className="row my-4">
                    <div className="col-12">
                        <h3>
                            Signup
                        </h3>
                        <hr />
                    </div>
                </div>
                <div className="col-12">
                    <form onSubmit={this.signup}>
                        <div className="form-group row">
                                <label htmlFor="name" className="col-sm-3 col-form-label">Name</label>
                                <div className="col-sm-9">
                                    <input type="name" className="form-control" name="name" id="name" placeholder="Enter Name" ref={this.nameInputRef} onChange={this.updateCredentials} />
                                </div>
                        </div>
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
                            <button className="btn btn-primary">Sign Up</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default Signup;