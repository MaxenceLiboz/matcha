# Mandatory part

## User registration  

We need theses informations to register:
- email
- username
- last name 
- first name
- password

Email with unique link in order to validate their account
Email with unique link in order to reset their password

Logout in one click

## User profile

The user profile must fill out theses informations:
- Age
- The gender
- Sexual preference: Hétéro/Homo/Other(other will be concider as Bi)
- A biography
- List of interest represented by tags (User must be able to add new ones and re-use other user's one)
- Up to 5 pictures, include one profile picture.


The user must be able to modify:
- Pictures
- Last name
- First name
- Email

The user must be able to: 
- check who has viewed their profile,
- check who has “liked” them.  

The user must have a public “fame rating”

The user must be located using GPS positioning up to their neighborhood. We must ask the user if he accept to be positioned, if not we must find a way to do it anyway.
The user must be able to change its location on his profile 

## APIs

### POST Register
Register a new user
#### Backend
Information given: 
- email
- username
- last name 
- first name
- password

Process:
- Create the user
- Hash the password and save the generated hash only
By default a user as activated to False, an email is sent to him with a url and a token.

Return:
- 200
- 400

### POST Activate
Activate the account of a new user
#### Frontend
When arriving an a specifique url get the token form the url and call the backend API with it
#### Backend
Information give:
- Token

Process:
- Check the validity of the token, make sure it is the right type (activation)
- Set the user to activated

Return:
- 200
- 400

### POST create profile
Create the profile of a user
#### Frontend
Process:
When the user is connected the frontend will try to retrieve user profile, if it does not work it will ask the user to create one by calling the backend API
#### Backend
Information given:
- Age
- The gender
- Sexual preference: Hétéro/Homo/Other(other will be concider as Bi)
- A biography
- List of interest represented by tags (User must be able to add new ones and re-use other user's one)
- Up to 5 pictures, include one profile picture.

Process:
- Create the profile
- Relate the profile to the user
- For each pictures:
    - Upload the picture on the server
    - Save the pictures information in the DB

Return:
- 200: The profile created
- 400
- 301

### GET Basic browsing
#### Backend part
No information given

Process:
Match profile based on:
- Sexual preference (profile related)
- Geographic area (profile related, bonus give a distance)
- A Maximum of common tags (default number)
- A Maximum frame rating (default number) ??

The search by default must prioritize people from same area

Return:
- 200: List of users with specific informations that will be used by frontend (name, profile picture, frame rate, age, common tags, etc... )
- 301

#### Frontend part
The list must be sortable by age, location, “fame rating”, and common tags.  
The list must be filterable by age, location, “fame rating”, and common tags.


### POST Advanced search
Get a list of suggestions that match their profile.
#### Backend part
Information given: 
- An age gap.
- A “fame rating” gap.
- A location.
- One or multiple interest tags.

Process:
Match profile based on all the information given and:
- Sexual preference (profile related)

The search by default must prioritize people from same area

Return:
- 200: List of users with specific informations that will be used by frontend (name, profile picture, frame rate, age, common tags, etc... )
- 301

#### Frontend part
The list must be sortable by age, location, “fame rating”, and common tags.  
The list must be filterable by age, location, “fame rating”, and common tags.

### GET User profile
View the profiles of other users
#### Backend part
Information given:
- userId

Process:
- Get all the available information about the user and its profile

Return:
- 200: All available information about them, except for the email address and password.
- 404


### GET Pictures
Get a picture hold in our server
#### Backend part
Information given:
- The reference of the picture

Process:
- Get the picture downloaded thanks to the information retrieved in the DB

Return:
- 200: The picture with information like name ect.
- 404

### POST report
Report user as fake account
#### Backend part
Information given:
- The user id

Process:
- add user in the table of fake account

Return:
- 200: The picture with information like name ect.
- 404




