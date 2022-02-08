const express = require('express');
const path = require('path');
const hbs = require('hbs');
const getweather = require('./utilities/getweather');

const app = express();
const port = process.env.PORT || 3004;

//express custom path
const publicPath = path.join(__dirname + "/../public")
const viewsPath = path.join(__dirname + "/../templates/views")
const partialspath = path.join(__dirname + "/../templates/partials")


//express static file serve
app.use(express.static(publicPath));

//setup handalbar 
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialspath);

app.get('', (req, res) => {
    res.render('index', {
        title: "Weather App"
    });
})

// *****************************************************************************
//*****************************weather handeler*********************************
// *****************************************************************************
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        res.send("Please enter address query.")
    } else {
        getweather(req.query.address, (error, response) => {
            if (error) {
                res.send({error})
            } else {
                res.send({response})
            }
        })
    }
})


app.get('*', (req, res) => {
    res.render('404', {
        title: "404 page",
        errorMessage: "Page is not founded!"
    })
})


app.listen(port, () => {
    console.log('app started at 3004 port');
})



// const weatherURL = "http://api.weatherapi.com/v1/current.json?key=e3ee58dc94d04b7d92460100220502&q=gournadi";
// const locationURL = "https://api.mapbox.com/geocoding/v5/mapbox.places/barishal.json?access_token=pk.eyJ1IjoidHVzaGFyMm5kIiwiYSI6ImNrejhzeHoyejFpeDcyb28wbzdsc2g3bTMifQ.3blBv-L5tzuVA8IE1XjSmQ";

