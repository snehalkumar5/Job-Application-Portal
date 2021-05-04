import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";

import img3 from '../assets/img/img3.svg';
import img1 from '../assets/img/img1.png';
import img2 from '../assets/img/img2.svg';

export default class ApplicantDashboard extends Component {
    render() {
        return (
            <>
                <div className="container">
                    <div className="row mb-5">
                        <div className="col-12 text-center">
                            <img src={img2} height="150" />
                        </div>
                    </div>
                    <div className="row mb-4">
                        <div className="col-12 w-md-75">
                            <div className="card shadow-move">
                                <div className="row mx-2">
                                    <div className="col-3 d-none d-md-flex text-center align-items-center justify-content-center">
                                        <img src={img1} className="mx-2 card-pic" width="100%" />
                                    </div>
                                    <div className="card-body col-md-9 col-12">
                                        <h4 className="card-title">Apply for job</h4>
                                        <p className="card-text">Search for jobs and apply here.</p>
                                        <Link to="/applicant/job/list" className="btn red shadow-move">Apply Now</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row mb-4">
                        <div className="col-12 w-md-75">
                            <div className="card shadow-move">
                                <div className="row mx-2">
                                    <div className="col-3 d-none d-md-flex text-center align-items-center justify-content-center">
                                        <img src={img3} className="mx-2 card-pic" width="100%" />
                                    </div>
                                    <div className="card-body col-md-9 col-12">
                                        <h4 className="card-title">Your applications</h4>
                                        <p className="card-text">View all your applications here.</p>
                                        <Link to="/applicant/myapplications" className="btn red shadow-move">View Applications</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}