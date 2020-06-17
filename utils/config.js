require("dotenv").config()

let CSV_URL = process.env.CSV_URL
let GEOJSON_URL= process.env.GEOJSON_URL
let PORT = process.env.PORT

module.exports={
    CSV_URL,
    GEOJSON_URL,
    PORT,
}