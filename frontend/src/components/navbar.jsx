import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import {Navbar, Nav, Collapse, NavItem, NavLink, Container, NavbarBrand, NavbarToggler} from 'reactstrap';
import "bootstrap/dist/css/bootstrap.min.css"
import config from '../utils/config';
export default class AppNavbar extends Component {
    
    constructor(props) {
        super(props);
    }
    state = {
        isOpen: false
    }
    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    render() {
        if(this.props.logged){
            if(this.props.type==config.USER_APPLICANT){
                return (
                    <div>
                        <Navbar color="dark" dark expand="sm" className="mb-5">
                            <Container>
                                <NavbarBrand href="/applicant/dashboard">LinkedOut</NavbarBrand>
                                <NavbarToggler onClick={this.toggle}/>
                                    <Collapse isOpen={this.state.isOpen} navbar>
                                        <Nav className="ml-auto" navbar>
                                            <NavItem>
                                                <NavLink href="/applicant/dashboard">Dashboard</NavLink>
                                            </NavItem>
                                            <NavItem>
                                                <NavLink href="/applicant/profile">Hi {this.props.userName}</NavLink>
                                            </NavItem>
                                            <NavItem>
                                                <NavLink href="/auth/logout">Logout</NavLink>
                                            </NavItem>
                                        </Nav>
                                    </Collapse>
                            </Container>
                        </Navbar>
                    </div>
                )
            } else {
                return (
                    <div>
                        <Navbar color="dark" dark expand="sm" className="mb-5">
                            <Container>
                                <NavbarBrand href="/recruiter/dashboard">LinkedOut</NavbarBrand>
                                <NavbarToggler onClick={this.toggle}/>
                                    <Collapse isOpen={this.state.isOpen} navbar>
                                        <Nav className="ml-auto" navbar>
                                            <NavItem>
                                                <NavLink href="/recruiter/dashboard">Dashboard</NavLink>
                                            </NavItem>
                                            <NavItem>
                                                <NavLink href="/recruiter/profile">Hi {this.props.userName}</NavLink>
                                            </NavItem>
                                            <NavItem>
                                                <NavLink href="/auth/logout">Logout</NavLink>
                                            </NavItem>
                                        </Nav>
                                    </Collapse>
                            </Container>
                        </Navbar>
                    </div>
                )
            }
        }
        else{
            return (
                <div>
                    <Navbar color="dark" dark expand="sm" className="mb-5">
                        <Container>
                            <NavbarBrand href="/">LinkedOut</NavbarBrand>
                            <NavbarToggler onClick={this.toggle}/>
                                <Collapse isOpen={this.state.isOpen} navbar>
                                    <Nav className="ml-auto" navbar>
                                        <NavItem>
                                            <NavLink href="/">Register</NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink href="/auth/login">Login</NavLink>
                                        </NavItem>
                                    </Nav>
                                </Collapse>
                        </Container>
                    </Navbar>
                </div>
            )
        }
    }
}