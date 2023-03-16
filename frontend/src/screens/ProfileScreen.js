import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Form, Button, Row, Col, Container, Table } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getUserDetails, updateUserProfile } from '../actions/userActions'
import { listMyOrders } from '../actions/orderActions'
import { red } from 'colors'

const ProfileScreen = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState(null)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const userDetails = useSelector(state => state.userDetails)
    const { loading, error, user } = userDetails

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const userUpdateProfile = useSelector(state => state.userUpdateProfile)
    const { success } = userUpdateProfile

    const orderListMy = useSelector(state => state.orderListMy)
    const { loading:loadingOrders, error:errorOrders, orders } = orderListMy

    useEffect(() => {
        if(!userInfo) {
            navigate('/login')
        } else {
            if(!user.name) {
                dispatch(getUserDetails('profile'))
                dispatch(listMyOrders())
            } else {
                setName(user.name)
                setEmail(user.email)
            }
        }
    }, [navigate, dispatch, userInfo, user])

    const submitHandler = (e) => {
        e.preventDefault()
        if (password !== confirmPassword) {
            setMessage('Passwords do not match')
        } else {
            dispatch(updateUserProfile({
                id: user._id,
                name,
                email,
                password
            }))
        }
    }

  return (
    <Container className='py-3'>
        <Row>
            <Col md={3}>
                <h2>User Profile</h2>
                {message && <Message variant='danger'>{message}</Message>}
                {error && <Message variant='danger'>{error}</Message>}
                {success && <Message variant='success'>Profile Updated</Message>}
                {loading && <Loader />}
                <Form onSubmit={submitHandler}>
                    <Form.Group controlId='name'>
                        <Form.Label class="form-label mt-4">Name</Form.Label>
                        <Form.Control type='name' class="form-control" placeholder='Enter name' value={name} onChange={(e) => setName(e.target.value)}></Form.Control>
                    </Form.Group>

                    <Form.Group controlId='email'>
                        <Form.Label class="form-label mt-4">Email Address</Form.Label>
                        <Form.Control type='email' class="form-control" placeholder='Enter email' value={email} onChange={(e) => setEmail(e.target.value)}></Form.Control>
                    </Form.Group>

                    <Form.Group controlId='password'>
                        <Form.Label class="form-label mt-4">Password</Form.Label>
                        <Form.Control type='password' class="form-control" placeholder='Enter password' value={password} onChange={(e) => setPassword(e.target.value)}></Form.Control>
                    </Form.Group>

                    <Form.Group controlId='confirmPassword'>
                        <Form.Label class="form-label mt-4">Confirm Password</Form.Label>
                        <Form.Control type='password' class="form-control" placeholder='Confirm password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}></Form.Control>
                    </Form.Group>

                    <Button type='submit' variant='primary' class="btn btn-primary" style={{marginTop: '1rem'}}>
                        Update
                    </Button>
                </Form>
            </Col>
            <Col md={9}>
                <h2>My Orders</h2>
                {loadingOrders ? <Loader /> : errorOrders ? <Message variant='danger'>{errorOrders}</Message> : (
                    <Table striped bordered hover responsive className='table-sm'>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>DATE</th>
                                <th>TOTAL</th>
                                <th>PAID</th>
                                <th>DELIVERED</th>
                                <th></th>
                            </tr>
                        </thead>
                    </Table>
                )}
            </Col>
        </Row>
    </Container>
  )
}

export default ProfileScreen