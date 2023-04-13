import React, { useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import HeroImage from './images/2.jpg';
import { createStore } from '../actions/storeActions';
import Loader from './Loader';
import Message from './Message';
import { STORE_CREATE_RESET } from '../constants/storeConstants';

const Hero = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const storeCreate = useSelector(state => state.storeCreate)
  const { loading:loadingCreate, error:errorCreate, success:successCreate, store:createdStore } = storeCreate

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    dispatch({ type: STORE_CREATE_RESET })

    if (successCreate) {
      navigate(`/owner/stores/${createdStore._id}/edit`)
    }
  }, [successCreate, navigate, dispatch, createdStore])

  const createStoreHandler = () => {
    if(userInfo) {
      dispatch(createStore())
    } else {
      navigate('/login')
    }
    
  }

  return (
    <Container fluid className="hero">
      {loadingCreate && <Loader />}
      {errorCreate && <Message variant='danger'>{errorCreate}</Message>}
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
                <Button variant="primary" href="#products">
                  Browse Products
                </Button>
              </Col>
              <Col xs={4}>
                <Button variant="primary" href="#stores">
                  Browse Stores
                </Button>
              </Col>
              <Col xs={4}>
                <Button variant="primary" onClick={createStoreHandler}>
                  Create a Store
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
