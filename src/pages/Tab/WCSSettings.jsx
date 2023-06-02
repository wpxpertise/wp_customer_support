import { useState, useEffect } from "react";
import MarkEmailReadIcon from '@mui/icons-material/MarkEmailRead';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import SettingsApplicationsIcon from '@mui/icons-material/SettingsApplications';
import Navbar from "../../components/Navbar/Navbar";
import Mails from '../Mail/Mail'
import Firebase from "../Firebase/Firebase";
import "./tab.scss";
import "./sidebar.scss";
import CustomCss from "../CustomCSS/CustomCss";

let current_page = window.location.pathname;
const WCSTab = () => {
    const [toggleState, setToggleState] = useState(1);
    const toggleTab = (index) => {
        setToggleState(index);
    };

  return (
      <div className='wcs_home'>
            <div className='wcs_sidebar'>
                <div className="wcs_top">
                    <span className="wcs_logo"> <a href={current_page + '?page=dashboard_status'} style={{textDecoration:"none"}}>DASHBOARD</a></span>
                </div>
                <hr />
                <div className="wcs_center">
                  <ul>     
                      <p className="wcs_title">
                      PREFERENCES
                      </p>
                      <a className={toggleState === 1 ? "tabs active-tabs" : "tabs"} onClick={() => toggleTab(1)}>
                          <li className={toggleState === 1 ? "active" : "tabs"}>
                              <LocalFireDepartmentIcon className='wcs_icon'/>
                              <span >Firebase</span>
                          </li>
                      </a>

                      <a className={toggleState === 2 ? "tabs active-tabs" : "tabs"} onClick={() => toggleTab(2)}>
                          <li className={toggleState === 2 ? "active" : "tabs"}>
                              <MarkEmailReadIcon className='wcs_icon'/>
                              <span >Mail</span>
                          </li>
                      </a>
                      
                      <a className={toggleState === 3 ? "tabs active-tabs" : "tabs"} onClick={() => toggleTab(3)}>
                          <li className={toggleState === 3 ? "active" : "tabs"}>
                              <SettingsApplicationsIcon className='wcs_icon'/>
                              <span >Settings</span>
                          </li>
                      </a>
                     
                      
                  </ul>
            </div>
          </div>

          <div className="wcs_homeContainer">
            <Navbar/>
              <div className="content-tabs">
                <div className={toggleState === 1 ? "content  active-content" : "content"}>
                    {toggleState === 1 && <Firebase/>}
                   
                </div>
             
                <div className={toggleState === 2 ? "content  active-content" : "content"}>
                    {toggleState === 2 && <Mails/>}
                   
                </div>

                <div className={toggleState === 3 ? "content  active-content" : "content"}>
                    {/* {toggleState === 3 &&  <Staff/>} */}
                    {toggleState === 3 &&  <CustomCss/>}
                </div>
                
              </div>
          </div>
    </div>

  )
}

export default WCSTab