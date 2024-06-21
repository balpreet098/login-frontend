import Login from './Login/Login.jsx'
import Homepage from './Homepage/Homepage.jsx'
import Frontpage from './Frontpage/Frontpage.jsx'
import Discover from './Discover/Discover.jsx'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Register from './Register/Register.jsx'
import Aftregis from './Register/After-regis.jsx'
import axios from 'axios'
import { useEffect } from 'react'
import Protected from './protected-route/Protected.jsx'

function App() {
 
  useEffect(()=>{


    (async()=>{

      axios.get("http://127.0.0.1:4000/tk", 

        

        { withCredentials: true }
      )
        .then((response) => {
          console.log(response)
        })
        .catch((error) => {
          console.error('There was an error with the login request:', );
        });


    })()

  },[])

    return( <BrowserRouter>

      <Routes>
        {/* <Route path='/' element={<Homepage/>}></Route> */}
        <Route path='/' element={<Frontpage/>}></Route>
        <Route  path='/login' element={<Login />}> </Route>
        <Route  path='/Homepage' element={<Protected Comp={Homepage}/>}> </Route>
      <Route path='/Discover' element={<Discover/>}></Route>
      <Route path='/Register' element={<Register/>}></Route>
      <Route path='/Aftregis' element={<Aftregis/>}></Route>
  
      </Routes>
  
    </BrowserRouter>) }
  
    export default App