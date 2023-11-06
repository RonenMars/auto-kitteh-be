/**
 * Express.js server application for handling JSON data and serving JSON files.
 * @module app
 */

/**
 * Express application instance.
 * @const {Object}
 */
const express = require("express");

/**
 * JSON parsing utility for linting JSON data.
 * @const {Function}
 */
const { parse } = require("@prantlf/jsonlint");

/**
 * Middleware for handling cross-origin resource sharing.
 * @const {Function}
 */
const cors = require("cors");

/**
 * Middleware for parsing JSON data from incoming requests.
 * @const {Function}
 */
const bodyParser = require("body-parser");

/**
 * Node.js built-in file system module.
 * @const {Object}
 */
const fs = require("fs");

/**
 * Create an instance of the Express application.
 * @const {Object}
 */
const app = express();

/**
 * The port on which the Express server will listen.
 * @const {number}
 */
const port = 8080;

// Enable CORS for the Express application
app.use(cors());

// Parse JSON data from incoming requests
app.use(bodyParser.json());

/**
 * Handle POST requests to validate and save JSON data.
 * @function
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 */
app.post("/", (req, res) => {
  try {
    const myJSONData = req.body.data;

    if (Object.keys(myJSONData).length) {
      // Validate JSON data using the JSONLint library
      parse(req.body.data);

      // Convert JSON data to a string and save it to a file
      const json = JSON.stringify(req.body.data);
      fs.writeFile("./myJson.json", json, (err) => {
        if (!err) {
          console.log("Data saved successfully.");
        } else {
          console.error(err);
        }
      });
      res.status(200);
    }

  } catch (error) {
    console.error(error);
    const { message, reason, excerpt, pointer, location } = error;
    if (!location) {
      return res.status(200);
    }
    const { column, line, offset } = location.start;
    res.status(400).json({
      message,
      detailedMessage: `Parse error on line ${line}, ${column} column`,
      reason
    });

    console.log(message);
    console.log(`Parse error on line ${line}, ${column} column:
            ${excerpt}
            ${pointer}
            ${reason}`
    );
  }
});

/**
 * Handle GET requests to retrieve and serve saved JSON data.
 * @function
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 */
app.get("/", (req, res) => {
  fs.readFile("./myJson.json", "utf8", (err, file) => {
    if (err) {
      // Return an empty JSON object if the file is not found
      const jsonObj = JSON.stringify({});
      res.setHeader("Content-disposition", "attachment; filename=emptyJson.json");
      res.setHeader("Content-type", "application/json");
      res.write(jsonObj, function(err) {
          res.end();
        }
      );
    } else {
      try {
        // Parse and serve the saved JSON data
        const jsonObj = JSON.parse(file);
        res.setHeader("Content-disposition", "attachment; filename=myJson.json");
        res.setHeader("Content-type", "application/json");
        res.write(jsonObj, function(err) {
            res.end();
          }
        );
      } catch (err) {
        console.error("Error while parsing JSON data:", err);
      }
    }
  });
});

/**
 * Start the Express server and listen on the specified port.
 * @function
 * @param {number} port - The port to listen on.
 * @param {Function} callback - A callback function to execute once the server is started.
 */
app.listen(port, () => {
  console.log("App is running at port:", port);
});