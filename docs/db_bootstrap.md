# Objective

The objective is to clear and fill the database with 500 Users when we launch the database container.

# mysql.connector

## Utility

Create a connection with our database in our script, so we can launch mysql commands.

# Use of TRUNCATE to clear the DB 

## Difference between TRUNCATE and DELETE

- TRUNCATE reset the ids when clearing a table (excepet with PostgreSQL), when DELETE keep the increment at his value 
- DELETE perform the deletion of a table row by row (using the WHERE statement), but in our case, we do not care about performing a row by row deletion because we want to clear our database entierly

[to get more info](https://www.dbvis.com/thetable/truncate-vs-delete-sql-comparison-of-the-two-statements/)

# RandomUser Library

## Utility

We're gonna use the RandomUser library in order to get fake users with data and pictures associate from the RandomUser API.

# Faker Library

## Utility

We're gonna use the Faker library in python in order to create fake locations and tags for our fake users.

## Version 

Quote of the official documentation of Faker Library : *"Starting from version 4.0.0, Faker dropped support for Python 2 and from version 5.0.0 only supports Python 3.8 and above"*

So, we're need to use python 3.8 or above to launch the script properly (in our case we'll use python 3.9).