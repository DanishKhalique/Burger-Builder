// Layout typically is the holder of all components placed inside of it
// We have Toolbar , SideDrawer , BackDrop for Mobile also
// We pass {props.children} because below the header part will come a BURGER and so on
import React, { Component } from 'react'
import classes from './Layout.module.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';
import { connect } from 'react-redux';

class Layout extends Component{

    state = {
        showSideDrawer : false

    }
 
    sideDrawerClosedHandler = () => {
        this.setState({showSideDrawer: false})
    }

    toggleDrawer = ( ) => {
        this.setState((prevState)  => {
            return { showSideDrawer: !prevState.showSideDrawer}
        }
           )}

    render(){
    return (
        <>
        <Toolbar 
            isAuth={this.props.isAuthenticated}
            click={this.toggleDrawer} />
        <SideDrawer 
            isAuth={this.props.isAuthenticated}
            open ={this.state.showSideDrawer} 
            closed={this.sideDrawerClosedHandler}/>
        <main className = {classes.Content}>
            {this.props.children}
        </main>
        </>
    
    )
}
}

const mapStateToProps = state => {
    return{
        isAuthenticated: state.auth.token !== null
    }
}

export default connect(mapStateToProps)(Layout)


