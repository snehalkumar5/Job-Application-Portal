import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import axios from 'axios';
import {Button} from 'reactstrap'
import addPic from '../assets/img/vendor-add.svg';
import conf from '../utils/config';

export default class RecruiterJobCard extends Component {
    constructor(props){
        super(props);
        this.handleCancel = this.handleCancel.bind(this)
    }
    remove(e) {
        e.preventDefault();
        axios({
            method: "POST",
            url: "http://localhost:4000/applicant/job/list",
        }).then((response) => {
            console.log(response);
            this.setState({
                jobs: response.data,
                error: null,
                isLoaded: true
            });
        }).catch(error => {
            if (error) {
                console.log(error);
                this.setState({ error: error.response.data });
            }
        });
    }
    handleCancel(e) {
        e.preventDefault();
        const data = {
            jobId: this.props.job._id,
        }
        axios({
            method: "POST",
            url: "http://localhost:4000/recruiter/job/cancel",
            data: data,
            headers: {
                'Content-Type': 'application/json',
            }
        }).then((response) => {
            console.log(response)
            if (response.status == 200) {
                alert("The job has been removed!");
                window.location.replace("http://localhost:3000/recruiter/jobs")
            }
        }).catch(error => {
            if (error) {
                console.log(error);
            }
        });
    }
    remove(e) {
        e.preventDefault();
        axios({
            method: "POST",
            url: "http://localhost:4000/applicant/job/list",
        }).then((response) => {
            console.log(response);
            this.setState({
                jobs: response.data,
                error: null,
                isLoaded: true
            });
        }).catch(error => {
            if (error) {
                console.log(error);
                this.setState({ error: error.response.data });
            }
        });
    }
    render() {
        return (
            <div className="card shadow-move">
                <div className="row mx-2">
                    <div className="card-body col-md-9 col-12">
                        <h4 className="card-title">{this.props.job.title}</h4>
                        <p className="card-text">
                            <b>Type: </b>{this.props.job.type}<br />
                            <b>Date of posting: </b>{this.props.job.date.toString().substring(0,10)}<br />
                            <b>Deadline: </b>{this.props.job.deadline.toString().substring(0,10)}<br />
                            <b>Application: </b>{this.props.job.applications}<br />
                            <b>Status: </b>{(() => {
                                if (this.props.job.status === "Apply")
                                    return <span>Apply</span>
                                else if (this.props.job.status === "Full")
                                    return <span>Full</span>
                                else if (this.props.job.status === "Rejected")
                                    return <span>Rejected</span>
                                else
                                    return <span>Applied</span>
                            })()}
                            <br />
                            {(() => {
                                if (this.props.job.status === "Selected")
                                    return (<><b>Remaining Quantity: </b> {this.props.job.positions}<br /></>)
                            })()}
                            <b>Rating: </b>{this.props.job.rating}<br />
                        </p>
                        <Button color="info" className="float-left mr-3"><Link to={
                            {
                                pathname: `/recruiter/job/${this.props.job._id}`,
                            }
                           }>Details</Link></Button>
                        <Button color="danger" className="float-right" onClick={this.handleCancel}>Delete</Button>
                        <Button color="warning" className="float-right mr-3"><Link to={
                            {
                                pathname: "/recruiter/jobs/edit",
                                state:{
                                    jobId: this.props.job,
                                }
                            }
                           }>Edit</Link></Button>
                    </div>
                </div>
            </div>
        );
    }
}
