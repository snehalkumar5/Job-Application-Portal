import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom';
import conf from '../utils/config';
import Login from './login'
export default class EnforceLogout extends Component {
    render() {
        console.log("ENFOREC LOGOUT");
        let isLoggedIn = true;
        if (!this.props.isLoggedIn) {
            isLoggedIn = false;
        }
        if (!this.props.desiredType.includes(this.props.type)) {
            isLoggedIn = false;
        }
        if (isLoggedIn) {
            if (this.props.type === conf.USER_APPLICANT) {
                return <Redirect to="/applicant/dashboard" />;
            } else {
                return <Redirect to="/recruiter/dashboard" />;
            }
        } else {
            if (this.props.hasProps) {
                return <Route to={this.props.path} component={() => <Login attemptLogin={this.props.attemptLogin} />} />
            } else {
                return <Route to={this.props.path} exact component={this.props.component} />
            }
        }
    }
}