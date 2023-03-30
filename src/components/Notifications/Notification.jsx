import React from "react";
import "./Notification.css";
const Notifications = () => {
  return (
    <div className="main-privacy">
      <h1 className="setting-head privacy">Notification Settings</h1>
      <form action="" className="my-6">
        <div className="notification-flex">
          <div className="note-left">
            <h3 className="info-text">Study Notifications</h3>
            <p className="info-desc small-txt no-margin">
              We send you an email to remind you about certain things regarding
              your schedule. If you'd like to turn them off, you can do so here.
            </p>
          </div>
          <div className="note-right">
            <div className="indiv-cho">
              <p className="choice-heading">
                How often would you like us to send you notifications about your
                Recall Sessions?
              </p>
              <p className="choice-desc small-txt no-margin">
                Change how often you'd like Recall Session reminders here.
              </p>
              <div className="choice-flex">
                <div className="singleinput center-flex  ">
                  <div className="input-center">
                    <input type="checkbox" id="ck1" />
                  </div>
                  <label htmlFor='ck1'>
                    {" "}
                    <p className="main-sel">
                      1 day before it's time to practice
                    </p>{" "}
                  </label>
                </div>
                <div className="singleinput center-flex  ">
                  <div className="input-center">
                    <input type="checkbox" id="ck2" />
                  </div>
                  <label htmlFor='ck2'>
                    {" "}
                    <p className="main-sel">
                      1 hour before it's time to practice
                    </p>{" "}
                  </label>
                </div>
                <div className="singleinput center-flex  ">
                  <div className="input-center">
                    <input type="checkbox" id="ck3" />
                  </div>
                  <label htmlFor='ck3'>
                    {" "}
                    <p className="main-sel">
                      30 minutes before it's time to practice
                    </p>{" "}
                  </label>
                </div>
                <div className="singleinput center-flex  ">
                  <div className="input-center">
                    <input type="checkbox" id="ck4" />
                  </div>
                  <label htmlFor='ck4'>
                    {" "}
                    <p className="main-sel">When it's time to practice</p>{" "}
                  </label>
                </div>
              </div>
              <hr className="input-divider" />
            </div>
          </div>
        </div>
        <div className="notification-flex">
          <div className="note-left">
            <h3 className="info-text">Friend Notifications</h3>
            <p className="info-desc small-txt no-margin">
              We send you an email to remind you about certain things regarding
              your friends. If you'd like to change them, you can do so here.
            </p>
          </div>
          <div className="note-right">
            <div className="indiv-cho">
              <p className="choice-heading">
                How often would you like us to send you notifications about your
                friends requests?
              </p>
              <p className="choice-desc small-txt no-margin">
                Change your notifications regarding your friends here
              </p>
              <div className="choice-flex">
                <div className="singleinput center-flex  ">
                  <div className="input-center">
                    <input type="checkbox" id="ck5" />
                  </div>
                  <label htmlFor='ck5'>
                    {" "}
                    <p className="main-sel">
                      When someone sends me a friend request
                    </p>{" "}
                  </label>
                </div>
                <div className="singleinput center-flex  ">
                  <div className="input-center">
                    <input type="checkbox" id="ck6" />
                  </div>
                  <label htmlFor='ck6'>
                    {" "}
                    <p className="main-sel">
                      When someone accepts my friend request
                    </p>{" "}
                  </label>
                </div>
                <div className="singleinput center-flex  ">
                  <div className="input-center">
                    <input type="checkbox" id="ck7" />
                  </div>
                  <label htmlFor='ck7'>
                    {" "}
                    <p className="main-sel">
                      When someone declines my friend request
                    </p>{" "}
                  </label>
                </div>
              </div>
              <hr className="input-divider" />
            </div>
          </div>
        </div>
        <div className="notification-flex">
          <div className="note-left">
            <h3 className="info-text">Announcements & Updates</h3>
            <p className="info-desc small-txt no-margin">
              If you'd like to receive emails about new features and updates,
              you can select it here.
            </p>
          </div>
          <div className="note-right">
            <div className="indiv-cho">
              <div className="choice-flex">
                              <div className="singleinput space-bw">
                  <div className="announ-txt ">
                    
                                      <p className="choice-heading">Announcements</p>
                    <p className="info-desc small-txt zero-margin">
                      When we send an announcement, you'll be the first to know
                      if you enable it here.
                    </p>
                  </div>
                  <div className="switch-toggle">
                    <label class="switch">
                      <input type="checkbox" />
                      <span className="slider round"></span>
                    </label>
                  </div>
                </div>
                              <div className="singleinput space-bw">
                  <div className="announ-txt ">
                   
                                      <p className="choice-heading">Updates</p>
                    <p className="info-desc small-txt zero-margin">
                      When we send a newsletter about new features, you'll be
                      the first to know if you enable it here.
                    </p>
                  </div>
                                  <div className="switch-toggle">
                                      <label class="switch">
                                          <input type="checkbox" />
                                          <span className="slider round"></span>
                                      </label>
                                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Notifications;
