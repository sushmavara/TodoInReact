import React from 'react'
import classes from './BackDrop.module.css'

const backDrop = (props) =>{
  return (props.showBackDrop) ? <div className={classes.backDrop} onClick={props.clicked}></div> : null;
}


export default backDrop;