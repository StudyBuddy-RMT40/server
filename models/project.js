const { getDb } = require('../config/mongo')
const {ObjectId} = require('mongodb')

class Project {
    static projectCollection() {
        return getDb().collection('project')
    }

    static async create(data) {
        const value = {
            ...data
        }
        const newProject = await this.projectCollection().insertOne(value)
        return newProject
    }

    static async findAll() {
        try {
            const getProject = await this.projectCollection().find().toArray()
            return getProject
        } catch (error) {
            console.log(error)
        }
    }

    static async delete(id) {
        try {
            const deleteProject = await this.projectCollection().deleteOne({_id: new ObjectId(id)})
            return deleteProject
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = Project