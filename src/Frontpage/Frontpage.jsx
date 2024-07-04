import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
import './fronthead.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import image from "../assets/img/logo.png"
import { Navigate, useNavigate } from 'react-router-dom';

function Frontpage() {

  const Navigate = useNavigate();

  const clickbtn = (e) => {
    e.preventDefault()
    Navigate('/Login')

  }

  const clickbtn2 = (e) => {
    e.preventDefault()
    Navigate('/Discover')

  }



  return (

    <div>
      <div className="main">
        <div className="front-head">
          <div className="l-b-mix">
            <div className="logo" ><img src={image} alt='logo/img' width='80px' height='80px' /></div>
            <div className="btno"><button className='main-btn' onClick={clickbtn} ><h1>BUY THEME</h1></button></div>
          </div>

        </div>


        <div className="container-main">


          <div className=" outer-txt-container">

            <div className="inner-text-container">

              <div className="txt1"><p>LOOK <br /> '' AND '' <br /> KINDNESS</p></div>
              <div className="txt2"><p>PHOTOGRAPHY PORTFOLIO THEME </p></div>
              <div className="txt3"><p>Lorem ipsum dolor, sit amet consectetur adipisicing </p></div>

              <div className="btns">
                <div className="btn1"><button onClick={clickbtn} className='real-btn1' type="button">BUY IT NOW </button></div>
                <div className="btn2"><button onClick={clickbtn2} className='real-btn1' type="button">DISCOVER MORE</button></div>


              </div>



            </div>


          </div>

        </div>
      </div>
    </div>
  )
}
export default Frontpage

