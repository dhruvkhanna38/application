import React, { Component } from 'react';
import {getMeetingByDate} from "../services/meetings.js";
const moment = require("moment");


class Calender extends Component {
    constructor(props){
        super(props);
        this.state = {
            Status:'Fetching',
            Meetings : null,
            dateOfMeeting : moment().format('DD/MM/YYYY')
        }
        this.dateInputRef = React.createRef()
        
    }
    updateCredentials = async ()=>{
        this.setState({
            dateOfMeeting: await moment(new Date(this.dateInputRef.current.value)).format('DD/MM/YYYY')
        });
        this.componentDidMount()
    }

    componentDidMount=  async ()=>{
        try{
            const meetings = await getMeetingByDate(this.state.dateOfMeeting);
            this.setState({
                Status:'Fetched',
                Meetings:meetings
            })
            
        }catch(error){
            alert("Invalid Date");
        }
    }

    render() {
        let el = {}
        switch(this.state.Status){
            case 'Fetching' : el = this.state.Status
                              break;
            case 'Fetched' : el = (
                this.state.Meetings.map((meeting, i)=>{
                    return (
                        <div className="container mt-2 mb-2" key={meeting._id}>
                            <div className="card" key={meeting._id}>
                                <div className="card-header">
                                    {meeting.description}
                                </div>
                                <div className="card-body">
                                    <h5 className="card-title alert-primary mt-2">Timings: {meeting.startHour}:{meeting.startMin} - {meeting.endHour}:{meeting.endMin}</h5>
                                    <p className="card-text alert alert-success">Date: {meeting.dateOfMeeting}</p>
                                    <div className="card" >
                                        <div className="card-header">
                                            Members
                                        </div>
                                        <ul className="list-group list-group-flush">
                                            {meeting.emails.map(email=><li className="list-group-item" key={email}>{email}</li>)}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                  )
                })
            );
        }
        return (
            <div>
                <div className="container">
                        <h1>Calender</h1>
                        <hr />
                        <form>
                            <div className="form-group " >
                                <label htmlFor="date" className="w-100 col-form-label alert alert-primary">Enter Date Below</label>
                                <input type="date" className="form-control" name="date" value={this.state.dateOfMeeting.toString()} id="date" placeholder="Select Date" ref={this.dateInputRef} onChange={this.updateCredentials} />
                            </div>
                        </form>
                        <div className="alert alert-primary w-25 mt-2" role="alert">
                            Date: {this.state.dateOfMeeting}
                        </div>
                </div>
                
                <div>
                    {el}
                </div>
            </div>
        );
    }
}

export default Calender;