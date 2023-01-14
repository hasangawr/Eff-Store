import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { register } from '../actions/userActions'
import FormContainer from '../components/FormContainer'

const RegisterScreen = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState(null)

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()

    const userRegister = useSelector(state => state.userRegister)
    const { loading, error, userInfo } = userRegister

    const redirect = location.search ? location.search.split('=')[1] : '/'

    useEffect(() => {
        if(userInfo) {
            navigate(redirect)
        }
    }, [navigate, userInfo, redirect])

    const submitHandler = (e) => {
        e.preventDefault()
        if (password !== confirmPassword) {
            setMessage('Passwords do not match')
        } else {
            dispatch(register(name, email, password))
        }
    }

  return (
        <FormContainer>
        <h1>Sign Up</h1>
        {message && <Message variant='danger'>{message}</Message>}
        {error && <Message variant='danger'>{error}</Message>}
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
                Register
            </Button>
        </Form>

        <Row className='py-3'>
            <Col>
                Have an Account? <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
                    Login
                </Link>
            </Col>
        </Row>
    </FormContainer>
  )
}

export default RegisterScreen