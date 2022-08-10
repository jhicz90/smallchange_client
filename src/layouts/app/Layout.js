import React from 'react'
import { Outlet } from 'react-router-dom'
import { MainContent } from '../../components/app/Content'
import { NavHeader } from '../../components/app/Header'

export const Layout = () => {
    return (
        <div className="root-app">
            <NavHeader />
            <MainContent>
                <div style={{ marginTop: '18px' }}>
                    <Outlet />
                </div>
            </MainContent>
        </div>
    )
}