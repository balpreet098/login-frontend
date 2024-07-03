import axios from 'axios';



const api = axios.create({
    baseURL:import.meta.env.VITE_REACT_APP_DEVELOPMENT_BASE_URL,
    withCredentials:true,

});



export default api