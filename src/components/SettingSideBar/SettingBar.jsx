import React from 'react';
import FaceIco from '../../assets/img/face.svg'
import LockIco from '../../assets/img/new/lock_FILL0_wght400_GRAD0_opsz48 (1).svg'
import BellIco from '../../assets/img/new/notifications_FILL0_wght400_GRAD0_opsz48.svg'
import PreviewIco from '../../assets/img/new/preview_FILL0_wght400_GRAD0_opsz48.svg'
import FbIco from '../../assets/img/new/icons8-facebook.svg'
import InstaIco from '../../assets/img/new/icons8-instagram.svg'
import TwitterIco from '../../assets/img/new/icons8-twitter.svg'
import './SettingBar.css'
import { NavLink } from 'react-router-dom';
const SettingBar = () => {
    let toggleNav = () => {
        var navbar = document.getElementById("navBar")
        navbar.style.left=0
    }
    return (
        <div className="setting-bar">
         <ul className='set-nam'>
                <li onClick={toggleNav} className="indiv-link none">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="15" viewBox="0 0 20 15">
                        <g id="Group_53" data-name="Group 53" transform="translate(-11 -20)">
                            <rect id="Rectangle_503" data-name="Rectangle 503" width="20" height="3" rx="1.5" transform="translate(11 20)" fill="black" />
                            <rect id="Rectangle_504" data-name="Rectangle 504" width="20" height="3" rx="1.5" transform="translate(11 26)" fill="black" />
                            <rect id="Rectangle_505" data-name="Rectangle 505" width="20" height="3" rx="1.5" transform="translate(11 32)" fill="black" />
                        </g>
                    </svg>
                </li>
                <NavLink to="/dashboard/settings/profile">
                    <li className="indiv-link active-link">
                        <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 26 26">
                            <path id="face_FILL0_wght400_GRAD0_opsz48" d="M12.9,20.152a1.721,1.721,0,1,1,1.251-.5,1.7,1.7,0,0,1-1.251.5Zm8.222,0a1.721,1.721,0,1,1,1.251-.5,1.7,1.7,0,0,1-1.251.5ZM17,28.05a10.66,10.66,0,0,0,7.832-3.218A10.66,10.66,0,0,0,28.05,17a10.475,10.475,0,0,0-.13-1.658,12.836,12.836,0,0,0-.325-1.495,8.971,8.971,0,0,1-1.414.228q-.764.065-1.576.065a14.04,14.04,0,0,1-5.964-1.3,13.462,13.462,0,0,1-4.794-3.7,13.5,13.5,0,0,1-3.169,4.6A14.8,14.8,0,0,1,5.95,16.772V17a10.66,10.66,0,0,0,3.217,7.832A10.66,10.66,0,0,0,17,28.05ZM17,30a12.659,12.659,0,0,1-5.07-1.024A12.98,12.98,0,0,1,5.024,22.07a13.066,13.066,0,0,1,0-10.14A12.98,12.98,0,0,1,11.93,5.024a13.066,13.066,0,0,1,10.14,0,12.98,12.98,0,0,1,6.906,6.906,13.066,13.066,0,0,1,0,10.14,12.98,12.98,0,0,1-6.906,6.906A12.659,12.659,0,0,1,17,30ZM14.01,6.372a18.576,18.576,0,0,0,5.281,4.582A11.523,11.523,0,0,0,24.6,12.19q.78,0,1.235-.032a4.823,4.823,0,0,0,1.007-.195A12.376,12.376,0,0,0,22.866,7.64,10.279,10.279,0,0,0,17,5.95a10.082,10.082,0,0,0-1.658.13,11.5,11.5,0,0,0-1.332.292ZM6.242,14.465A10.56,10.56,0,0,0,9.8,11.816a11.715,11.715,0,0,0,2.844-4.989,10.461,10.461,0,0,0-4.274,3.234A13.51,13.51,0,0,0,6.242,14.465ZM14.01,6.372ZM12.645,6.828Z" transform="translate(-4 -4)" fill="#7b7b7b" />
                        </svg>

                        <p>User Profile</p>
                    </li>
              </NavLink>
                <NavLink to="/dashboard/settings/privacy">
                    <li className="indiv-link active-link">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="31.5" viewBox="0 0 24 31.5">
                            <path id="lock_FILL0_wght400_GRAD0_opsz48_1_" data-name="lock_FILL0_wght400_GRAD0_opsz48 (1)" d="M10.25,33.5A2.241,2.241,0,0,1,8,31.25V14.975a2.241,2.241,0,0,1,2.25-2.25h2.625v-3.6a6.869,6.869,0,0,1,2.081-5.044A6.869,6.869,0,0,1,20,2a6.869,6.869,0,0,1,5.044,2.081,6.869,6.869,0,0,1,2.081,5.044v3.6H29.75A2.241,2.241,0,0,1,32,14.975V31.25a2.241,2.241,0,0,1-2.25,2.25Zm0-2.25h19.5V14.975H10.25ZM20,26a2.816,2.816,0,0,0,2.044-.825,2.679,2.679,0,0,0,.844-1.987,2.952,2.952,0,0,0-.844-2.044,2.733,2.733,0,0,0-4.088,0,2.952,2.952,0,0,0-.844,2.044,2.679,2.679,0,0,0,.844,1.988A2.816,2.816,0,0,0,20,26ZM15.125,12.725h9.75v-3.6a4.7,4.7,0,0,0-1.425-3.45,4.889,4.889,0,0,0-6.9,0,4.7,4.7,0,0,0-1.425,3.45ZM10.25,31.25v0Z" transform="translate(-8 -2)" fill="#7b7b7b" />
                        </svg>

                        <p>Privacy</p>
                    </li>
               </NavLink>
                <NavLink to="/dashboard/settings/notifications">
                    <li className="indiv-link active-link">
                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="27.5" viewBox="0 0 22 27.5">
                            <path id="notifications_FILL0_wght400_GRAD0_opsz48" d="M8,27.375V25.313h2.887V14.794a8.3,8.3,0,0,1,1.7-5.139,7.333,7.333,0,0,1,4.486-2.836v-1a1.689,1.689,0,0,1,.567-1.306,2.046,2.046,0,0,1,2.716,0,1.689,1.689,0,0,1,.567,1.306v1a7.4,7.4,0,0,1,4.5,2.836,8.244,8.244,0,0,1,1.719,5.139V25.313H30v2.063ZM19,17.234ZM19,31.5a2.666,2.666,0,0,1-1.925-.808,2.621,2.621,0,0,1-.825-1.942h5.5A2.758,2.758,0,0,1,19,31.5Zm-6.05-6.187H25.084V14.794a5.958,5.958,0,0,0-1.753-4.331,5.786,5.786,0,0,0-4.3-1.787,5.842,5.842,0,0,0-4.314,1.788,5.928,5.928,0,0,0-1.77,4.331Z" transform="translate(-8 -4)" fill="#7b7b7b" />
                        </svg>

                        <p>Notifications</p>
                    </li>
                </NavLink>
                <NavLink to="/dashboard/appearance">
                    <li className="indiv-link active-link ">
                        <svg xmlns="http://www.w3.org/2000/svg" width="27" height="27" viewBox="0 0 27 27">
                            <path id="preview_FILL0_wght400_GRAD0_opsz48" d="M8.25,33A2.241,2.241,0,0,1,6,30.75V8.25A2.241,2.241,0,0,1,8.25,6h22.5A2.241,2.241,0,0,1,33,8.25v22.5A2.241,2.241,0,0,1,30.75,33Zm0-2.25h22.5V11.25H8.25ZM19.5,26.813A9.289,9.289,0,0,1,14.138,25.2a9.409,9.409,0,0,1-3.45-4.2,9.409,9.409,0,0,1,3.45-4.2A9.289,9.289,0,0,1,19.5,15.188,9.289,9.289,0,0,1,24.862,16.8a9.409,9.409,0,0,1,3.45,4.2,9.409,9.409,0,0,1-3.45,4.2A9.289,9.289,0,0,1,19.5,26.813Zm0-1.875a7.675,7.675,0,0,0,3.938-1.05A7.434,7.434,0,0,0,26.25,21a7.434,7.434,0,0,0-2.812-2.888,7.908,7.908,0,0,0-7.875,0A7.434,7.434,0,0,0,12.75,21a7.434,7.434,0,0,0,2.813,2.888A7.675,7.675,0,0,0,19.5,24.938ZM19.5,21Zm0,1.875a1.857,1.857,0,1,0-1.331-.544A1.81,1.81,0,0,0,19.5,22.875Z" transform="translate(-6 -6)" fill="#7b7b7b" />
                        </svg>

                        <p>Appearance</p>
                    </li>
               </NavLink>
         </ul>
         <div className="setting-social">
            <ul className='social-ul'>
                <li><a href="">
                    <img src={TwitterIco} alt="" /></a>
                    </li>
                <li><a href="">
                    <img src={InstaIco} alt="" /></a>
                    </li>
                <li><a href="">
                    <img src={FbIco} alt="" /></a>
                    </li>
            </ul>
         </div>
        </div>
    );
}

export default SettingBar;
