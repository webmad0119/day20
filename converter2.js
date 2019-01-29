const fs = require("fs")

fs.readFile("airports.json", "utf8", function (e, airports) {
    let JSONData = JSON.parse(airports)

    let output = JSONData.map((airport) => {
        return { name: airport.name, coords: { type: "Point", coordinates: [ +airport.lon, +airport.lat ] } }
    })

    fs.writeFile("airportsTransformed.json", JSON.stringify(output), "utf8", function(){})
})