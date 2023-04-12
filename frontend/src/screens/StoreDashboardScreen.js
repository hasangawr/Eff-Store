import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {Row, Col, Container, Button} from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listStoreDetails } from '../actions/storeActions'
import Meta from '../components/Meta'
import { useParams } from 'react-router-dom'

const StoreDashboardScreen = () => {
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

    const editStoreHandler = () => {
        navigate(`/owner/stores/${id}/edit`)
    }

    const productListHandler = () => {
        navigate(`/owner/stores/:id/products`)
    }

    const salesHandler = () => {
        //navigate(`/owner/stores/${id}/edit`)
    }

  return (
    <>
        <Meta title={store && store.name}/>
        {loading ? (
            <Loader />
        ) : error ? (
            <Message variant='danger'>{error}</Message>
        ) : (
            <Container>
                <Row className='align-items-center'>
                    <Col>
                        <h1 id='storeName'>{store.name}</h1>
                    </Col>
                </Row>

                {userInfo && userInfo.isOwner && userInfo.stores.includes(id) &&
                    <Row className='align-items-center'>
                        <Col>
                            <Button className='my-3' onClick={editStoreHandler}>
                                Edit Store
                            </Button>
                        </Col>
                        <Col>
                            <Button className='my-3' onClick={productListHandler}>
                                Product List
                            </Button>
                        </Col>
                        <Col>
                            <Button className='my-3' onClick={salesHandler}>
                                Manage Sales
                            </Button>
                        </Col>
                    </Row>
                }


            </Container>
        )}
    </>
    
  )
}

export default StoreDashboardScreen