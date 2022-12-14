DROP TABLE IF EXISTS users;
CREATE TABLE users (
    id SERIAL UNIQUE NOT NULL PRIMARY KEY,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    profileImg TEXT,
    address TEXT,
    zipcode INT,
    rating INT,
    finder BOOLEAN DEFAULT false,
    joinedDate TIMESTAMP DEFAULT NOW()
);

DROP TABLE IF EXISTS items;
CREATE TABLE items (
    id SERIAL UNIQUE NOT NULL PRIMARY KEY,
    userId INT REFERENCES users(id) NOT NULL,
    itemName TEXT NOT NULL,
    itemImg TEXT,
    category TEXT,
    description TEXT,
    isFound BOOLEAN DEFAULT false,
    request BOOLEAN DEFAULT false,
    giveaway BOOLEAN DEFAULT false,
		latitude DECIMAL,
		longitude DECIMAL,
    neighborhood TEXT,
    borough TEXT,
    zipcode INT,
    itemDate TIMESTAMP DEFAULT NOW(),
		status TEXT NOT NULL
);

DROP TABLE IF EXISTS found_items;
CREATE TABLE found_items (
    id SERIAL UNIQUE NOT NULL PRIMARY KEY,
    foundUserId INT REFERENCES users(id) NOT NULL,
    itemsId INT REFERENCES items(id) NOT NULL
);

DROP TABLE IF EXISTS messages;
CREATE TABLE messages (
    id SERIAL UNIQUE NOT NULL PRIMARY KEY,
    receiver TEXT,
		sender TEXT,
		itemName TEXT,
		content TEXT,
		isRead BOOLEAN DEFAULT false
);