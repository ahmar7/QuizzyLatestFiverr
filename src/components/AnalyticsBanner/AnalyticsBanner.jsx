import React, { useState } from "react";
import WhiteButton from "../WhiteButton/WhiteButton";
import "./AnalyticsBanner.scss";

function AnalyticsBanner(props) {
  return (
    <div className="analytics-banner" style={props.style ? props.style : {}}>
      <div className="left">
        <h3>Analytics</h3>
        <h2>Get more out of your studying</h2>
        <p>Get the Analytics subscription to access this feature</p>
        <WhiteButton
          text="Get Started"
          onClick={() => {
            window.location.href = "https://quizzynow.com/upgrade";
          }}></WhiteButton>
      </div>
      <div className="right">
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            height: "100%",
            paddingInline: "2rem",
            alignItems: "center",
          }}>
          <div className="features">
            <h2>With our Analytics package</h2>
            <div className="feature">
              <svg
                id="done_black_24dp_1_"
                data-name="done_black_24dp (1)"
                xmlns="http://www.w3.org/2000/svg"
                width="35.293"
                height="35.293"
                viewBox="0 0 35.293 35.293">
                <path
                  id="Path_132"
                  data-name="Path 132"
                  d="M0,0H35.293V35.293H0Z"
                  fill="none"
                />
                <path
                  id="Path_133"
                  data-name="Path 133"
                  d="M11.635,21.188,5.459,15.011,3.4,17.07l8.235,8.235L29.281,7.659,27.223,5.6Z"
                  transform="translate(1.6 2.635)"
                  fill="#8358e8"
                />
              </svg>
              <p>{"Memory Retention"}</p>
            </div>
            <div className="feature">
              <svg
                id="done_black_24dp_1_"
                data-name="done_black_24dp (1)"
                xmlns="http://www.w3.org/2000/svg"
                width="35.293"
                height="35.293"
                viewBox="0 0 35.293 35.293">
                <path
                  id="Path_132"
                  data-name="Path 132"
                  d="M0,0H35.293V35.293H0Z"
                  fill="none"
                />
                <path
                  id="Path_133"
                  data-name="Path 133"
                  d="M11.635,21.188,5.459,15.011,3.4,17.07l8.235,8.235L29.281,7.659,27.223,5.6Z"
                  transform="translate(1.6 2.635)"
                  fill="#8358e8"
                />
              </svg>
              <p>{"Recall Difficulty Distribution"}</p>
            </div>
            <div className="feature">
              <svg
                id="done_black_24dp_1_"
                data-name="done_black_24dp (1)"
                xmlns="http://www.w3.org/2000/svg"
                width="35.293"
                height="35.293"
                viewBox="0 0 35.293 35.293">
                <path
                  id="Path_132"
                  data-name="Path 132"
                  d="M0,0H35.293V35.293H0Z"
                  fill="none"
                />
                <path
                  id="Path_133"
                  data-name="Path 133"
                  d="M11.635,21.188,5.459,15.011,3.4,17.07l8.235,8.235L29.281,7.659,27.223,5.6Z"
                  transform="translate(1.6 2.635)"
                  fill="#8358e8"
                />
              </svg>
              <p>{"Term Attempt Distribution"}</p>
            </div>
            <div className="feature">
              <svg
                id="done_black_24dp_1_"
                data-name="done_black_24dp (1)"
                xmlns="http://www.w3.org/2000/svg"
                width="35.293"
                height="35.293"
                viewBox="0 0 35.293 35.293">
                <path
                  id="Path_132"
                  data-name="Path 132"
                  d="M0,0H35.293V35.293H0Z"
                  fill="none"
                />
                <path
                  id="Path_133"
                  data-name="Path 133"
                  d="M11.635,21.188,5.459,15.011,3.4,17.07l8.235,8.235L29.281,7.659,27.223,5.6Z"
                  transform="translate(1.6 2.635)"
                  fill="#8358e8"
                />
              </svg>
              <p>{"Friend Comparison"}</p>
            </div>
          </div>
          <div className="graph">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="298.127"
              height="159.583"
              viewBox="0 0 298.127 159.583">
              <g
                id="Group_2063"
                data-name="Group 2063"
                transform="translate(-1578.989 -1253.563)">
                <line
                  id="Line_278"
                  data-name="Line 278"
                  x2="291.786"
                  transform="translate(1579 1359.193)"
                  fill="none"
                  stroke="#707070"
                  stroke-width="3"
                  opacity="0.24"
                />
                <line
                  id="Line_279"
                  data-name="Line 279"
                  x2="291.786"
                  y2="2.126"
                  transform="translate(1579 1258.829)"
                  fill="none"
                  stroke="#ddd"
                  stroke-width="3"
                />
                <ellipse
                  id="Ellipse_465"
                  data-name="Ellipse 465"
                  cx="6.329"
                  cy="6.329"
                  rx="6.329"
                  ry="6.329"
                  transform="translate(1582.164 1400.487)"
                  fill="#8358e8"
                />
                <line
                  id="Line_282"
                  data-name="Line 282"
                  x2="291.786"
                  transform="translate(1579 1406.817)"
                  fill="none"
                  stroke="#707070"
                  stroke-width="3"
                  opacity="0.24"
                />
                <line
                  id="Line_283"
                  data-name="Line 283"
                  x2="291.786"
                  transform="translate(1579 1310.523)"
                  fill="none"
                  stroke="#707070"
                  stroke-width="3"
                  opacity="0.24"
                />
                <line
                  id="Line_284"
                  data-name="Line 284"
                  y1="0.041"
                  x2="31.236"
                  transform="translate(1588.494 1406.776)"
                  fill="none"
                  stroke="#8358e8"
                  stroke-width="5"
                />
                <ellipse
                  id="Ellipse_467"
                  data-name="Ellipse 467"
                  cx="6.329"
                  cy="6.329"
                  rx="6.329"
                  ry="6.329"
                  transform="translate(1615.078 1400.487)"
                  fill="#8358e8"
                />
                <line
                  id="Line_285"
                  data-name="Line 285"
                  y1="96.207"
                  x2="35.445"
                  transform="translate(1621.627 1310.568)"
                  fill="none"
                  stroke="#8358e8"
                  stroke-width="5"
                />
                <ellipse
                  id="Ellipse_468"
                  data-name="Ellipse 468"
                  cx="6.329"
                  cy="6.329"
                  rx="6.329"
                  ry="6.329"
                  transform="translate(1650.742 1304.194)"
                  fill="#8358e8"
                />
                <ellipse
                  id="Ellipse_469"
                  data-name="Ellipse 469"
                  cx="6.329"
                  cy="6.329"
                  rx="6.329"
                  ry="6.329"
                  transform="translate(1675.84 1304.194)"
                  fill="#8358e8"
                />
                <line
                  id="Line_286"
                  data-name="Line 286"
                  y1="0.041"
                  x2="31.236"
                  transform="translate(1657.072 1310.438)"
                  fill="none"
                  stroke="#8358e8"
                  stroke-width="5"
                />
                <line
                  id="Line_280"
                  data-name="Line 280"
                  y1="51.635"
                  x2="26.022"
                  transform="translate(1714.598 1259.934)"
                  fill="none"
                  stroke="#7b7b7b"
                  stroke-width="5"
                />
                <line
                  id="Line_281"
                  data-name="Line 281"
                  x2="37.344"
                  transform="translate(1740.621 1258.668)"
                  fill="none"
                  stroke="#7b7b7b"
                  stroke-width="5"
                />
                <ellipse
                  id="Ellipse_466"
                  data-name="Ellipse 466"
                  cx="6.329"
                  cy="6.329"
                  rx="6.329"
                  ry="6.329"
                  transform="translate(1771.635 1253.563)"
                  fill="#7b7b7b"
                />
                <ellipse
                  id="Ellipse_470"
                  data-name="Ellipse 470"
                  cx="6.329"
                  cy="6.329"
                  rx="6.329"
                  ry="6.329"
                  transform="translate(1708.27 1304.194)"
                  fill="#7b7b7b"
                />
                <ellipse
                  id="Ellipse_471"
                  data-name="Ellipse 471"
                  cx="6.329"
                  cy="6.329"
                  rx="6.329"
                  ry="6.329"
                  transform="translate(1734.291 1253.563)"
                  fill="#7b7b7b"
                />
                <line
                  id="Line_287"
                  data-name="Line 287"
                  x2="29.115"
                  y2="50.003"
                  transform="translate(1777.965 1258.668)"
                  fill="none"
                  stroke="#7b7b7b"
                  stroke-width="5"
                />
                <ellipse
                  id="Ellipse_472"
                  data-name="Ellipse 472"
                  cx="6.329"
                  cy="6.329"
                  rx="6.329"
                  ry="6.329"
                  transform="translate(1800.922 1302.341)"
                  fill="#7b7b7b"
                />
                <line
                  id="Line_288"
                  data-name="Line 288"
                  y1="51.635"
                  x2="26.022"
                  transform="translate(1807.25 1259.934)"
                  fill="none"
                  stroke="#7b7b7b"
                  stroke-width="5"
                />
                <ellipse
                  id="Ellipse_473"
                  data-name="Ellipse 473"
                  cx="6.329"
                  cy="6.329"
                  rx="6.329"
                  ry="6.329"
                  transform="translate(1826.943 1253.563)"
                  fill="#7b7b7b"
                />
                <line
                  id="Line_289"
                  data-name="Line 289"
                  x2="37.344"
                  transform="translate(1833.443 1258.668)"
                  fill="none"
                  stroke="#7b7b7b"
                  stroke-width="5"
                />
                <ellipse
                  id="Ellipse_474"
                  data-name="Ellipse 474"
                  cx="6.329"
                  cy="6.329"
                  rx="6.329"
                  ry="6.329"
                  transform="translate(1864.457 1253.563)"
                  fill="#7b7b7b"
                />
              </g>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AnalyticsBanner;
