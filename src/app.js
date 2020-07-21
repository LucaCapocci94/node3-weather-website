const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');



//define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')



const app = express();

//setup handlers engine and views location
app.set('views', viewsPath) //serve a express per cercare le views in un altra cartella, commentando questa riga non troverebbe la cartella views che cerca di default, perche per prova è stata rinominata templates
app.set('view engine', 'hbs')
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title : 'Weather App',
        name : 'Luca Capocci'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title : 'Weather App',
        helpMessage : 'This is some helpfull text!',
        titleBody : 'Help Page',
        name : 'Luca Capocci',
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title : 'Weather App',
        name : 'Luca Capocci',
        titleBody: 'About',
        aboutMessage : 'This is some aboutfull text!'
    })
})


app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error : 'You must provide an addres!'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error) {
            return res.send({error})
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if(error) {
                return res.send({error})
            }
            res.send({
                location,
                latitude,
                longitude,
                forecast : forecastData
            })
        })
    })



})



app.get('/products', (req, res) => {
    if(!req.query.search) {
        return res.send({
            error : 'You must provide a search term'
        })
    }
    console.log(req.query)
    res.send({
        products : []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title : '404',
        name : 'Luca Capocci',
        errorMessage: 'Help article not found!'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title : '404',
        name : 'Luca Capocci',
        errorMessage : 'Page not found!'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})






//app.com
//app.com/help
//app.com/about

