const Controller = require('../controller/controller')
const authentication = require('../middlewares/authentication')

const router = require('express').Router()

router.get('/', (req, res) => {
    res.send('StudyBuddy is in da haaaussse')
})

router.post('/register', Controller.register)
router.post('/login', Controller.login)

// naniti dipindah aja ya mas, problemnya di access tokenya ga masuk" di tdd 
router.get('/categories',Controller.getCategories)
router.post('/categories',Controller.addCategories)
router.delete('/categories/:id',Controller.deleteCategories)

router.use(authentication)

router.patch('/users', Controller.updateRoleUser)

router.post('/reviews/:projectId', Controller.createReview)
router.get('/reviews', Controller.getReviews)
router.delete('/reviews/:id', Controller.deleteReview)
router.put('/reviews/:id', Controller.editReview)

router.post('/project', Controller.addProject)
router.get('/project', Controller.getProject)
router.delete('/project/:id', Controller.deleteProject)
router.patch('/project/:id', Controller.updateProject)


module.exports = router