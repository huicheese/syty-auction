SELECT BidID, Slot, UserID, Bid
FROM Biddings
ORDER BY AddedTS DESC
LIMIT ${size}