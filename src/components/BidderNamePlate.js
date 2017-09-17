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
const isOverLimit = (sum, limit) => {return (sum || 0) >= limit}
const isSpecial = (name) => {
  if(!name || typeof name != "string")
    return false
  return "诗诗shishi".indexOf(name.toLowerCase()) >=0
}
const BidderNamePlate = (props) => {
  const {name, dyno=true, sum, goldenLimit} = props
  const isVip = isOverLimit(sum, goldenLimit)
  const pick = (t1, t2, t3) => isSpecial(name) ? t3 : isVip ? t2 : t1
  return (
      <span className={"bidder-entry slot-bidder-name-"+dynoSize(name, dyno)}>
        <span className={"bidder-c " + pick("bidder-l", "", "bidder-s")}>
          {pick("♥ ", "💛 ", "🦄 ")}
        </span>
        <span className={pick("", "bidder-h", "bidder-s")}>
          {name}
        </span>
      </span>
    )
}

export default BidderNamePlate