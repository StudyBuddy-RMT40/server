const { ObjectId } = require("mongodb");
const { getDb } = require("../config/mongo");

class Storage {
  static storageCollection() {
    return getDb().collection("mediaUrls");
  }

  static async create(data) {
    const newMediaUrl = await this.storageCollection().insertOne(data);
    return newMediaUrl;
  }

  // static async findOneAndUpdate(id, updateObject) {
  //   const result = await this.storageCollection().findOneAndUpdate(
  //     { _id: new ObjectId(id) }, 
  //     { $set: updateObject }, 
  //     { returnOriginal: false } 
  //   );
  //   return result
  // }

  static async findAll() {
    const mediaUrl = await this.storageCollection().find().toArray();
    return mediaUrl;
  }

  static async findById(id) {
    const mediaUrl = await this.storageCollection().findOne({
      projectId: new ObjectId(id),
    });
    return mediaUrl;
  }
}

module.exports = Storage;
