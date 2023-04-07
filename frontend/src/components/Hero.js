import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import HeroImage from './images/2.jpg';

const Hero = () => {
  return (
    <Container fluid className="hero">
      <Row>
        <Col xs={12} style={{padding: '0'}}>
          <img src={HeroImage} alt="Hero" className="img-fluid w-100" />
          <div className="hero-text">
            <h1>Welcome to <span className='green-txt'>Eff</span>Store!</h1>
            <p>
              Discover the best products from your favorite local stores. <br />
              Shop now and get fast, reliable delivery straight to your doorstep. <br />
              Shopping has never been more <span className='green-txt'>effortless.</span> <br />
            </p>
            <Row>
              <Col xs={4}>
                <Button variant="primary" href="#catalog">
                  Browse Products
                </Button>
              </Col>
              <Col xs={4}>
                <Button variant="primary" href="">
                  Create Your Store
                </Button>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Hero;
