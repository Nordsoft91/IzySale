import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import CustomersService from './CustomersService';

const customersService = new CustomersService();

class CustomerCreateUpdate extends Component {
    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        const params = this.props;
        if (typeof params !== undefined && params.pk) {
            customersService.getCustomer(params.pk).then((c) => {
                this.refs.firstName.value = c.first_name;
                this.refs.lastName.value = c.last_name;
                this.refs.email.value = c.email;
                this.refs.phone.value = c.phone;
                this.refs.address.value = c.address;
                this.refs.description.value = c.description;
            })
        }
    }

    handleCreate() {
        customersService.createCustomer(
            {
                "first_name": this.refs.firstName.value,
                "last_name": this.refs.lastName.value,
                "email": this.refs.email.value,
                "phone": this.refs.phone.value,
                "address": this.refs.address.value,
                "description": this.refs.description.value,
            }
        ).then((result) => {
            alert("Customer created!");
        }).catch(() => {
            alert('There was an error! Please re-check your form.');
        });
    }
    handleUpdate(pk) {
        customersService.updateCustomer(
            {
                "pk": pk,
                "first_name": this.refs.firstName.value,
                "last_name": this.refs.lastName.value,
                "email": this.refs.email.value,
                "phone": this.refs.phone.value,
                "address": this.refs.address.value,
                "description": this.refs.description.value
            }
        ).then((result) => {
            console.log(result);
            alert("Customer updated!");
        }).catch(() => {
            alert('There was an error! Please re-check your form.');
        });
    }
    handleSubmit(event) {
        const params = this.props;

        if (typeof params !== undefined && params.pk) {
            this.handleUpdate(params.pk);
        }
        else {
            this.handleCreate();
        }

        event.preventDefault();
    }

    render() {
        return (
            <Form onSubmit={this.handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>First name</Form.Label>
                    <Form.Control type="text" ref="firstName" />

                    <Form.Label>Last name</Form.Label>
                    <Form.Control type="text" ref="lastName" />

                    <Form.Label>Phone</Form.Label>
                    <Form.Control type="text" ref="phone" placeholder="+79999999" />

                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" ref="email" placeholder="name@example.com" />

                    <Form.Label>Address</Form.Label>
                    <Form.Control type="text" ref="address" />

                    <Form.Label>Description</Form.Label>
                    <Form.Control type="text" ref="description" />
                </Form.Group>

                <Button variant="primary" type="submit">Submit</Button>{' '}
            </Form>
        );
    }
}

export default CustomerCreateUpdate;