import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Form, Button, Container } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { Link } from 'react-router-dom'
import { STORE_UPDATE_RESET } from '../constants/storeConstants'
import Meta from '../components/Meta'
import { listStoreDetails, updateStore } from '../actions/storeActions'

const StoreEditScreen = () => {
    const { id:storeId } = useParams()

    const [name, setName] = useState('')
    const [type, setType] = useState('')
    const [image, setImage] = useState('')
    const [description, setDescription] = useState('')
    const [uploading, setUploading] = useState(false)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const storeDetails = useSelector(state => state.storeDetails)
    const { loading, error, store } = storeDetails

    const storeUpdate = useSelector(state => state.storeUpdate)
    const { loading:loadingUpdate, error:errorUpdate, success:successUpdate } = storeUpdate

    useEffect(() => {
        if(successUpdate) {
            dispatch({ type: STORE_UPDATE_RESET })
            navigate(`/owner/stores/${storeId}/dashboard`)
        } else {
            if(!store.name || store._id !== storeId) {
                dispatch(listStoreDetails(storeId))
            } else {
                setName(store.name)
                setType(store.type)
                setImage(store.image)
                setDescription(store.description)
            }
        }
    }, [dispatch, store, storeId, successUpdate, navigate])

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
        dispatch(updateStore({
            _id: storeId,
            name,
            type,
            image,
            description
        }))
    }

  return (
    <Container>
        <Meta title='Edit Store' />
        <Link to={`/owner/stores/${storeId}/dashboard`} className='btn btn-light my-3'>
            Go Back
        </Link>
        <FormContainer>
            <h1>Edit Store</h1>
            {loadingUpdate && <Loader />}
            {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
            {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
                <Form onSubmit={submitHandler}>
                    <Form.Group controlId='name'>
                        <Form.Label class="form-label mt-4">Name</Form.Label>
                        <Form.Control type='name' class="form-control" placeholder='Enter name' value={name} onChange={(e) => setName(e.target.value)}></Form.Control>
                    </Form.Group>

                    <Form.Group controlId='type'>
                        <Form.Label class="form-label mt-4">Type</Form.Label>
                        <Form.Control type='text' class="form-control" placeholder='Enter type' value={type} onChange={(e) => setType(e.target.value)}></Form.Control>
                    </Form.Group>

                    <Form.Group controlId='image'>
                        <Form.Label class="form-label mt-4">Image</Form.Label>
                        <Form.Control type='text' class="form-control" placeholder='Enter image url' value={image} onChange={(e) => setImage(e.target.value)}></Form.Control>
                        <Form.Control type='file' id='image-file' label='Choose File' custom onChange={uploadFileHandler}></Form.Control>
                        {uploading && <Loader />}
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

export default StoreEditScreen