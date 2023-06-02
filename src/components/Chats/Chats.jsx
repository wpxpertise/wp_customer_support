import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../context/AuthContext';
import { ChatContext } from '../../context/ChatContext';
import { doc, setDoc, onSnapshot } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { auth, db, storage } from '../../firebase';
import {signInWithEmailAndPassword } from "firebase/auth";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import Add from "../../img/addAvatar.png"

const Chats = () => {
  const [chats, setChats] = useState([])
  const [err, setErr] = useState(false);
  const [form, setForm] = useState(2);
  const {currentUser} = useContext(AuthContext);
  const {dispatch} = useContext(ChatContext);

  console.log("current user: ")
  console.log(currentUser)

  /**
   * From backend collecting logged in user info
   */
  useEffect(()=>{
    const getChats = () => {
      if (currentUser && currentUser.uid) {
        const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
          setChats(doc.data());
        });
        return () => {
          unsub();
        };
      }
    }
    currentUser && currentUser.uid && getChats();
  },[currentUser])

  const handleSelect = ( u ) =>{
    dispatch({type:"CHANGE_USER", payload: u})
  }
  /**
   * Style
   */
  const signinpanel ={
    position: "relative",
  }
  const mystyle = {
    backgroundColor: "rgba(0,0,0, 0.4)",
    height:"72.5vh",
    position: "absolute",
    width:"175vh",
    left: "0px",
    top: "-51px",
    overflow:"hidden"
  };

  /**
   * 
   * @param {Sign In} e 
   */
  const handleSubmit = async(e) =>{
    e.preventDefault()
    const email = e.target[0].value;
    const password = e.target[1].value;
    /**
     * Authentication
     */
    try{
        //  await signInWithEmailAndPassword(auth, user[3], user[5]?.data.user_pass);
         await signInWithEmailAndPassword(auth, email, password);
    }
    catch(err){
        setErr(true);
        console.log(err)
    }
  }

  /**
   * 
   * @param {Register} e 
   */
  const handleRegister = async(e) =>{
    e.preventDefault()
    // console.log(e.target[0].value);
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0]; 

    /**
     * Authentication
     */

    try{
        const res = await createUserWithEmailAndPassword(auth, email, password)
        const storageRef = ref(storage, displayName);
        const uploadTask = uploadBytesResumable(storageRef, file);
        uploadTask.on( 
          (error) => {
            setErr(true)
          }, 
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then( async (downloadURL) => {
                //   console.log('File available at', downloadURL);
                await updateProfile(res.user,{
                    displayName, //displayName:displayName,
                    photoURL: downloadURL,
                });

                // set Doc and database 
                await setDoc(doc(db, "users", res.user.uid),{
                    uid: res.user.uid,
                    displayName,
                    email,
                    photoURL: downloadURL,
                });

                // create user chat db once register done
                await setDoc(doc(db, "userChats", res.user.uid),{});
                //Navigate

            });
          }
        );
        // end 
    }
    catch(err){
        setErr(true);
        console.log(err)
    }
  };


console.log(chats)
  return (
    <div className='caf_chats'>
       {currentUser ? (
        <>
          {chats ? Object.entries(chats)?.sort((a,b)=>b[1].date - a[1].date).map(chat=>(
          // {Object.entries(chats)?.map(chat=>(
            <div className="caf_userChat" key={chat[0]} onClick={ ()=> handleSelect(chat[1].userInfo)}>
                <img src={chat[1].userInfo.photoURL} alt="" />
                <div className="caf_userChatInfo">
                  <span>{chat[1].userInfo.displayName}</span>
                  <p>{chat[1].lastMessage?.text }</p>
                </div>
            </div>
          )): null}
        </>
      ) : 
        <div className='signinpanel' style={signinpanel}>
          {/* <h3 style={mystyle}>Please Logged in</h3> */}
          {/* <h3 style={{color:"white"}}>Please Logged in</h3> */}

          <div className="caf_formContainer" style={mystyle}>
              {/* Login  */}
            {form === 1 ? (
              <>
              <div className="caf_fromWrapper">
                  <span className="caf_logo">SABBIRSAM</span>
                  <span className="caf_title">Login</span>
                  <form action="" onSubmit={handleSubmit}>
                      <input type="email" placeholder='email'/>
                      <input type="password" placeholder='password'/>
                      <button>Login</button>
                      {err && <span>Something went wrong</span>}
                  </form>
              </div>
              </>
            ):
            <>
              {/* Register  */}
              <div className="caf_fromWrapper">
                <span className="caf_logo">SABBIRSAM</span>
                <span className="caf_title">Register</span>
                <form action="" onSubmit={handleRegister}>
                    <input type="text" placeholder='display name'/>
                    <input type="email" placeholder='email'/>
                    <input type="password" placeholder='password'/>
                    <input style={{display:"none"}} type="file" id='caf_file' />
                        <label htmlFor="caf_file">
                            <img src={Add} alt="avatar" />
                                <span>Add an avatar</span>
                        </label>
                    <button>Sign up</button>
                </form>
                {err && <p>Something is worng</p> }
               
            </div>
            </>
          }

        </div>


        </div>
      }
    </div>
  )
}

export default Chats