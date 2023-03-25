import React, { useEffect, useRef } from "react";

import "./WriteSupportArticle.scss";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { fetch_articles, publish_article } from "../../network/communication";
import MDEditor from "@uiw/react-md-editor";

function WriteSupportArticle(props) {
  const { section} = useParams("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();
  const titleRef = useRef(null);
  const subsectionRef = useRef(null);
  const selectRef = useRef(null);

  if (!props.user || !props.user.verified) {
    navigate("/404");
  }
  
  return (
    <main className="write-support-main">
      <div className="main-section-header">
        <h1>Write a new Article</h1>
        <p>Write and publish an article for the Support section here.</p>
        <input
            type="text"
            className="setname"
            name="setname"
            placeholder="Enter the title of the article here"
            ref={titleRef}
            />
        <div className="desc" data-color-mode="light">
          <MDEditor
            textareaProps={{
              placeholder:
                'Write the entire article here',
            }}
            value={content}
            onChange={setContent}
          />
        </div>
        <p>Select the section that you want to publish this article to</p>
          <select name="section" id="section" defaultValue={"getting_started"} ref={selectRef}>
            <option value="getting_started">Getting Started</option>
            <option value="interface">The Interface</option>
            <option value="quizzy_plus">Quizzy+</option>
            <option value="flashcards">Flashcards</option>
            <option value="recall_sessions">Recall Sessions</option>
            <option value="quizzes">Quizzes</option>
          </select>
        <p>Enter the subsection that you want to publish this article to</p>
        <input
            type="text"
            className="setname"
            name="setname"
            placeholder="Enter the subsection here"
            ref={subsectionRef}
            style={{width: '40%'}}
            />
        <button className="publish" onClick={() => {
          publish_article(
            titleRef.current.value,
            content,
            selectRef.current.value,
            subsectionRef.current.value,
            (data) => {
              navigate("/support/sections/" + selectRef.current.value.replace("_", "-").toLowerCase() + "/" + data.id + "/" + titleRef.current.value.replace(/\s+/g, "-").toLowerCase())
              console.log(data);
            }
          );
          
        }}>Publish Article</button>
      </div>
    </main>
  );
}

export default WriteSupportArticle;
