import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import axios from 'axios';
import {Button} from 'reactstrap'
export default class RecruiterDashboard extends Component {
    render() {
        return (
            <>
                <Button color="warning" href="/recruiter/jobs/add" className="ml-3">Create a new Job listing</Button>
                <Button color="primary" href="/recruiter/jobs" className="ml-3">View all active jobs</Button>
                <Button color="info" href="/recruiter/myemployees" className="ml-3">View accepted employees</Button>
            </>
        );
    }
}