import React, { Component } from 'react';
import { Button, Row, Col, Card, ListGroup, ListGroupItem, Table, Container, Nav, Form, Alert } from 'react-bootstrap';
import { ThemeConsumer } from 'react-bootstrap/esm/ThemeProvider';
import ServiceAPI from './ServiceAPI';
import { API_URL } from './axiosAPI';
import { ErrorAlert, BarcodeForm } from './Common';

const service = new ServiceAPI();
class SalePage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            items: [],
            nextPageURL: '',
            storageItems: [],
            errorMsg: ''
        };
        this.componentDidMount = this.componentDidMount.bind(this);
        this.nextPage = this.nextPage.bind(this);
        this.handleSell = this.handleSell.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleBarcode = this.handleBarcode.bind(this);
    }


    componentDidMount() {
        var self = this;
        service.getItems()
        .then(function (result) {
            self.setState({ items: result.data, nextPageURL: result.nextlink })
        })
        .catch(function(error) {
            self.setState({ errorMsg: error.message });
            return;
        });
        service.getStorageItems().then(function (result) {
            self.setState({ storageItems: result.data })
        });
    }


    nextPage() {
        var self = this;
        service.getItemsByURL(this.state.nextPageURL).then((result) => {
            self.setState({ items: result.data, nextPageURL: result.nextlink })
        });
    }


    handleSell(e, pk) {
        var self = this;
        service.addToStorage(pk).then(() => {
            service.getStorageItems().then(function (result) {
                self.setState({ storageItems: result.data })
            })
        });
    }


    handleDelete(e, pk) {
        var self = this;
        service.removeFromStorage(pk).then(() => {
            service.getStorageItems().then(function (result) {
                self.setState({ storageItems: result.data })
            })
        });
    }

    handleBarcode(code) {
        var self = this;
        service.searchByBarcode(code)
        .then(function(item) {
            return service.addToStorage(item.data.pk);
        })
        .then(function() {
            return service.getStorageItems();
        })
        .then(function(result) {
            self.setState({ storageItems: result.data });
        });
    }

    render() {
        var qtyTotal = 0
        var priceTotal = 0
        this.state.storageItems.forEach(c => qtyTotal += c.qty)
        this.state.storageItems.forEach(c => priceTotal += c.price * c.qty)

        return (
            <div className="item--list">
                <Row>
                    <Col>
                        <ErrorAlert error={this.state.errorMsg}/>
                        <Row>
                            {this.state.items.map(c =>
                                <Col>
                                    <Card style={{ height: '100%', width: '18rem' }}>
                                        <Card.Img variant="top" src={API_URL + c.image} style={{ height: '225px' }} />
                                        <Card.Body>
                                            <Card.Title>{c.category_name} {c.name}</Card.Title>
                                        </Card.Body>
                                        <ListGroup className="list-group-flush">
                                            <ListGroupItem>Color {c.color}</ListGroupItem>
                                            <ListGroupItem>Size {c.size}</ListGroupItem>
                                            <ListGroupItem>
                                                <Row>
                                                    <Col>Price {c.price}</Col>
                                                    <Col><Button variant="primary" onClick={(e) => this.handleSell(e, c.pk)}>Sell</Button></Col>
                                                </Row>
                                            </ListGroupItem>
                                        </ListGroup>
                                    </Card>
                                </Col>
                            )}
                        </Row>
                    </Col>

                    <Col>
                        <Nav className="sticky-top">
                            <Container>
                                <Row>
                            <Nav.Item>
                                <Table>
                                    <thead key="thead">
                                        <tr>
                                            <th>#</th>
                                            <th>Product</th>
                                            <th>Color</th>
                                            <th>Size</th>
                                            <th>Price</th>
                                            <th>Qty</th>
                                            <th>Total</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.storageItems.map(c =>
                                            <tr key={c.pk}>
                                                <td>{c.pk}</td>
                                                <td>{c.name}</td>
                                                <td>{c.color}</td>
                                                <td>{c.size}</td>
                                                <td>{c.price}</td>
                                                <td>{c.qty}</td>
                                                <td>{c.price * c.qty}</td>
                                                <td><Button variant="secondary" onClick={(e) => this.handleDelete(e, c.pk)}>Delete</Button></td>
                                            </tr>)}
                                        <tr>
                                            <th>#</th>
                                            <th>Total</th>
                                            <th></th>
                                            <th></th>
                                            <th></th>
                                            <th>{qtyTotal}</th>
                                            <th>{priceTotal}</th>
                                            <th><Button variant="primary">Process</Button></th>
                                        </tr>
                                    </tbody>
                                </Table>
                            </Nav.Item>
                            </Row>
                            <Row>
                            <BarcodeForm onSubmitBarcode={this.handleBarcode}/>
                            </Row>
                            </Container>
                        </Nav>
                    </Col>

                </Row>
            </div>
        );
    }
}
export default SalePage;