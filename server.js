const express = require('express');
const app = express();
const handlebars = require("express-handlebars")
const dataModel = require("./datamodels/dataModel").default
const mongoose = require('mongoose');
const port = 4069
var db = `airports`
var host = `mongodb://localhost/${db}`

const App = {
    init: function () {
        // const schema = { name: String, age: Number }
        const schema = { name: String }
        const Location = mongoose.model('location', schema);

        // Location.find({name: "Olkhovka Airport"}).then((e, data) => {
        //     console.log(e)
        // })

        function generateNewLocation(nameParam) {
            if (nameParam === "") throw new Error("name must be filled")

            new Location({ name: nameParam }).save((err) => {
                if (err) {

                } else {
                    console.log("done!")
                }
            })
        }

        try {
            generateNewLocation("")
        }
        catch (e) {
            console.log("An error has ocurred")
            console.log(e)
        }

        Location.find({ name: /sofi/gi }, (err, locations) => {
            locations.forEach((location) => {
                console.log(' --> location: ', location.name);
            });
        });

        // Cat.findByIdAndUpdate("5c519ce5c769b26d0b2e1714", {name: "mileydys", age: Math.random()*10}).then(e => {
        //     console.log(e)
        // }) 

        // const kitty = new Cat({ name: 'inés', age: 12 });

        // kitty.save((err) => {
        //     if (err) {
        //       console.log(err);
        //     } else {
        //       console.log('meow');
        //     }
        //   });


        ////////////////////////////////////////////////////////////////////

        //as per the learning unit
        //app.set('views', __dirname + '/views');

        //here we set the templating default engine
        app.set('view engine', 'hbs');

        //todo: indicate origin URL
        app.engine('hbs', handlebars({
            extname: 'hbs',
            defaultLayout: 'layout',
            layoutsDir: __dirname + '/views',
            partialsDir: __dirname + '/views/partials'
        }));

        app.get('/', (request, response, next) => {
            const viewData = dataModel()
            response.render("index", viewData)
        });

        app.get('/carlos', (request, response, next) => {
            const viewData = dataModel()

            var section

            if (Math.random() * 100 > 50) {
                section = "carlos"
            } else {
                section = "dani"
            }

            response.render(section, viewData)
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