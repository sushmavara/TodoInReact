import React from './node_modules/react'
import classes from './BackDrop.module.css'

const BackDrop = (props) =>{
  return (props.showBackDrop) ? <div className={classes.backDrop} onClick={props.clicked}></div> : null;
}

export default BackDrop;

//proptype 
//ui
//generic modal : header footer body