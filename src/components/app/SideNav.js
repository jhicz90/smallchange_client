import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'
import { IoCartSharp, IoStorefrontSharp } from 'react-icons/io5'
import { FaWarehouse } from 'react-icons/fa'
import { HiUserGroup } from 'react-icons/hi'
import { hideSidebar } from '../../actions/UI'

const ContentSideNav = styled.nav`
    width: ${props => props.theme.widthSide} !important;
    height: 100vh;
    display: flex;
    flex-direction: column;
    background-color: rgba(19,36,68,1);
    box-shadow: 0 2px 2px 0 rgb(0 0 0 / 14%), 0 3px 1px -2px rgb(0 0 0 / 20%), 0 1px 5px 0 rgb(0 0 0 / 12%);
    z-index: 1030;
    transition: all 0.3s ease;
`

const BackdropNav = styled.button`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1029;
    width: 100%;
    height: 100%;
    padding: 0;
    border: 0;
    margin: 0;
    outline: 0;
    display: block;
    background: rgba(33, 40, 55, 0.5);
`

const SideNavHeader = styled.div`
    display: block;
    width: 100%;
    position: relative;
    padding: 35px 25px 25px 25px;
    color: #000;
    background-image: url('/assets/header-profile.png');
    background-size: cover;
`

const NavHeader = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
`

const SideNavBody = styled.div`
    font-size: 0.875rem;
    padding: 10px;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
`

const NaviLink = styled(NavLink)`
    color: #fff;
    background-color: transparent;
    padding: 0.5rem 0.875rem !important;
    margin-bottom: 0.25rem;
    border-radius: 0.5rem;
    width: 100%;
    text-decoration: none !important;
    vertical-align: middle;
    display: flex;
    flex-direction: row;
    align-items: center;

    :hover {
        color: #fff;
        background-color: rgba(189,197,209,.2);
    }

    :active {
        background-color: rgba(189,197,209,.2);
    }

    &.active {
        background-color: rgba(189,197,209,.2);
    }

    svg {
        margin-right: 1rem;
    }
`

export const SideNav = () => {

    const dispatch = useDispatch()
    const { names, stores } = useSelector(state => state.auth)
    const { sidebar, sidebarMobile } = useSelector(state => state.ui)

    const handleSidebar = () => {
        dispatch(hideSidebar())
    }

    return (
        <>
            <ContentSideNav style={{ marginLeft: (!sidebar && sidebarMobile) ? '-220px' : 0 }}>
                <SideNavHeader>
                    <NavHeader>
                        <img src={'/assets/user.png'} className="rounded-circle shadow" width={80} alt={'avatar'} />
                        <span className="d-block fw-bold">{names}</span>
                    </NavHeader>
                </SideNavHeader>
                <SideNavBody>
                    <NaviLink to={`/app/stores`}>
                        <IoStorefrontSharp />
                        Tienda ({stores.length})
                    </NaviLink>
                    <NaviLink to={`/app/products`}>
                        <IoCartSharp />
                        Productos
                    </NaviLink>
                    <NaviLink to={`/app/warehouse`}>
                        <FaWarehouse />
                        Almacén
                    </NaviLink>
                    <NaviLink to={`/app/clients`}>
                        <HiUserGroup />
                        Clientes
                    </NaviLink>
                </SideNavBody>
            </ContentSideNav>
            {
                (sidebar && sidebarMobile)
                &&
                <BackdropNav onClick={handleSidebar} />
            }
        </>
    )
}
