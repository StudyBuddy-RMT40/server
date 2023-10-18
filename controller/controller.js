const { comparePassword } = require("../helpers/bcrypt")
const Project = require("../models/project")
const User = require("../models/user")

class Controller {
    static async register(req, res, next) {
        try {
            const { username, email, password, phoneNumber, address } = req.body
            if (!username) {
                throw { name: 'empty_username' }
            }
            if (!email) {
                throw { name: 'empty_email' }
            }
            if (!password) {
                throw { name: 'empty_password' }
            }
            const users = await User.findAll()
            const even = (el) => el.email === email
            const isRegisteredEmail = users.some(even)
            if (isRegisteredEmail) {
                throw { name: "unique_email" }
            }

            await User.create({ username, email, password, phoneNumber, role: null, address })
            res.status(201).json({ message: `User with username ${username} successfully created` })
        } catch (err) {
            next(err)
        }
    }

    static async login(req, res, next) {
        try {
            const { email, password } = req.body
            if (!email) {
                throw { name: 'empty_email' }
            }
            if (!password) {
                throw { name: 'empty_password' }
            }
            const findUser = await User.findBy({ email })
            console.log(findUser, '<<<<<')
            if (!findUser) {
                throw {name: 'invalid_email'}
            }
            console.log(password, findUser.password, '<<<<<<<<<')
            const isPassValid = await comparePassword(password, findUser.password)
            console.log(isPassValid, '<<<<<')
            if (!isPassValid) {
                throw {name: 'invalid_password'}
            }
            res.status(200).json({message: `User with username ${email} has login`})
        } catch (err) {
            next(err)
        }
    }

    static async addProject(req, res, next) {
        try {
            const { studentId, teacherId, startDate, endDate, isFinished, likes } = req.body
            if (!startDate) {
                throw { name: 'empty_startDate' }
            }
            if (!endDate) {
                throw { name: 'empty_endDate' }
            }
            console.log(studentId, teacherId, startDate, endDate, isFinished, likes, '<<<<< project')
            const newProject = await Project.create({studentId, teacherId, startDate, endDate, isFinished, likes})
            console.log(newProject, '<<<<< project')
            res.status(201).json({message: `Project has been success created`})
        } catch (err) {
            next(err)
        }
    }

    static async addProject(req, res, next) {
        try {
            const {  name, studentId, teacherId, startDate, endDate, isFinished, description, likes, categoryId } = req.body
            if (!name) {
                throw { name: 'empty_name/project' }
            }
            if (!description) {
                throw { name: 'empty_description/project' }
            }
            if (!categoryId) {
                throw { name: 'empty_categoryId/project' }
            }
            await Project.create({name, studentId, teacherId, startDate, endDate, isFinished, likes, description, categoryId})
            res.status(201).json({message: `Project has been success created`})
        } catch (err) {
            next(err)
        }
    }   

    static async getProject(req, res, next) {
        try {    
            const getProject = await Project.findAll({})
            res.status(200).json(getProject)
        } catch (err) {
            next(err)
        }
    }   

    static async deleteProject(req, res, next) {
        try {
            const {id} = req.params
            const project = await Project.delete(id)
            if (!project) {
                throw {name: 'not_found/project'}
            }
            res.status(200).json({message: `Project has been success deleted`})
        } catch (err) {
            next(err)
        }
    } 
}

module.exports = Controller