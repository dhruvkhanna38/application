import React, { Component } from 'react';
import {getProfile, setAvatar, updateUserEmail,updatePassword} from "../services/meetings.js" 
import {logout} from "../services/auth.js"

class Profile extends Component {
    constructor(props){
        super(props);
        this.state = {
            Status:'Fetching',
            profile : null,
            image:null,
            email:null
        }
        this.imageInputRef = React.createRef();
        this.emailInputRef = React.createRef();
        this.currentPasswordInputRef = React.createRef();
        this.newPasswordInputRef =  React.createRef();
        this.newPasswordVerifyInputRef = React.createRef();
    }

    onPasswordSubmit = async(e)=>{
        e.preventDefault();
        const np = this.newPasswordVerifyInputRef.current.value;
        const npv = this.newPasswordInputRef.current.value;
        if(np!== npv){
            alert("Passwords Do Not Match");
            return;
        }
        const cp = this.currentPasswordInputRef.current.value;
        try{
            await updatePassword(cp, np);
            alert("Password Changed! Please Login Again");
            logout();
            this.props.history.push("/login");
        }catch(error){
            alert("Password sholud be atleast 7 characters long");
        }
    }
    updateEmail = ()=>{
        this.setState({
            email:this.emailInputRef.current.value
        })
    }

    onFileSelection = (e)=>{
        this.setState({image:e.target.files[0]})
    }

    onEmailSubmit = async (e)=>{
        e.preventDefault();
        try{
            await updateUserEmail(this.state.email)
            alert("Email Changed");
            this.componentDidMount();
        }catch(error){
            alert("Enter Valid Email");
        }   
    }

    onFormSubmit = async (e)=>{
        e.preventDefault(); // Stop form submit
        try{
            await setAvatar(this.state.image);
            alert("Profile Image Updated");
            this.componentDidMount();
            this.props.history.push("/");
            window.location.reload();
        }catch(error){
            alert("Only .jpg, .jpeg and .png files less than 2MB size are allowed");
        }
    }

    componentDidMount = async ()=> {
        try{
            let profile = await getProfile();
            let imageURL = "https://icons.iconarchive.com/icons/icons8/windows-8/128/Photo-Video-Slr-Back-Side-icon.png"
            if(profile.user.avatar){
                imageURL = `https://radiant-lowlands-13182.herokuapp.com/users/${profile.user._id}/avatar`;
            }
            this.setState({
                profile:profile,
                imageURL:imageURL,
                Status:'Fetched'
            })
        }catch(error){
            alert("Cannot Get Profile");
        }
    }

    
    render() {
        const {profile, imageURL} = this.state;
        let el = {};
        switch(this.state.Status){
            case 'Fetching' : el = "Fetching User Profile"
                                break;
            case 'Fetched' : el = (
                <div>
                            <div className="card w-50 mt-5 mx-auto h-25" >
                                <img className="card-img-top rounded img-thumbnail w-50 m-auto" src={imageURL} alt="Card image cap" />
                                <div className="card-body">
                                    <h5 className="card-title">{profile.user.name}</h5>
                                    <p className="card-text">{profile.user.email}</p>
                                    <form className="form-group row alert alert-info" onSubmit={this.onFormSubmit} encType="multipart/form-data">
                                        <label forhtml="avatar" className="col-form-label">Update Profile Picture</label>
                                        <input type="file" name="avatar" className="form-control-file" onChange={this.onFileSelection}/>
                                        <button className="btn btn-primary w-100 mt-3">Submit</button>
                                    </form>
                                </div>
                            </div>
                            <div>
                                <form onSubmit={this.onEmailSubmit} className="form-group row alert alert-info w-50 m-5 mx-auto">
                                            <label forhtml="email" className="col-form-label">Update Email</label>
                                            <input type="text" name="email" className="form-control-file" ref={this.emailInputRef} onChange={this.updateEmail}/>
                                            <button className="btn btn-primary w-100 mt-3">Submit</button>
                                </form>
                                <form onSubmit={this.onPasswordSubmit} className="alert alert-info w-50 m-5 mx-auto">
                                            <div className="alert alert-dark" role="alert">
                                                Change Password
                                            </div>
                                            <label forhtml="email" className="col-form-label">Old Password</label>
                                            <input type="password" name="oldPassword" className="form-control-file" ref={this.currentPasswordInputRef}/>
                                            <label forhtml="email" className="col-form-label">New Password</label>
                                            <input type="password" name="newPassword" className="form-control-file" ref={this.newPasswordInputRef}/>
                                            <label forhtml="email" className="col-form-label">Confirm New Password</label>
                                            <input type="password" name="newPasswordVerify" className="form-control-file" ref={this.newPasswordVerifyInputRef}/>
                                            <button className="btn btn-primary w-100 mt-3">Submit</button>
                                </form>
                            </div>
                        </div>
            )
                    break;
        }
        
        return (
            <div>
                {el}
            </div>
        );
    }
}

export default Profile;


