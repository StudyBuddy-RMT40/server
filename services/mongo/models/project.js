const { getDb } = require('../config/mongo')
const {ObjectId} = require('mongodb')

class Project {
    static projectCollection() {
        return getDb().collection('project')
    }

    static categoriesCollection() {
        return getDb().collection('categories')
    }

    static async create(data) {
        const value = {
            ...data
        }
        const newProject = await this.projectCollection().insertOne(value)
        return newProject       
    }

    static async findAll() {
    
        // const aggregationPipeline = [
        //   {
        //     $lookup: {
        //       from: "categories", // The name of the collection to join
        //       localField: '_id', // The field from the 'orders' collection
        //       foreignField: 'CategoryId', // The field from the 'products' collection
        //       as: 'categories', // The alias for the joined data
        //     },
        //   },
        // ];
    
        // const results = await this.categoriesCollection().aggregate(aggregationPipeline).toArray();
        // console.log(results);    

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