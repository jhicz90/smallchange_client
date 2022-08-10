import React from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'
import { FcShop } from 'react-icons/fc'
import { useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import styled from 'styled-components'
import { GroupItems } from '../../helpers/Styles'

const NavMenu = styled(Navbar)`
    min-height: ${props => props.theme.header};
    /* box-shadow: 0 0.5rem 0.5rem -0.5rem rgb(0 0 0 / 20%) !important; */
`

const ToggleMenu = styled.div`
    margin-top: 2px;
    margin-bottom: 2px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;

    @media (min-width: ${props => props.theme.lg}) { 
        display: block;
        width: auto;
    }
`

export const NavHeader = () => {

    const location = useLocation()
    const { uid } = useSelector(state => state.auth)

    return (
        <NavMenu collapseOnSelect bg='light' expand='lg' sticky='top' className='shadow-sm'>
            <Container>
                <ToggleMenu>
                    <Link to='/web' className='navbar-brand'>
                        <img className='ms-1' src={'/logo.png'} alt='logo' width={24} height={24} />
                    </Link>
                    <Navbar.Toggle aria-controls='navbarScroll' />
                </ToggleMenu>
                <Navbar.Collapse id='navbarScroll'>
                    <Nav className='me-auto'>
                        <Link className='nav-item nav-link' to='/web'>Inicio</Link>
                        <Link className='nav-item nav-link' to='/web/services'>Servicios</Link>
                        <Link className='nav-item nav-link' to='/web/about-us'>Nosotros</Link>
                        <Link className='nav-item nav-link' to='/web/contact-us'>Contáctanos</Link>
                    </Nav>
                    <Nav>
                        {
                            uid
                                ?
                                <Link
                                    to='/app'
                                    className='nav-item nav-link'
                                >
                                    Ir a su tienda <FcShop size={30} />
                                </Link>
                                :
                                <GroupItems>
                                    <Link
                                        to='/web/login'
                                        className='nav-item nav-link'
                                        state={{ backgroundLocation: location }}
                                    >
                                        Inicio de sesión
                                    </Link>
                                    <Link
                                        to='/web/register'
                                        className='btn btn-primary px-3 ml-lg-4'
                                        state={{ backgroundLocation: location }}
                                    >
                                        <span>
                                            Únete a nosotros
                                            <img className='ms-1' src={`/assets/helping-hand.png`} alt={'join'} width={24} height={24} /> es <strong>GRATIS</strong>
                                        </span>
                                    </Link>
                                </GroupItems>
                        }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </NavMenu>
    )
}
