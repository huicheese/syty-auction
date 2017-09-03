SELECT t.slot, t.bid, JSON_AGG(JSON_BUILD_OBJECT('user_id', t.user_id, 'bid_id', t.bid_id, 'added_ts', t.added_ts)) AS bid_infos
FROM biddings t
WHERE t.bid =
    (SELECT MAX(h.bid)
    FROM biddings h
    WHERE h.slot = t.slot)
AND t.Slot = ${slot}
GROUP BY t.slot, t.bid