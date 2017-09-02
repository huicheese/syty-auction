import React from 'react';
import AnimateOnChange from 'react-animate-on-change'

class HighestBidDisplay extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return this.props.highestBid != nextProps.highestBid;
  }
  render() {
    const {hasChange, highestBid, bidders} = this.props
    return (
        <div className="">Current Bid: 
          <AnimateOnChange 
            baseClassName="dummy"
            animationClassName="shining"
            animate={hasChange || false} >
            &nbsp; $ {Intl.NumberFormat().format(highestBid || 0)}
          </AnimateOnChange> 
          {bidders && bidders.length==1 &&
            <span>&nbsp;&nbsp;by <span className="slot-bidder-win">{" ♛ " + bidders[0].firstName}</span></span>
          }
        </div>
      )
  }
}
export default HighestBidDisplay