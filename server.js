const express = require('express')
const path = require('path')
var app = express()
// var allFriends = require('./app/data/friends');
var bodyParser = require('body-parser')

var PORT = process.env.PORT || 3000

// The body parser package helps verify user input
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// These requires take the get routes defined in htmlRoutes and apiRoutes
require(path.join(__dirname, './app/routing/htmlRoutes.js'))(app)
require(path.join(__dirname, './app/routing/apiRoutes.js'))(app)

app.listen(PORT, function () {
  console.log(`App is listening on port ${PORT}`)
})
