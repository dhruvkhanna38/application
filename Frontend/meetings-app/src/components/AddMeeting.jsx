import React, { Component } from 'react';
import Meetings from './Meetings'
import {addMeeting} from "../services/meetings.js"

class AddMeeting extends Component {
    constructor(props){
        super(props);
        this.state = {
         dateOfMeeting:new Date().toLocaleDateString(),
         startHour : 0 ,
         startMin : 0 , 
         endHour: 0, 
         endMin :0, 
         description : "",
         
        }
        this.dateInputRef = React.createRef();
        this.shInputRef = React.createRef();
        this.smInputRef = React.createRef();
        this.ehInputRef =React.createRef();
        this.emInputRef = React.createRef();
        this.descInputRef = React.createRef();
        
    }
    updateCredentials =()=>{
        this.setState({
            dateOfMeeting:this.dateInputRef.current.value, 
            startHour:Number(this.shInputRef.current.value),
            startMin:Number(this.smInputRef.current.value),
            endHour:Number(this.ehInputRef.current.value),
            endMin:Number(this.emInputRef.current.value),
            description:this.descInputRef.current.value,
            
        })
    }

    addMeetingFunction = (event)=>{
        event.preventDefault();
        addMeeting(this.state);
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
                        <div className="form-group">
                            <label htmlFor="description">Description</label>
                            <textarea className="form-control" id="description" name="description" rows="3" placeholder="What is the Agenda of the meeting?" ref={this.descInputRef} onChange={this.updateCredentials}></textarea>
                        </div>
                        <div>
                            <label htmlFor="emails" className="col-sm-3 col-form-label">Emails of Attendees</label>
                            <div className="col-sm-9">
                                <input type="text" className="form-control" name="emails" id="emails" placeholder="john@example.com, jane@example.com" />
                            </div>
                        </div>
                        <div className="form-group row">
                            <button className="btn btn-primary">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default AddMeeting;