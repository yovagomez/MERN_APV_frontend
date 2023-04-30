import {useContext} from 'react'
import PatientsContext from '../context/PatientsProvider'

// useContext serves to read values of the context provider, in this case it reads the AuthContext values 
const usePatients = () => {
    return useContext(PatientsContext)
}

export default usePatients