import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import axios from 'axios';

import {Button} from 'reactstrap'
import RecruiterJobCard from './recruiterJobCard';

export default class RecruiterJobList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            jobs: [],
            error: null,
            isLoaded: false
        };
        this.handleClick = this.handleClick.bind(this);
    }
    componentDidMount() {
        axios({
            method: "GET",
            url: "http://localhost:4000/recruiter/job/list",
        }).then((response) => {
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
    handleClick(e) {
        console.log(e);
        axios({
            method: "GET",
            url: `http://localhost:4000/recruiter/job/${e}`,
        }).then((response) => {
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
        if (!this.state.isLoaded) {
            return <h1>Loading...</h1>;
        }
        if (this.state.error) {
            return <h1>Error</h1>
        }
        let jobList = null;
        jobList = this.state.jobs.map((job,id) => 
                    <RecruiterJobCard job={job} backPath="" />
        );
        console.log(jobList);
        return (
            <>
                <div className="container">
                <Button color="link" href="/recruiter/dashboard">&#8592;Back</Button>
                <Button color="link" className="float-right" href="/recruiter/job/add">Add job</Button>
                    {jobList}
                </div>
            </>
        );
    }
}