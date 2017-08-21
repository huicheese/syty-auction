SELECT t.Slot, t.Bid, JSON_AGG(DISTINCT t.UserID) AS MaxUserIDs
FROM Biddings t
WHERE t.Bid =
    (SELECT MAX(h.Bid)
    FROM Biddings h
    WHERE h.Slot = t.Slot)
AND t.Slot = ${slot}
GROUP BY t.Slot, t.Bid