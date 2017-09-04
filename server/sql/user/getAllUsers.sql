SELECT u.user_id, u.first_name, u.last_name, u.company, u.table_number, u.permission, COALESCE(s.count_bid, 0) AS count_bid
FROM
	users u
	LEFT OUTER JOIN
	(SELECT user_id, COUNT(*) AS count_bid
	FROM biddings
	GROUP BY user_id) s
	ON (u.user_id = s.user_id)
ORDER BY u.user_id