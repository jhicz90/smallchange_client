import React, { useLayoutEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Route, Routes, useLocation } from 'react-router-dom'
import { hideSidebar, mobile, showSidebar } from '../actions/UI'
import { Layout } from '../layouts/app/Layout'
import { Home } from '../pages/app/home'
import { EditOfStore } from '../pages/app/store/edit'
import { ListOfStore } from '../pages/app/store/list'

const AppRoot = () => {

    const dispatch = useDispatch()
    const location = useLocation()
    const { state } = location

    useLayoutEffect(() => {
        const updateSize = () => {
            if (window.innerWidth > 1200) {
                dispatch(mobile(false))
                dispatch(showSidebar())
            } else {
                dispatch(mobile(true))
                dispatch(hideSidebar())
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
                    <Route path={`stores`} element={<ListOfStore />} />
                </Route>
            </Routes>
            {
                state?.backgroundLocation
                &&
                <Routes>
                    <Route path={`/stores/:id`} element={<EditOfStore />} />
                </Routes>
            }
        </>
    )
}

export default AppRoot