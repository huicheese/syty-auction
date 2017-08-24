INSERT INTO users(user_id, first_name, last_name, company, table_number)
VALUES(${userID}, ${firstName}, ${lastName}, ${company}, ${table})
ON CONFLICT DO NOTHING