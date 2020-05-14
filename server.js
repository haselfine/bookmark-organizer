//starting point for heroku app, what's being served?

let express = require('express') //server utilizes express
let bodyParser = require('body-parser') //need to parse json
let api_routes = require('./routes/api.js') //need to navigate api
let path = require('path') //where should the server look for the app

let app = express() //app utilizes express
app.use(express.static(path.join(__dirname, 'bookmark-organizer', 'dist'))) //dictate path

app.use(bodyParser.json())  //parse json

app.use('/api', api_routes) //path for api navigation

app.use(function(req, res, next){ //how to handle misdirection
    res.status(404).send('Not found')
})

app.use(function(err, req, res, next){ //how to handle issues with server
    console.error(err.stack)
    res.status(500).send('Server error')
})

let server = app.listen(process.env.PORT || 3000, function(){ //if heroku, use provided port. If development, use port 3000
    console.log('Express server running on port ', server.address().port)
})