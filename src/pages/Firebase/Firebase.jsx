import React, {useState, useEffect} from "react"
import axios from "axios";
import Switch from '@mui/material/Switch';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'
import "./firebase.scss";

const Firebase = () => {
    const [firebase, setFirebase] = useState(true);

    const label = { inputProps: { 'aria-label': 'Size switch mailactive' } };
    const handleSave = async e => {

    }

    const handleSubmit = async e => {

    }
  return (
    <div className="wcs_add_mail" id="wcs_add_mail">
    <div className="wcs_mails_container">
      {/* Start  */}
        <div className="wcs_top">
            <h1 className="setting_panel">Authentication Panel -<a target="_blank" href="https://console.firebase.google.com/u/0/project/">FIREBASE</a></h1>
            <h1 className="tesing_panel">Test Authentication</h1>
        </div>
        <div className="wcs_bottom" id='wcs_bottom'>
            <div className="wcs_left">
            <form action="">
                      <div className="formInput">
                        <label htmlFor="mailactive">Enable Firebase Authentication: {<Switch className="mailactive"  checked={firebase || false} onChange={e =>setFirebase(e.target.checked) } color="secondary" {...label} />} </label>
                      </div>

                      <div className="formInput">
                        <label htmlFor="apikey">*API Key</label>
                        <input type="password" placeholder="use apikey from firebaseConfig" name="apikey" />
                      </div>

                      <div className="formInput">
                        <label htmlFor="authdomain">*Auth Domain</label>
                        <input type="password" placeholder="use auth domain from firebaseConfig" name="authdomain" />
                      </div>

                      <div className="formInput">
                        <label htmlFor="projectid">*Project Id</label>
                        <input type="password" placeholder="use project id from firebaseConfig" name="projectid" />
                      </div>
                      <div className="formInput">
                        <label htmlFor="storagebucket">*Storage Bucket</label>
                        <input type="password" placeholder="use storage bucket from firebaseConfig" name="storagebucket" />
                      </div>
                      <div className="formInput">
                        <label htmlFor="messagingsenderId">*Messaging SenderId</label>
                        <input type="password" placeholder="use messaging sender id from firebaseConfig" name="messagingsenderId" />
                      </div>
                      <div className="formInput">
                        <label htmlFor="appid">*APP ID</label>
                        <input type="password" placeholder="use app id from firebaseConfig" name="appid" />
                      </div>
                     
                    <button className="wcs_test_mail_send" onClick={handleSave}>SAVE</button>
                </form>
            </div>
            <div className="wcs_right">
                <form action="">
                     <div className="formInput">
                        <label htmlFor="email">Email</label>
                        <input type="email" placeholder="use your fireabse email" name="email" />
                      </div>

                      <div className="formInput">
                        <label htmlFor="firebasepassword">Password</label>
                        <input type="password" placeholder="firebase login password" name="firebasepassword" />
                      </div>

                    <button className="wcs_test_mail_send" onClick={handleSubmit}>VERIFY</button>
                </form>
            </div>
        </div>
      {/* End  */}
    </div>
  </div>
  )
}

export default Firebase
