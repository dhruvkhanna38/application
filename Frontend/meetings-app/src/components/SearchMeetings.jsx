import React, { Component } from 'react';
import {getMeetings} from '../services/meetings.js'

class SearchMeetings extends Component {
    constructor(props){
        super(props);
        this.state = {
            status: "Fetching"
        }
    }

    componentDidMount() {
        this.renderMeetings();
      }
      
    renderMeetings = async() => {
        try {
          let meetings = getMeetings().then(response=>{
            this.setState({
                Meetings: response.map((meeting, i) =>{
                    return (
                    <div className="card container">
                            <li key={meeting._id} className="list-group-item">{meeting.description}</li>
                            <p>Members</p>
                            <ul>
                                {meeting.emails.map(email=><li key={email}>{email}</li>)}
                            </ul>
                            <p>{meeting.startHour}:{meeting.startMin} - {meeting.endHour}:{meeting.endMin}</p>
                            <p>{meeting.dateOfMeeting}</p>
                    </div>
                  )})
              });
            });
          // this will re render the view with new data
          
        } catch (err) {
          console.log(err);
        }
      }

    render() {
        return (
            <div className="container">
                <div className="row my-4">
                    <div className="col-12">
                        <h3>
                            Search For Meetings
                        </h3>
                        <hr />
                    </div>
                </div>
                <div className="col-12">
                    <form>
                        <div className="form-group row">
                            <label htmlFor="date" className="col-sm-3 col-form-label">Date</label>
                            <div className="col-sm-9">
                                <input type="date" className="form-control" name="date" id="date" placeholder="Select Date" />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="search" className="col-sm-3 col-form-label">Search For</label>
                            <div className="col-sm-9">
                                <input type="text" className="form-control" name="search" id="search" placeholder="Search using words which describe the meeting" />
                            </div>
                        </div>
                        
                        <div className="form-group row">
                            <button className="btn btn-primary">Submit</button>
                        </div>
                    </form>
                </div>
                <div>
                        {this.state.Meetings}         
                </div>
            </div>
        );
    }
}

export default SearchMeetings;