import React, { useEffect } from 'react'
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap'
import Message from '../components/Message'
import { addToCart } from '../actions/cartActions'

const CartScreen = ({ location }) => {
  let {id} = useParams()
  const [searchParams, setSearchParams] = useSearchParams();
  let qty = searchParams.get('qty') ? Number(searchParams.get('qty')) : 1

  let navigate = useNavigate()

  const dispatch = useDispatch()

  const cart = useSelector(state => state.cart)
  const { cartItems } = cart

  console.log(cartItems);

  useEffect(() => {
    if(id) {
      dispatch(addToCart(id, qty))
    }
  }, [dispatch, id, qty])

  return (
    <div>Cart</div>
  )
}

export default CartScreen