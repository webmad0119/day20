const fs = require("fs")

fs.readFile("movies.json", "utf8", function (e, data) {
    let JSONData = JSON.parse(data)

    let output = JSONData.map((movie) => {
        return { ...movie, rate: +movie.rate, year: +movie.year }
    })

    fs.writeFile("outputTransformed.json", JSON.stringify(output), "utf8", function(){})
})