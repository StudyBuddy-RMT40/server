const { MongoClient, ObjectId } = require("mongodb");
const { hashPassword } = require("../helpers/bcrypt");

const uri = "mongodb://0.0.0.0:27017/";
const client = new MongoClient(uri);
const dbName = "study_buddy";

const dataToSeed = [
  {
    name: "project 1",
    studentId: new ObjectId("6537cc89ac774a9de2544ef2"),
    teacherId: new ObjectId("6537cc89ac774a9de2544ef3"),
    startDate: "2023-10-24",
    endDate: "2023-10-25",
    status: "submitted",
    description: "ini adalah project 1",
    categoryId: new ObjectId("65373a0854dbe6c5e38c19bb"),
    published: false,
    goals: "menyelesaikan matematika",
    feedback: "matematika cukup menyenangkan"
  },
  {
    name: "project 2",
    studentId: new ObjectId("6537cf9c26c62d7670859bc3"),
    teacherId: new ObjectId("6537cf9c26c62d7670859bc4"),
    startDate: "2023-10-24",
    endDate: "2023-10-27",
    status: "submitted",
    description: "ini adalah project 2",
    categoryId: new ObjectId("65373a0854dbe6c5e38c19bc"),
    published: false,
    goals: "menyelesaikan fisika",
    feedback: "fisika cukup menyenangkan"
  },
  {
    name: "project 3",
    studentId: new ObjectId("6537cf9c26c62d7670859bc5"),
    teacherId: new ObjectId("6537cf9c26c62d7670859bc6"),
    startDate: "2023-10-24",
    endDate: "2023-10-26",
    status: "submitted",
    description: "ini adalah project 3",
    categoryId: new ObjectId("65373a0854dbe6c5e38c19bd"),
    published: false,
    goals: "menyelesaikan kimia",
    feedback: "kimia cukup menyenangkan"
  },
  {
    name: "project 4",
    studentId: new ObjectId("6537cf9c26c62d7670859bc3"),
    teacherId: new ObjectId("6537cf9c26c62d7670859bc4"),
    startDate: "2023-10-24",
    endDate: "2023-10-28",
    status: "submitted",
    description: "ini adalah project 4",
    categoryId: new ObjectId("65373a0854dbe6c5e38c19be"),
    published: false,
    goals: "menyelesaikan biologi",
    feedback: "biologi cukup menyenangkan"
  },
  {
    name: "project 5",
    studentId: new ObjectId("6537cc89ac774a9de2544ef2"),
    teacherId: new ObjectId("6537cc89ac774a9de2544ef3"),
    startDate: "2023-10-24",
    endDate: "2023-10-26",
    status: "submitted",
    description: "ini adalah project 1",
    categoryId: new ObjectId("65373a0854dbe6c5e38c19bf"),
    published: false,
    goals: "menyelesaikan bahasa inggris",
    feedback: "bahasa inggris cukup menyenangkan"
  },
  {
    name: "project 6",
    studentId: new ObjectId("6537cf9c26c62d7670859bc3"),
    teacherId: new ObjectId("6537cf9c26c62d7670859bc4"),
    startDate: "2023-10-24",
    endDate: "2023-10-28",
    status: "submitted",
    description: "ini adalah project 6",
    categoryId: new ObjectId("65373a0854dbe6c5e38c19c0"),
    published: false,
    goals: "menyelesaikan bahasa indonesia",
    feedback: "bahasa indonesia cukup menyenangkan"
  },
  {
    name: "project 7",
    studentId: new ObjectId("6537cc89ac774a9de2544ef2"),
    teacherId: new ObjectId("6537cc89ac774a9de2544ef3"),
    startDate: "2023-10-24",
    endDate: "2023-10-25",
    status: "submitted",
    description: "ini adalah project 1",
    categoryId: new ObjectId("65373a0854dbe6c5e38c19c1"),
    published: false,
    goals: "menyelesaikan sejarah",
    feedback: "sejarah cukup menyenangkan"
  },
  {
    name: "project 8",
    studentId: new ObjectId("6537cf9c26c62d7670859bc3"),
    teacherId: new ObjectId("6537cc89ac774a9de2544ef3"),
    startDate: "2023-10-24",
    endDate: "2023-10-25",
    status: "submitted",
    description: "ini adalah project 8",
    categoryId: new ObjectId("65373a0854dbe6c5e38c19bb"),
    published: false,
    goals: "menyelesaikan matematika",
    feedback: "cukup menyenangkan"
  },
  {
    name: "project 9",
    studentId: new ObjectId("6537cc89ac774a9de2544ef2"),
    teacherId: new ObjectId("6537cc89ac774a9de2544ef3"),
    startDate: "2023-10-24",
    endDate: "2023-10-27",
    status: "submitted",
    description: "ini adalah project 9",
    categoryId: new ObjectId("65373a0854dbe6c5e38c19c2"),
    published: false,
    goals: "menyelesaikan ekonomi",
    feedback: "ekonomi cukup menyenangkan"
  },
  {
    name: "project 10",
    studentId: new ObjectId("6537cf9c26c62d7670859bc3"),
    teacherId: new ObjectId("6537cc89ac774a9de2544ef3"),
    startDate: "2023-10-24",
    endDate: "2023-10-25",
    status: "submitted",
    description: "ini adalah project 10",
    categoryId: new ObjectId("65373a0854dbe6c5e38c19c4"),
    published: false,
    goals: "menyelesaikan ilmu komputer",
    feedback: "ilmu komputer cukup menyenangkan"
  },
];

async function seedData() {
  const db = client.db(dbName);
  const collection = db.collection("projects");

  try {
    const result = await collection.insertMany(dataToSeed);
    console.log(`${result.insertedCount} documents inserted.`);
    await client.close();
  } catch (err) {
    console.error("Error inserting documents:", err);
  }
}

seedData();
