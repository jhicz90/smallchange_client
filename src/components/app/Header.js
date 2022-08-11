import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Container, Nav, Navbar } from 'react-bootstrap'
import { startLogout } from '../../actions/Auth'

export const NavHeader = () => {

    const dispatch = useDispatch()
    const { name, image } = useSelector(state => state.auth)

    const handleLogout = () => {
        dispatch(startLogout())
    }

    return (
        <div id="header" className="header">
            <Navbar collapseOnSelect bg="light" expand="lg" fixed="top">
                <Container>
                    <Link to="/app" className="navbar-brand">
                        <img src={'/logo.png'} alt="logo" width="32" height="32" className="d-inline-block align-top" />
                    </Link>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav className="me-auto">
                            {/* <HeaderDropdownShop /> */}
                        </Nav>
                        <Nav>
                            <Navbar.Text>
                                {
                                    image !== ''  && <img src={image} alt={'avatar'} />
                                }
                                <span className="text-primary">{name}</span>
                            </Navbar.Text>
                            <Nav.Link
                                onClick={handleLogout}
                                className="nav-item nav-link"
                            >Cerrar sesión</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    )
}
