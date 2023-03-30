import React, { useRef } from "react";
import "./Dashboard-Settings-Notifications.scss";
 
import Navbar from "../../components/Navbar/Navbar";
import { useState, useEffect } from "react";
import { get_user } from "../../network/communication";
import AddTask from "../../components/AddTask/AddTask";
import SettingBar from "../../components/SettingSideBar/SettingBar";
import Notifications from "../../components/Notifications/Notification";

const DashboardSettingsPrivacy = (props) => {
    const [addTaskVisible, setAddTaskVisible] = useState(false);

    var user = props.user
    var setUser = props.setUser
    useEffect(() => {
        get_user(function (user) {
            if (user.success) {
                setUser(user)
            }
        })
        document.title = "Settings - Quizzy"



    }, [])
//
    return (
        <main className="setting-main">
            <Navbar user={user} setUser={setUser} active={5} />
            <AddTask
                user={user}
                visible={addTaskVisible}
                setVisible={setAddTaskVisible}
            ></AddTask>
            <section className="setting">
                <SettingBar />

                <div className="setting-content full-width">
                    <Notifications />

                </div>
            </section>
        </main>
    );
}

export default DashboardSettingsPrivacy;
