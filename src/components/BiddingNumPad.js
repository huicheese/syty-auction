import React, { Component } from 'react'

const CAL_APPEND = "CAL_APPEND"
const CAL_CLEAR = "CAL_CLEAR"
const CAL_BACK = "CAL_BACK"
const CAL_INCREMENT = "CAL_INCREMENT"

const CalculatorButton = ({className, displayText, onCalButtonClick}) => {
    return (
      <div className="cal-button-mask" >
        <button type="button" className={"cal-button "+ className} onClick={onCalButtonClick}>{displayText}</button>
      </div>
    ); 
};

export default class BiddingNumPad extends Component {
  constructor(props) {
      super(props);
      this.modifyAmount = this.modifyAmount.bind(this);
  }

  modifyAmount(inst, val) {
    let old = this.props.input.value;
    let newVal = 0;
    switch(inst) {
      case CAL_APPEND:
        newVal = old < 100000000000 ? old * 10 + val : old;
        break;
      case CAL_CLEAR:
        newVal = 0;
        break;
      case CAL_BACK:
        newVal = old > 0 ? Math.floor(old/10) : old;
        break;  
      case CAL_INCREMENT:
        newVal = old < 100000000000 && (old + val) < 100000000000 ? old + val : old
        break;
    }
    this.props.input.onChange(newVal);
  }

  render() {
    const { value } = this.props.input
    return (
      <div className="row cal-row">
        <div className="cal-display">{value}</div>
        <CalculatorButton displayText="1" onCalButtonClick={() => this.modifyAmount(CAL_APPEND, 1)} />  
        <CalculatorButton displayText="2" onCalButtonClick={() => this.modifyAmount(CAL_APPEND, 2)} />  
        <CalculatorButton displayText="3" onCalButtonClick={() => this.modifyAmount(CAL_APPEND, 3)} />  
        <CalculatorButton displayText="4" onCalButtonClick={() => this.modifyAmount(CAL_APPEND, 4)} />  
        <CalculatorButton displayText="5" onCalButtonClick={() => this.modifyAmount(CAL_APPEND, 5)} />  
        <CalculatorButton displayText="6" onCalButtonClick={() => this.modifyAmount(CAL_APPEND, 6)} />  
        <CalculatorButton displayText="7" onCalButtonClick={() => this.modifyAmount(CAL_APPEND, 7)} />  
        <CalculatorButton displayText="8" onCalButtonClick={() => this.modifyAmount(CAL_APPEND, 8)} />  
        <CalculatorButton displayText="9" onCalButtonClick={() => this.modifyAmount(CAL_APPEND, 9)} />  
        <CalculatorButton displayText="C" onCalButtonClick={() => this.modifyAmount(CAL_CLEAR, 0)} />  
        <CalculatorButton displayText="0" onCalButtonClick={() => this.modifyAmount(CAL_APPEND, 0)} />  
        <CalculatorButton displayText="<" onCalButtonClick={() => this.modifyAmount(CAL_BACK, -1)} />  
  
        <CalculatorButton className="cal-button-buy" displayText="+5" onCalButtonClick={() => this.modifyAmount(CAL_INCREMENT, val)} />
        <CalculatorButton className="cal-button-buy" displayText="+50" onCalButtonClick={() => this.modifyAmount(CAL_INCREMENT, val)} />
        <CalculatorButton className="cal-button-sell" displayText="+100" onCalButtonClick={() => this.modifyAmount(CAL_INCREMENT, val)} />
      </div>
    )
  }
}