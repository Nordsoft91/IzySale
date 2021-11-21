import React, { Component } from 'react';
import { Button, Row, Col, Card, ListGroup, ListGroupItem, Table, Container } from 'react-bootstrap';
import ServiceAPI from './ServiceAPI';
import { API_URL } from './ServiceAPI';

const service = new ServiceAPI();

class SalePage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            items: [],
            nextPageURL: '',
            cartItems: []
        };
        this.nextPage = this.nextPage.bind(this);
    }


    componentDidMount() {
        var self = this;
        service.getItems().then(function (result) {
            self.setState({ items: result.data, nextPageURL: result.nextlink })
        });
        service.getCartList().then(function (result) {
            self.setState({ cartItems:  result.data })
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
                self.setState({ cartItems:  result.data })
            })
        });
    }


    handleDelete(e,pk){
        var  self  =  this;
        service.removeFromCart(pk).then(() => {
            service.getCartList().then(function (result) {
                self.setState({ cartItems:  result.data })
            })
        });
    }

    render() {
        return (
            <div className="item--list">
                <Row>
                    <Col>
                <Container>
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
                </Container>
                </Col>
                <Col>
                    <Table>
                        <thead key="thead">
                            <tr>
                                <th>#</th>
                                <th>Product</th>
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
                                    <td>{c.price}</td>
                                    <td>{c.qty}</td>
                                    <td>{c.price * c.qty}</td>
                                    <td>
                                        <Button variant="secondary" onClick={(e) => this.handleDelete(e, c.pk)}>Delete</Button>
                                    </td>
                                </tr>)}
                        </tbody>
                    </Table>
                    </Col>
                </Row>
            </div>
        );
    }
}
export default SalePage;