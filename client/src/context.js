import React, { useContext, useState, useEffect } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'

const AppContext = React.createContext()

const AppProvider = ({ children }) => {
    // global states
    const [user, setUser] = useState(null)

    // auth module
    const saveUser = (user) => {
        localStorage.setItem('user', JSON.stringify(user))
        const online = localStorage.getItem('user')
        const onlineUser = JSON.parse(online)
        setUser(onlineUser)
    }

    const removeUser = () => {
        setUser(null)
        localStorage.removeItem('user')
    }

    const fetchUser = async () => {
        try {
            const { data } = await axios.get('/api/v1/users/showMe')
            saveUser(data.user)
        } catch (error) {
            removeUser()
        }
    }

    const logoutUser = async () => {
        try {
            await axios.get('/api/v1/auth/logout')
            removeUser()
            toast.success('Logout successfully!')
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchUser()
    }, [])

    return (
        <AppContext.Provider
            value={{
                // auth
                user,
                saveUser,
                logoutUser,
            }}
        >
            {children}
        </AppContext.Provider>
    )
}

export const useGlobalContext = () => {
    return useContext(AppContext)
}

export { AppProvider }
