import React, { Component } from "react";
import { Form, Col, Button, Row } from 'react-bootstrap';


function LoginForm() {

    function handleSubmit(event) {
        alert('A username and password was submitted: ' + event.currentTarget.elements.formBasicUsername.value + " " + event.currentTarget.elements.formBasicPassword.value);
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicUsername">
                <Form.Label>Login</Form.Label>
                <Form.Control type="text" placeholder="Username" />
                <Form.Text className="text-muted">
                    Don't share your credentials with anyone else
                </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
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
class Login extends Component{

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <LoginForm></LoginForm>
        )
    }
}
export default Login;