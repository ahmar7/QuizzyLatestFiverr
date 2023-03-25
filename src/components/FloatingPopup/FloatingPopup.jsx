import React, { useState } from "react";
import "./FloatingPopup.scss";

function FloatingPopup(props) {
  const isEnabled = props.enabled;
  const setIsEnabled = props.setEnabled;
  return (
    isEnabled && (
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          position: props.relativePosition ? "relative" : "absolute"
        }}>
        <div
          className={
            "floating-popup " +
            (props.relativePosition
              ? "floating-popup-relative"
              : "floating-popup-fixed")
          }
          style={
            props.relativePosition
              ? {
                  top: 0,
                  position: "relative",
                  maxWidth: "100%",
                }
              : {}
          }>
          <div className="floating-popup-container">
            <div className="icon">
              {props.icon == "alert" && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="50"
                  height="50"
                  viewBox="0 0 50 50">
                  <g
                    id="Group_2050"
                    data-name="Group 2050"
                    transform="translate(-718 -849)">
                    <circle
                      id="Ellipse_412"
                      data-name="Ellipse 412"
                      cx="25"
                      cy="25"
                      r="25"
                      transform="translate(718 849)"
                      fill="#ff4d4d"
                    />
                    <path
                      id="priority_high_FILL0_wght400_GRAD0_opsz48_1_"
                      data-name="priority_high_FILL0_wght400_GRAD0_opsz48 (1)"
                      d="M23.125,33a2.625,2.625,0,1,1,1.856-.769A2.529,2.529,0,0,1,23.125,33ZM20.5,24V6h5.25V24Z"
                      transform="translate(719.875 854.5)"
                      fill="#fff"
                    />
                  </g>
                </svg>
              )}
              {props.icon == "info" && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="50"
                  height="50"
                  viewBox="0 0 50 50">
                  <g
                    id="Group_2051"
                    data-name="Group 2051"
                    transform="translate(-598.25 -176)">
                    <circle
                      id="Ellipse_411"
                      data-name="Ellipse 411"
                      cx="25"
                      cy="25"
                      r="25"
                      transform="translate(598.25 176)"
                      fill="#8358e8"
                    />
                    <path
                      id="info_FILL0_wght400_GRAD0_opsz48_3_"
                      data-name="info_FILL0_wght400_GRAD0_opsz48 (3)"
                      d="M15.569,22.609H17.43V15.166H15.569Zm.837-9.739a1.019,1.019,0,0,0,.729-.279.94.94,0,0,0,.295-.713,1.043,1.043,0,0,0-.295-.744,1.011,1.011,0,0,0-1.458,0,1.043,1.043,0,0,0-.295.744.94.94,0,0,0,.295.713,1.019,1.019,0,0,0,.729.279Zm0,15.942a12,12,0,0,1-4.807-.977,12.5,12.5,0,0,1-6.622-6.622,12.393,12.393,0,0,1,0-9.646A12.4,12.4,0,0,1,7.644,7.629,12.718,12.718,0,0,1,11.6,4.977a12.393,12.393,0,0,1,9.646,0,12.387,12.387,0,0,1,6.591,6.591,12.393,12.393,0,0,1,0,9.646,12.718,12.718,0,0,1-2.652,3.954,12.4,12.4,0,0,1-3.939,2.667A12.081,12.081,0,0,1,16.406,28.813Zm.031-1.861a10.111,10.111,0,0,0,7.444-3.086,10.225,10.225,0,0,0,3.071-7.49,10.137,10.137,0,0,0-3.071-7.444,10.173,10.173,0,0,0-7.475-3.071A10.188,10.188,0,0,0,8.947,8.931a10.147,10.147,0,0,0-3.086,7.475,10.162,10.162,0,0,0,3.086,7.459A10.2,10.2,0,0,0,16.437,26.952ZM16.406,16.406Z"
                      transform="translate(606.844 184.594)"
                      fill="#fff"
                    />
                  </g>
                </svg>
              )}
            </div>
            <div className="floating-popup-text">
              <h1>{props.title}</h1>
              <p>{props.content}</p>
            </div>
            <p
              className="close-button"
              onClick={() => {
                setIsEnabled(false);
              }}>
              X
            </p>
          </div>
        </div>
      </div>
    )
  );
}

export default FloatingPopup;
