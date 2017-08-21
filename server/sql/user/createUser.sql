INSERT INTO Users(UserID, FirstName, LastName, Company, TableNumber)
VALUES(${userID}, ${firstName}, ${lastName}, ${company}, ${table})
ON CONFLICT DO NOTHING