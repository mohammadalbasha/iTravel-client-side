import React from "react";
import classes from './spinner.module.scss'

const Error = (props) => {
    return (
        <div className={classes.container}>
                <div className={classes.error}>
                    {props.children}
                </div>
        </div>
    )
}

export default Error;