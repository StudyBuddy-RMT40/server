const Controller = require('../controller/controller')

const router = require('express').Router()

router.get('/', (req, res) => {
    res.send('Hello World!')
})

router.post('/register', Controller.register)

module.exports = router