import classes from './Backdrop.module.scss'
import React from 'react';


const Backdrop = props => {
    return (
        <div className={classes.backdrop} onClick={() => props.setShowModal(false)}></div>
    )
}

export default Backdrop;