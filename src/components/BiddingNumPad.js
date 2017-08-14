import React from 'react'
import { connect } from 'react-redux'
import { modifyBidAmount } from '../actions'

export const CAL_APPEND = "CAL_APPEND"
export const CAL_CLEAR = "CAL_CLEAR"
export const CAL_BACK = "CAL_BACK"
export const CAL_INCREMENT = "CAL_INCREMENT"


function mapStateToProps(state, ownProps) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    onCalButtonClick: (instruction, value) => dispatch(modifyBidAmount({instruction, value}))
    // instruction - {inst: "append/command/inc", value: 1/2/3 } 
  };
}

const CalculatorButton = ({className, btnValue, displayText, onCalButtonClick}) => {
    return (
      <div className="cal-button-mask" >
        <button type="button" className={"cal-button "+ className} onClick={(e) => onCalButtonClick(btnValue)}>{displayText}</button>
      </div>
    ); 
};

const BiddingNumPad = ({onCalButtonClick}) => {
	return (
		<div className="row cal-row">
      <CalculatorButton btnValue="1" displayText="1" onCalButtonClick={val=> onCalButtonClick(CAL_APPEND, val)} />  
      <CalculatorButton btnValue="2" displayText="2" onCalButtonClick={val=> onCalButtonClick(CAL_APPEND, val)} />  
      <CalculatorButton btnValue="3" displayText="3" onCalButtonClick={val=> onCalButtonClick(CAL_APPEND, val)} />  
      <CalculatorButton btnValue="4" displayText="4" onCalButtonClick={val=> onCalButtonClick(CAL_APPEND, val)} />  
      <CalculatorButton btnValue="5" displayText="5" onCalButtonClick={val=> onCalButtonClick(CAL_APPEND, val)} />  
      <CalculatorButton btnValue="6" displayText="6" onCalButtonClick={val=> onCalButtonClick(CAL_APPEND, val)} />  
      <CalculatorButton btnValue="7" displayText="7" onCalButtonClick={val=> onCalButtonClick(CAL_APPEND, val)} />  
      <CalculatorButton btnValue="8" displayText="8" onCalButtonClick={val=> onCalButtonClick(CAL_APPEND, val)} />  
			<CalculatorButton btnValue="9" displayText="9" onCalButtonClick={val=> onCalButtonClick(CAL_APPEND, val)} />	
      <CalculatorButton btnValue="0" displayText="CLEAR" onCalButtonClick={val=> onCalButtonClick(CAL_CLEAR, val)} />  
      <CalculatorButton btnValue="0" displayText="0" onCalButtonClick={val=> onCalButtonClick(CAL_APPEND, val)} />  
      <CalculatorButton btnValue="-1" displayText="<" onCalButtonClick={val=> onCalButtonClick(CAL_BACK, val)} />  

      <CalculatorButton className="cal-button-buy" btnValue="5" displayText="+5" onCalButtonClick={val=> onCalButtonClick(CAL_INCREMENT, val)} />  
      <CalculatorButton className="cal-button-buy" btnValue="50" displayText="+50" onCalButtonClick={val=> onCalButtonClick(CAL_INCREMENT, val)} />  
      <CalculatorButton className="cal-button-sell" btnValue="100" displayText="+100" onCalButtonClick={val=> onCalButtonClick(CAL_INCREMENT, val)} />  
		
    </div>
		)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BiddingNumPad)