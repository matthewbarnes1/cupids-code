DROP DATABASE IF EXISTS dating_db;
CREATE DATABASE dating_db;

USE dating_db;

CREATE TABLE users (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    hashed_password VARCHAR(255) NOT NULL,
    name VARCHAR(255)
);

CREATE TABLE user_profile (
    user_id INT NOT NULL PRIMARY KEY,
    name VARCHAR(255),
    age INT,
    sex ENUM('Male', 'Female', 'Other'),
    bio TEXT,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
