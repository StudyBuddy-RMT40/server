const { MongoClient } = require("mongodb");
const { hashPassword } = require("../helpers/bcrypt");

const uri = "mongodb://0.0.0.0:27017/";
const client = new MongoClient(uri);
const dbName = "study_buddy";

const dataToSeed = [
  {
    username: "budi",
    email: "budi@mail.com",
    password: "12345",
    role: "student",
    phoneNumber: "088812341234",
    address: "Jawa Barat",
  },
  {
    username: "joni",
    email: "joni@mail.com",
    password: "12345",
    role: "buddy",
    phoneNumber: "088845674567",
    address: "Aceh",
  },
];

async function seedData() {
  const db = client.db(dbName);
  const collection = db.collection("users");

  try {

    dataToSeed.map(el => {
      el.password = hashPassword(el.password)
      return el
    })

    const result = await collection.insertMany(dataToSeed);
    console.log(`${result.insertedCount} documents inserted.`);
    await client.close();
  } catch (err) {
    console.error("Error inserting documents:", err);
  }
}

seedData();
