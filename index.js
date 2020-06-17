//imports the env variables
const config = require("./utils/config")

//build in server provider of nodejs
const http = require("http")

//imports the actual app
const app = require("./app")

//imports the logger
const {info} = require("./utils/logger")

//creates the server
const server = http.createServer(app)

server.listen(config.PORT,()=>{
    info(`SERVER RUNNING ON PORT ${config.PORT}`)
    info("-----")

})






