import React, {useEffect, useRef, useState} from 'react'
import MainLayout from '../layouts/MainLayout'
import axios from "axios"
import Product from '../components/Product'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listStoreDetails } from '../actions/storeActions'
import Meta from '../components/Meta'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { Print } from '../components/Print'
import { useReactToPrint } from 'react-to-print';
import { updateProduct } from '../actions/productActions'

function POSScreen() {
  let { id } = useParams()
  const dispatch = useDispatch()

  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [cart, setCart] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [currentStore, setCurrentStore] = useState({});

  const storeDetails = useSelector(state => state.storeDetails)
  const { loading, error, store } = storeDetails

  const productUpdate = useSelector(state => state.productUpdate)
  const { success } = productUpdate

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  const toastOptions = {
    autoClose: 400,
    pauseOnHover: true,
  }

  const fetchProducts = async() => {
    setIsLoading(true);
    dispatch(listStoreDetails(id));
    setCurrentStore(store);
    setProducts(store.productList);
    setIsLoading(false);
  }

  const addProductToCart = async(product) =>{
    // check if the adding product exist
    let findProductInCart = cart.find(i=>{
      return i._id === product._id
    });

    if(findProductInCart){
      let newCart = [];
      let newItem;

      cart.forEach(cartItem => {
        if(cartItem._id === product._id){
          newItem = {
            ...cartItem,
            quantity: cartItem.quantity + 1,
            totalAmount: cartItem.price * (cartItem.quantity + 1)
          }
          newCart.push(newItem);
        }else{
          newCart.push(cartItem);
        }
      });

      setCart(newCart);
      toast(`Added ${newItem.name} to cart`,toastOptions)

    }else{
      let addingProduct = {
        ...product,
        'quantity': 1,
        'totalAmount': product.price,
      }
      setCart([...cart, addingProduct]);
      toast(`Added ${product.name} to cart`, toastOptions)
    }

  }

  const removeProduct = async(product) =>{
    const newCart =cart.filter(cartItem => cartItem._id !== product._id);
    setCart(newCart);
  }

  const componentRef = useRef();

  const handleReactToPrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const handlePrint = () => {
    handleReactToPrint();
  }

  useEffect(() => {
    fetchProducts();
  },[]);

  useEffect(() => {
    let newTotalAmount = 0;
    cart.forEach(icart => {
      newTotalAmount = newTotalAmount + parseInt(icart.totalAmount);
    })
    setTotalAmount(newTotalAmount);
  },[cart])



  return (
    <MainLayout>
      <div className='row'>
        <div className='col-lg-8'>
          {isLoading ? 'Loading' : <div className='row'>
              {products.map((product, key) =>
                <div key={key} className='col-lg-3 mb-4'>
                  <div className='pos-item px-3 text-center border' onClick={() => addProductToCart(product)}>
                      <p>{product.name}</p>
                      <img src={product.image} className="img-fluid" alt={product.name} />
                      <p>Price: Rs. {product.price}</p>
                      <p>Stock: {product.countInStock}</p>
                  </div>

                </div>
              )}
            </div>}
       
        </div>
        <div className='col-lg-4'>
              <div style={{display: "none"}}>
                <Print cart={cart} totalAmount={totalAmount} currentStore={currentStore} ref={componentRef}/>
              </div>
              <div className='table-responsive bg-dark'>
                <table className='table table-responsive table-dark table-hover'>
                  <thead>
                    <tr>
                      <td>Name</td>
                      <td>Price</td>
                      <td>Qty</td>
                      <td>Total</td>
                      <td>Action</td>
                    </tr>
                  </thead>
                  <tbody>
                    { cart ? cart.map((cartProduct, key) => <tr key={key}>
                      <td>{cartProduct.name}</td>
                      <td>{cartProduct.price}</td>
                      <td>{cartProduct.quantity}</td>
                      <td>{cartProduct.totalAmount}</td>
                      <td>
                        <button className='btn btn-danger btn-sm' onClick={() => removeProduct(cartProduct)}>Remove</button>
                      </td>

                    </tr>)

                    : 'No Item in Cart'}
                  </tbody>
                </table>
                <h2 className='px-2 text-white'>Total Amount: Rs. {totalAmount}</h2>
              </div>

              <div className='mt-3'>
                { totalAmount !== 0 ? <div>
                  <button className='btn btn-primary btn-block' onClick={handlePrint}>
                    Pay Now
                  </button>

                </div> : 'Please add a product to the cart'

                }
              </div>


        </div>
      </div>
    </MainLayout>
  )
}

export default POSScreen