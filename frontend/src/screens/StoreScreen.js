import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {Row, Col, Container} from 'react-bootstrap'
import Product from '../components/Product'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listStoreDetails } from '../actions/storeActions'
import Meta from '../components/Meta'
import { useParams } from 'react-router-dom'

const HomeScreen = () => {
  const dispatch = useDispatch()
  let { id } = useParams()

  const storeDetails = useSelector(state => state.storeDetails)
  const { loading, error, store } = storeDetails
  
  useEffect(() => {
    dispatch(listStoreDetails(id))
  }, [dispatch, id])


  return (
    <>
        <Meta />
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <>
          <Container>
            <h1 id='storeName'>{store.name}</h1>
          
          </Container>
        </>
        )}
        
    </>
  )
}

export default HomeScreen