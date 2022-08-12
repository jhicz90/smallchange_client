import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { IoCartSharp, IoStorefrontSharp } from 'react-icons/io5'
import { FaWarehouse } from 'react-icons/fa'
import { HiUserGroup } from 'react-icons/hi'

const ContentSideNav = styled.nav`
    width: ${props => props.theme.widthSide} !important;
    height: 100vh;
    display: flex;
    flex-direction: column;
    background-color: rgba(19,36,68,1);
    box-shadow: 0 2px 2px 0 rgb(0 0 0 / 14%), 0 3px 1px -2px rgb(0 0 0 / 20%), 0 1px 5px 0 rgb(0 0 0 / 12%);
    z-index: 1030;
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

const NavLink = styled(Link)`
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

    const { names, stores } = useSelector(state => state.auth)

    return (
        <ContentSideNav>
            <SideNavHeader>
                <NavHeader>
                    <img src={'/assets/user.png'} className="rounded-circle shadow" width={80} alt={'avatar'} />
                    <span className="d-block fw-bold">{names}</span>
                </NavHeader>
            </SideNavHeader>
            <SideNavBody>
                <NavLink to={`/app/stores`}>
                    <IoStorefrontSharp />
                    Tienda ({stores.length})
                </NavLink>
                <NavLink to={`/app/products`}>
                    <IoCartSharp />
                    Productos
                </NavLink>
                <NavLink to={`/app/warehouse`}>
                    <FaWarehouse />
                    Almacén
                </NavLink>
                <NavLink to={`/app/clients`}>
                    <HiUserGroup />
                    Clientes
                </NavLink>
            </SideNavBody>
        </ContentSideNav>
    )
}
