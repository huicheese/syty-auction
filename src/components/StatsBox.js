import React from 'react'
import BidderNamePlate from './BidderNamePlate'

const StatsBox = ({mySlots, me, top3}) => {
  return (
    <div className="stats-row c8 row">
    {me && me.sum > 0 &&
      <div className="my-profile c4">
        <div>
          <BidderNamePlate bidder={me} dyno={false}/>'s total bid:
        </div>
        <div>
          <span className="my-bids">{"$ " + Intl.NumberFormat().format(me.sum)}</span>
        </div>
        <div className="my-slots">
        {mySlots.map((e, i) => 
          <div key={e} className="my-slot-i">{e}</div>
        )}
        </div>
      </div>
      ||
      <div style={{color: "#777"}} className="my-profile c4">Tap on any slot to bid</div>
    }
    {top3 && top3.length > 0 &&

      <div className="top-ranking c4">
        <span className="entry top-title">Top Ranking</span>
        {top3.map((e,i) => 
        <span className="entry">
          <BidderNamePlate bidder={e} dyno={false}/>{" $"+e.sum}
        </span>
        )}
      </div>
    ||
      <div className="top-ranking c4"></div>
    }
    </div>
    )
}

export default StatsBox
