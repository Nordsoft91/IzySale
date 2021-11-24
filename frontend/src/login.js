import React, { Component } from "react";
import { Form, Col, Button, Row } from 'react-bootstrap';
import axiosInstance from "./axiosAPI";


class Login extends Component{

    constructor(props) {
        super(props);
        this.state = {username: "", password: ""};

        this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleSubmit(event) {
        event.preventDefault();
        axiosInstance.post('/token/obtain/', {
            username: event.currentTarget.elements.fieldUsername.value,
            password: event.currentTarget.elements.fieldPassword.value
        }).then(
            result => {
                axiosInstance.defaults.headers['Authorization'] = "JWT " + result.data.access;
                localStorage.setItem('access_token', result.data.access);
                localStorage.setItem('refresh_token', result.data.refresh);
                window.location.href = '/'
            }
        ).catch(error => {
            alert('error: ' + error);
            throw error;
        })
    }


    render() {
        return (
            <Form onSubmit={this.handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicUsername">
                    <Form.Label>Login</Form.Label>
                    <Form.Control type="text" placeholder="Username" id="fieldUsername"/>
                    <Form.Text className="text-muted">
                        Don't share your credentials with anyone else
                    </Form.Text>
                </Form.Group>
    
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" id="fieldPassword"/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Check me out" />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        )
    }
}
export default Login;