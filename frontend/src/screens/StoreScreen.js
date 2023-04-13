import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {Row, Col, Container, Button} from 'react-bootstrap'
import Product from '../components/Product'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listStoreDetails } from '../actions/storeActions'
import Meta from '../components/Meta'
import { useParams } from 'react-router-dom'

const StoreScreen = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  let { id } = useParams()

  const storeDetails = useSelector(state => state.storeDetails)
  const { loading, error, store } = storeDetails

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin
  
  useEffect(() => {
    dispatch(listStoreDetails(id))
  }, [id, dispatch, userInfo])

  const goToDashboardHandler = () => {
    navigate(`/owner/stores/${id}/dashboard`)
  }

  return (
    <>
        <Meta title={store && store.name}/>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <>
          <Container>
            <Row className='align-items-center'>
              <Col>
                <h1 id='storeName'>{store.name}</h1>
              </Col>
              <Col className='text-right'>
                {userInfo && userInfo.isOwner && userInfo.stores.includes(id) &&
                  <Button className='my-3' onClick={goToDashboardHandler}>
                    GoTo Dashboard
                  </Button>
                }
              </Col>
            </Row>

            <Row>
              {store.productList && store.productList.map((product) => (
                <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                    <Product product={product}/>
                </Col>
              ))}
            </Row>
          </Container>
        </>
        )}
        
    </>
  )
}

export default StoreScreen