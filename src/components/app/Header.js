import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Container, Nav, Navbar } from 'react-bootstrap'
import styled from 'styled-components'
import { startLogout } from '../../actions/Auth'

const NavMenu = styled(Navbar)`
    min-height: ${props => props.theme.header};
    /* box-shadow: 0 0.5rem 0.5rem -0.5rem rgb(0 0 0 / 20%) !important; */
`

export const NavHeader = () => {

    const dispatch = useDispatch()
    const { name, image } = useSelector(state => state.auth)

    const handleLogout = () => {
        dispatch(startLogout())
    }

    return (
        <NavMenu collapseOnSelect bg='light' expand='lg' sticky='top' className='shadow-sm'>
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
                                image !== '' && <img src={image} alt={'avatar'} />
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
        </NavMenu>
    )
}
