SELECT bid_id, slot, user_id, bid
FROM biddings
ORDER BY added_ts DESC
LIMIT ${size}