import React from 'react';
import AnimateOnChange from 'react-animate-on-change'

class HighestBidDisplay extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return this.props.highestBid != nextProps.highestBid;
  }
  render() {
    const {hasChange, highestBid} = this.props
    return (
        <div className="">Current Bid: 
          <AnimateOnChange 
            baseClassName="dummy"
            animationClassName="shining"
            animate={hasChange || false} >
            &nbsp; $ {Intl.NumberFormat().format(highestBid || 0)}
          </AnimateOnChange>
        </div>
      )
  }
}
export default HighestBidDisplay