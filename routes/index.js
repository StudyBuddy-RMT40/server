const Controller = require('../controller/controller')
const authentication = require('../middlewares/authentication')

const router = require('express').Router()

router.get('/', (req, res) => {
    res.send('StudyBuddy is in da haaaussse')
})

router.post('/register', Controller.register)
router.post('/login', Controller.login)

router.use(authentication)

router.patch('/users', Controller.updateRoleUser)

router.post('/reviews/:projectId', Controller.createReview)
router.get('/reviews', Controller.getReviews)
router.delete('/reviews/:id', Controller.deleteReview)
router.put('/reviews/:id', Controller.editReview)

module.exports = router