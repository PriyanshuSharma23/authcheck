import React from 'react';
import { BiLink } from "react-icons/bi";
import {  BiRefresh } from "react-icons/bi";
import './navbar.css';
import {states} from '../../App.js'

function Navbar({

  setTokenID,
  setData,
  setStatus,
  tokenID
  
}) {
  return (
    <div className='navbar'>
      <BiRefresh 
        onClick={() => {
          if (!tokenID) return;
          setTokenID(null)
          setData(null)
          setStatus(states.bring_phone)
          
        }}
        className='leftmenu'/>
{/* <p>navbar</p> */}
<img  className='logo' src="./assets/authcheck.png" alt="" />
<BiLink className='login'/>


    </div>
   
  )
}

export default Navbar
