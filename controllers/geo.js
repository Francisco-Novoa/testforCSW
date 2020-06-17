const funciones = require("../utils/Funciones")
const geoRouter = require("express").Router()



geoRouter.get("/", async (request, response) => {
    const Data = await funciones.getData()
    if (!Data) response.status(400).json({ error: "problem with the GeoData" })
    response.json(Data)
})

module.exports = geoRouter