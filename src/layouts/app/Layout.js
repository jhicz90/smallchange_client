import React from 'react'
import { Container } from 'react-bootstrap'
import { Outlet } from 'react-router-dom'
import styled from 'styled-components'
import { MainContent } from '../../components/app/Content'
import { NavHeader } from '../../components/app/Header'
import { SideNav } from '../../components/app/SideNav'

const RootApp = styled.div`
    display: flex;
`

export const Layout = () => {
    return (
        <RootApp>
            <SideNav />
            <MainContent>
                <NavHeader />
                <Container className='p-3'>
                    <Outlet />
                </Container>
            </MainContent>
        </RootApp>
    )
}