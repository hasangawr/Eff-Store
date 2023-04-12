import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap'
import SearchBox from './SearchBox'
import { logout, listUserStores } from '../actions/userActions'
import { USER_STORES_RESET } from '../constants/userConstants'

const Header = () => {
  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const userStores = useSelector(state => state.userStores)
  const { stores } = userStores

  useEffect(() => {
    if(userInfo) {
      dispatch(listUserStores())
    } else {
      dispatch({type: USER_STORES_RESET})
    }

  }, [dispatch, userInfo])

  const logoutHandler = () => {
    dispatch(logout())
  }

  return (
    <header>
        <Navbar bg="dark" variant='dark' expand="lg" collapseOnSelect style={{"paddingTop": "0.5rem", "paddingBottom": "0.5rem"}}>
        <Container style={{"margin": "0", "maxWidth": "100%"}}>
          <LinkContainer to='/'>
            <Navbar.Brand><span className='green-txt'>Eff</span>Store</Navbar.Brand>
          </LinkContainer>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" >

          <SearchBox />

          <Nav className="ml-auto" >
            <LinkContainer to='/cart'>
              <Nav.Link><i className='fas fa-shopping-cart'></i>Cart</Nav.Link>
            </LinkContainer>
            {userInfo ? (
              <NavDropdown title={userInfo.name} id='username'>
                <LinkContainer to='/profile'>
                  <NavDropdown.Item>Profile</NavDropdown.Item>
                </LinkContainer>
                <NavDropdown.Item onClick={logoutHandler}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <LinkContainer to='/login'>
              <Nav.Link><i className='fas fa-user'></i>Sign In</Nav.Link>
            </LinkContainer>
            )}
            {userInfo && userInfo.isAdmin && (
              <NavDropdown title='Admin' id='adminmenu'>
                <LinkContainer to='/admin/userlist'>
                  <NavDropdown.Item>Users</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to='/admin/productlist'>
                  <NavDropdown.Item>Products</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to='/admin/orderlist'>
                  <NavDropdown.Item>Orders</NavDropdown.Item>
                </LinkContainer>
              </NavDropdown>
            )}
            {stores && (stores.length !== 0) &&(
              <NavDropdown title='MY STORES' id='storesmenu'>
                {stores.map((store) => (
                  <LinkContainer key={store._id} to={`/stores/${store._id}`} >
                    <NavDropdown.Item>{store.name}</NavDropdown.Item>
                  </LinkContainer>
                ))}
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
        </Container>
    </Navbar>
    </header>
  )
}

export default Header