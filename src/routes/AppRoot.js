import React, { useLayoutEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Route, Routes, useLocation } from 'react-router-dom'
import { mobile } from '../actions/UI'
import { Layout } from '../layouts/app/Layout'
import { Home } from '../pages/app/Home'

const AppRoot = () => {

    const dispatch = useDispatch()
    const location = useLocation()
    const { state } = location

    useLayoutEffect(() => {
        const updateSize = () => {
            if (window.innerWidth > 800) {
                dispatch(mobile(false))
            } else {
                dispatch(mobile(true))
            }
        }
        window.addEventListener('resize', updateSize)
        updateSize()
        return () => window.removeEventListener('resize', updateSize)
    }, [dispatch])

    return (
        <>
            <Routes location={state?.backgroundLocation || location}>
                <Route path={`/`} element={<Layout />}>
                    <Route index element={<Home />} />
                    {/* <Route path={`/users`} element={<Users />} /> */}
                </Route>
            </Routes>
        </>
    )
}

export default AppRoot