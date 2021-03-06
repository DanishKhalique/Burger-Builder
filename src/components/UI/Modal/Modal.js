// This is similar to Layout
// This is created so that content fit inside this modal only
import React, {Component} from 'react';
import classes from './Modal.module.css';
import Backdrop from '../Backdrop/Backdrop';
class Modal  extends Component {

	shouldComponentUpdate (nextProps , nextState) {
		return nextProps.show !== this.props.show || nextProps.children !== this.props.children
	}

	
	render( ) {
		return (
			<>
			<Backdrop show = {this.props.show} backdrop = {this.props.modalClosed}/>
			<div className={classes.Modal}
			style={{ transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)' }}>
				
				{this.props.children}
			</div>
			</>
		);

	}
}

export default Modal;
