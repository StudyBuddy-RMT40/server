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
}

module.exports = Storage;
