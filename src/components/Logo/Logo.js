import React from 'react'
import classes from './Logo.module.css'
import burgerlogo from '../../assets/images/burgerlogo.png';

const Logo = (props) => {
    return (
        <div className={classes.Logo}>
            <img src ={burgerlogo}  alt="DelhiBurger"/>
        </div>
    )
}

export default Logo
