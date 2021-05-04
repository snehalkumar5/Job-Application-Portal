import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import axios from 'axios';

export default class Register extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            isError: false,
            errors: {},
            formData: {},
            // skills: []
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        e.preventDefault();
        const formData = Object.assign({}, this.props.formData);
        formData[e.target.id] = e.target.value;
        this.setState({formData: formData});
    }
    handleChangeskills(e) {
        e.preventDefault();
        const formData = Object.assign({}, this.props.formData);
        formData[e.target.id] = e.target.value;
        // this.setState({
        //     skills: [...skills,e.target.value]
        // })
        this.setState({formData: formData});
    }
    handleSubmit(e) {
        e.preventDefault();
        console.log(this.props.formData);
        axios({
            method: "POST",
            url: "http://localhost:4000/auth/register/applicant",
            data: this.props.formData,
            headers: {
                'Content-Type': 'application/json',
            }
        }).then((response) => {
            alert("Welcome! We have you successfully registered.");
            window.location.replace("http://localhost:3000/auth/login");
        }).catch(error => {
            if (error) {
                console.log(error.response);
                this.setState({isError: true});
                this.setState({errors: error.response.data});
            }
        });
    }


    render() {
        return (
            <>
                <Link to='/'>&#8592;Back</Link>
                <div className="container">
                    <form>
                        <div className="form-group row">
                            <label htmlFor="skills" className="col-sm-2 col-form-label">Skills</label>
                            <div className="col-sm-10">
                                <input type="text" className="form-control" id="skills" placeholder="Skills" required onChange={this.handleChange} />
                                {
                                    this.state.isError &&
                                <p className="form-error">{this.state.errors.skills}</p>
                                }
                            </div>
                        </div>
                        <div className="form-group row">
                            <div className="col-12 text-center">
                                <input type="button" className="btn red shadow-move" onClick={this.handleSubmit} value="Register" />
                            </div>
                        </div>
                    </form>
                </div>
            </>

        )
    }
}