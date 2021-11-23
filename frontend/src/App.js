import React, { Component } from 'react';
import { Col, Container, Nav, Row } from 'react-bootstrap';
import { Route, Routes, BrowserRouter } from 'react-router-dom';

import SalePage from './SalePage';
import Login from './login';
import Signup from './signup';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const Header = () => (
  <Nav variant="pills" defaultActiveKey="/">
    <Nav.Item>
      <Nav.Link href="/">Items</Nav.Link>
    </Nav.Item>
    <Nav.Item>
      <Nav.Link href="/login" eventKey="link-1">Login</Nav.Link>
    </Nav.Item>
    <Nav.Item>
      <Nav.Link href="/signup" eventKey="link-2">Sign up</Nav.Link>
    </Nav.Item>
  </Nav>
);

const BaseLayout = () => (
  <Container fluid>
    <Routes>
      <Route exact path="/" element={<SalePage />} />
      <Route exact path="/login" element={<Login />}/>
      <Route exact path="/signup" element={<Signup />}/>
    </Routes>
  </Container>
);

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Container fluid>
          <Row>
            <header>
              <Header />
            </header>
          </Row>
          <Row>
            <BaseLayout />
          </Row>
        </Container>
      </BrowserRouter>
    );
  }
}

export default App;