import React from 'react'
import './After-regis.css'
import { Navigate, useNavigate } from 'react-router-dom';

// import { Navigate, useNavigate } from 'react-router-dom';

function Aftregis() {


  const Navigate = useNavigate();
const logout= (e)=>{

  

  e.preventDefault()

  Navigate('/Login');


}

  return (
    

<div className="body2">
    <div className="container-home">
        <h1>REGISTERED!</h1>
        <p>Welcome back, User!</p>
        <div className="main-button">

<button onClick={logout} type='button'className='logout-btn' > <h1>GO BACK</h1></button>


</div>
    </div>
    </div>

  )
}

export default Aftregis;

