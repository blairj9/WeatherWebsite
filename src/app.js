const path = require('path')
const express = require('express')
const hbs = require('hbs')
const { response } = require('express')
const geocode = require('./geocode')
const forecast = require('./forecast')

const app = express()
const port = process.env.PORT || 3000

//define path for express config 
const publicDirectoryPath = path.join(__dirname, '../public')
const viewPath =path.join(__dirname, '../template/views')
const partialPath= path.join(__dirname, '../template/partials')

//set up handlebars engine and views location
app.set('view engine','hbs')
app.set('views', viewPath)
hbs.registerPartials(partialPath)

//setup static directory to serve 
app.use(express.static(publicDirectoryPath))

app.get('', (req,res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Jacob'
    })
})

app.get('/about', (req,res) => {
    res.render('about',{
        title: 'About me',
        name: 'Jacob '
    })
})

app.get('/help', (req,res) => {
    res.render('help',{
        title: 'Help',
        name: 'Jacob',
        HelpText: 'This is helpful text'

    })
})

app.get('/weather', (req,res) => {
    if(!req.query.address){
        return res.send({
            error: 'you must have an address'
        })
    }
    else{
        geocode(req.query.address, (error, {latitude, longitude, location} = {})=>{
            if(error){
                return res.send({ error })
            }
            forecast(latitude, longitude, (error, forecastData) => {
                if(error){
                    return res.send({ error })
                } 
        res.send({
        forecast: forecastData,
        location: location,
        address: req.query.address
    })
})})
}

})

// app.get('/products', (req,res)=>{
//     if(!req.query.search){
//         return res.send({
//             error: 'you must have a search term'
//         })
//     }

//     console.log(req.query.search)
//     res.send({
//         products: []
//     })
// })

app.get('/help/*', (req,res)=> {
    res.render('404', {
        title: '404',
        errorMessage: 'Help article is not found' 
    })
})

app.get('*', (req,res)=>{
    res.render('404', {
        title: '404',
        errorMessage: 'Page not found'
    })
    
})

app.listen(port, () => {
    console.log('Sever running on port ' + port)
})