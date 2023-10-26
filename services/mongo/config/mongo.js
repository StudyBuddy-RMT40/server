const { MongoClient } = require("mongodb");

const uri = "mongodb://0.0.0.0:27017/";
const client = new MongoClient(uri);
const dbName = "study_buddy";
const testDbName = "study_buddy_test";

let db = {};
// let dbTest = {};

const connect = async (databaseName) => {
  await client.connect();
  db = client.db(databaseName || dbName);
  return db;
};

// config for test
// const connectTest = async () => {
//   try {
//     await client.connect();
//     db = client.db(testDbName);
//     return db;
//   } catch (err) {
//     console.log(err);
//   }
// };

// const connectTest = async (callback) => {
//   try {
//     await client.connect();
//     db = client.db(testDbName);
//     callback(); // Call the callback after successful connection
//   } catch (err) {
//     console.log(err);
//   }
// };

const getDb = () => {
  return db;
};
const getDbSession = () => {
  const session = client.startSession();
  return { db: client.db(dbName), session };
};

// const getDbTest = () => {
//   return dbTest;
// };

module.exports = {
  connect,
  // connectTest,
  getDb,
  client,
  // getDbTest,
  getDbSession,
  // db
};
