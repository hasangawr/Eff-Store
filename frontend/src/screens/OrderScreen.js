import React, { useEffect } from 'react'
import { Row, Col, ListGroup, Image, Card, Container, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { getOrderDetails, deliverOrder } from '../actions/orderActions'
import { ORDER_PAY_RESET, ORDER_DELIVER_RESET } from '../constants/orderConstants'
import Meta from '../components/Meta'

const OrderScreen = () => {
    let { id } = useParams()
    let { storeId } = useParams()

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const orderDetails = useSelector((state) => state.orderDetails)
    const { order, loading, error } = orderDetails

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const orderPay = useSelector((state) => state.orderPay)
    const { success: successPay } = orderPay

    const orderDeliver = useSelector((state) => state.orderDeliver)
    const { loading: loadingDeliver, success: successDeliver } = orderDeliver

    if (!loading) {
        const addDecimals = (num) => {
            return (Math.round(num * 100) / 100).toFixed(2)
        }
        order.itemsPrice = addDecimals(
            order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
        )
    }

    useEffect(() => {
        if (!userInfo) {
            navigate('/login')
        }

        if (!order || successPay || successDeliver) {
            dispatch({ type: ORDER_PAY_RESET })
            dispatch({ type: ORDER_DELIVER_RESET })
            dispatch(getOrderDetails(id))
        }
    }, [dispatch, id, successPay, successDeliver, order, userInfo, navigate])

    const deliverHandler = () => {
        dispatch(deliverOrder(order, storeId))
    }

    return loading ? <Loader /> :
        error ? <Message variant='danger'>{error}</Message> :
            <Container>
                <Meta title='Checkout' />
                <h1>Order {order._id}</h1>
                <Row>
                    <Col md={8}>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <h2>Delivery</h2>
                                <p>
                                    <strong>Name: </strong> {order.user.name}
                                </p>
                                <p>
                                    <strong>Email: </strong>{' '}
                                    <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
                                </p>
                                <p>
                                    <strong>Address: </strong>
                                    {order.shippingAddress.address},
                                    {order.shippingAddress.city}{' '}
                                    {order.shippingAddress.postalCode},{' '}
                                    {order.shippingAddress.country}
                                </p>
                                {order.isDelivered ? (
                                    <Message variant='success'>Delivered on {order.deliveredAt}</Message>
                                ) : (
                                    <Message variant='danger'>Not Delivered</Message>
                                )}
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <h2>Payment Method</h2>
                                <p>
                                    <strong>Method: </strong> {order.paymentMethod}
                                </p>
                                {order.isPaid ? (
                                    <Message variant='success'>Paid on {order.paidAt}</Message>
                                ) : (
                                    <Message variant='danger'>Not Paid</Message>
                                )}
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <h2>Order Items</h2>
                                {order.orderItems.length === 0 ? <Message>Order is empty</Message> : (
                                    <ListGroup variant='flush'>
                                        {order.orderItems.map((item, index) => (
                                            <ListGroup.Item key={index}>
                                                <Row>
                                                    <Col md={1}>
                                                        <Image src={item.image} alt={item.name} fluid rounded />
                                                    </Col>
                                                    <Col>
                                                        <Link to={`/product/${item.product}`}>
                                                            {item.name}
                                                        </Link>
                                                    </Col>
                                                    <Col md={4}>
                                                        {item.qty} × Rs. {item.price} = Rs. {item.qty * item.price}
                                                    </Col>
                                                </Row>
                                            </ListGroup.Item>
                                        ))}
                                    </ListGroup>
                                )}
                            </ListGroup.Item>
                        </ListGroup>
                    </Col>
                    <Col md={4}>
                        <Card>
                            <ListGroup variant='flush'>
                                <ListGroup.Item>
                                    <h2>Order Summary</h2>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Items</Col>
                                        <Col>Rs. {order.itemsPrice}</Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Delivery</Col>
                                        <Col>Rs. {order.shippingPrice}</Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Tax</Col>
                                        <Col>Rs. {order.taxPrice}</Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Total</Col>
                                        <Col>Rs. {order.totalPrice}</Col>
                                    </Row>
                                </ListGroup.Item>
                                {!order.isPaid && (
                                    <ListGroup.Item>
                                        <form method="post" action="https://sandbox.payhere.lk/pay/checkout">   
                                            <input type="hidden" name="merchant_id" value="1222935" />
                                            <input type="hidden" name="return_url" value={`http://localhost:3000/order/${id}`} />
                                            <input type="hidden" name="cancel_url" value={`http://localhost:3000`} />
                                            <input type="hidden" name="notify_url" value="https://quiet-poems-act-123-231-109-40.loca.lt/api/orders/pay" />  
                                            <input type="hidden" name="order_id" value={order._id} />
                                            <input type="hidden" name="items" value="order" />
                                            <input type="hidden" name="currency" value="LKR" />
                                            <input type="hidden" name="amount" value={order.totalPrice} />
                                            <input type="hidden" name="first_name" value={userInfo.name} />
                                            <input type="hidden" name="last_name" value={userInfo.name} />
                                            <input type="hidden" name="email" value={userInfo.email} />
                                            <input type="hidden" name="phone" value="0771234567" />
                                            <input type="hidden" name="address" value={order.shippingAddress.address} />
                                            <input type="hidden" name="city" value={order.shippingAddress.city} />
                                            <input type="hidden" name="country" value={order.shippingAddress.country} />
                                            <input type="hidden" name="hash" value={order.hash} />
                                            <button type="submit" name="Buy Now" value="Buy Now" className='btn btn-primary btn-block'>Pay With PayHere</button>
                                        </form>
                                    </ListGroup.Item>
                                )}

                                {loadingDeliver && <Loader />}
                                {userInfo && storeId && userInfo.isOwner && userInfo.stores.includes(storeId) && order.isPaid && !order.isDelivered && (
                                    <ListGroup.Item>
                                        <Button type='button' className='btn btn-block' onClick={deliverHandler}>
                                            Mark As Delivered
                                        </Button>
                                    </ListGroup.Item>
                                )}
                            </ListGroup>
                        </Card>
                    </Col>
                </Row>
            </Container>
}

export default OrderScreen