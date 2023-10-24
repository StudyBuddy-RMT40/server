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
  
  static async findById(id) {
    const mediaUrl = await this.storageCollection().findOne({
      projectId: new ObjectId(id),
    });
    return mediaUrl;
  }
}

module.exports = Storage;
