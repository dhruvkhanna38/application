/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { Component } from 'react';
import {getProfile, setProfileNavbar, updateUserEmail,updatePassword, setProfilePicture} from "../services/meetings.js" 
import {logout} from "../services/auth.js"

class Profile extends Component {
    constructor(props){
        super(props);
        this.state = {
            Status:'Fetching',
            profile : null,
            image:null,
            email:null,
            imageURL:"https://icons.iconarchive.com/icons/icons8/windows-8/128/Photo-Video-Slr-Back-Side-icon.png"
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
            await uploadToS3(this.state.image);
            alert("Profile Image Updated");
            await this.componentDidMount()
            await this.props.history.push("/")
            //await window.location.reload();
        }catch(error){
            alert("Only .jpg, .jpeg and .png files less than 2MB size are allowed");
        }
    }

    componentDidMount = async ()=> {
        try{
            let profile = await getProfile();
            console.log(profile)
            await this.setState({
                profile:profile,
                Status:'Fetched',
                imageURL:profile.user.avatar
            })
        }catch(error){
            alert("Cannot Get Profile");
        }
    }

    
    render() {
        const {profile, imageURL} = this.state;
        let el = {};
        // eslint-disable-next-line default-case
        switch(this.state.Status){
            case 'Fetching' : el = "Fetching User Profile"
                                break;
            case 'Fetched' : el = (
                        <div>
                            <div className="card w-50 mt-5 mx-auto h-25" >
                                <img className="card-img-top rounded img-thumbnail w-50 m-auto" src={this.state.imageURL} alt="Card image cap" />
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

const uploadToS3 = async (image)=>{
    const formData = new FormData(); 
    await formData.append( 
        "profile", 
        image, 
        image.name 
    ); 
    var S3 = require("aws-sdk/clients/s3");
    const BUCKET_NAME = "profile-pictures-meetings-app";
    const IAM_USER_KEY = "AKIAIWAALGDAMVC5IXFA";
    const IAM_USER_SECRET = "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";
    
    const s3bucket = new S3({
        apiVersion: '2006-03-01',
        accessKeyId: IAM_USER_KEY,
        secretAccessKey: IAM_USER_SECRET,
        Bucket: BUCKET_NAME
    });

    let contentType = "image/jpeg";
    let contentDeposition = 'inline;filename="' +image.name   + '"';
    const params = {
        Bucket: BUCKET_NAME,
        Key: image.name,
        Body: image,
        ContentDisposition: contentDeposition,
        ContentType: contentType
    };
    let url = ""
    await s3bucket.upload(params, async (err, data) => {
            url = data.Location;
            await console.log( data.Location);
            await setProfileNavbar(image);
            await setProfilePicture(data.Location);
    });
    return url;
}

export default Profile;


