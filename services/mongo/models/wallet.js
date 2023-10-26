const { getDb } = require("../config/mongo");
const { ObjectId } = require("mongodb");

class Wallet {
  static walletCollection() {
    return getDb().collection("wallets");
  }

  static async create(data) {
    const newWallet = await this.walletCollection().insertOne(data);
    return newWallet;
  }

  static async getAllMyWallet(teacherId) {
    const cursor = await this.walletCollection().find({
      teacherId: new ObjectId(teacherId),
      status: { $in: ["finished"] },
    });
    const wallets = await cursor.toArray();

    const totalWalletAmount = wallets.reduce(
      (total, wallet) => total + wallet.amount,
      0
    );

    return totalWalletAmount;
  }

  static async findOneAndUpdateStatus(id, projection) {
    const response = await this.walletCollection().findOneAndUpdate(
      { projectId: new ObjectId(id) },
      projection
    );
    return response;
  }

  static async findOneAndUpdate(id, projection) {
    const response = await this.walletCollection().findOneAndUpdate(
      { _id: new ObjectId(id) },
      projection
    );
    return response;
  }

  static async getWalletsByStatus(teacherId, status) {
    const cursor = await this.walletCollection().find({
      teacherId: new ObjectId(teacherId),
      status: status,
    });
    const wallets = await cursor.toArray();
    return wallets;
  }
}

module.exports = Wallet;
