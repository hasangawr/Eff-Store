import React from 'react'
import {Link} from 'react-router-dom'
import { Card } from 'react-bootstrap'
import Rating from './Rating'

const Store = ({store}) => {
  return (
    <Card className='my-3 p-3 rounded'>
        <Link to={`/stores/${store._id}`}>
            <Card.Img src={store.image} variant='top' fluid='true'/>
        </Link>

        <Card.Body>
            <Link to={`/product/${store._id}`} style={{textDecorationLine: 'none'}}>
                <Card.Title as='div'>
                    <strong>{store.name}</strong>
                </Card.Title>
            </Link>

            <Card.Text as='div'>
                <Rating value={store.rating} text={`${store.numReviews} reviews`}/>
            </Card.Text>
        </Card.Body>
    </Card>
  )
}

export default Store