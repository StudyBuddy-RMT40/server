require('dotenv').config();
const express = require('express')
const router = require('./routes')
const cors = require('cors')
const errorHandler = require('./middlewares/errorHandler')
const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(router)

app.use(errorHandler)

module.exports = app