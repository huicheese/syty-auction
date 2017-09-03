import React from 'react'
import BidderNamePlate from './BidderNamePlate'

const ActivityEventBox = ({activityEvents}) => {
  return (
    <div className="stats-row c8 row">
      <div className="my-profile c4">
        <div>
          Total: <span className="my-bids">$ 1,100</span>
        </div>
        <div>
          <BidderNamePlate bidder={{firstName: "Xiawei"}} dyno={false}/>
        </div>
        <div className="my-slots">
          <div className="my-slot-i">2</div>
          <div className="my-slot-i">3</div>
          <div className="my-slot-i">12</div>
          <div className="my-slot-i">14</div>
          <div className="my-slot-i">29</div>
          <div className="my-slot-i">30</div>
        </div>
      </div>
      <div className="top-ranking c4">
        <span className="entry top-title">Top Ranking</span>
        <span className="entry">
          <BidderNamePlate bidder={{firstName: "Jason", sum: 2000}} dyno={false}/> $2000
        </span>
        <span className="entry">
          <BidderNamePlate bidder={{firstName: "Jason lonmmmmm", sum: 1550}} dyno={false}/> $1550
          </span>
        <span className="entry">
          <BidderNamePlate bidder={{firstName: "Jason short"}} dyno={false}/> $1300
        </span>
      </div>
    </div>
    )
}

export default ActivityEventBox
