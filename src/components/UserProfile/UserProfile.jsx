import React, { useState } from 'react';
import './UserProfile.css'
import ScriptLogo from '../../assets/img/new/scriptinglogo.png'
import DoneLogo from '../../assets/img/new/done.png'
const UserProfile = () => {
    const [popupToggle, setpopupToggle] = useState(false);
    const [successShow, setsuccessShow] = useState(false);
    let togglePassPopup = () => {
        if (popupToggle === false) {
            setpopupToggle(true)
        } else { setpopupToggle(false) }
    }
    let toggleSuccess=()=>{
if(successShow===true){
    setsuccessShow(false)
}else{
    setsuccessShow(true)
}
    }
    return (
        <div className='main-profile'>
            <div className={successShow ? "profile-update ":"hidden" }>
                <div className='flex'>
                    <img src={DoneLogo} alt="" />
                    <div className='success-field'>
                        <h3>Success!</h3>
                        <p>Your settings were successfully saved!</p>
                    </div>
                </div>
                <div className='cross' onClick={toggleSuccess}>X</div>
            </div>
            <h1 className='setting-head'>Settings - User Profile</h1>
            <div className="profile-data">
                <h3 className='info-text'>User info</h3>
                <p className='info-desc small-txt'>Edit all of your basic user information right here</p>
                <div className="profile-flex">
                    <p className='info-desc'>Profile Picture:</p>
                    <div className="profile-select">
                        <img src={ScriptLogo} alt="" />
                        <button className="upload-dp">
                            Upload new
                        </button>
                    </div>
                    <form className="edit-form" action='#'>
                        <div className="flex-inputs">
                            <div className='single-input'>
                                <label htmlFor="" className='info-desc small-txt'>Username:</label>
                                <input required type="text" />
                                <p className="absolute-txt">@</p>
                            </div>
                            <div className='single-input'>
                                <label htmlFor="" className='info-desc small-txt'>Full Name:</label>
                                <input required type="text" className='no-pads' />
                            </div>
                        </div>
                        <div className="flex-inputs my-5">
                            <div className='single-input'>
                                <label htmlFor="" className='info-desc small-txt'>Email Address:</label>
                                <input required type="email" className='no-pads' />
                            </div>

                        </div>
                        <div className='single-input my-5'>
                            <label htmlFor="" className='info-desc small-txt'>Bio:</label>
                            <textarea required className='no-pads' rows="7" />
                        </div>
                        <input onClick={toggleSuccess} type="submit" className='update-btn my-6' value="Update Profile" />
                    </form>
                    <div className='password-section'>
                        <hr />
                        <div className="fm-pass">
                            <h3 className='info-text'>Password</h3>
                            <p className='info-desc small-txt'>You can change your password here</p>
                            <button className="update-btn my-5" onClick={togglePassPopup}>
                                Change password
                            </button>
                        </div>

                    </div>
                </div>
            </div>
            <div className={popupToggle ? " password-overlay  " : "hidden"}></div>
            <div className={popupToggle ? "password-popup " : "hidden"}>
                <div className="absol-cut" onClick={togglePassPopup}>X</div>
                <h2>Change Password</h2>
                <p className='info-desc'>You can change your password here</p>
                <div className="password-fields my-6">
                    <div className='single-input'>
                        <label htmlFor="" className='info-desc small-txt left-align'>Current password</label>
                        <input type="password" placeholder='Enter current password' className='no-pads light-font' />
                    </div>
                    <div className='single-input'>
                        <label htmlFor="" className='info-desc small-txt left-align'>New password</label>
                        <input type="password" placeholder='Enter new password' className='no-pads light-font' />
                    </div>
                    <div className='single-input'>
                        <label htmlFor="" className='info-desc small-txt left-align'>Retype new password</label>
                        <input type="password" placeholder='Retype password' className='no-pads light-font' />
                    </div>
                </div>
                <button className="update-btn my-6">
                    Change password
                </button>
            </div>
        </div>
    );
}

export default UserProfile;
