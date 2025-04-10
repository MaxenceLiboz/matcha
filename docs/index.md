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




