const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')


const app = express()
const port = process.env.PORT || 3000

// define paths
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)


// Setup static directory to serve
app.use(express.static(path.join(__dirname, '../public')))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Gregk'
    })

})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Gregk'
    })

})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Gregk',
        helpTxt: 'This is help text'
    })

})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }

    geocode(req.query.address, (error, {latitue, longitude, location} = {}) => {

        if (error) {
            return res.send({ error })
        }
        
        forecast(latitue, longitude, (error, forecastData) => {
            if (error) {
                return res.send({
                    error: error
                })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address,                
            })
            
        })
    })
    
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
        
    })
})


app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMsg: 'Help article not found',
        name: 'Gregk'
    })

})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMsg: 'Page not found',
        name: 'Gregk'
    
    })
})




app.listen(port, () => {
    console.log("Server is up on port " + port)
})



