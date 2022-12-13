import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

const Header = () => {
  return (
    <header>
        <Navbar bg="primary" variant='dark' expand="lg" collapseOnSelect >
        <Container>
        <Navbar.Brand href="/">SuperShop</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" style={{justifyContent:'flex-end'}}>
          <Nav className="ml-auto" >
            <Nav.Link href="/cart"><i className='fas fa-shopping-cart' style={{padding: '5px'}}></i>Cart</Nav.Link>
            <Nav.Link href="/login"><i className='fas fa-user' style={{padding: '5px'}}></i>Sign In</Nav.Link>
          </Nav>
        </Navbar.Collapse>
        </Container>
    </Navbar>
    </header>
  )
}

export default Header