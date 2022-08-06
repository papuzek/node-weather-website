const request = require('request')
const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ address + '.json?access_token=pk.eyJ1IjoiZ3JlZy1rdWJhY3prb3dza2kiLCJhIjoiY2w1dHlnZ3h4MDdxeDNwcTVzYTh0cjRiaSJ9.BImu77xKUnqHiPlyRap6YQ&limit=1'
    console.log(url)
    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to location services', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find location.  Try another address', undefined)
        } else { 
            callback(undefined, {
                latitue: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode