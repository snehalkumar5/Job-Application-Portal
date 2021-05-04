import React, { Component } from 'react';
import axios from 'axios';
import { Form, FormGroup, Label, Input, Button} from 'reactstrap';

export default class EditJob extends Component{
    constructor(props){
        super(props);
        this.state = {
            formData: {},
            isError: false,
            errors: {}
        };
        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);

    }
    onChange=(e)=>{
        e.preventDefault();
        const formData = Object.assign({}, this.state.formData);
        formData[e.target.id] = e.target.value;
        this.setState({ formData: formData });
    }   
    onSubmit = (e)=> {
        e.preventDefault();
        console.log(this.props.jobId._id);
        axios({
          method: "PUT",
          url: `http://localhost:4000/recruiter/job/${this.props.jobId._id}`,
          data: this.state.formData,
        }).then((response) => {
            alert("Job successfully updated!");
            this.setState({ 
                formData: response.data,
                isError: false,
                errors: {},
            })
            window.location.replace(`http://localhost:3000/recruiter/jobs`);
        }).catch(error => {
            if (error) {
                console.log(error.response.data);
                this.setState({
                    isError: true,
                    errors: error.response.data,
                })
            }
        });
      }
    render(){
        console.log(this.props.jobId);
        return(
            <>
            <div>
        <h1>Edit job {this.props.jobId.title}</h1>
                <Label for="applicants">Maximum applicants</Label>
                <Input type="number" name="applications" id="applications" placeholder="25" className="mb-3" onChange={this.onChange} required/>
                {this.state.isError && this.state.errors.applicants && 
                        <p>{this.state.errors.applications}</p>}
                <Label for="positions">Maximum Positions</Label>
                <Input type="number" name="positions" id="positions" placeholder="add positions" className="mb-3" onChange={this.onChange} required/>
                {this.state.isError && this.state.errors.positions && 
                        <p>{this.state.errors.positions}</p>}
                <Label for="deadline">Deadline</Label>
                <Input type="date" name="deadline" id="deadline" placeholder="add deadline" className="mb-3" onChange={this.onChange} required/>
                <Button color="dark" block onClick={this.onSubmit}>
                    Edit
                </Button>
            </div>
            </>
        )
    }
}