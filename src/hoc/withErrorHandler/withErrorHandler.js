// This is a higher order COMPONENT
// Error boundry for normal code
// It will be a function withErrorHandler
// Will take WrappedComponent as an input
// And then it return a function which recieves props 
// And ofcourse simply returns some JSX including the WRAPPED COMPONENT
// *******NEEDS AN EXTENSIVE EXPLANATION OF THIS TOPIC********


import React, { Component } from 'react'
import Modal from '../../components/UI/Modal/Modal';

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {

        state = {
            error : null
        }

        componentDidMount() {
          this.reqInterceptor =  axios.interceptors.request.use(req => { //whenever i send request i dont have any error set up anymore
                this.setState({error: null})
                return req;
               
            })
            this.resInterceptor = axios.interceptors.response.use(res => res , error => { // setting error when we got one
                console.log(error)
                this.setState({error : error})
               
            })
        }


        componentWillUnmount (){
          //  console.log('Will Unmount', this.reqInterceptor , this.resInterceptor)
            axios.interceptors.request.eject(this.reqInterceptor)
            axios.interceptors.response.eject(this.resInterceptor)

        }

        errorConfirmedHandler = () => {
            this.setState({error: null})
        }

        render(){
            return (
                <>
                <Modal
                 show={this.state.error}
                 modalClosed ={this.errorConfirmedHandler}> 
                  {this.state.error ? this.state.error.message : null}
                </Modal>
                <WrappedComponent {...this.props} /> {/* this props is for those component which take props */}
                </>
            );
    
        }
    } 
    }
    

export default withErrorHandler
