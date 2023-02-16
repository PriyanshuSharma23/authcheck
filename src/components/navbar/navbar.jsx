import React from 'react';
import { BiMenuAltLeft } from "react-icons/bi";
import { BiLogIn } from "react-icons/bi";
import './navbar.css';

function Navbar() {
  return (
    <div className='navbar'>
      <BiMenuAltLeft className='leftmenu'/>
{/* <p>navbar</p> */}
<img  className='logo' src="./assets/authcheck.png" alt="" />
<BiLogIn className='login'/>


    </div>
   
  )
}

export default Navbar
