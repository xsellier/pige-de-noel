'use strict'

const config = require('config')
const express = require('express')
const bodyParser = require('body-parser')

const contentTypeMiddleware = require('./middleware/content-type')
const errorMiddleware = require('./middleware/error')
const routes = require('./route')

let app = express()

// Support json encoded bodies
app.use(bodyParser.json())

// Register static files
app.use(express.static(config.server.public))

console.log('Registering pre-middlewares ...')
contentTypeMiddleware(app)

console.log('Registering routes ...')
routes.forEach((route) => {
  console.log(`Registering route ${route.method.toUpperCase()} ${route.url}`)
  app[route.method](route.url, route.handler)
})

console.log('Registering post-middlewares ...')
errorMiddleware(app)

app.listen(config.server.port, () => {
  console.log(`Server started, load http://127.0.0.1:${config.server.port} in a browser to see the output`)
})
