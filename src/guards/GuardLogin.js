import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

export const GuardLogin = ({ component: RouteComponent }) => {

    const { uid } = useSelector(state => state.auth)

    if (!uid) {
        return <RouteComponent />
    }

    return <Navigate to={'/web'} replace />
}
