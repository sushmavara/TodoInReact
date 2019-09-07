import React from 'react'
import classes from './Modal.module.css'
import BackDrop from '../BackDrop/BackDrop'

const Modal = (props) =>{
  return (
    <React.Fragment>
      <BackDrop showBackDrop={props.show} clicked={props.toggleModalState}/>
      <div className={classes.modal}>
        {props.children}
      </div>
    </React.Fragment>);
}

export default Modal