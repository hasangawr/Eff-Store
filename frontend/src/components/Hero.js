import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import HeroImage from './images/pexels-andrea-piacquadio-920382.jpg';

const Hero = () => {
  return (
    <Container fluid className="hero">
      <Row>
        <Col xs={12} style={{padding: '0'}}>
          <img src={HeroImage} alt="Hero" className="img-fluid w-100" />
          <div className="hero-text">
            <h1>Welcome to our store!</h1>
            <p>
              Shop our wide selection of products, including groceries, hardware items,
              vegetables, stationary, electronics, and more.
            </p>
            <Button variant="primary" href="#catalog">
              Browse Products
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Hero;
