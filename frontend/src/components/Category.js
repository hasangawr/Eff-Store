import React from 'react'
import {Link} from 'react-router-dom'
import { Card, CardImg } from 'react-bootstrap'
import Rating from './Rating'

const Category = ({product}) => {
  return (
    <Card className='my-3 p-3 rounded'>
        <Link to={`/product/${product._id}`}>
            <Card.Img src={product.image} variant='top' fluid/>
        </Link>

        <Card.Body>
            <Link to={`/product/${product._id}`} style={{textDecorationLine: 'none'}}>
                <Card.Title as='div'>
                    <strong>{product.name}</strong>
                </Card.Title>
            </Link>
        </Card.Body>
    </Card>
  )
}

export default Category