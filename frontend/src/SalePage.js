import React, { Component } from 'react';
import { Button, Row, Col, Card, ListGroup, ListGroupItem, Table, Container, Nav, Form } from 'react-bootstrap';
import { ThemeConsumer } from 'react-bootstrap/esm/ThemeProvider';
import ServiceAPI from './ServiceAPI';
import { API_URL } from './ServiceAPI';

const service = new ServiceAPI();

function BarcodeForm({ onSubmitBarcode }) {
    function handleSubmit(event) {
        event.preventDefault()
        onSubmitBarcode(event.currentTarget.elements.barcodeInput.value)
        event.currentTarget.elements.barcodeInput.value = ''
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Row>
                <Col>
                    <Form.Control id="barcodeInput" placeholder="Barcode" />
                </Col>
                <Col>
                    <Button type="submit">Submit</Button>
                </Col>
            </Row>
        </Form>
    )
}

class SalePage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            items: [],
            nextPageURL: '',
            cartItems: []
        };
        this.componentDidMount = this.componentDidMount.bind(this);
        this.nextPage = this.nextPage.bind(this);
        this.handleSell = this.handleSell.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleBarcode = this.handleBarcode.bind(this);
    }


    componentDidMount() {
        var self = this;
        service.getItems().then(function (result) {
            self.setState({ items: result.data, nextPageURL: result.nextlink })
        });
        service.getCartList().then(function (result) {
            self.setState({ cartItems: result.data })
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
        service.addToCart(pk).then(() => {
            service.getCartList().then(function (result) {
                self.setState({ cartItems: result.data })
            })
        });
    }


    handleDelete(e, pk) {
        var self = this;
        service.removeFromCart(pk).then(() => {
            service.getCartList().then(function (result) {
                self.setState({ cartItems: result.data })
            })
        });
    }

    handleBarcode(code) {
        var self = this;
        service.searchByBarcode(code)
        .then(function(item) {
            return service.addToCart(item.data.pk);
        })
        .then(function() {
            return service.getCartList();
        })
        .then(function(result) {
            self.setState({ cartItems: result.data });
        });
    }

    render() {
        var qtyTotal = 0
        var priceTotal = 0
        this.state.cartItems.forEach(c => qtyTotal += c.qty)
        this.state.cartItems.forEach(c => priceTotal += c.price * c.qty)

        return (
            <div className="item--list">
                <Row>

                    <Col>
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
                                        {this.state.cartItems.map(c =>
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
                            <BarcodeForm onSubmitBarcode={this.handleBarcode}/>
                        </Nav>
                    </Col>

                </Row>
            </div>
        );
    }
}
export default SalePage;