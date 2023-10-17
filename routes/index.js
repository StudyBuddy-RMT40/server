const Controller = require('../controller/controller')

const router = require('express').Router()

router.get('/', (req, res) => {
    res.send('Hello World!')
})

router.post('/register', Controller.register)
router.post('/login', Controller.login)

module.exports = router