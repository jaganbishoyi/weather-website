const path = require('path');
const express = require('express');
const hbs = require('hbs');

const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000;

// Define paths for Express config
const publicDirPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Jagan Mohan Bishoyi'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Jagan Mohan Bishoyi'
    });
});

app.get('/fact', (req, res) => {
    res.render('fact', {
        title: 'Weather facts',
        message: 'This is a help page',
        name: 'Jagan Mohan Bishoyi'
    });
});

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        });
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error });
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error });
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            });

        });
    });

});

app.get('/fact/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Jagan Mohan Bishoyi',
        errorMessage: 'Fact not found'
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Jagan Mohan Bishoyi',
        errorMessage: 'Page not found'
    });
});

app.listen(port, () => {
    console.log('Server is up on port' + port + '.');
});