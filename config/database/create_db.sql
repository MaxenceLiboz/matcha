-- This script creates the database tables for the described schema.

-- Create the User table
CREATE TABLE IF NOT EXISTS User (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(50) UNIQUE NOT NULL,
    username VARCHAR(50) UNIQUE NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    first_name VARCHAR(50) NOT NULL,
    password_hash VARCHAR(500) NOT NULL,
    verified BOOLEAN DEFAULT FALSE,
    profile_id INT UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create the Profile table
CREATE TABLE IF NOT EXISTS Profile (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT UNIQUE NOT NULL,
    FOREIGN KEY (user_id) REFERENCES User(id) ON DELETE CASCADE,
    age INT,
    gender ENUM('Male', 'Female', 'Other'),
    sexual_preference ENUM('Heterosexual', 'Homosexual', 'Other'),
    frame_rating INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Add profile_id constraint after creating the table
ALTER TABLE User ADD CONSTRAINT `fk_profileId` FOREIGN KEY (profile_id) REFERENCES Profile(id) ON DELETE SET NULL;

-- Create the Location table
CREATE TABLE IF NOT EXISTS Location (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT UNIQUE NOT NULL,
    FOREIGN KEY (user_id) REFERENCES User(id) ON DELETE CASCADE,
    latitude DECIMAL(8, 6),
    longitude DECIMAL(9, 6),
    city VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create the Verification table
CREATE TABLE IF NOT EXISTS Verification (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    FOREIGN KEY (user_id) REFERENCES User(id) ON DELETE CASCADE,
    unique_token VARCHAR(500) UNIQUE NOT NULL,
    expiration_date DATETIME NOT NULL,
    type ENUM('email_verification', 'password_reset') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create the Tag table
CREATE TABLE IF NOT EXISTS Tag (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create the User_Tag table (Many-to-Many between User and Tag)
CREATE TABLE IF NOT EXISTS User_Tag (
    user_id INT NOT NULL,
    PRIMARY KEY (user_id, tag_id),
    FOREIGN KEY (user_id) REFERENCES User(id) ON DELETE CASCADE,
    tag_id INT NOT NULL,
    FOREIGN KEY (tag_id) REFERENCES Tag(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create the Picture table
CREATE TABLE IF NOT EXISTS Picture (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES User(id) ON DELETE CASCADE,
    ref VARCHAR(500) NOT NULL,
    mime_type VARCHAR(50),
    is_profile BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create the User_like table (Many-to-Many for user likes)
CREATE TABLE IF NOT EXISTS User_like (
    user_id INT NOT NULL,
    PRIMARY KEY (user_id, liked_user_id),
    FOREIGN KEY (user_id) REFERENCES User(id) ON DELETE CASCADE,
    liked_user_id INT NOT NULL,
    FOREIGN KEY (liked_user_id) REFERENCES User(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    -- Prevent the user to like himself
    CHECK (user_id != liked_user_id)
);

-- Create the User_dislike table (Many-to-Many for user dislikes)
CREATE TABLE IF NOT EXISTS User_dislike (
    user_id INT NOT NULL,
    PRIMARY KEY (user_id, disliked_user_id),
    FOREIGN KEY (user_id) REFERENCES User(id) ON DELETE CASCADE,
    disliked_user_id INT NOT NULL,
    FOREIGN KEY (disliked_user_id) REFERENCES User(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    -- Prevent the user to dislike himself
    CHECK (user_id != disliked_user_id)
);

-- Create the User_viewed table (Many-to-Many for user views)
CREATE TABLE IF NOT EXISTS User_viewed (
    user_id INT NOT NULL,
    PRIMARY KEY (user_id, viewed_user_id),
    FOREIGN KEY (user_id) REFERENCES User(id) ON DELETE CASCADE,
    viewed_user_id INT NOT NULL,
    FOREIGN KEY (viewed_user_id) REFERENCES User(id) ON DELETE CASCADE,
    viewed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    -- Prevent the user to view himself
    CHECK (user_id != viewed_user_id)
);

-- Create the User_blocked table (Many-to-Many for user blocks)
CREATE TABLE IF NOT EXISTS User_blocked (
    user_id INT NOT NULL,
    PRIMARY KEY (user_id, blocked_user_id),
    FOREIGN KEY (user_id) REFERENCES User(id) ON DELETE CASCADE,
    blocked_user_id INT NOT NULL,
    FOREIGN KEY (blocked_user_id) REFERENCES User(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    -- Prevent the user to block himself
    CHECK (user_id != blocked_user_id)
);

-- Create the Fake_account table
CREATE TABLE IF NOT EXISTS Fake_account (
    id INT AUTO_INCREMENT PRIMARY KEY,
    reported_by_user_id INT NOT NULL, -- The user who reported the fake account
    FOREIGN KEY (reported_by_user_id) REFERENCES User(id) ON DELETE CASCADE,
    fake_user_id INT NOT NULL, -- The account that is reported as fake
    FOREIGN KEY (fake_user_id) REFERENCES User(id) ON DELETE CASCADE,
    reason TEXT, -- Optional: reason for reporting
    reported_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    -- Prevent the user to report himself as fake
    CHECK (reported_by_user_id != fake_user_id)
);

-- Create the Notification table
CREATE TABLE IF NOT EXISTS Notification (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL, 
    FOREIGN KEY (user_id) REFERENCES User(id) ON DELETE CASCADE,
    status BOOLEAN DEFAULT FALSE,
    message VARCHAR(500) NOT NULL,
    type ENUM('like', 'view', 'message', 'match', 'report', 'other') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create the Conversation table
-- Represents a chat thread between users.
CREATE TABLE IF NOT EXISTS Conversation (
    id INT AUTO_INCREMENT PRIMARY KEY,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create the Conversation_Participant table (Many-to-Many)
CREATE TABLE IF NOT EXISTS Conversation_participant (
    conversation_id INT NOT NULL,
    user_id INT NOT NULL,
    PRIMARY KEY (conversation_id, user_id),
    FOREIGN KEY (conversation_id) REFERENCES Conversation(id) ON DELETE CASCADE,
    joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES User(id) ON DELETE CASCADE
);

-- Create the Message table
CREATE TABLE IF NOT EXISTS Message (
    id INT AUTO_INCREMENT PRIMARY KEY,
    conversation_id INT NOT NULL,
    FOREIGN KEY (conversation_id) REFERENCES Conversation(id) ON DELETE CASCADE,
    sender_id INT NOT NULL,
    FOREIGN KEY (sender_id) REFERENCES User(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_read BOOLEAN DEFAULT FALSE,
    -- Index for efficiently retrieving messages for a conversation, ordered by time
    INDEX idx_conversation_messages (conversation_id, created_at)
);