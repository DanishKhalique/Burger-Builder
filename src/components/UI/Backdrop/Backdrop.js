// Backdrop is what will come behind the order summary
// Modal needs to sit above Backdrop
// Later backdrop will need to sit above some other elements like the tool bar
import React from 'react'
import classes from './Backdrop.module.css'


const Backdrop = (props) => {
    return ( 
        props.show ? <div className = {classes.Backdrop} onClick ={props.backdrop}></div> : null
    )
}

export default Backdrop
