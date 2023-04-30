// Provider =  where all the application state comes from, it's like a data source
import { useState, useEffect, createContext } from 'react'
import axiosClient from '../config/axios'

// createContext = Allows us to access different parts of the application, globally
const AuthContext = createContext()

// It's like one big component that's gonna have all the application components as children. It is similar to a component
const AuthProvider = ({children}) => {
    const [ loading, setLoading ] = useState(true)
    const [auth, setAuth] = useState({})

    // It's execute when the application is loaded
    useEffect(() => {
        const authUser =  async () => {  
            // Get token when the user is authenticated
            const token = localStorage.getItem('token')
            if(!token) {
                setLoading(false)
                return
            }

            const config = {
                // Headers setup
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            try {
                // Request if a profile exists 
                const { data } = await axiosClient.get('/vets/profile', config)
                setAuth(data)
            } catch (error) {
                console.log(error.response.data.msg)
                setAuth({})
            }
            setLoading(false)
        }

        authUser()
    }, [])

    // Update profile information
    const updateProfile = async profileData => {
        // Get token when the user is authenticated
        const token = localStorage.getItem('token')
        if(!token) {
            setLoading(false)
            return
        }

        const config = {
            // Headers setup
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }
        
        try {
            const url = `/vets/profile/${profileData._id}`
            const { data } = await axiosClient.put(url, profileData, config)
            
            return {
                msg: 'Saved succesufully',
            }
        } catch (error) {
            return {
                msg: error.response.data.msg,
                error: true
            }
        }
    }

    // Save the new password
    const savePassword = async pwdData => {
        // Get token when the user is authenticated
        const token = localStorage.getItem('token')
        if(!token) {
            setLoading(false)
            return
        }

        const config = {
            // Headers setup
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        try {
            const url = '/vets/update-password'

            const { data } = await axiosClient.put(url, pwdData, config)
            console.log(data)
            return {
                msg: data.msg
            }
        } catch (error) {
            return {
                msg: error.response.data.msg,
                error: true
            }
        }
    }

    // Exit account 
    const logOut = () => {
        // We need to remove the token in LocalStorage and put the object empty
        localStorage.removeItem('token')
        setAuth({})
    }

    return (
        <AuthContext.Provider
            value={{
                auth,
                setAuth,
                loading,
                updateProfile,
                savePassword,
                logOut
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export {
    AuthProvider
}

export default AuthContext