import {useContext} from 'react'
import AuthContext from '../context/AuthProvider'

// useContext serves to read values of the context provider, in this case it reads the AuthContext values 
const useAuth = () => {
    return useContext(AuthContext)
}

export default useAuth