import React from 'react';
import './UserPrivacy.css'
const UserPrivacy = () => {
    return (
        <div className='main-privacy'>

            <h1 className='setting-head privacy'>Privacy Settings</h1>
            <form action="" className='my-6'>
                <div className="notification-flex">
                    <div className="note-left">
                        <h3 className='info-text'>Your privacy</h3>
                        <p className='info-desc small-txt no-margin'>Choose who can interact
                            with you freely using
                            Quizzy.</p>
                    </div>
                    <div className="note-right">
                        <div className="indiv-cho">
                            <p className='choice-heading'>Who can find me?</p>
                            <p className='choice-desc small-txt no-margin'>These are settings that control who can view your profile on Quizzy</p>
                            <div className="choice-flex">
                                <div className="singleinput">
                                    <div>
                                        <input  defaultChecked type="radio" name="find" id="find1" />

                                    </div>
                                    <label htmlFor='find1'>       <p className='main-sel'>Everyone</p>
                                        <p className='info-desc small-txt zero-margin'>All users will be able to view your profile</p></label>
                                </div>
                                <div className="singleinput">
                                    <div>
                                        <input type="radio" name="find" id="find2" />

                                    </div>
                                    <label htmlFor='find2'>       <p className='main-sel'>Friends Only</p>
                                        <p className='info-desc small-txt zero-margin'>Only your friends will be able to view your profile</p></label>
                                </div>
                                <div className="singleinput">
                                    <div>
                                        <input type="radio" name="find" id="find3" />

                                    </div>
                                    <label htmlFor='find3'>       <p className='main-sel'>No one</p>
                                        <p className='info-desc small-txt zero-margin'>No one will be able to view your profile</p></label>
                                </div>
                            </div>
                            <hr className='input-divider'/>
                        </div>
                    </div>
                </div>
                <div className="notification-flex">
                    <div className="note-left">
                        
                    </div>
                    <div className="note-right">
                        <div className="indiv-cho">
                            <p className='choice-heading'>Who can see my first and last name?</p>
                            <p className='choice-desc small-txt no-margin'>These are settings that control who will be able to see your first and last name</p>
                            <div className="choice-flex">
                                <div className="singleinput">
                                    <div>
                                        <input defaultChecked type="radio" name="name" id="name1" />

                                    </div>
                                    <label htmlFor='name1'>       <p className='main-sel'>Everyone</p>
                                        <p className='info-desc small-txt zero-margin'>All users will be able to view your profile</p></label>
                                </div>
                                <div className="singleinput">
                                    <div>
                                        <input type="radio" name="name" id="name2" />

                                    </div>
                                    <label htmlFor='name2'>       <p className='main-sel'>Friends Only</p>
                                        <p className='info-desc small-txt zero-margin'>Only your friends will be able to view your profile</p></label>
                                </div>
                                <div className="singleinput">
                                    <div>
                                        <input type="radio" name="name" id="name3" />

                                    </div>
                                    <label htmlFor='name3'>       <p className='main-sel'>No one</p>
                                        <p className='info-desc small-txt zero-margin'>No one will be able to view your profile</p></label>
                                </div>
                            </div>
                            <hr className='input-divider'/>
                        </div>
                        <div className="indiv-cho">
                            <p className='choice-heading'>Who can see what I'm studying</p>
                            <p className='choice-desc small-txt no-margin'>When you study a set, users are able to hover over your status icon and see the name of the set
                                you're currently studying. You can hide it by changing the settings here.</p>
                            <div className="choice-flex">
                                <div className="singleinput">
                                    <div>
                                        <input defaultChecked type="radio" name="study" id="study1" />

                                    </div>
                                    <label htmlFor='study1'>       <p className='main-sel'>Everyone</p>
                                        <p className='info-desc small-txt zero-margin'>All users will be able to view your profile</p></label>
                                </div>
                                <div className="singleinput">
                                    <div>
                                        <input type="radio" name="study" id="study2" />

                                    </div>
                                    <label htmlFor='study2'>       <p className='main-sel'>Friends Only</p>
                                        <p className='info-desc small-txt zero-margin'>Only your friends will be able to view your profile</p></label>
                                </div>
                                <div className="singleinput">
                                    <div>
                                        <input type="radio" name="study" id="study3" />

                                    </div>
                                    <label htmlFor='study3'>       <p className='main-sel'>No one</p>
                                        <p className='info-desc small-txt zero-margin'>No one will be able to view your profile</p></label>
                                </div>
                            </div>
                            <hr className='input-divider'/>
                        </div>
                    </div>
                </div>
                <div className="notification-flex">
                    <div className="note-left">
                        <h3 className='info-text'>Friends</h3>
                        <p className='info-desc small-txt no-margin'>Choose who can
                            be your friend here.</p>
                    </div>
                    <div className="note-right">
                        <div className="indiv-cho">
                            <p className='choice-heading'>Who can send me a friend request?</p>
                            <p className='choice-desc small-txt no-margin'>You can choose who will be able to send you friend requests here.</p>
                            <div className="choice-flex">
                                <div className="singleinput">
                                    <div>
                                        <input defaultChecked type="radio" name="friend" id="friend1" />

                                    </div>
                                    <label htmlFor='friend1'>       <p className='main-sel'>Everyone</p>
                                        <p className='info-desc small-txt zero-margin'>All users will be able to view your profile</p></label>
                                </div>
                                <div className="singleinput">
                                    <div>
                                        <input type="radio" name="friend" id="friend2" />

                                    </div>
                                    <label htmlFor='friend2'>       <p className='main-sel'>Friends Only</p>
                                        <p className='info-desc small-txt zero-margin'>Only your friends will be able to view your profile</p></label>
                                </div>
                                <div className="singleinput">
                                    <div>
                                        <input type="radio" name="friend" id="friend3" />

                                    </div>
                                    <label htmlFor='friend3'>       <p className='main-sel'>No one</p>
                                        <p className='info-desc small-txt zero-margin'>No one will be able to view your profile</p></label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default UserPrivacy;
