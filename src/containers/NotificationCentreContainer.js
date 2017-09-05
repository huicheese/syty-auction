import { connect } from 'react-redux'
import React from 'react'
import AnimateOnChange from 'react-animate-on-change'

function mapStateToProps(state) {
  return {
    msg: state.nc.msg,
    ts: state.nc.ts, // in case getting same msg but not the same event
    isError: state.nc.isError
  };
}


const NotificationCentre = ({msg, isError=false}) => {
  return (
    <AnimateOnChange 
                baseClassName="nc-container"
                animationClassName="nc-show"
                animate={msg != null} >
                <div className={"nc-msg " + (isError ? "nc-error" : "")}>{msg}</div>
                  
                </AnimateOnChange>
      
    )
}


export default connect(
  mapStateToProps,
  {}
)(NotificationCentre);

