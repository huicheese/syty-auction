import React from 'react'
import { connect } from 'react-redux'
import { closeInteractionBox } from '../actions'

function mapStateToProps(state, ownProps) {
  return {
    bodyComponent: ownProps.bodyComponent,
    title: ownProps.title || null
  };
}

function mapDispatchToProps(dispatch) {
  return {
    handleClose: () => dispatch(closeInteractionBox())
  };
}

const InteractionBox = ({bodyComponent, title, handleClose}) => {
  return (
    <div className="interaction-container">
      <div className="interaction-body">
        {title && <div className="interaction-header">{title}<button className="interaction-close" onClick={handleClose}>X</button></div>}
        {bodyComponent}
      </div>
      <div className="interaction-background" onClick={handleClose}><span className="interaction-dismiss">Tap anywhere to dismiss</span></div>
    </div>
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InteractionBox);