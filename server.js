const express = require('express');
const app = express();
const handlebars = require("express-handlebars")
const dataModel = require("./datamodels/dataModel")
const mongoose = require('mongoose');
const port = 4069
var db = `airports`
var host = `mongodb://localhost/${db}`

const App = {
    init: function () {
        const schema = { name: String, coords: Object }
        const Location = mongoose.model('locations', schema);
        
        //here we set the templating default engine
        app.set('view engine', 'hbs');

        //todo: indicate origin URL
        app.engine('hbs', handlebars({
            extname: 'hbs',
            defaultLayout: 'layout',
            layoutsDir: __dirname + '/views',
            partialsDir: __dirname + '/views/partials'
        }));

        app.get('/location/:airportID', (req, res, next) => {
            Location
                .findById(req.params.airportID)
                .then(airport => {
                    res.render("airport-description", {airport})
                })
        }); 

        app.listen(port)

        console.log(`Listening on port ${port}`)
    }
}

mongoose.connect(host);

mongoose.connection.on('connected', function () {
    console.log(`Connected to ${host}`)
    App.init()
})