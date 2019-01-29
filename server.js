const express = require('express');
const app = express();
const fs = require("fs")

// our first Route
app.get('/', (request, response, next) => {
    console.log(request);
    // response.send('<h1>Welcome Ironhacker. :)</h1>');
    fs.readFile("outputTransformed.json", "utf8", (e, data) => {
        response.json(JSON.parse(data))
    })
});

app.get('/zenchy', (request, response, next) => {
    console.log(request);
    response.send('<h1>Me mola el mar</h1>');
});

app.listen(4005)