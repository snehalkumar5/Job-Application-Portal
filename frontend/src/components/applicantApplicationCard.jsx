import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import axios from 'axios';

import conf from '../utils/config';

export default class ApplicantApplicationCard extends Component {
    render() {
        return (
            <div className="card shadow-move">
                <div className="card-body">
                    <h4 className="card-title">{this.props.application.applicationId.name}</h4>
                    <p className="card-text">
                        <b>Recruiter: </b>{this.props.application.applicationId.recruiterId.name}<br />
                        <b>Date of application: </b>{this.props.application.applicationId.dateofapply}<br />
                        <b>Date of acceptance: </b>{this.props.application.dateofaccept}<br />
                        <b>Status: </b>{
                            (() => {
                                if (this.props.application.applicationId.status == conf.APPLIED)
                                    return <React.Fragment>Applied</React.Fragment>
                                else if (this.props.application.applicationId.status == conf.SELECTED)
                                    return <React.Fragment>Selected</React.Fragment>
                                else if (this.props.application.applicationId.status == conf.REJECTED)
                                    return <React.Fragment>Rejected</React.Fragment>
                                else if (this.props.application.applicationId.status == conf.NOTAPPLIED)
                                    return <React.Fragment>Apply</React.Fragment>
                            })()
                        }<br />
                        {/* Remaining quantity shown in product details */}
                        {/* {(() => {
                            if (this.props.application.applicationId.status === conf.PROD_TYPE_WAIT)
                                return (<React.Fragment><b>Remaining Quantity: </b> {this.props.application.remQuan}<br /></React.Fragment>)
                        })()} */}
                    </p>
                    <Link className="btn red shadow-move" id={this.props.application._id} to={
                        {
                            pathname: "/applicant/application/details",
                            state: {
                                applicationId: this.props.application._id
                            }
                        }
                    }>View</Link>
                </div>
            </div>
        );
    }
}