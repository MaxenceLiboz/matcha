# Connection between frontend and backend

Here are going to use **two different** protocol.  
The first one will be **HTTP** with the use of a **REST API**.  
The second one will be by **TCP** connection with the use of **Websockets**.  

The API will be use for everything **except real time use**.  
For exemple auth, suggestions, profile search, profile view etc.  

On the other hand, the websocket will be use **only for real time use**.  
For exemple send, recieve, delete, modify, like a message, like a profile, block a user etc.
