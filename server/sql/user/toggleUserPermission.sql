UPDATE users
SET permission = NOT permission
WHERE user_id = ${userID}