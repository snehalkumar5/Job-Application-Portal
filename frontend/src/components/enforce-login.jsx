import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";

export default class EnforceLogin extends Component {
    render()
    {
        console.log("EnforceLogin",this.props);
        let isLoggedIn = true;
        if (!this.props.isLoggedIn) {
            isLoggedIn = false;
        }
        if (!this.props.desiredType.includes(this.props.type)) {
            isLoggedIn = false;
        }
        console.log(this.props.isLoggedIn,isLoggedIn);
        if(!isLoggedIn && localStorage && localStorage.portaltoken) {
            this.props.attemptLogin(localStorage.portaltoken);
            isLoggedIn = true;
        }
        let userTypes = ["applicant", "recruiter"];
        console.log("islogged",this.props);
        let str = ""; 
    for(let i=1;i<this.props.path.length; i++)
    {
        if(this.props.path[i] === '/') break;
        str += this.props.path[i];
    } 
    if (!isLoggedIn || userTypes[1-parseInt(this.props.type)] === str) {
        console.log("redirect to login");
        return <Redirect to="/auth/login" />;
    } else {
        console.log("else mein",this.props);
        if (this.props.hasProps) {
            return <Route to={this.props.path} render={
                (props) => this.props.component
            } />;
        } else {
            return <Route to={this.props.path} exact component={this.props.component}/>
        }
    }
    }
}
