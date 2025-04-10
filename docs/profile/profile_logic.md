# Profile logic

## Create profile
**Need to be authenticate**
### Logic
The goal here is to create the profil of a new user

The information needed are: 
- Age
- The gender: Male/Female
- Sexual preference: Hétéro/Homo/Other(other will be concider as Bi)
- A biography
- List of interest represented by tags (User must be able to add new ones and re-use other user's one)
- Up to 5 pictures, include one profile picture.

We need to create a new profile with the given values.  
In the user table add the profile id.  
For each pictures we need to download it on the server and save its informations in the DB (reference, mymetype)

Throw an error if it doesn´t work.


## Fetch a profile
**Need to be authenticate**
### Logic
The goal here is to get all public information of a user and its profile.

The information needed is: **the user id**

Look into the DB for the specific user, get all his informations except email and password.

Return a list of all the information of the user and its profile, only the reference of the pictures will be sent ([Picutre logic](../picture/picture_logic.md)).  
Throw an error if it doesn´t work.