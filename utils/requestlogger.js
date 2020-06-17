const { info } = require("./logger")

const requestLogger = (request, response, next) => {
    //logs a few fields into the console
    info("Method: ", request.method)
    info("Path: ", request.path)
    info("Body: ", request.body)
    info("--------")
    next()
}

module.exports = {
    requestLogger
}