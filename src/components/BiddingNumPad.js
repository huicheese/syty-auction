import React, { Component } from 'react'

const CAL_APPEND = "CAL_APPEND"
const CAL_CLEAR = "CAL_CLEAR"
const CAL_BACK = "CAL_BACK"
const CAL_INCREMENT = "CAL_INCREMENT"

const CalculatorButton = ({w=33.3, className, displayText, onCalButtonClick}) => {
    return (
      <div className="cal-button-mask" style={{width:w+'%'}}>
        <button type="button" className={"cal-button "+ (className?className:"")} onClick={onCalButtonClick}>{displayText}</button>
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
        <div className="cal-display"><span className="cal-display-text blinker">{Intl.NumberFormat().format(value)}</span></div>
        <CalculatorButton w="24.75" displayText="+50" onCalButtonClick={() => this.modifyAmount(CAL_INCREMENT, 50)} />
        <CalculatorButton w="24.75" displayText="+100" onCalButtonClick={() => this.modifyAmount(CAL_INCREMENT, 100)} />
        <CalculatorButton w="24.75" displayText="+200" onCalButtonClick={() => this.modifyAmount(CAL_INCREMENT, 200)} />
        <div style={{width: 1+'%', padding:"auto "+ 0.3+'em'}} ></div>

        <CalculatorButton w="24.75" className="cal-button-red" displayText="+500" onCalButtonClick={() => this.modifyAmount(CAL_INCREMENT, 500)} />
        <div style={{width: 100+'%', padding:0.3+'em'}} ></div>
      </div>
    )
  }
}