# User logic

## Like someone
**Need to be authenticate**
### Logic
The goal here is to like a user

The information needed is: **the liked user id**

Add the link between the user liked and the user authenticate in the [user_like table](../database.md#user_like-table)

Throw an error if it doesn´t work.

## Unlike someone
**Need to be authenticate**
### Logic
The goal here is to remove the like of a user

The information needed is: **the liked user id**

Remove the link between the user liked and the user authenticate in the [user_like table](../database.md#user_like-table)

Throw an error if it doesn´t work.

## Dislike someone
**Need to be authenticate**
### Logic
The goal here is to dislike a user

The information needed is: **the disliked user id**

Add the link between the user disliked and the user authenticate in the [user_dislike table](../database.md#user_dislike-table)

Throw an error if it doesn´t work.

## Undislike someone
**Need to be authenticate**
### Logic
The goal here is to remove the dislike of a user

The information needed is: **the undislikedliked user id**

Remove the link between the user disliked and the user authenticate in the [user_dislike table](../database.md#user_dislike-table)

Throw an error if it doesn´t work.

## Block someone
**Need to be authenticate**
### Logic
The goal here is to block a user

The information needed is: **the blocked user id**

Add the link between the user blocked and the user authenticate in the [user_blocked table](../database.md#user_blocked-table)

Throw an error if it doesn´t work.

## Unblock someone
**Need to be authenticate**
### Logic
The goal here is to unblock a user

The information needed is: **the blocked user id**

Remove the link between the user blocked and the user authenticate in the [user_blocked table](../database.md#user_blocked-table)

Throw an error if it doesn´t work.