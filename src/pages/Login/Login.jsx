import React, {useState, useEffect} from "react"
import { auth } from '../../firebase';
import {signInWithEmailAndPassword } from "firebase/auth";
import axios from "axios";
import './login.scss'

const Login = () => {
  const [user, setUser] = useState({});
  const [err, setErr] = useState(false);

    useEffect(() => {
      const getTabstatus = async () =>{
            const res = await axios.get(`${appLocalizer.apiUrl}/wcs/v1/uid`,{
                headers:{
                'content-type': 'application/json',
                'X-WP-NONCE':appLocalizer.nonce
                }},).then(function(response) {
                  setUser(response.data);
            });
        }; 
      getTabstatus() 
    }, []);
    
    console.log(user[1]); //niccname
    console.log(user[2]); //avatar
    console.log(user[3]); //email
    console.log(user[5]?.data.user_pass); //Pass
    
    //Submit login
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

  return (
    <div className="caf_formContainer">
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
        </div>
  )
}

export default Login