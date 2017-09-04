SELECT user_id, bid_id, slot, bid, added_ts
FROM biddings
WHERE user_id = ${userID}
ORDER BY added_ts DESC