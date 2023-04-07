import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Form, Button, Container } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listProductDetails, updateProduct } from '../actions/productActions'
import FormContainer from '../components/FormContainer'
import { Link } from 'react-router-dom'
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants'
import Meta from '../components/Meta'

const ProductEditScreen = () => {
    const { id:productId } = useParams()

    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [image, setImage] = useState('')
    const [brand, setBrand] = useState('')
    const [category, setCategory] = useState('')
    const [countInStock, setCountInStock] = useState(0)
    const [description, setDescription] = useState('')
    const [uploading, setUploading] = useState(false)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const productDetails = useSelector(state => state.productDetails)
    const { loading, error, product } = productDetails

    const productUpdate = useSelector(state => state.productUpdate)
    const { loading:loadingUpdate, error:errorUpdate, success:successUpdate } = productUpdate

    useEffect(() => {
        if(successUpdate) {
            dispatch({ type: PRODUCT_UPDATE_RESET })
            navigate('/admin/productlist')
        } else {
            if(!product.name || product._id !== productId) {
                dispatch(listProductDetails(productId))
            } else {
                setName(product.name)
                setPrice(product.price)
                setImage(product.image)
                setBrand(product.brand)
                setCategory(product.category)
                setCountInStock(product.countInStock)
                setDescription(product.description)
            }
        }
    }, [dispatch, product, productId, successUpdate, navigate])

    const uploadFileHandler = async (e) => {
        const file = e.target.files[0]
        const formData = new FormData()
        formData.append('image', file)
        setUploading(true)

        try {
            const config = {
                headers: {
                    'Content-Types': 'multipart/form-data'
                }
            }

            const { data } = await axios.post('/api/upload', formData, config)

            setImage(data)
            setUploading(false)
        } catch (error) {
            console.error(error)
            setUploading(false)
        }
    }

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateProduct({
            _id: productId,
            name,
            price,
            image,
            brand,
            category,
            description,
            countInStock
        }))
    }

  return (
    <Container>
        <Meta title='Edit Product' />
        <Link to='/admin/productlist' className='btn btn-light my-3'>
            Go Back
        </Link>
        <FormContainer>
            <h1>Edit Product</h1>
            {loadingUpdate && <Loader />}
            {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
            {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
                <Form onSubmit={submitHandler}>
                    <Form.Group controlId='name'>
                        <Form.Label class="form-label mt-4">Name</Form.Label>
                        <Form.Control type='name' class="form-control" placeholder='Enter name' value={name} onChange={(e) => setName(e.target.value)}></Form.Control>
                    </Form.Group>

                    <Form.Group controlId='price'>
                        <Form.Label class="form-label mt-4">Price</Form.Label>
                        <Form.Control type='number' class="form-control" placeholder='Enter price' value={price} onChange={(e) => setPrice(e.target.value)}></Form.Control>
                    </Form.Group>

                    <Form.Group controlId='image'>
                        <Form.Label class="form-label mt-4">Image</Form.Label>
                        <Form.Control type='text' class="form-control" placeholder='Enter image url' value={image} onChange={(e) => setImage(e.target.value)}></Form.Control>
                        <Form.Control type='file' id='image-file' label='Choose File' custom onChange={uploadFileHandler}></Form.Control>
                        {uploading && <Loader />}
                    </Form.Group>

                    <Form.Group controlId='brand'>
                        <Form.Label class="form-label mt-4">Brand</Form.Label>
                        <Form.Control type='text' class="form-control" placeholder='Enter brand' value={brand} onChange={(e) => setBrand(e.target.value)}></Form.Control>
                    </Form.Group>

                    <Form.Group controlId='category'>
                        <Form.Label class="form-label mt-4">Category</Form.Label>
                        <Form.Control type='text' class="form-control" placeholder='Enter category' value={category} onChange={(e) => setCategory(e.target.value)}></Form.Control>
                    </Form.Group>

                    <Form.Group controlId='countInStock'>
                        <Form.Label class="form-label mt-4">Count In Stock</Form.Label>
                        <Form.Control type='number' class="form-control" placeholder='Enter countInStock' value={countInStock} onChange={(e) => setCountInStock(e.target.value)}></Form.Control>
                    </Form.Group>

                    <Form.Group controlId='description'>
                        <Form.Label class="form-label mt-4">Description</Form.Label>
                        <Form.Control type='text' class="form-control" placeholder='Enter description' value={description} onChange={(e) => setDescription(e.target.value)}></Form.Control>
                    </Form.Group>

                    <Button type='submit' variant='primary' class="btn btn-primary" style={{marginTop: '1rem'}}>
                        Update
                    </Button>
            </Form>
            )}
        </FormContainer>
    </Container>
  )
}

export default ProductEditScreen