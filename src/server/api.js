import axios from 'axios';



const api = axios.create({
    baseURL:import.meta.env.VITE_REACT_APP_BACKEND_DEVELOPMENT,
    withCredentials:true,

});



export default api