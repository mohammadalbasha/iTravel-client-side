import classes from './Modal.module.scss'
import React from 'react';

const Modal = (props) => {
    return (
      <div className={classes.modal}>
      <button 
          className={`${classes["close__modal__btn"]} ${classes["nav__btn--close"]}`}
          onClick={() => props.setShowModal(false)}>
        <i className="fas fa-times"></i>
      </button>
      
        {props.children}
      </div>
    )
  }
  
  export default Modal;