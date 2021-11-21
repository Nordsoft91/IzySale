import React, { Component } from 'react';
import { Table, Button } from 'react-bootstrap';
import ServiceAPI from './ServiceAPI';
import { API_URL } from './ServiceAPI';

const service = new ServiceAPI();

class Cart extends Component {

    constructor(props) {
        super(props);
        this.state = {
            items: []
        };
    }
    

    componentDidMount() {
        var self = this;
        service.getCartList().then(function (result) {
            self.setState({ items:  result.data })
        });
    }


    handleDelete(e,pk){
        var  self  =  this;
        service.removeFromCart(pk).then(() => {
            service.getCartList().then(function (result) {
                self.setState({ items:  result.data })
            })
        });
        //customersService.deleteCustomer({pk :  pk}).then(()=>{
        //    var  newArr  =  self.state.customers.filter(function(obj) {
        //        return  obj.pk  !==  pk;
        //    });
        //    self.setState({customers:  newArr})
        //});
    }


    render() {
        return (
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
                {this.state.items.map(c => 
                    <tr key={c.pk}>
                        <td>{c.pk}</td>
                        <td>{c.name}</td>
                        <td>{c.price}</td>
                        <td>{c.qty}</td>
                        <td>{c.price*c.qty}</td>
                        <td>
                            <Button variant="secondary" onClick={(e) => this.handleDelete(e, c.pk)}>Delete</Button>
                        </td>
                    </tr>)}
                </tbody>

            </Table>
        );
    }
}
export default Cart;