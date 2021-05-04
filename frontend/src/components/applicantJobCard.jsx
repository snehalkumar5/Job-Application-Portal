import React, { Component } from 'react';
import axios from 'axios';
import conf from '../utils/config';

export default class ApplicantJobCard extends Component {
    render() {
        return (
            <div className="card shadow-move">
                    <div className="card-body col-5">
                        <h4 className="card-title">{this.props.job.title}</h4>
                        <p className="card-text">
                            <b>Recruiter: </b>{this.props.job.recruiterId.name}<br />
                            <b>Job Rating: </b>{this.props.job.rating}<br />
                            <b>Salary: </b>{this.props.job.salary}<br />
                            <b>Duration: </b>{this.props.job.duration}<br />
                            <b>Skills: </b>{this.props.job.skills}<br />
                            <b>Deadline: </b>{this.props.job.deadline.toString().substring(0,10)}<br />
                            {(() => {
                                if (this.props.job.status !== conf.APPLIED)
                                    return (<><b>Status: </b> {this.props.job.status}<br /></>)
                            })()}
                        </p>
                        {/* <Link className="btn red shadow-move" id={this.props.job._id} onClick={this.props.onClick} to={
                            {
                                pathname: "/applicant/myapplications",
                                state: {
                                    jobId: this.props.job._id
                                }
                            }
                        }>Apply</Link> */}
                    </div>
            </div>
        );
    }
}