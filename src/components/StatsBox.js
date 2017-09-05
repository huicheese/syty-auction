import React from 'react'
import BidderNamePlateContainer from '../containers/BidderNamePlateContainer'

const StatsBox = ({mySlots, me, top3}) => {
  return (
    <div className="stats-row c8 row">
    {me && me.sum > 0 &&
      <div className="my-profile c4">
        <div>
          <BidderNamePlateContainer bidder={me} dyno={false}/>'s total:
        </div>
        <div>
          <span className="my-bids">{"$ " + Intl.NumberFormat().format(me.sum)}</span>
        </div>
        <div className="my-slots">
          <div className="my-slots-title">Winning: </div>
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
        <span key={i} className="entry">
          <BidderNamePlateContainer bidder={e} dyno={false}/><span>{" $"+e.sum}</span>
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
