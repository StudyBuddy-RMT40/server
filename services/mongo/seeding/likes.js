const { MongoClient, ObjectId } = require("mongodb");
const { hashPassword } = require("../helpers/bcrypt");

const uri = "mongodb://0.0.0.0:27017/";
const client = new MongoClient(uri);
const dbName = "study_buddy";

const dataToSeed = [
  // project 1 student 1
  {
    projectId: new ObjectId("65381df59b16a27e018c9f9b"),
    userId: "6537cc89ac774a9de2544ef2",
  },
  {
    projectId: new ObjectId("65381df59b16a27e018c9f9b"),
    userId: "6537cc89ac774a9de2544ef2",
  },
  {
    projectId: new ObjectId("65381df59b16a27e018c9f9b"),
    userId: "6537cc89ac774a9de2544ef2",
  },
  // project 1 buddy 1
  {
    projectId: new ObjectId("65381df59b16a27e018c9f9b"),
    userId: "6537cc89ac774a9de2544ef3",
  },
  {
    projectId: new ObjectId("65381df59b16a27e018c9f9b"),
    userId: "6537cc89ac774a9de2544ef3",
  },
  // project 2 student 2
  {
    projectId: new ObjectId("65381df59b16a27e018c9f9c"),
    userId: "6537cf9c26c62d7670859bc3",
  },
  {
    projectId: new ObjectId("65381df59b16a27e018c9f9c"),
    userId: "6537cf9c26c62d7670859bc3",
  },
  {
    projectId: new ObjectId("65381df59b16a27e018c9f9c"),
    userId: "6537cf9c26c62d7670859bc3",
  },
  {
    projectId: new ObjectId("65381df59b16a27e018c9f9c"),
    userId: "6537cf9c26c62d7670859bc3",
  },
  // project 2 buddy 2
  {
    projectId: new ObjectId("65381df59b16a27e018c9f9c"),
    userId: "6537cf9c26c62d7670859bc4",
  },
  {
    projectId: new ObjectId("65381df59b16a27e018c9f9c"),
    userId: "6537cf9c26c62d7670859bc4",
  },
  {
    projectId: new ObjectId("65381df59b16a27e018c9f9c"),
    userId: "6537cf9c26c62d7670859bc4",
  },
  // project 3 student 3
  {
    projectId: new ObjectId("65381df59b16a27e018c9f9d"),
    userId: "6537cf9c26c62d7670859bc5",
  },
  {
    projectId: new ObjectId("65381df59b16a27e018c9f9d"),
    userId: "6537cf9c26c62d7670859bc5",
  },
  {
    projectId: new ObjectId("65381df59b16a27e018c9f9d"),
    userId: "6537cf9c26c62d7670859bc5",
  },
  {
    projectId: new ObjectId("65381df59b16a27e018c9f9d"),
    userId: "6537cf9c26c62d7670859bc5",
  },
  {
    projectId: new ObjectId("65381df59b16a27e018c9f9d"),
    userId: "6537cf9c26c62d7670859bc5",
  },
  // project 3 buddy 3
  {
    projectId: new ObjectId("65381df59b16a27e018c9f9d"),
    userId: "6537cf9c26c62d7670859bc6",
  },
  {
    projectId: new ObjectId("65381df59b16a27e018c9f9d"),
    userId: "6537cf9c26c62d7670859bc6",
  },
  // project 4 student 4
  {
    projectId: new ObjectId("65381df59b16a27e018c9f9e"),
    userId: "6537cf9c26c62d7670859bc3",
  },
  {
    projectId: new ObjectId("65381df59b16a27e018c9f9e"),
    userId: "6537cf9c26c62d7670859bc3",
  },
  // project 4 buddy 4
  {
    projectId: new ObjectId("65381df59b16a27e018c9f9e"),
    userId: "6537cf9c26c62d7670859bc4",
  },
  {
    projectId: new ObjectId("65381df59b16a27e018c9f9e"),
    userId: "6537cf9c26c62d7670859bc4",
  },
  {
    projectId: new ObjectId("65381df59b16a27e018c9f9e"),
    userId: "6537cf9c26c62d7670859bc4",
  },
  {
    projectId: new ObjectId("65381df59b16a27e018c9f9e"),
    userId: "6537cf9c26c62d7670859bc4",
  },
  // project 5 student 5
  {
    projectId: new ObjectId("65381df59b16a27e018c9f9f"),
    userId: "6537cc89ac774a9de2544ef2",
  },
  {
    projectId: new ObjectId("65381df59b16a27e018c9f9f"),
    userId: "6537cc89ac774a9de2544ef2",
  },
  {
    projectId: new ObjectId("65381df59b16a27e018c9f9f"),
    userId: "6537cc89ac774a9de2544ef2",
  },
  {
    projectId: new ObjectId("65381df59b16a27e018c9f9f"),
    userId: "6537cc89ac774a9de2544ef2",
  },
  // project 5 buddy 5
  {
    projectId: new ObjectId("65381df59b16a27e018c9f9f"),
    userId: "6537cc89ac774a9de2544ef3",
  },
  // project 6 student 6
  {
    projectId: new ObjectId("65381df59b16a27e018c9fa0"),
    userId: "6537cf9c26c62d7670859bc3",
  },
  {
    projectId: new ObjectId("65381df59b16a27e018c9fa0"),
    userId: "6537cf9c26c62d7670859bc3",
  },
  {
    projectId: new ObjectId("65381df59b16a27e018c9fa0"),
    userId: "6537cf9c26c62d7670859bc3",
  },
  // project 6 buddy 6
  {
    projectId: new ObjectId("65381df59b16a27e018c9fa0"),
    userId: "6537cf9c26c62d7670859bc4",
  },
  {
    projectId: new ObjectId("65381df59b16a27e018c9fa0"),
    userId: "6537cf9c26c62d7670859bc4",
  },
  // project 7 student 7
  {
    projectId: new ObjectId("65381df59b16a27e018c9fa1"),
    userId: "6537cc89ac774a9de2544ef2",
  },
  {
    projectId: new ObjectId("65381df59b16a27e018c9fa1"),
    userId: "6537cc89ac774a9de2544ef2",
  },
  // project 7 buddy 7
  {
    projectId: new ObjectId("65381df59b16a27e018c9fa1"),
    userId: "6537cc89ac774a9de2544ef3",
  },
  {
    projectId: new ObjectId("65381df59b16a27e018c9fa1"),
    userId: "6537cc89ac774a9de2544ef3",
  },
  {
    projectId: new ObjectId("65381df59b16a27e018c9fa1"),
    userId: "6537cc89ac774a9de2544ef3",
  },
  {
    projectId: new ObjectId("65381df59b16a27e018c9fa1"),
    userId: "6537cc89ac774a9de2544ef3",
  },
  // project 8 student 8
  {
    projectId: new ObjectId("65381df59b16a27e018c9fa2"),
    userId: "6537cf9c26c62d7670859bc3",
  },
  {
    projectId: new ObjectId("65381df59b16a27e018c9fa2"),
    userId: "6537cf9c26c62d7670859bc3",
  },
  {
    projectId: new ObjectId("65381df59b16a27e018c9fa2"),
    userId: "6537cf9c26c62d7670859bc3",
  },
  {
    projectId: new ObjectId("65381df59b16a27e018c9fa2"),
    userId: "6537cf9c26c62d7670859bc3",
  },
  // project 8 buddy 8
  {
    projectId: new ObjectId("65381df59b16a27e018c9fa2"),
    userId: "6537cc89ac774a9de2544ef3",
  },
  {
    projectId: new ObjectId("65381df59b16a27e018c9fa2"),
    userId: "6537cc89ac774a9de2544ef3",
  },
  // project 9 student 9
  {
    projectId: new ObjectId("65381df59b16a27e018c9fa3"),
    userId: "6537cc89ac774a9de2544ef2",
  },
  {
    projectId: new ObjectId("65381df59b16a27e018c9fa3"),
    userId: "6537cc89ac774a9de2544ef2",
  },
  {
    projectId: new ObjectId("65381df59b16a27e018c9fa3"),
    userId: "6537cc89ac774a9de2544ef2",
  },
  // project 9 buddy 9
  {
    projectId: new ObjectId("65381df59b16a27e018c9fa3"),
    userId: "6537cc89ac774a9de2544ef3",
  },
  // project 10 student 10
  {
    projectId: new ObjectId("65381df59b16a27e018c9fa4"),
    userId: "6537cf9c26c62d7670859bc3",
  },
  {
    projectId: new ObjectId("65381df59b16a27e018c9fa4"),
    userId: "6537cf9c26c62d7670859bc3",
  },
  {
    projectId: new ObjectId("65381df59b16a27e018c9fa4"),
    userId: "6537cf9c26c62d7670859bc3",
  },
  // project 10 buddy 10
  {
    projectId: new ObjectId("65381df59b16a27e018c9fa4"),
    userId: "6537cc89ac774a9de2544ef3",
  },
  {
    projectId: new ObjectId("65381df59b16a27e018c9fa4"),
    userId: "6537cc89ac774a9de2544ef3",
  },
  {
    projectId: new ObjectId("65381df59b16a27e018c9fa4"),
    userId: "6537cc89ac774a9de2544ef3",
  },
];

async function seedData() {
  const db = client.db(dbName);
  const collection = db.collection("likes");

  try {
    const result = await collection.insertMany(dataToSeed);
    console.log(`${result.insertedCount} documents inserted.`);
    await client.close();
  } catch (err) {
    console.error("Error inserting documents:", err);
  }
}

seedData();
