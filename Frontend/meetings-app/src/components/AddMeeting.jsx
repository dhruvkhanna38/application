import React, { Component } from 'react';
import Meetings from './Meetings'
import {addMeeting} from "../services/meetings.js"
import {getEmail} from "../services/auth.js"
const moment = require('moment');


class AddMeeting extends Component {

    constructor(props){
        super(props);
        this.state = {
         dateOfMeeting:moment().format('DD/MM/YYYY'),
         startHour : 0 ,
         startMin : 0 , 
         endHour: 0, 
         endMin :0, 
         description : "",
         emails:[]
        }
        this.dateInputRef = React.createRef();
        this.shInputRef = React.createRef();
        this.smInputRef = React.createRef();
        this.ehInputRef =React.createRef();
        this.emInputRef = React.createRef();
        this.descInputRef = React.createRef();
        this.emailInputRef = React.createRef();
        this.state.emails.push(getEmail());
        
    }

    createEmailArray = ()=>{
        let emailsArray = this.emailInputRef.current.value;
        let emailsArr = emailsArray.split(',');
        emailsArr = emailsArr.filter(email=>email!=="")
        return emailsArr;
    }

    updateCredentials =()=>{
        this.setState({
            dateOfMeeting:moment(new Date(this.dateInputRef.current.value)).format('DD/MM/YYYY'), 
            startHour:Number(this.shInputRef.current.value),
            startMin:Number(this.smInputRef.current.value),
            endHour:Number(this.ehInputRef.current.value),
            endMin:Number(this.emInputRef.current.value),
            description:this.descInputRef.current.value,
        })
    }

    addMeetingFunction = async (event)=>{
        event.preventDefault();
        const emailsArr = await this.createEmailArray();
        
        await this.setState({
            emails:emailsArr
        })
        console.log(this.state);
        addMeeting(this.state).then(()=>{alert("Meeting Submitted")}).catch(error=>alert(error));
    }

    render() {
        return (
            <div className="container">
                <div className="row my-4">
                    <div className="col-12">
                        <h3>
                            Add Meeting
                        </h3>
                        <hr />
                    </div>
                </div>
                <div className="col-12">
                    <form onSubmit={this.addMeetingFunction}>
                        <div className="form-group row">
                            <label htmlFor="date" className="col-sm-3 col-form-label">Date</label>
                            <div className="col-sm-9">
                                <input type="date" className="form-control" name="date" id="date" placeholder="Select Date" ref={this.dateInputRef} onChange={this.updateCredentials}/>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="startTime" className="col-sm-3 col-form-label">Start Time</label>
                            <div className="col-sm-9">
                                <input type="number" className="form-control" name="startHour" id="startHour" placeholder="Enter Start Hours" ref={this.shInputRef} onChange={this.updateCredentials} />
                                <input type="number" className="form-control" name="startMin" id="startMin" placeholder="Enter Start Minutes" ref={this.smInputRef} onChange={this.updateCredentials} />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="endTime" className="col-sm-3 col-form-label">End Time</label>
                            <div className="col-sm-9">
                                <input type="number" className="form-control" name="endHour" id="endHour" placeholder="Enter Ending Hours" ref={this.ehInputRef} onChange={this.updateCredentials}/>
                                <input type="number" className="form-control" name="endMin" id="endMin" placeholder="Enter Ending Minutes" ref={this.emInputRef} onChange={this.updateCredentials}/>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="emails" className="col-sm-3 col-form-label">Emails of Attendees</label>
                            <div className="col-sm-9">
                                <input type="text" className="form-control" name="emails" id="emails" placeholder="john@example.com,jane@example.com" ref={this.emailInputRef} onChange={this.updateCredentials} />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="description" className="col-sm-3 col-form-label">Description</label>
                            <div className="col-sm-9">
                                <textarea className="form-control" id="description" name="description" rows="3" placeholder="What is the Agenda of the meeting?" ref={this.descInputRef} onChange={this.updateCredentials}></textarea>
                            </div>
                        </div>
                        <div className="form-group row">
                            <button className="btn btn-primary btn-lg w-100">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default AddMeeting;