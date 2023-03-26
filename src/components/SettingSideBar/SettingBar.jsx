import React from 'react';
import FaceIco from '../../assets/img/face.svg'
import LockIco from '../../assets/img/new/lock_FILL0_wght400_GRAD0_opsz48 (1).svg'
import BellIco from '../../assets/img/new/notifications_FILL0_wght400_GRAD0_opsz48.svg'
import PreviewIco from '../../assets/img/new/preview_FILL0_wght400_GRAD0_opsz48.svg'
import FbIco from '../../assets/img/new/icons8-facebook.svg'
import InstaIco from '../../assets/img/new/icons8-instagram.svg'
import TwitterIco from '../../assets/img/new/icons8-twitter.svg'
import './SettingBar.css'
const SettingBar = () => {
    return (
        <div className="setting-bar">
         <ul>
                <li className="indiv-link active-link">
                    <img src={FaceIco} alt="" />
                    <p>User Profile</p>
                </li>
                <li className="indiv-link">
                    <img src={LockIco} alt="" />
                    <p>User Profile</p>
                </li>
                <li className="indiv-link">
                    <img src={BellIco} alt="" />
                    <p>User Profile</p>
                </li>
                <li className="indiv-link ">
                    <img src={PreviewIco} alt="" />
                    <p>User Profile</p>
                </li>
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
