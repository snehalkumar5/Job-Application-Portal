import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link , Switch, Redirect} from "react-router-dom";
import jwt_decode from 'jwt-decode';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min';

import config from './utils/config';
import './App.css';

import TokenConfig from './utils/token';
import Navbar from './components/navbar'
import Landing from './components/landing'
import RegisterApplicant from './components/registerApplicant';
import RegisterRecruiter from './components/registerRecruiter';
import Login from './components/login';
import AddJob from './components/recruiterAddJob';
import EnforceLogin from './components/enforce-login';
import EnforceLogout from './components/enforce-logout';
import RecruiterDashboard from './components/recruiterDashboard';
import ApplicantDashboard from './components/applicantDashboard';
import RecruiterJobList from './components/recruiterJobs';
import ApplicantSearchJob from './components/applicantJobs';
import Register from './components/register';
import RecruiterProfile from './components/recruiterProfile';
import ApplicantProfile from './components/applicantProfile';
import MyEmployees from './components/recruiterEmployees';
import MyApplications from './components/applicantApplications';
import EditJob from './components/recruiterEditJob';
import JobApplications from './components/recruiterApplications'
class App extends Component {
	constructor() {
		super();
		this.state = {
			isLoggedIn: false,
			userName: null,
			userId: null,
			userType: null,
			token: null
		};
		this.attemptLogin = this.attemptLogin.bind(this);
		this.logout = this.logout.bind(this);
	}

	attemptLogin(token) {
		localStorage.setItem("portaltoken", token);
		TokenConfig(token);
		console.log("attemtped");
		const decoded = jwt_decode(token);
		console.log(decoded);
		this.setState({
			isLoggedIn: true,
			userName: decoded.name,
			userId: decoded.id,
			userType: parseInt(decoded.type),
			token: token
		});
	}
	logout() {
		if (localStorage && localStorage.portaltoken) {
			localStorage.removeItem("portaltoken");
		}

		this.setState({
			isLoggedIn: false,
			userName: null,
			userId: null,
			userType: null,
			token: null
		});

		return <Redirect to="/" />
	}

