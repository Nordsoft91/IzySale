import React, { Component } from 'react';
import { Button, Row, Col, Card, ListGroup, ListGroupItem } from 'react-bootstrap';
import ServiceAPI from './ServiceAPI';
import { API_URL } from './ServiceAPI';

const service = new ServiceAPI();

class ItemList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            items: [],
            nextPageURL: ''
        };
        this.nextPage = this.nextPage.bind(this);
    }
    

    componentDidMount() {
        var self = this;
        service.getItems().then(function (result) {
            self.setState({ items:  result.data, nextPageURL:  result.nextlink})
        });
    }

    
    nextPage(){
        var  self  =  this;
        service.getItemsByURL(this.state.nextPageURL).then((result) => {
            self.setState({ items: result.data, nextPageURL: result.nextlink})
        });
    }


    handleSell(e, pk){
        service.addToCart(pk)
    }

    render() {
        return (
            <div className="item--list">
                <Row>
                {this.state.items.map(c => 
                    <Col>
                        <Card style={{ height: '100%', width: '18rem' }}>
                            <Card.Img variant="top" src={API_URL+c.image} style={{ height: '225px' }}/>
                            <Card.Body>
                            <Card.Title>{c.category_name} {c.name}</Card.Title>
                            </Card.Body>
                            <ListGroup className="list-group-flush">
                                <ListGroupItem>Color {c.color}</ListGroupItem>
                                <ListGroupItem>Size {c.size}</ListGroupItem>
                                <ListGroupItem>
                                    Price {c.price}
                                    <Button variant="primary" onClick={(e) => this.handleSell(e, c.pk)}>Sell</Button>
                                </ListGroupItem>
                            </ListGroup>
                        </Card>
                    </Col>
                )}
                </Row>
            </div>
        );
    }
}
export default ItemList;