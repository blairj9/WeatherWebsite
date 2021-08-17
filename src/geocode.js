const request = require('request')

const geocode = (address, callback) => {
    const mapURL='https://api.mapbox.com/geocoding/v5/mapbox.places/'+ address +'.json?access_token=pk.eyJ1IjoiamJsYWlyMjkiLCJhIjoiY2tzNHFhc3lkMHpwMTJwbnQ1NXpld3h3aCJ9.y3_WuFmVVOZMO4zHskEMWQ&limit=1'

    request({ url: mapURL, json: true }, (error, {body}={}) => {
        if(error){
            callback('Unable to connect to location services!', undefined)
        } else if(body.features.length === 0){
            callback('unable to find location.')
        } else{
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }

    })
}
 module.exports = geocode