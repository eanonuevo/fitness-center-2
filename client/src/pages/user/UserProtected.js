import React from 'react'
import { Navigate } from 'react-router-dom'

const UserProtected = ({ children }) => {
    const getUser = localStorage.getItem('user')
    const user = JSON.parse(getUser)

    if (!(user && user.role === 'user')) {
        return <Navigate to='/' />
    }

    return children
}

export default UserProtected
