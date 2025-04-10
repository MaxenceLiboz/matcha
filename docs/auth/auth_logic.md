# Auth logic

## Register a new user
**No need to be authenticate**
### Logic
The goal here is to recieve minimal information in order to register a new user

The information needed are : **email, username, first name, last name and password.**

Create the user if not already known (username and email must be unique).  
Hash the password given before saving it into the DB.  
We then send an **email** with a unique link for the user to activate his account.  
The link must have a unique token using the [verification table](./email_verification.md) logic.  
Create [Json Web Token](https://dvmhn07.medium.com/jwt-authentication-in-node-js-a-practical-guide-c8ab1b432a49)

Return the authentication token.  
Throw an error if something went wrong.


## Activate user
**No need to be authenticate**
### Logic
The goal here is to activate the account of a user.

The information needed is: **a validation token**
 
Verify the token is not expired and has the right type.   
Pass the activated variable of the user to true if verification success.

Throw an error if something went wrong.

## Reset password
**No Need to be authenticate**
### Logic
The goal here is to reset a password

The information needed is: 
- A reset password token
- The new password


Verify if the token has the right type and is not expired.  
Change the current password for the new password, hashing it first.  

Throw an error if something went wrong.