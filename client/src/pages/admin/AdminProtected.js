import React from 'react'
import { Navigate } from 'react-router-dom'

const AdminProtected = ({ children }) => {
    const getUser = localStorage.getItem('user')
    const user = JSON.parse(getUser)

    if (!(user && user.role === 'admin')) {
        return <Navigate to='/' />
    }

    return children
}

export default AdminProtected
