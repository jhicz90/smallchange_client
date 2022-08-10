import React from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { Login } from '../components/web/Login'
import { Register } from '../components/web/Register'
import { GuardLogin } from '../guards/GuardLogin'
import { Layout } from '../layouts/web/Layout'
import { Home } from '../pages/web/Home'
import { Services } from '../pages/web/Services'

const WebRoot = () => {

    const location = useLocation()
    const { state } = location

    return (
        <>
            <Routes location={state?.backgroundLocation || location}>
                <Route path={`/`} element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path={`services`} element={<Services />} />
                    <Route path={`*`} element={<Navigate to={`/web`} replace />} />
                </Route>
            </Routes>
            {
                state?.backgroundLocation
                &&
                <Routes>
                    <Route path="/login" element={<GuardLogin component={Login} />} />
                    <Route path="/register" element={<GuardLogin component={Register} />} />
                </Routes>
            }
        </>
    )
}

export default WebRoot