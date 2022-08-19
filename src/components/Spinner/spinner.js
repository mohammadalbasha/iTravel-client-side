import React from "react";
import classes from './spinner.module.scss'

const Spinner = (props) => {
    return (
        <div className={classes.container}>
                <div className={classes.spinner}></div>
        </div>
    )
}

export default Spinner;