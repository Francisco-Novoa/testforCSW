const config = require("./config")
const axios = require("axios")
const logger = require("./logger")

function CSVtoJSON(csv) {
    //turns csv file into a json format

    //divide the csv into array and remove empty elements
    const csvArray = csv.split("\n").filter((elem) => elem !== "")
    //gets the headers and deletes the fist element
    const headers = csvArray[0].split(",")
    csvArray.shift()

    //returns the new object 
    return csvArray.map((elem) => {
        aux = elem.split(",")
        result = headers.reduce((accumulator, current, index) => {
            Object.assign(accumulator, { [current]: aux[index] })
            return accumulator
        }, {})
        return result
    })
}

function AddProperties(geoJson, json) {
    //adds the properties found in a json file to the properties field in a geojson object.

    newFeatures = geoJson.features.reduce((accumulator, current, index) => {

        //current has the format as follows: { type:feature, geometry:{type:point,coordinates:{c1:1,c2:2...}}, properties:{id:#number} }
        //json has the format as follows: { name: #name, id: #id }

        //find the name in json using the id
        newProperties = json.find(elem => elem.id == current.properties.id)
        //adds the name to the output
        return { ...accumulator, [index]: { ...current, properties: newProperties } }
    }, {})

    //returns the new geojson
    return {
        type: "FeatureCollection",
        features: newFeatures
    }
}

const getData = async () => {
    logger.info(`connecting to database at: ${config.CSV_URL} and  ${config.GEOJSON_URL} `)
    //gets the data from the source
    const csv = await axios.get(config.CSV_URL)
    //turns it into json for ease of use
    const parsed = CSVtoJSON(csv.data)
    //gets geojson data from source
    const geojson = await axios.get(config.GEOJSON_URL)
    //adds the values from the csv into the geojson 
    const newGeoJson = AddProperties(geojson.data, parsed)
    //return geojson
    return newGeoJson
}

module.exports = { getData }