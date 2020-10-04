import React from 'react'
import classes from './Menu.module.css'
import menulogo from '../../assets/images/menulogo.png';


const Menu = (props) => {
    return (
        <div className={classes.Menu}>
              <img src ={menulogo}  alt="MENU"  onClick={props.click}/>
        </div>
    )
}

export default Menu
