import React from 'react'
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
                <Outlet />
            </MainContent>
        </RootApp>
    )
}