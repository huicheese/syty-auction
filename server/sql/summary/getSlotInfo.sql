SELECT t.slot, t.bid, JSON_AGG(JSON_BUILD_OBJECT('user_id', t.user_id, 'bid_id', t.bid_id, 'added_ts', t.added_ts)) AS bid_infos
FROM
  biddings t
  INNER JOIN
  (SELECT MAX(bid) AS bid
   FROM biddings
   WHERE slot = ${slot}) h
ON t.bid = h.bid
WHERE t.slot = ${slot}
GROUP BY t.slot, t.bid