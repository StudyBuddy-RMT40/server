const Controller = require('../controller/controller')

const router = require('express').Router()

router.get('/', (req, res) => {
    res.send('Hello World!')
})

router.post('/register', Controller.register)
router.post('/login', Controller.login)

// bakal ada authentication disini
router.post('/project', Controller.addProject)
router.get('/project', Controller.getProject)
router.delete('/project/:id', Controller.deleteProject)


module.exports = router