const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=6c6630937f3cf3bb7a10cd08d8d31aee&query=' + latitude + ',' + longitude + '&units=m'

    request({url, json : true}, (error, { body }) => {
        if(error) {
            callback('Unable to connect to weather service!', undefined)
        } else if(body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, body.location.name + ' ' + body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature + ' degrees out. It feels like ' + body.current.feelslike + ' degrees out. ' + 'There is a humidity equal to: ' + body.current.humidity + ' %')
        }

    })

}

module.exports = forecast