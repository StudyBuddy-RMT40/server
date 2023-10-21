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
        const getProject = await this.projectCollection().find().toArray()
            return getProject
    }

    static async delete(id) {
        const deleteProject = await this.projectCollection().deleteOne({_id: new ObjectId(id)})
            return deleteProject
    }

    static async findOneAndUpdate(id, projection) {
        const updatedProject = await this.projectCollection().findOneAndUpdate({ _id: new ObjectId(id) }, projection)
        return updatedProject
    }

    static async findByPk(id, projection) {
        const projectById = await this.projectCollection().findOne({ _id: new ObjectId(id) }, projection)
            return projectById
    }
}

module.exports = Project