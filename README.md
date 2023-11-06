# Node.js JSON Server
This is a simple Node.js server application built with Express.js for handling JSON data and serving JSON files. The server provides two main functionalities:

Accepting JSON data through a POST request, validating it using the JSONLint library, and saving it to a file.
Serving saved JSON data through a GET request, allowing users to download the JSON file.
## Prerequisites
Before running the server, make sure you have the following dependencies installed:
1. Node.js
2. NPM (Node Package Manager)

## Getting Started
1. Clone or download the repository to your local machine.
2. Navigate to the project directory using the command line.
3. Install the required Node.js modules by running the following command:

bash

`npm install`

***Start the server by running:***

bash
`node app.js`

The server will start and listen on port 8080 by default.

## Server Endpoints
1. POST / - Save JSON Data

To save JSON data, make a POST request to the root URL with a JSON payload in the request body. The server will validate the JSON data and save it to a file named "myJson.json." If the data is valid, the server will respond with a status code of 200.

2. GET / - Retrieve JSON Data

To retrieve saved JSON data, make a GET request to the root URL. The server will serve the saved JSON data from the "myJson.json" file. If the file is not found, the server will respond with an empty JSON object.

### Error Handling
If there are errors in the JSON data or during the server operation, the server will respond with appropriate status codes and error messages. Errors are logged to the console for debugging.

### CORS and JSONLint
This server uses CORS middleware to allow cross-origin requests, making it suitable for integration with client-side applications. It also utilizes the JSONLint library to validate incoming JSON data.

Author:

Ronen Mars
