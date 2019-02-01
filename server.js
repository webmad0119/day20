const express = require('express');
const app = express();
const handlebars = require("express-handlebars")
const dataModel = require("./datamodels/dataModel")
//needed to parse request via POST
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const bcrypt = require("bcrypt");

const saltRounds = 1;
const port = 4069
const db = `airports`
const host = `mongodb://localhost/${db}`

const App = {
    init: function () {
        const locationSchema = { name: String, coords: Object }
        const userSchema = { username: String, password: String, locations: [{ type: mongoose.Schema.Types.ObjectId, ref: 'locations' }] }
        const Location = mongoose.model('locations', locationSchema);
        const User = mongoose.model('username', userSchema);

        //here we set the templating default engine
        app.set('view engine', 'hbs');

        //without this you cannot receive data via POST and understand it via req.body
        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(bodyParser.json());


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
                    res.render("airport-description", { airport })
                })
        });

        app.get("/signup", (req, res, next) => {
            res.render("carlos")
        })

        app.post("/signup", (req, res, next) => {
            //console.log(req.body)

            const salt = bcrypt.genSaltSync(saltRounds);
            const encriptedPassword = bcrypt.hashSync(req.body.password, salt);

            User
                .create({ username: req.body.username, password: encriptedPassword })
                .then(done => {
                    console.log(done)
                })
        })

        app.get("/location", (req, res) => {
            res.render("newAirport")
        })

        function airportUppercase() {
            return "aaabvds4".toUpperCase()
        }

        app.put("/location", (req, res) => {
            Location
                // .update({_id: ObjectId("5c545621fc4086f1af4ec5a3")}, {})
                .update({ name: "aaabvds3" }, { $set: { name: airportUppercase() } })
                .then(location => {
                    res.sendStatus(200)
                    console.log(location)
                })
        })

        app.post("/location", (req, res) => {
            const latitude = +req.body.lat

            if (latitude < -90 || latitude > 90) {
                res.sendStatus(500)
                return
            }

            Location
                .create({
                    name: req.body.name, coords: {
                        coordinates: [+req.body.lon, +req.body.lat]
                    }
                })
                .then(done => {
                    res.sendStatus(200)
                    res.end()

                    //alternatively
                    //res.redirect("/airport-created")
                })

        })

        app.get("/findUser/:id", (req, res, next) => {
            User.findById(req.params.id)
                .populate("locations")
                .then(user => {
                    res.json(user)
                })
                .catch(e => res.json(e))
        })

        app.listen(port)

        console.log(`Listening on port ${port}`)
    }
}

mongoose.connect(host);

mongoose.connection.on('connected', function () {
    console.log(`Connected to ${host}`)
    App.init()
})