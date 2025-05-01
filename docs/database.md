# DB tables

## User table
A user table holding:  
- String: email  
- String: username  
- String: last name   
- String: first name  
- Hash: password  
- Boolean: verified  
- id: profileId (One to One)  

## Profile
A profile table holding:  
- int: Age  
- String/Enum: gender  
- String/Enum: sexual preference  
- int: frame rating  
- ?: GPS location (May have to create table for that)  

## Location
A location table:
- id: userId
- int: latitude
- int: longitude
- String: city

## Verification table
A verification table holding:  
- String: unique token  
- Date: expiration date  
- String/Enum: type  
- id: userId (One to One)  

## TAG table
A tag table holding:  
- String: name  

## User_Tag table
A User_Tag table to have a many to many relationship between user and tag holding:  
- id: userId    
- id: tagId  

## Picture table
A picture table holding:  
- id: userId  
- String: ref  
- String: myme type  
- boolean: isProfile  

## User_like table
A User_like table to have a many to many relationships between users like holding:  
- id: userId  
- id: likedUserId  

## User_dislike table
A User_dislike table to have a many to many relationships between users dislike holding:  
- id: userId  
- id: dislikedUserId  

## User_viewed table
A User_viewed table to have a many to many relationships between users views holding:  
- id: userId  
- id: viewedUserId  

## User_blocked table
A User_viewed table to have a many to many relationships between users blocked holding:  
- id: userId  
- id: blockedUserId  


## Fake account (might use this as a bonus)
A Fake_account table to hold every user that has been reported as faked:  
- id: userId ???   
- id: fakeUserId  

## Notification table
A notification table that old for each user serveral notification
- id: userId
- boolean: status
- string: message
- enum/string: type 