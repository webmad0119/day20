const express = require("express")
const app = express()
const handlebars = require("express-handlebars")
const ff = require("./callbacks/c.js").default
const fff = ff.bind({
    template: "index", data: {
        a: "tru",
        b: !true,
        c: [5, 3, 2, 99],
        d: false,
    }
})
const fff2 = ff.bind({ template: "s2", data: {
    a: "tru",
    b: !true,
    c: [5, 3, 2, 9919],
    d: false,
} })

var handlebarsHelpers = require('handlebars-helpers')();

app.set('views', __dirname + '/views');
app.set('view engine', 'hbs');
app.set('helpers', handlebarsHelpers)

app.engine('hbs', handlebars({
    extname: 'hbs',
    defaultLayout: 'layout',
    layoutsDir: __dirname + '/views',
    helpers: handlebarsHelpers,
    partialsDir: __dirname + '/views/partials'
}));

app.get("/", fff)
app.get("/s2", fff2)

app.listen(3000)