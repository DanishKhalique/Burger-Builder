import React from 'react'
import classes from './Toolbar.module.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Menu from '../../Logo/Menu';


const Toolbar = (props) => {
    
    return (
        <>
        <header className={classes.Toolbar}>
        <div className={classes.Logo}>
            <Menu click = {props.click}/>
        </div>
            <div className={classes.Logo}>
            <Logo />
            </div>
       
        <nav className={classes.DesktopOnly}> 
           <NavigationItems isAuthenticated={props.isAuth} />
        </nav>

        </header>
        </>
    )
}

export default Toolbar
