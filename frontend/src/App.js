import React from 'react'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import HomeScreen from './screens/HomeScreen'
import ProductScreen from './screens/ProductScreen'
import CartScreen from './screens/CartScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import ProfileScreen from './screens/ProfileScreen'
import ShippingScreen from './screens/ShippingScreen'
import PaymentScreen from './screens/PaymentScreen'
import PlaceOrderScreen from './screens/PlaceOrderScreen'
import OrderScreen from './screens/OrderScreen'
import OrderListScreen from './screens/OrderListScreen'
import UserListScreen from './screens/UserListScreen'
import UserEditScreen from './screens/UserEditScreen'
import ProductListScreen from './screens/ProductListScreen'
import ProductEditScreen from './screens/ProductEditScreen'
import StoreEditScreen from './screens/StoreEditScreen'
import StoreScreen from './screens/StoreScreen'
import StoreDashboardScreen from './screens/StoreDashboardScreen'

const App = () => {
  return (
    <Router>
      <Header />
      <main>
        <>
          <Routes>
            <Route path='/stores/:id' element={<StoreScreen />} exact/>
            <Route path='/owner/stores/:id/:productId/edit' element={<ProductEditScreen />} />
            <Route path='/owner/stores/:id/productlist' element={<ProductListScreen />} />
            <Route path='/owner/stores/:id/dashboard' element={<StoreDashboardScreen />} />
            <Route path='/owner/stores/:id/edit' element={<StoreEditScreen />} />
            <Route path='/order/:id' element={<OrderScreen />} exact/>
            <Route path='/order/:id/:storeId' element={<OrderScreen />} exact/>
            <Route path='/place-order' element={<PlaceOrderScreen />} />
            <Route path='/payment' element={<PaymentScreen />} />
            <Route path='/login/shipping' element={<ShippingScreen />} />
            <Route path='/login' element={<LoginScreen />} />
            <Route path='/register' element={<RegisterScreen />} />
            <Route path='/profile' element={<ProfileScreen />} />
            <Route path='/product/:id' element={<ProductScreen />} />
            <Route path='/cart/:id' element={<CartScreen />} />
            <Route path='/cart' element={<CartScreen />} />
            <Route path='/admin/userlist' element={<UserListScreen />} />
            <Route path='/admin/user/:id/edit' element={<UserEditScreen />} />
            <Route path='/search/:keyword' element={<HomeScreen />} />
            <Route path='/page/:pageNumber' element={<HomeScreen />} exact />
            <Route path='/search/:keyword/page/:pageNumber' element={<HomeScreen />} exact />
            <Route path='/' element={<HomeScreen />} exact />
          </Routes>
        </>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
