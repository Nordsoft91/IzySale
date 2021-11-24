import React, { Component } from 'react';
import { Col, Container, Nav, Navbar, Row } from 'react-bootstrap';
import { Route, Routes, BrowserRouter } from 'react-router-dom';

import SalePage from './SalePage';
import Login from './login';
import Signup from './signup';
import { logout } from './axiosAPI';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';


const Header = () => (

  <Navbar defaultActiveKey="/" bg="light" expand="lg">
    <Container>
      <Navbar.Brand href="/">IzySail</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />

      <Navbar.Collapse id="basic-navbar-nav">
        <Nav.Link href="/login" eventKey="link-1">Login</Nav.Link>
        <Nav.Link href="/signup" eventKey="link-2">Sign up</Nav.Link>
      </Navbar.Collapse>
      
      <Navbar.Collapse className="justify-content-end">
      <Navbar.Text>
      <a href="/login" onClick={logout()}>Log out</a>
      </Navbar.Text>
    </Navbar.Collapse>

    </Container>
  </Navbar>
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