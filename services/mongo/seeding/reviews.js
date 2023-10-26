const { MongoClient, ObjectId } = require("mongodb");
const { hashPassword } = require("../helpers/bcrypt");

const uri = "mongodb://0.0.0.0:27017/";
const client = new MongoClient(uri);
const dbName = "study_buddy";

const dataToSeed = [
  // s1 p1
  {
    comment: "keren student project 1",
    userId: new ObjectId("6537cc89ac774a9de2544ef2"),
    projectId: new ObjectId("65381df59b16a27e018c9f9b"),
  },
  // b1 p1
  {
    comment: "keren buddy project 1",
    userId: new ObjectId("6537cc89ac774a9de2544ef3"),
    projectId: new ObjectId("65381df59b16a27e018c9f9b"),
  },
  // s2 p2
  {
    comment: "keren student project 2",
    userId: new ObjectId("6537cf9c26c62d7670859bc3"),
    projectId: new ObjectId("65381df59b16a27e018c9f9c"),
  },
  // b2 p2
  {
    comment: "keren buddy project 2",
    userId: new ObjectId("6537cf9c26c62d7670859bc4"),
    projectId: new ObjectId("65381df59b16a27e018c9f9c"),
  },

  // s3 p3
  {
    comment: "keren student project 3",
    userId: new ObjectId("6537cf9c26c62d7670859bc5"),
    projectId: new ObjectId("65381df59b16a27e018c9f9d"),
  },
  // b3 p3
  {
    comment: "keren buddy project 3",
    userId: new ObjectId("6537cf9c26c62d7670859bc6"),
    projectId: new ObjectId("65381df59b16a27e018c9f9d"),
  },

  // s4 p4
  {
    comment: "keren student project 4",
    userId: new ObjectId("6537cf9c26c62d7670859bc3"),
    projectId: new ObjectId("65381df59b16a27e018c9f9e"),
  },
  // b4 p4
  {
    comment: "keren buddy project 4",
    userId: new ObjectId("6537cf9c26c62d7670859bc4"),
    projectId: new ObjectId("65381df59b16a27e018c9f9e"),
  },

  // s5 p5
  {
    comment: "keren student project 5",
    userId: new ObjectId("6537cc89ac774a9de2544ef2"),
    projectId: new ObjectId("65381df59b16a27e018c9f9f"),
  },
  // b5 p5
  {
    comment: "keren buddy project 5",
    userId: new ObjectId("6537cc89ac774a9de2544ef3"),
    projectId: new ObjectId("65381df59b16a27e018c9f9f"),
  },

   // s6 p6
   {
    comment: "keren student project 6",
    userId: new ObjectId("6537cf9c26c62d7670859bc3"),
    projectId: new ObjectId("65381df59b16a27e018c9fa0"),
  },
  // b6 p6
  {
    comment: "keren buddy project 6",
    userId: new ObjectId("6537cf9c26c62d7670859bc4"),
    projectId: new ObjectId("65381df59b16a27e018c9fa0"),
  },

  // s7 p7
  {
    comment: "keren student project 7",
    userId: new ObjectId("6537cc89ac774a9de2544ef2"),
    projectId: new ObjectId("65381df59b16a27e018c9fa1"),
  },
  // b7 p7
  {
    comment: "keren buddy project 7",
    userId: new ObjectId("6537cc89ac774a9de2544ef3"),
    projectId: new ObjectId("65381df59b16a27e018c9fa1"),
  },

   // s8 p8
   {
    comment: "keren student project 8",
    userId: new ObjectId("6537cf9c26c62d7670859bc3"),
    projectId: new ObjectId("65381df59b16a27e018c9fa2"),
  },
  // b8 p8
  {
    comment: "keren buddy project 8",
    userId: new ObjectId("6537cc89ac774a9de2544ef3"),
    projectId: new ObjectId("65381df59b16a27e018c9fa2"),
  },

  // s9 p9
  {
    comment: "keren student project 9",
    userId: new ObjectId("6537cc89ac774a9de2544ef2"),
    projectId: new ObjectId("65381df59b16a27e018c9fa3"),
  },
  // b9 p9
  {
    comment: "keren buddy project 9",
    userId: new ObjectId("6537cc89ac774a9de2544ef3"),
    projectId: new ObjectId("65381df59b16a27e018c9fa3"),
  },

   // s10 p10
   {
    comment: "keren student project 10",
    userId: new ObjectId("6537cf9c26c62d7670859bc3"),
    projectId: new ObjectId("65381df59b16a27e018c9fa4"),
  },
  // b10 p10
  {
    comment: "keren buddy project 10",
    userId: new ObjectId("6537cc89ac774a9de2544ef3"),
    projectId: new ObjectId("65381df59b16a27e018c9fa4"),
  },
];

async function seedData() {
  const db = client.db(dbName);
  const collection = db.collection("reviews");

  try {
    const result = await collection.insertMany(dataToSeed);
    console.log(`${result.insertedCount} documents inserted.`);
    await client.close();
  } catch (err) {
    console.error("Error inserting documents:", err);
  }
}

seedData();
