import axios from  'axios'

// Create a url as a base 
const axiosClient = axios.create({
    baseURL: `${import.meta.env.VITE_BACKEND_URL}/api`
})

export default axiosClient