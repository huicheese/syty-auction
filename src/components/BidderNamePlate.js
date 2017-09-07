import React from 'react'

const wideChar = "mwCDGHMNOQRUW";
const narChar = "fijlrtI";
const cache = {}
const dynoSize = (name: "", dyno) => {
  if(!dyno) return 0;

  let sum = cache[name] || 0;
  if(sum == 0) {
    let i = name.length;
    while (i--) {
      sum += wideChar.includes(name[i]) ? 13 : narChar.includes(name[i]) ? 5 : 10;
    }
    cache[name] = sum
  }

  if(sum <  61) return 1;
  if(sum <  77) return 2;
  if(sum < 104) return 3;
  if(sum < 142) return 4;
  else return 5;
  return 0;
}
const isVip = (sum) => {return (sum || 0) >= 3000}
const BidderNamePlate = (props) => {
// ♥💛
  const {name, dyno=true, sum} = props
  return (
      <span className={"bidder-entry slot-bidder-name-"+dynoSize(name, dyno)}>
        <span className={"bidder-c " + (isVip(sum) ? "":"bidder-l")}>
          {isVip(sum) ? "💛 ": "♥ "}
        </span>
        <span className={isVip(sum) ? "bidder-h" : ""}>
          {name}
        </span>
      </span>
    )
}

export default BidderNamePlate