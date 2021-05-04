import React, { Component } from 'react';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import {Grid, Paper, Typography, Card, CardHeader, ButtonGroup} from '@material-ui/core';
import { Form, FormGroup, Label, Input, Button} from 'reactstrap';

export default class RecruiterProfile extends Component{
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
    componentDidUpdate(){
        const data = {
            userId: this.props.userId
        };
        axios({
            method: "GET",
            data: data,
            url: "http://localhost:4000/recruiter/profile",
        }).then((response) => {
            console.log(response);
            this.setState({
                formData: response.data,
                error: null
            });
        }).catch(error => {
            if (error) {
                console.log(error);
                this.setState({ error: error.response.data });
            }
        });
    }
    componentDidMount() {
        const data = {
            userId: this.props.userId
        };
        axios({
            method: "GET",
            data: data,
            url: "http://localhost:4000/recruiter/profile",
        }).then((response) => {
            this.setState({
                formData: response.data,
                error: null
            });
        }).catch(error => {
            if (error) {
                console.log(error);
                this.setState({ error: error.response.data });
            }
        });
    }
    onChange=(e)=>{
        if (e.target.type === "file") {
      
            let reader = new FileReader();
            let file = e.target.files[0];
      
            reader.onload = function(upload) {
                let formData = Object.assign({}, this.state.formData);
                formData.image = upload.target.result;
                this.setState({ formData: formData });
            }
            reader.readAsDataURL(file);
        }
        e.preventDefault();
        let formData = Object.assign({}, this.state.formData);
        formData[e.target.id] = e.target.value;
        this.setState({ formData: formData });
    }
    onSubmit = (e)=> {
        e.preventDefault();
        let FormData = Object.assign({}, this.state.formData);
        console.log(FormData);
        axios({
          method: "PUT",
          url: "http://localhost:4000/recruiter/profile",
          data: JSON.stringify(FormData),
          headers: {
              'Content-Type': 'application/json',
          }
        }).then((response) => {
            alert("Profile successfully updated!");
            this.setState({ 
                formData: response.data,
                isError: false,
                errors: {},
            })
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
        return(
            <>
            <div>
                <Grid container spacing={0} direction="column" alignItems="center"justify="center">
                    <h1>Welcome {this.state.formData.name}!</h1>
                <Grid spacing={5} item xs={5}>
                <TextField id="name" label="Name" placeholder="Name" required fullWidth margin="normal" variant="outlined"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    style={{
                        marginTop: 30,
                        marginLeft: 10,
                    }}
                    onChange={this.onChange} value={this.state.formData.name}/>
                        {this.state.isError && this.state.errors.name && 
                        <p>{this.state.errors.name}</p>}
                <TextField id="email" label="Email" placeholder="example@gmail.com" required fullWidth  margin="normal" variant="outlined"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    style={{
                        marginTop: 30,
                        marginLeft: 10,
                    }}
                    onChange={this.onChange} value={this.state.formData.email}/>
                        {this.state.isError && this.state.errors.email && 
                        <p>{this.state.errors.email}</p>}
                <TextField id="contact" label="Contact" placeholder="+911234567890" required margin="normal" variant="outlined"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    style={{
                        marginTop: 30,
                        marginLeft: 10,
                    }}
                    onChange={this.onChange} value={this.state.formData.contact}/>
                        {this.state.isError && this.state.errors.contact && 
                        <p>{this.state.errors.contact}</p>}
                <TextField id="bio" label="Bio" placeholder="Something about yourself" multiline fullWidth rows={10} margin="normal" variant="outlined"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    style={{
                        marginTop: 30,
                        marginLeft: 10,
                    }}
                    onChange={this.onChange} value={this.state.formData.bio}/>
                        {this.state.isError && this.state.errors.bio && 
                        <p>{this.state.errors.bio}</p>}
                    <Button color="dark" block onClick={this.onSubmit}>
                        Save
                    </Button>
                    </Grid>  
                    </Grid>     
            </div>
            </>
        )
    }
}