	componentDidMount() {
		if (localStorage && localStorage.portaltoken) {
			this.attemptLogin(localStorage.portaltoken);
		}
	}
  	render() {
		return (
			<Router>
				<Navbar logged={this.state.isLoggedIn} type={this.state.userType} userName={this.state.userName}/>
				<Route exact path="/" component={Landing} />
				
				<Route exact path = "/auth/register/applicant"
				render = {
						(props) => <EnforceLogout {...props}
						isLoggedIn={this.state.isLoggedIn}
						type={this.state.userType}
						desiredType={[config.USER_APPLICANT, config.USER_RECRUITER]}
						path='/auth/register/applicant'
						hasProps={false}
						attemptLogin={this.attemptLogin}
						component={RegisterApplicant}
						/>} />
				
				<Route exact path = "/auth/register/recruiter"
				render = {
						(props) => <EnforceLogout {...props}
						isLoggedIn={this.state.isLoggedIn}
						type={this.state.userType}
						desiredType={[config.USER_RECRUITER, config.USER_APPLICANT]}
						path='/auth/register/recruiter'
						hasProps={false}
						attemptLogin={this.attemptLogin}
						component={RegisterRecruiter}
						/>} />
				<Route exact path = "/auth/register"
				render = {
						(props) => <EnforceLogout {...props}
						isLoggedIn={this.state.isLoggedIn}
						type={this.state.userType}
						desiredType={[config.USER_APPLICANT, config.USER_RECRUITER]}
						path='/auth/register'
						hasProps={false}
						attemptLogin={this.attemptLogin}
						component={<Register formData={props.location.state.formData}/>}
						/>} />
				
				<Route exact path = "/auth/login"
				render = {
						(props) => <EnforceLogout {...props}
						isLoggedIn={this.state.isLoggedIn}
						type={this.state.userType}
						desiredType={[config.USER_RECRUITER, config.USER_APPLICANT]}
						path='/auth/login'
						hasProps={true}
						attemptLogin={this.attemptLogin}
						component={Login}
						/>} />

				<Route exact path = "/recruiter/profile"
				render = {
						(props) => <EnforceLogin {...props}
						isLoggedIn={this.state.isLoggedIn}
						type={this.state.userType}
						desiredType={[config.USER_RECRUITER]}
						path='/recruiter/profile'
						attemptLogin={this.attemptLogin}
						hasProps={true}
						component={<RecruiterProfile userName={this.state.userName} userId={this.state.userId}/>}
						/>} />

				<Route exact path = "/recruiter/dashboard"
				render = {
						(props) => <EnforceLogin {...props}
						isLoggedIn={this.state.isLoggedIn}
						type={this.state.userType}
						desiredType={[config.USER_RECRUITER]}
						path='/recruiter/dashboard'
						attemptLogin={this.attemptLogin}
						hasProps={false}
						component={RecruiterDashboard}
						/>} />
				<Route exact path = "/recruiter/jobs/add"
				render = {
						(props) => <EnforceLogin {...props}
						isLoggedIn={this.state.isLoggedIn}
						attemptLogin={this.attemptLogin}
						type={this.state.userType}
						desiredType={[config.USER_RECRUITER]}
						path='/recruiter/job/add'
						hasProps={true}
						component={<AddJob userName={this.state.userName}/>}
						/>} />
				<Route exact path = "/recruiter/jobs/edit"
				render = {
						(props) => <EnforceLogin {...props}
						isLoggedIn={this.state.isLoggedIn}
						type={this.state.userType}
						desiredType={[config.USER_RECRUITER]}
						path='/recruiter/job/edit'
						hasProps={true}
						attemptLogin={this.attemptLogin}
						component={<EditJob jobId={props.location.state.jobId	}/>}
						/>} />
				<Route exact path = "/recruiter/myemployees"
				render = {
						(props) => <EnforceLogin {...props}
						isLoggedIn={this.state.isLoggedIn}
						type={this.state.userType}
						desiredType={[config.USER_RECRUITER]}
						path='/recruiter/myemployees'
						hasProps={false}
						attemptLogin={this.attemptLogin}
						component={MyEmployees}
						/>} />
				
				<Route exact path = "/recruiter/jobs"
				render = {
						(props) => <EnforceLogin {...props}
						isLoggedIn={this.state.isLoggedIn}
						type={this.state.userType}
						desiredType={[config.USER_RECRUITER]}
						path='/recruiter/job/list'
						hasProps={false}
						attemptLogin={this.attemptLogin}
						component={RecruiterJobList}
						/>} />
				<Route path = "/recruiter/job/:id"
				render = {
					(props) => <EnforceLogin {...props}
					isLoggedIn={this.state.isLoggedIn}
					type={this.state.userType}
					desiredType={[config.USER_RECRUITER]}
					path='/recruiter/job/:id'
					hasProps={false}
					attemptLogin={this.attemptLogin}
					component={JobApplications}
					/>} />
				
				<Route exact path = "/applicant/dashboard"
				render = {
						(props) => <EnforceLogin {...props}
						isLoggedIn={this.state.isLoggedIn}
						type={this.state.userType}
						desiredType={[config.USER_APPLICANT]}
						path='/applicant/dashboard'
						hasProps={false}
						attemptLogin={this.attemptLogin}
						component={ApplicantDashboard}
						/>} />
				<Route exact path = "/applicant/profile"
				render = {
						(props) => <EnforceLogin {...props}
						isLoggedIn={this.state.isLoggedIn}
						type={this.state.userType}
						desiredType={[config.USER_APPLICANT]}
						path='/applicant/profile'
						hasProps={false}
						attemptLogin={this.attemptLogin}
						component={ApplicantProfile}
						/>} />
				<Route exact path = "/applicant/job/list"
				render = {
						(props) => <EnforceLogin {...props}
						isLoggedIn={this.state.isLoggedIn}
						type={this.state.userType}
						desiredType={[config.USER_APPLICANT]}
						path='/applicant/job/list'
						hasProps={false}
						attemptLogin={this.attemptLogin}
						component={ApplicantSearchJob}
						/>} />

				<Route exact path = "/applicant/myapplications"
				render = {
						(props) => <EnforceLogin {...props}
						isLoggedIn={this.state.isLoggedIn}
						type={this.state.userType}
						desiredType={[config.USER_APPLICANT]}
						path='/applicant/myapplications'
						hasProps={false}
						attemptLogin={this.attemptLogin}
						component={MyApplications}
						/>} />
				
				<Route exact path="/auth/logout" render={this.logout} />
			</Router>
		);
	}
}

export default App;

