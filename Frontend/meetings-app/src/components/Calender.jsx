import React, { Component } from 'react';

class Calender extends Component {
    render() {
        return (
            <div>
                <div className="container">
                        <h1>Calender</h1>
                        <hr />
                </div>
                <div className="container-fluid">
                    <div className="col-12">
                        <form >
                                <div className="form-group">
                                    <label htmlFor="date" className="col-sm-3 col-form-label">Date</label>
                                    <div className="col-sm-9">
                                        <input type="date" className="form-control" name="date" id="date" placeholder="Select Date" />
                                    </div>
                                </div>
                        </form>
                    </div>
                </div>
                
            </div>
        );
    }
}

export default Calender;