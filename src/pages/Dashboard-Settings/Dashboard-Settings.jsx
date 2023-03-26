import React, { useRef } from "react";
import "./Dashboard-Settings.scss";
import './Dashboard-Settings.css'
import {useNavigate} from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import UserInfo from "../../components/UserInfo/UserInfo";
import { useState, useEffect } from "react";
import { get_user } from "../../network/communication";
import party from "party-js"
import AddTask from "../../components/AddTask/AddTask";
import SettingBar from "../../components/SettingSideBar/SettingBar";


function Settings(props) {
    const navigate = useNavigate();
    const confetti = useRef(null);

    const [addTaskVisible, setAddTaskVisible] = useState(false);
    const [changelogData, setChangelogData] = useState({
       
    })
    var user = props.user 
    var setUser = props.setUser 
    useEffect(() => {
        get_user(function(user) {
          if (user.success) {
            setUser(user)
          }
        })
        document.title = "Settings - Quizzy"
        
      

        }, []) 
//
    return (
        <main className="changelog-main">
            <Navbar user={user} setUser={setUser} active={5}/>
            <AddTask
                user={user}
                visible={addTaskVisible}
                setVisible={setAddTaskVisible}
            ></AddTask>
            <section className="changelog">
                <SettingBar/>
       
              
            </section>
        </main>
        
        
    )
}

export default Settings;
