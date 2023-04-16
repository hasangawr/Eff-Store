import React from 'react'
import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import { Button, Table, Container, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { deleteProduct, createProduct } from '../actions/productActions'
import { PRODUCT_CREATE_RESET } from '../constants/productConstants'
import Meta from '../components/Meta'
import { listStoreDetails } from '../actions/storeActions'

const ProductListScreen = () => {
    let { id } = useParams()

    let { pageNumber } = useParams()
    if(!pageNumber) pageNumber = 1

    const dispatch = useDispatch()
    const navigate = useNavigate()
    
    const storeDetails = useSelector(state => state.storeDetails)
    const { loading, error, store } = storeDetails

    const productDelete = useSelector(state => state.productDelete)
    const { loading:loadingDelete, error:errorDelete, success:successDelete } = productDelete

    const productCreate = useSelector(state => state.productCreate)
    const { loading:loadingCreate, error:errorCreate, success:successCreate, product:createdProduct } = productCreate


    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    useEffect(() => {
        dispatch({ type: PRODUCT_CREATE_RESET })

        if(!userInfo || !userInfo.isOwner || !userInfo.stores.includes(id)) {
            navigate('/login')
        }

        if(successCreate) {
            let productId = createdProduct._id
            navigate(`/owner/stores/${id}/${productId}/edit`)
        } else {
            dispatch(listStoreDetails(id))
        }
    }, [dispatch, navigate, userInfo, successDelete, successCreate, createdProduct, pageNumber, id])

    const deleteHandler = (productId) => {
        if(window.confirm('Are you sure')) {
            dispatch(deleteProduct(id, productId))
        }
    }

    const createProductHandler = (product) => {
        dispatch(createProduct(id))
    }

  return (
    <Container>
        <Meta title='Products' />
        <Row className='align-items-center'>
            <Col>
                <h1>Products</h1>
            </Col>
            <Col className='text-right'>
                <Button className='my-3' onClick={createProductHandler}>
                    <i className='fas fa-plus'></i> Create Product
                </Button>
            </Col>
        </Row>
        {loadingDelete && <Loader />}
        {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
        {loadingCreate && <Loader />}
        {errorCreate && <Message variant='danger'>{errorCreate}</Message>}
        {loading ? <Loader /> :
         error ? <Message variant='danger'>{error}</Message> :
         (
            <>
            <Table striped bordered hover responsive className='table-sm'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>NAME</th>
                        <th>PRICE</th>
                        <th>CATEGORY</th>
                        <th>BRAND</th>
                    </tr>
                </thead>
                <tbody>
                    {store.productList.map(product => (
                        <tr key={product._id}>
                            <td>{product._id}</td>
                            <td>{product.name}</td>
                            <td>Rs. {product.price}</td>
                            <td>{product.category}</td>
                            <td>{product.brand}</td>
                            <td>
                                <LinkContainer to={`/owner/stores/${id}/${product._id}/edit`}>
                                    <Button variant='light' className='btn-sm'>
                                        <i className='fas fa-edit'></i>
                                    </Button>
                                </LinkContainer>
                                <Button variant='danger' className='btn-sm' onClick={() => deleteHandler(product._id)}>
                                    <i className='fas fa-trash'></i>
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            </>
         )}
    </Container>
  )
}

export default ProductListScreen