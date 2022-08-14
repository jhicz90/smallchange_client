import React from 'react'
import { Outlet } from 'react-router-dom'
import { MainContent } from '../../components/web/Content'
import { NavHeader } from '../../components/web/Header'

export const Layout = () => {
    return (
        <div className='root-web'>
            <MainContent>
                <NavHeader />
                <Outlet />
            </MainContent>
        </div>
    )
}