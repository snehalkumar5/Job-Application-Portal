import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import axios from 'axios';

import landingPic from '../assets/img/landing.svg'

export default class Landing extends Component {
    render() {
        return (
    
            <div className="container mt-5">
                
                <div className="row">
                    <div className="col-12 text-center">
                        <img src={landingPic} height="200"></img>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <h1 className="big-text text-center mb-0">Job Portal</h1>
                    </div>
                </div>
                <div className="row mt-0">
                    <div className="col-12">
                        <h4 className="text-center small-text">by Snehal</h4>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 d-flex flex-column flex-md-row justify-content-center">
                        <Link to="/auth/register/applicant" className="shadow-move btn red mx-md-2 my-2 my-md-0">Register as Applicant</Link>
                        <Link to="/auth/register/recruiter" className="shadow-move btn muave mx-md-2 my-2 my-md-0">Register as Recruiter</Link>
                        <Link to="/auth/login" className="shadow-move btn light-grey mx-md-2 my-2 my-md-0">Login</Link>
                    </div>
                </div>
    
            </div>
        )
    }
}