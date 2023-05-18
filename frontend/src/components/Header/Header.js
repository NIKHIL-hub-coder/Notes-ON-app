import React from 'react'
import { Navbar, Container, Nav, NavDropdown, FormControl, Form } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../store/login-slice'
const Header = ({ setSearch }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const { userInfo } = useSelector(state => state.login)
    const logoutHandler = () => {
        dispatch(logout())
        navigate('/');
    }
    return (
        <Navbar bg="primary" expand="lg" variant='dark'>
            <Container>
                <Navbar.Brand >
                    <Link to='/'>Note Zipper</Link>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className='m-auto'>
                        <Form className="d-flex">
                            <FormControl type="search" placeholder="Search" className="me-2" aria-label="Search" onChange={(e) => setSearch(e.target.value)} />
                        </Form>
                    </Nav>

                    {userInfo ? <Nav>
                        <Nav.Link as={Link} to="/mynotes">My Notes</Nav.Link>
                        <NavDropdown title={userInfo?.name} id="basic-nav-dropdown">
                            <NavDropdown.Item href="/profile">My Profile</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                        </NavDropdown>
                    </Nav> : <Nav><Nav.Link as={Link} to='/login'>Login</Nav.Link></Nav>}

                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Header;