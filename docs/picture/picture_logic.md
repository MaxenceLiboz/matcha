# Picture logic

The picutres will be check and downloaded on the serve, only metadata will be save on the db. Go check the [picture table](../database.md#picture-table).

Some documentation:  
[Good security measures for client image upload](https://stackoverflow.com/questions/78590474/good-security-measures-for-client-image-upload)  
[Exemple of implemention](https://medium.com/focus-on-vanilla-javascript/image-upload-and-resizing-in-node-js-and-express-js-40867019aac7)

## Upload a picture
**Need to be authenticate**
### Logic
The goal here is to upload a picture to the server.

The information needed is: **The image data and metadata**.

Create a new reference for the image.
Upload the image on the server in a specific folder.
Save the image metadata (with the reference) into the DB

Throw an error if it doesn´t work.

## Fetch a picture
**Need to be authenticate**
### Logic
The goal here is to fetch a picture form the server.

The information needed is: **the picture reference**.

Look into the DB for the specific picture.

Return the picture to the front with its matadata.  
Throw an error if it doesn´t work.


## Fetch a list of pictures
**Need to be authenticate**
### Logic
The goal here is to fetch a list pictures form the server, tihs will be use whenever we want to fetch an entire profile.

The information needed is: **A list of picture reference**

Look into the DB for the specific pictures.

Return a list of pictures to the front with there matadata.  
Throw an error if it doesn´t work.