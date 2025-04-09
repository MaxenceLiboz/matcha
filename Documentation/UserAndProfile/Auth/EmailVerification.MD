# Email verification

We will use the email verification with a unique token for 2 different operations.  

The first one will be activate a user account, and the second one will be to reset the password.

### The table
A verification table holding:
- String: unique token
- Date: expiration date
- String/Enum: type
- id: userId (One to One)

We create a unique link with a new token freshly created in the verification table.  
Depending on the url the front will do different action.  

### Activate user
**No need to be authentified**  
The front will read the url, finding out it is activation url, it will then send a request to the back with the token given in the url in order to activate the user if the token is valid and that the user connected match with the userId of the token, it will then redirect to the page to create the profile.  
If the token is not valid a page with resend email will be shown.

### Reset password
**No need to be authentified**  
The front will read the url, finding out it is reset password url, it will display a form with old and new password, send it to the back with the token hold in the url.  
The back will change password if and only if the old password match and the token is valid.