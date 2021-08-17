const request = require('request')

    const forecast = (latitude, longitude, callback) => {
        const url = 'http://api.weatherstack.com/current?access_key=70dd6dff9e77d2d3def652e3b3693184&query='+ latitude +','+ longitude +'&units=f'
    
        request({ url: url , json: true},(error, {body} = {})=>{
            if(error){
                callback('can not connect to weather app', undefined)
            } else if(body.error){
                callback('Not valid location', undefined)
            } else{
                callback(undefined, body.current.weather_descriptions[0]+ '. It is currently '+ body.current.temperature+ ' degress out. It feels like '+ body.current.feelslike+ ' degress out.')
            }
        })
    }

module.exports = forecast