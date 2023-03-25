import React, { useState } from "react";
import "./WhiteButton.scss";

function WhiteButton(props) {
  const onClick = props.onClick; 
  return <>
  <div className={("white-btn " + (props.disabled ? "white-btn-disabled " : "")) + (props.className ? props.className : "")} onClick={onClick}>
    {props.svg && props.svg}
    {props.text}
    </div>
  </>
  
}

export default WhiteButton;
