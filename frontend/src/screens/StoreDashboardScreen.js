import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {Row, Col, Table, Container, Button} from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listStoreDetails } from '../actions/storeActions'
import { listStoreOrders } from '../actions/orderActions'
import Meta from '../components/Meta'
import { useParams } from 'react-router-dom'

const StoreDashboardScreen = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    let { id } = useParams()

    const storeDetails = useSelector(state => state.storeDetails)
    const { loading:loadingStore, error:errorStore, store } = storeDetails

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const orderListStore = useSelector(state => state.orderListStore)
    const { loading, error, orders } = orderListStore

    useEffect(() => {
        if(userInfo && userInfo.isOwner && userInfo.stores.includes(id)) {
            dispatch(listStoreDetails(id))
            dispatch(listStoreOrders(id))
        } else {
            navigate('/login')
        }
    }, [id, dispatch, userInfo, navigate])

    const editStoreHandler = () => {
        navigate(`/owner/stores/${id}/edit`)
    }

    const productListHandler = () => {
        navigate(`/owner/stores/${id}/productlist`)
    }

    const posHandler = () => {
        navigate(`/owner/stores/${id}/pos`)
    }

  return (
    <>
        <Meta title={store && store.name}/>
        {loadingStore ? (
            <Loader />
        ) : errorStore ? (
            <Message variant='danger'>{error}</Message>
        ) : (
            <Container>
                <Row className='align-items-center'>
                    <Col>
                        <h1 id='storeName'>{store.name}</h1>
                    </Col>
                </Row>

                {userInfo && userInfo.isOwner && userInfo.stores.includes(id) &&
                    <>
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
                            <Button className='my-3' onClick={posHandler}>
                                Point of Sales
                            </Button>
                        </Col>
                        </Row>

                        <h2>Orders</h2>
                        {loading ? <Loader /> :
                        error ? <Message variant='danger'>{error}</Message> :
                        (
                            <Table striped bordered hover responsive className='table-sm'>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>USER</th>
                                        <th>DATE</th>
                                        <th>TOTAL</th>
                                        <th>PAID</th>
                                        <th>DELIVERED</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orders.map(order => (
                                        <tr key={order._id}>
                                            <td>{order._id}</td>
                                            <td>{order.user && order.user.name}</td>
                                            <td>{order.createdAt.substring(0, 10)}</td>
                                            <td>Rs. {order.totalPrice}</td>
                                            <td>
                                                {order.isPaid ? (
                                                    order.paidAt.substring(0, 10)
                                                ) : (
                                                    <i className='fas fa-times' style={{ color: 'red' }}></i>
                                                )}
                                            </td>
                                            <td>
                                                {order.isDelivered ? (
                                                    order.deliveredAt.substring(0, 10)
                                                ) : (
                                                    <i className='fas fa-times' style={{ color: 'red' }}></i>
                                                )}
                                            </td>
                                            <td>
                                                <LinkContainer to={`/order/${order._id}/${id}`}>
                                                    <Button variant='light' className='btn-sm'>Details</Button>
                                                </LinkContainer>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        )}
                    </>
                }


            </Container>
        )}
    </>
    
  )
}

export default StoreDashboardScreen