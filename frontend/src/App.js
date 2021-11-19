import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Route } from 'react-router-dom';
import { Routes } from 'react-router-dom';
import { Navbar } from 'react-bootstrap';
import { Nav } from 'react-bootstrap';
import { Container } from 'react-bootstrap';

import CustomersList from './CustomersList';
import CustomerCreateUpdate from './CustomerCreateUpdate';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const BaseLayout = () => (
  <Container fluid>
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="/">Django React Demo</Navbar.Brand>
      <Nav.Link href="/">CUSTOMERS</Nav.Link>
      <Nav.Link href="/customer">CREATE CUSTOMER</Nav.Link>
    </Navbar>

    <Routes>
      <Route path="/" exact element={<CustomersList />} />
      <Route path="/customer/:pk" element={<CustomerCreateUpdate />} />
      <Route path="/customer/" exact element={<CustomerCreateUpdate />} />
    </Routes>
  </Container>
)

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <BaseLayout />
      </BrowserRouter>
    );
  }
}

export default App;