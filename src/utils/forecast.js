const request = require('request')

const forecast = (lat, long, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=31d3fda9b9e2b2b06c25da3a8ae2252e&query=' + lat + ',' + long + '&units=m'
    console.log(url)
    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to weather service', undefined)
        } else if (body.error) {
            callback('Unable to get location', undefined)

        } else { 
            callback(undefined, body.location.name + ': ' + body.current.weather_descriptions[0] + '.  It is currently ' + body.current.temperature + ' degrees, feels like ' + body.current.feelslike + ' degrees')
        }
    })
}

module.exports = forecast