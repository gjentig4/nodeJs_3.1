# nodeJs_3.1

In this task you will have to create an Express application for working with a car dealer stock, but use a database for storing the car data. Your application should at least have the following routes implemented:
GET / - Returns a list of all cars available
POST / - Adds a car to the list
GET /:carID - Returns a car with the specified ID
GET /makes/:make - Returns all cars of a specified make
DELETE /:carID - Deletes a car with the specified ID
The list of the cars should persist when the server is restarted. You must generate an ID on the server when adding a new car to the list. If you wish, you can have additional routes, for example modifying a car or retrieving cars by production year, etc.

Store the car data in a SQLite database.
