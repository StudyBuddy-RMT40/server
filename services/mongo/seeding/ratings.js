const { MongoClient, ObjectId } = require("mongodb");
const { hashPassword } = require("../helpers/bcrypt");

const uri = "mongodb://0.0.0.0:27017/";
const client = new MongoClient(uri);
const dbName = "study_buddy";

const dataToSeed = [
  // {
  //   studentId: new ObjectId("6537cc89ac774a9de2544ef2"),
  //   projectId: new ObjectId("65381df59b16a27e018c9f9b"),
  //   rating: 3.7
  // },
  // {
  //   studentId: new ObjectId("6537cf9c26c62d7670859bc3"),
  //   projectId: new ObjectId("65381df59b16a27e018c9f9c"),
  //   rating: 4.7
  // },
  // {
  //   studentId: new ObjectId("6537cf9c26c62d7670859bc5"),
  //   projectId: new ObjectId("65381df59b16a27e018c9f9d"),
  //   rating: 4.4
  // },
  // {
  //   studentId: new ObjectId("6537cf9c26c62d7670859bc3"),
  //   projectId: new ObjectId("65381df59b16a27e018c9f9e"),
  //   rating: 3.2
  // },
  // {
  //   studentId: new ObjectId("6537cc89ac774a9de2544ef2"),
  //   projectId: new ObjectId("65381df59b16a27e018c9f9f"),
  //   rating: 4.1
  // },
  // {
  //   studentId: new ObjectId("6537cf9c26c62d7670859bc3"),
  //   projectId: new ObjectId("65381df59b16a27e018c9fa0"),
  //   rating: 3.4
  // },
  // {
  //   studentId: new ObjectId("6537cc89ac774a9de2544ef2"),
  //   projectId: new ObjectId("65381df59b16a27e018c9fa1"),
  //   rating: 4.1
  // },
  // {
  //   studentId: new ObjectId("6537cf9c26c62d7670859bc3"),
  //   projectId: new ObjectId("65381df59b16a27e018c9fa2"),
  //   rating: 4.5
  // },
  // {
  //   studentId: new ObjectId("6537cc89ac774a9de2544ef2"),
  //   projectId: new ObjectId("65381df59b16a27e018c9fa3"),
  //   rating: 3.4
  // },
  // {
  //   studentId: new ObjectId("6537cf9c26c62d7670859bc3"),
  //   projectId: new ObjectId("65381df59b16a27e018c9fa4"),
  //   rating: 3.6
  // },

  // buddy

  {
    teacherId: new ObjectId("6537cc89ac774a9de2544ef3"),
    projectId: new ObjectId("65381df59b16a27e018c9f9b"),
    rating: 3.7
  },
  {
    teacherId: new ObjectId("6537cf9c26c62d7670859bc4"),
    projectId: new ObjectId("65381df59b16a27e018c9f9c"),
    rating: 4.7
  },
  {
    teacherId: new ObjectId("6537cf9c26c62d7670859bc5"),
    projectId: new ObjectId("65381df59b16a27e018c9f9d"),
    rating: 4.4
  },
  {
    teacherId: new ObjectId("6537cf9c26c62d7670859bc3"),
    projectId: new ObjectId("65381df59b16a27e018c9f9e"),
    rating: 3.2
  },
  {
    teacherId: new ObjectId("6537cc89ac774a9de2544ef3"),
    projectId: new ObjectId("65381df59b16a27e018c9f9f"),
    rating: 4.1
  },
  {
    teacherId: new ObjectId("6537cf9c26c62d7670859bc4"),
    projectId: new ObjectId("65381df59b16a27e018c9fa0"),
    rating: 3.4
  },
  {
    teacherId: new ObjectId("6537cc89ac774a9de2544ef3"),
    projectId: new ObjectId("65381df59b16a27e018c9fa1"),
    rating: 4.1
  },
  {
    teacherId: new ObjectId("6537cc89ac774a9de2544ef3"),
    projectId: new ObjectId("65381df59b16a27e018c9fa2"),
    rating: 4.5
  },
  {
    teacherId: new ObjectId("6537cc89ac774a9de2544ef3"),
    projectId: new ObjectId("65381df59b16a27e018c9fa3"),
    rating: 3.4
  },
  {
    teacherId: new ObjectId("6537cc89ac774a9de2544ef3"),
    projectId: new ObjectId("65381df59b16a27e018c9fa4"),
    rating: 3.6
  },
];

async function seedData() {
  const db = client.db(dbName);
  const collection = db.collection("ratings");

  try {
    const result = await collection.insertMany(dataToSeed);
    console.log(`${result.insertedCount} documents inserted.`);
    await client.close();
  } catch (err) {
    console.error("Error inserting documents:", err);
  }
}

seedData();
