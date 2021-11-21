import React, { Component } from 'react';
import { Col, Container, Nav, Row } from 'react-bootstrap';
import { Route, Routes, BrowserRouter } from 'react-router-dom';

import ItemList from './ItemList';
import Cart from './Cart';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const Header = () => (
        <Nav variant="pills" defaultActiveKey="/">
          <Nav.Item>
            <Nav.Link href="/">Items</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="link-1">Sell</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="link-2">Storage</Nav.Link>
          </Nav.Item>
        </Nav>
);

const BaseLayout = () => (
  <Container fluid>
      <Row>
        <Col>
          <Routes>
            <Route path="/" exact element={<ItemList />} />
          </Routes>
        </Col>
        <Col>
          <Routes>
            <Route path="/" exact element={<Cart />} />
          </Routes>
        </Col>
      </Row>
  </Container>
);

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <header>
          <Header />
        </header>
        <BaseLayout />
      </BrowserRouter>
    );
  }
}

export default App;