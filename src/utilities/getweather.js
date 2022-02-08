const request = require('request')

const getweather = (location, callback) => {
    request({ url: "http://api.weatherapi.com/v1/current.json?key=e3ee58dc94d04b7d92460100220502&q=" + location, json: true }, (error, {body} = {}) => {
        
        if (error) {
            callback(error);
        } else if (body.error) {
            callback(body);
        } else {
            callback(undefined, body)
        }
    })
}

module.exports = getweather;