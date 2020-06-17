//saves the enviroment variables
const config = require("./utils/config")

// router library express
const express = require("express")

//this one catches every async error in the use of routes
require("express-async-errors")

//creates the express intacne that is the core of the app's backend
const app = express()

//allows to use content from more than one source, useful for the separation of backend and front end
const cors = require("cors")

// here go the router imports

const geoRouter = require("./controllers/geo")

//imports the request logger middleware
const { requestLogger } = require("./utils/requestlogger")

//imports the unknown endpoint middleware
const { unknownEndpoint } = require("./utils/unknownEndPoint")
const { errorHandler } = require("./utils/errorHandler")


//actually uses cors
app.use(cors())

//middleware made to serve static files autonomously in the file system
app.use('/map', express.static("./public"));

//middleware that parses the body of the requests.
//from here onwards the  request object is accesible
app.use(express.json())

//calls the request logger middleware
app.use(requestLogger)

//here go the controllers

app.use("/api/map",geoRouter)

//here went the controllers from here onward
//the request object has already been handled

//unknown endpoint 404 handler middleware
app.use(unknownEndpoint)

//error handler middleware, so everything doesnt crash
app.use(errorHandler)

module.exports = app