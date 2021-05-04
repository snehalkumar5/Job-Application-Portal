import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import axios from 'axios';

export default class AddJob extends Component {
    constructor() {
        super();

        this.state = {
            formData: {},
            isError: false,
            errors: {},
            img: null,
            skills: []
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.addSkills = this.addSkills.bind(this);
    }

    handleChange(e) {
        if (e.target.type == "file") {
            var self = this;
            var reader = new FileReader();
            var file = e.target.files[0];

            reader.onload = function(upload) {
                const formData = Object.assign({}, self.state.formData);
                formData.img = upload.target.result;
                self.setState({ formData: formData });
            }
            reader.readAsDataURL(file);
        }

        e.preventDefault();
        const formData = Object.assign({}, this.state.formData);
        formData[e.target.id] = e.target.value;
        this.setState({ formData: formData });
        console.log(formData);
    }   
    addSkills(e) {
        e.preventDefault();
        let skill= e.target.value.split(",")
        let vals = skill
        const formData = Object.assign({}, this.state.formData);
        formData[e.target.id] = vals
        this.setState({
            skills: vals,
            formData: formData
        })
    }
    handleSubmit(e) {
        e.preventDefault();
        this.setState({
            isError:false,
            errors:{}
        })
        console.log(this.state.formData);
        axios({
            method: "POST",
            url: "http://localhost:4000/recruiter/job/add",
            data: this.state.formData,
            headers: {
                'Content-Type': 'application/json',
            }
        }).then((response) => {
            alert("Job successfully added");
            window.location.replace("http://localhost:3000/recruiter/jobs");
        }).catch(error => {
            if (error) {
                console.log(error.response);
                this.setState({ isError: true });
                this.setState({ errors: error.response.data });
            }
        });
    }

    render() {
        return (
            <>
                <Link to="/recruiter/dashboard">&#8592;Back</Link>
                <div className="container">
                    <form>
                        <div className="form-group row">
                            <label htmlFor="title" className="col-sm-2 col-form-label">Title</label>
                            <div className="col-sm-10">
                                <input type="text" className="form-control" id="title" placeholder="Job title" required onChange={this.handleChange} />
                                {
                                    this.state.isError &&
                                    <p className="form-error">{this.state.errors.title}</p>
                                }
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="applications" className="col-sm-2 col-form-label">Applications</label>
                            <div className="col-sm-10">
                                <input type="number" min="0" step="1" className="form-control" id="applications" placeholder="50" required onChange={this.handleChange} />
                                {
                                    this.state.isError &&
                                    <p className="form-error">{this.state.errors.applications}asdas</p>
                                }
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="positions" className="col-sm-2 col-form-label">Positions</label>
                            <div className="col-sm-10">
                                <input type="text" min="0" step="1" className="form-control" id="positions" placeholder="50" required onChange={this.handleChange} />
                                {
                                    this.state.isError &&
                                    <p className="form-error">{this.state.errors.positions}</p>
                                }
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="deadline" className="col-sm-2 col-form-label">Deadline</label>
                            <div className="col-sm-10">
                                <input type="date" className="form-control" id="deadline" placeholder="deadline" required onChange={this.handleChange} />
                                {
                                    this.state.isError &&
                                    <p className="form-error">{this.state.errors.deadline}</p>
                                }
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="skills" className="col-sm-2 col-form-label">Skills</label>
                            <div className="col-sm-10">
                                <input type="text" className="form-control" id="skills" placeholder="C++,MERN" required onChange={this.addSkills}/>
                                {
                                    this.state.isError &&
                                    <p className="form-error">{this.state.errors.skills}</p>
                                }
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="type" className="col-sm-2 col-form-label">Type</label>
                            <div className="col-sm-10">
                                <select id="type" onChange={this.handleChange}>
                                    <option value="Full Time">Full Time</option>
                                    <option value="Part Time">Part Time</option>
                                    <option value="Work from Home">Work from Home</option>
                                </select>
                                {/* <input type="text" min="0" step="1" className="form-control" id="type" placeholder="50" required onChange={this.handleChange} /> */}
                                {
                                    this.state.isError &&
                                    <p className="form-error">{this.state.errors.type}</p>
                                }
                            </div>
                        </div>
                        
                        <div className="form-group row">
                            <label htmlFor="duration" className="col-sm-2 col-form-label">Duration</label>
                            <div className="col-sm-10">
                                <input type="number" min="0" step="1" className="form-control" id="duration" placeholder="Duration (in months)" required onChange={this.handleChange} />
                                {
                                    this.state.isError &&
                                    <p className="form-error">{this.state.errors.duration}</p>
                                }
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="salary" className="col-sm-2 col-form-label">Salary</label>
                            <div className="col-sm-10">
                                <input type="number" min="0" step="1" className="form-control" id="salary" placeholder="1000" required onChange={this.handleChange} />
                                {
                                    this.state.isError &&
                                    <p className="form-error">{this.state.errors.salary}</p>
                                }
                            </div>
                        </div>
                        {/* <div className="form-group row">
                            <label htmlFor="img" className="col-sm-2 col-form-label">Image</label>
                            <div className="col-sm-10">
                            <input type="file" className="form-control" id="img" required onChange={this.handleChange} />
                                {
                                    this.state.isError &&
                                    <p className="form-error">{this.state.errors.img}</p>
                                }
                            </div>
                        </div> */}
                        <div className="form-group row">
                            <div className="col-12 text-center">
                                <input type="button" className="btn" onClick={this.handleSubmit} value="Add Job" />
                            </div>
                        </div>
                    </form>
                </div>
            </>

        )
    }
}