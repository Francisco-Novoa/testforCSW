let mymap = L.map('mapid').setView([-33.437875, -70.649003], 16)

L.tileLayer("https://api.maptiler.com/maps/basic/{z}/{x}/{y}.png?key=SReFeghyvFXOTpU0pWKz", {
    attribution: '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
}).addTo(mymap)

function onEachFeature(feature, layer) {
    layer.bindPopup(`
            <h3>${feature.properties.name}</h1>
            <p>Latitud: ${feature.geometry.coordinates[1]}</p>
            <p>Longitud: ${feature.geometry.coordinates[0]}</p>
            `
            );
}

const getData = async () => {
    const allFeaturesRaw = await fetch("https://cwstest-fjnovoap.herokuapp.com/api/map/", {
        method: "GET",
        headers: { "Content-Type": "aplication/json" }
    })

    const allFeaturesParsed = await allFeaturesRaw.json()
    
    if (allFeaturesParsed.error) throw ("error getting the data")

    const arr = Object.entries(allFeaturesParsed.features)

    arr.forEach(feature => {
        L.geoJSON(feature, {
            onEachFeature: onEachFeature
        }).addTo(mymap);
    })
}

getData()

