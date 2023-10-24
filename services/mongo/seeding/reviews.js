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
    projectId: new ObjectId("6537d3b50c9e95026b64168b")
  },
    // b1 p1
  {
    comment: "keren buddy project 1",
    userId: new ObjectId("6537cc89ac774a9de2544ef3"),
    projectId: new ObjectId("6537d3b50c9e95026b64168b")
  },
    // s2 p2
    {
        comment: "keren student project 2",
        userId: new ObjectId("6537cf9c26c62d7670859bc3"),
        projectId: new ObjectId("6537d3b50c9e95026b64168c")
      },
        // b2 p2
      {
        comment: "keren buddy project 2",
        userId: new ObjectId("6537cf9c26c62d7670859bc4"),
        projectId: new ObjectId("6537d3b50c9e95026b64168c")
      },

      // s3 p3
    {
        comment: "keren student project 3",
        userId: new ObjectId("6537cf9c26c62d7670859bc5"),
        projectId: new ObjectId("6537d3b50c9e95026b64168d")
      },
        // b3 p3
      {
        comment: "keren buddy project 3",
        userId: new ObjectId("6537cf9c26c62d7670859bc6"),
        projectId: new ObjectId("6537d3b50c9e95026b64168d")
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
