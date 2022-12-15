import React from 'react';
import {LinkContainer} from 'react-router-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

const Header = () => {
  return (
    <header>
        <Navbar bg="primary" variant='dark' expand="lg" collapseOnSelect >
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand>SuperShop</Navbar.Brand>
          </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" style={{justifyContent:'flex-end'}}>
          <Nav className="ml-auto" >
            <LinkContainer to='/cart'>
              <Nav.Link><i className='fas fa-shopping-cart' style={{padding: '5px'}}></i>Cart</Nav.Link>
            </LinkContainer>
            <LinkContainer to='/login'>
              <Nav.Link><i className='fas fa-user' style={{padding: '5px'}}></i>Sign In</Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
        </Container>
    </Navbar>
    </header>
  )
}

export default Header