const Controller = require('../controller/controller')
const authentication = require('../middlewares/authentication')

const router = require('express').Router()

router.get('/', (req, res) => {
    res.send('StudyBuddy is in da haaaussse')
})

router.post('/register', Controller.register)
router.post('/login', Controller.login)

router.use(authentication)

router.get('/users', Controller.getUser)
router.get('/users/:id', Controller.getUserById)
router.put('/users', Controller.updateUser)
router.patch('/users', Controller.updateRoleUser)

router.post('/reviews/:projectId', Controller.createReview)
router.get('/reviews', Controller.getReviews)
router.delete('/reviews/:id', Controller.deleteReview)
router.put('/reviews/:id', Controller.editReview)

router.post('/project', Controller.addProject)
router.get('/project', Controller.getProject)
router.get('/project/:id', Controller.getProjectbyId)
router.delete('/project/:id', Controller.deleteProject)
router.patch('/project/:id', Controller.updateProject)

router.get('/ratings', Controller.getRating)
router.post('/ratings', Controller.addRating)
router.put('/ratings/:id', Controller.updateRating)

router.get('/categories',Controller.getCategories)
router.post('/categories',Controller.addCategories)
router.delete('/categories/:id',Controller.deleteCategories)

module.exports = router