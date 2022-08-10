import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { startChecking } from '../actions/Auth'
import { Loading } from '../components/all/Loading'
import AppRoot from './AppRoot'
import WebRoot from './WebRoot'

export const Router = () => {
    const dispatch = useDispatch()
    const { uid, checking } = useSelector(state => state.auth)

    useEffect(() => {
        dispatch(startChecking())
    }, [dispatch])

    if (checking) {
        return <Loading />
    }

    return (
        <BrowserRouter>
            <Routes>
                <Route path={`/`} element={<Navigate to={`/web`} />} />
                <Route path={`/web/*`} element={<WebRoot />} />
                <Route path={`/app/*`} element={uid ? <AppRoot /> : <Navigate to={`/web`} replace />} />
            </Routes>
        </BrowserRouter>
    )
}