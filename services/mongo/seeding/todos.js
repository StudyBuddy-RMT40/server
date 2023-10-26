const { MongoClient, ObjectId } = require("mongodb");
const { hashPassword } = require("../helpers/bcrypt");

const uri = "mongodb://0.0.0.0:27017/";
const client = new MongoClient(uri);
const dbName = "study_buddy";

const dataToSeed = [
  {
    name: "belajar matematika 1",
    learningUrl: "https://www.hackerrank.com/",
    projectId: new ObjectId("65381df59b16a27e018c9f9b"),
    isFinished: false
  },
  {
    name: "belajar matematika 2",
    learningUrl: "https://www.hackerrank.com/",
    projectId: new ObjectId("65381df59b16a27e018c9f9b"),
    isFinished: false
  },
  {
    name: "belajar fisika 1",
    learningUrl: "https://www.hackerrank.com/",
    projectId: new ObjectId("65381df59b16a27e018c9f9c"),
    isFinished: false
  },
  {
    name: "belajar fisika 2",
    learningUrl: "https://www.hackerrank.com/",
    projectId: new ObjectId("65381df59b16a27e018c9f9c"),
    isFinished: false
  },
  {
    name: "belajar kimia 1",
    learningUrl: "https://www.hackerrank.com/",
    projectId: new ObjectId("65381df59b16a27e018c9f9d"),
    isFinished: false
  },
  {
    name: "belajar kimia 2",
    learningUrl: "https://www.hackerrank.com/",
    projectId: new ObjectId("65381df59b16a27e018c9f9d"),
    isFinished: false
  },
  {
    name: "belajar biologi 1",
    learningUrl: "https://www.hackerrank.com/",
    projectId: new ObjectId("65381df59b16a27e018c9f9e"),
    isFinished: false
  },
  {
    name: "belajar biologi 2",
    learningUrl: "https://www.hackerrank.com/",
    projectId: new ObjectId("65381df59b16a27e018c9f9e"),
    isFinished: false
  },
  {
    name: "belajar bahasa inggris 1",
    learningUrl: "https://www.hackerrank.com/",
    projectId: new ObjectId("65381df59b16a27e018c9f9f"),
    isFinished: false
  },
  {
    name: "belajar bahasa inggris 2",
    learningUrl: "https://www.hackerrank.com/",
    projectId: new ObjectId("65381df59b16a27e018c9f9f"),
    isFinished: false
  },
  {
    name: "belajar bahasa indonesia 1",
    learningUrl: "https://www.hackerrank.com/",
    projectId: new ObjectId("65381df59b16a27e018c9fa0"),
    isFinished: false
  },
  {
    name: "belajar bahasa indonesia 2",
    learningUrl: "https://www.hackerrank.com/",
    projectId: new ObjectId("65381df59b16a27e018c9fa0"),
    isFinished: false
  },
  {
    name: "belajar sejarah 1",
    learningUrl: "https://www.hackerrank.com/",
    projectId: new ObjectId("65381df59b16a27e018c9fa1"),
    isFinished: false
  },
  {
    name: "belajar sejarah 2",
    learningUrl: "https://www.hackerrank.com/",
    projectId: new ObjectId("65381df59b16a27e018c9fa1"),
    isFinished: false
  },
  {
    name: "belajar matematika 1",
    learningUrl: "https://www.hackerrank.com/",
    projectId: new ObjectId("65381df59b16a27e018c9fa2"),
    isFinished: false
  },
  {
    name: "belajar matematika 2",
    learningUrl: "https://www.hackerrank.com/",
    projectId: new ObjectId("65381df59b16a27e018c9fa2"),
    isFinished: false
  },
  {
    name: "belajar ekonomi 1",
    learningUrl: "https://www.hackerrank.com/",
    projectId: new ObjectId("65381df59b16a27e018c9fa3"),
    isFinished: false
  },
  {
    name: "belajar ekonomi 2",
    learningUrl: "https://www.hackerrank.com/",
    projectId: new ObjectId("65381df59b16a27e018c9fa3"),
    isFinished: false
  },
  {
    name: "belajar ilmu komputer 1",
    learningUrl: "https://www.hackerrank.com/",
    projectId: new ObjectId("65381df59b16a27e018c9fa4"),
    isFinished: false
  },
  {
    name: "belajar ilmu komputer 2",
    learningUrl: "https://www.hackerrank.com/",
    projectId: new ObjectId("65381df59b16a27e018c9fa4"),
    isFinished: false
  },
];

async function seedData() {
  const db = client.db(dbName);
  const collection = db.collection("todolists");

  try {
    const result = await collection.insertMany(dataToSeed);
    console.log(`${result.insertedCount} documents inserted.`);
    await client.close();
  } catch (err) {
    console.error("Error inserting documents:", err);
  }
}

seedData();
