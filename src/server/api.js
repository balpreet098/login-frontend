import axios from 'axios';



const api = axios.create({
    baseURL:import.meta.env.VITE_REACT_APP_BACKEND_DEVELOPMENT,
    headers: {
        "Content-type": "application/json",
      },
    withCredentials:true,

});



export default api



// import axios from "axios";

// import { BASE_URL } from "../utils/config";
// // Create a new Axios instance
 
// const api = axios.create({
//   baseURL: BASE_URL,
//   headers: {
//     "Content-type": "application/json",
//   },
//   withCredentials: true,
// });

// export default api;