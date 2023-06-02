import React, { useContext } from 'react'
import {signOut} from 'firebase/auth'
import { auth } from '../../firebase'
import NavbarImg from '../../img/loginpage.jpg'
import { AuthContext } from '../../context/AuthContext'
import { useState } from "react";

const chatNavbar = () => {
  const {currentUser} = useContext(AuthContext)
  // const [logintoggleState, setLoginToggleState] = useState(6);
  // console.log(currentUser)

  // const toggleTab = (index) => {
  //   setLoginToggleState(index);
  //   console.log("HEL")
  // };

  return (
    <div className='caf_navbar'>
      <span className="caf_logo">
        CUSTOMER SUPPORT
      </span>
      <div className="caf_user">
      {currentUser ? (
        <>
        <img src={currentUser.photoURL} alt="" />
        <span>{currentUser.displayName}</span>
        <button onClick={()=> signOut(auth) }>logout</button>
        </>
      ) : 
        <>
        <img src={NavbarImg} alt="" />
        <span>Please Logged in</span>
        {/* <a className={logintoggleState === 7 ? "tabs active-tabs" : "tabs"} onClick={() => toggleTab(7)}>LOGIN</a> */}
        </>
      }
      </div>
    </div>
  )
}

export default chatNavbar