const {
  describe,
  expect,
  test,
  it,
  beforeAll,
  afterAll,
  beforeEach,
} = require("@jest/globals");
const request = require("supertest");
const app = require("../app");
const User = require("../models/user");
const { connectTest, client, getDbTest } = require("../config/mongo");
const { signToken } = require("../helpers/jwt");

let user;
let access_token;
beforeEach(async () => {
  try {
    await connectTest();
    user = await User.findBy({ email: "najmi@mail.com" });
    access_token = signToken({ id: user._id });
  } catch (error) {
    console.log(error);
  }
});

afterAll(async () => {
  try {
    // const a = await getDbTest().deleteMany({})
    // console.log(a, "<<<<<<<<<")
    await client.close();
  } catch (error) {
    console.log(error);
  }
});

describe("Register user with endpoint /register", () => {
  it("Register success", async () => {
    const response = await request(app).post("/register").send({
      username: "najmi",
      email: "najmi@mail.com",
      password: "12345",
      phoneNumber: "082368273623",
      address: "Punteun",
    });
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("message", expect.any(String));
  });

  it("Register with empty username", async () => {
    const response = await request(app).post("/register").send({
      email: "abo@mail.com",
      password: "12345",
      phoneNumber: "083273268376",
      address: "Punteun",
    });
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message", expect.any(String));
  });

  it("Register with empty email", async () => {
    const response = await request(app).post("/register").send({
      username: "najmi",
      password: "12345",
      phoneNumber: "083273268376",
      address: "Punteun",
    });
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message", expect.any(String));
  });

  it("Register with empty password", async () => {
    const response = await request(app).post("/register").send({
      username: "najmi",
      email: "abo@mail.com",
      phoneNumber: "083273268376",
      address: "Punteun",
    });
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message", expect.any(String));
  });
});

describe("Login user with endpoint /login", () => {
  it("Login success", async () => {
    const response = await request(app).post("/login").send({
      email: "najmi@mail.com",
      password: "12345",
    });
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("access_token", expect.any(String));
  });

  it("Login with empty username", async () => {
    const response = await request(app).post("/login").send({
      password: "12345",
    });
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message", expect.any(String));
  });

  it("Login with empty password", async () => {
    const response = await request(app).post("/login").send({
      email: "najmi@mail.com",
    });
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message", expect.any(String));
  });

  it("Login with email is invalid", async () => {
    const response = await request(app).post("/login").send({
      email: "halo@mail.com",
      password: "12345",
    });
    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message", expect.any(String));
  });

  it("Login with password is invalid", async () => {
    const response = await request(app).post("/login").send({
      email: "najmi@mail.com",
      password: "123",
    });
    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message", expect.any(String));
  });
});

describe("Project with endpoint /project", () => {
  let tempId = "";
  it("should respon 201 and body message", async () => {
    const response = await request(app)
      .post("/project")
      .send({
        name: "Halo",
        studentId: 1,
        teacherId: 1,
        startDate: "2023-10-1",
        endDate: "2023-10-10",
        isFinished: true,
        description: "Halo ini untuk test description",
        likes: 10,
        CategoryId: 1,
      })
      .set("access_token", access_token);

      tempId = response.body.id;
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("message", expect.any(String));
  });

  it("should respon 200 and body message", async () => {
    const response = await request(app)
      .get("/project")
      .set("access_token", access_token);

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);

    expect(response.body[0]).toHaveProperty("_id", expect.any(String));
    expect(response.body[0]).toHaveProperty("name", expect.any(String));
    expect(response.body[0]).toHaveProperty("studentId", expect.any(Number));
    expect(response.body[0]).toHaveProperty("teacherId", expect.any(Number));
    expect(response.body[0]).toHaveProperty("startDate", expect.any(String));
    expect(response.body[0]).toHaveProperty("endDate", expect.any(String));
    expect(response.body[0]).toHaveProperty("isFinished", expect.any(Boolean));
    expect(response.body[0]).toHaveProperty("description", expect.any(String));
    expect(response.body[0]).toHaveProperty("likes", expect.any(Number));
    expect(response.body[0]).toHaveProperty("CategoryId", expect.any(Number));
  });

  it("should respon 200 project get by id and body message", async () => {
    const response = await request(app)
      .get(`/project/${tempId}`)
      .set("access_token", access_token);

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Object);

    expect(response.body).toHaveProperty("_id", expect.any(String));
    expect(response.body).toHaveProperty("name", expect.any(String));
    expect(response.body).toHaveProperty("studentId", expect.any(Number));
    expect(response.body).toHaveProperty("teacherId", expect.any(Number));
    expect(response.body).toHaveProperty("startDate", expect.any(String));
    expect(response.body).toHaveProperty("endDate", expect.any(String));
    expect(response.body).toHaveProperty("isFinished", expect.any(Boolean));
    expect(response.body).toHaveProperty("description", expect.any(String));
    expect(response.body).toHaveProperty("likes", expect.any(Number));
    expect(response.body).toHaveProperty("CategoryId", expect.any(Number));
  });

  it("should respon 400 name invalid and body message", async () => {
    const response = await request(app)
      .post("/project")
      .send({
        studentId: 1,
        teacherId: 1,
        startDate: "2023-10-1",
        endDate: "2023-10-10",
        isFinished: true,
        description: "Halo ini untuk test description",
        likes: 10,
        CategoryId: 1,
      })
      .set("access_token", access_token);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message", expect.any(String));
  });

  it("should respon 400 description invalid and body message", async () => {
    const response = await request(app)
      .post("/project")
      .send({
        name: "Halo",
        studentId: 1,
        teacherId: 1,
        startDate: "2023-10-1",
        endDate: "2023-10-10",
        isFinished: true,
        likes: 10,
        CategoryId: 1,
      })
      .set("access_token", access_token);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message", expect.any(String));
  });

  it("should respon 400 category id invalid and body message", async () => {
    const response = await request(app)
      .post("/project")
      .send({
        name: "Halo",
        studentId: 1,
        teacherId: 1,
        startDate: "2023-10-1",
        endDate: "2023-10-10",
        isFinished: true,
        description: "Halo ini untuk test description",
        likes: 10,
      })
      .set("access_token", access_token);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message", expect.any(String));
  });

  it("should respon 200 update project with name and body message", async () => {
    const response = await request(app)
      .patch(`/project/${tempId}`)
      .send({
        name: "patch new name",
      })
      .set("access_token", access_token);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("message", expect.any(String));
  });

  it("should respon 200 update project with description and body message", async () => {
    const response = await request(app)
      .patch(`/project/${tempId}`)
      .send({
        description: "patch new description",
      })
      .set("access_token", access_token);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("message", expect.any(String));
  });

  it("should respon 200 update project with isFinished and body message", async () => {
    const response = await request(app)
      .patch(`/project/${tempId}`)
      .send({
        isFinished: true,
      })
      .set("access_token", access_token);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("message", expect.any(String));
  });

  it("should respon 200 update project with categoryId and body message", async () => {
    const response = await request(app)
      .patch(`/project/${tempId}`)
      .send({
        CategoryId: 1,
      })
      .set("access_token", access_token);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("message", expect.any(String));
  });

  it("should respon 200 delete project and body message", async () => {
    const response = await request(app)
      .delete(`/project/${tempId}`)
      .set("access_token", access_token);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("message", expect.any(String));
  });

  it("should respon 404 delete project not found and body message", async () => {
    const response = await request(app)
      .delete(`/project/652ff4ea907670325fb67333asd`)
      .set("access_token", access_token);

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("message", expect.any(String));
  });

  it("should respon 404 delete project not found and body message", async () => {
    const response = await request(app)
      .delete(`/project/${tempId}`)
      .set("access_token", access_token);

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("message", expect.any(String));
  });
});

describe.only("Reviews with endpoint /reviews", () => {
    let tempId = "";
    it("should respon 201 and body message", async () => {
        const responseProject = await request(app)
            .post("/project")
            .send({
                name: "Halo",
                studentId: 1,
                teacherId: 1,
                startDate: "2023-10-1",
                endDate: "2023-10-10",
                isFinished: true,
                description: "Halo ini untuk test description",
                likes: 10,
                CategoryId: 1,
            })
            .set("access_token", access_token);

        tempIdProject = await responseProject.body.id;
        
      const response = await request(app)
        .post(`/reviews/${tempIdProject}`)
        .send({
          comment: "Comment user student/buddy",
        })
        .set("access_token", access_token);
    
        console.log(response, "<<<< RESPON")
        tempId = response.body.id
      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty("message", expect.any(String));
    });
    
    it("should respon 200 and body message", async () => {
      const response = await request(app)
        .get("/reviews")
        .set("access_token", access_token);
    
      expect(response.status).toBe(200);
      expect(response.body).toBeInstanceOf(Array);
    
      expect(response.body[0]).toHaveProperty("_id", expect.any(String));
      expect(response.body[0]).toHaveProperty("comment", expect.any(String));
      expect(response.body[0]).toHaveProperty("UserId", expect.any(String));
      expect(response.body[0]).toHaveProperty("ProjectId", expect.any(String));
    });
    
    it("should respon 200 update review and body message", async () => {
      const response = await request(app)
        .put("/reviews/653227fbc9b4a91f610a8982")
        .send({
          comment: "update comment testing",
        })
        .set("access_token", access_token);
    
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("message", expect.any(String));
    });
    
    it("should respon 400 update review id not found and body message", async () => {
      const response = await request(app)
        .put("/reviews/6531c05a68ce77305d186be")
        .send({
          comment: "update comment testing id not found",
        })
        .set("access_token", access_token);
    
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("message", expect.any(String));
    });
    
    it("should respon 400 update review comment < 1 and body message", async () => {
      const response = await request(app)
        .put("/reviews/652ff4ea907670325fb67333")
        .send({
          comment: "",
        })
        .set("access_token", access_token);
    
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("message", expect.any(String));
    });

    it("should respon 200 delete review and body message", async () => {
        const response = await request(app)
          .delete(`/reviews/${tempId}`)
          .set("access_token", access_token);
      
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("message", expect.any(String));
      });
      
    it("should respon 400 delete review id not found and body message", async () => {
    const response = await request(app)
        .delete("/reviews/6532351e63ad3d0a9b028efa1")
        .set("access_token", access_token);
    
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message", expect.any(String));

    await request(app)
      .delete(`/project/${tempIdProject}`)
      .set("access_token", access_token);
    });
});

describe("Rating with endpoint /rating", () => {
    let tempId = ""
  it("should respon 201 and body message", async () => {
    const response = await request(app)
      .post("/ratings")
      .send({
        rating: 4,
      })
      .set("access_token", access_token);

      tempId = response.body.id
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("message", expect.any(String));
  });

  it("should respon 200 and body message", async () => {
    const response = await request(app)
      .get("/ratings")
      .set("access_token", access_token);

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);

    expect(response.body[0]).toHaveProperty("_id", expect.any(String));
    expect(response.body[0]).toHaveProperty("UserId", expect.any(String));
    expect(response.body[0]).toHaveProperty("rating", expect.any(Number));
  });

  it("should respon 200 update rating and body message", async () => {
    const response = await request(app)
      .put(`/ratings/${tempId}`)
      .send({
        rating: 2,
      })
      .set("access_token", access_token);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("message", expect.any(String));
  });

//   it("should respon 400 update rating and body message", async () => {
//     const response = await request(app)
//       .put(`/ratings/${tempId}asd`)
//       .send({
//         rating: 2,
//       })
//       .set("access_token", access_token);

//     expect(response.status).toBe(400);
//     expect(response.body).toHaveProperty("message", expect.any(String));
//   });
});

describe("Project with endpoint /categories", () => {
  let tempId = "";
  it("should respon 201 and body message", async () => {
    const response = await request(app)
      .post("/categories")
      .send({ name: "testing category" })
      .set("access_token", access_token);

    tempId = response.body.id;
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("message", expect.any(String));
    expect(response.body).toHaveProperty("id", expect.any(String));
  });

  it("should respon 400 name invalid and body message", async () => {
    const response = await request(app)
      .post("/categories")
      .send({ name: "" })
      .set("access_token", access_token);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message", expect.any(String));
  });

  it("should respon 400 name unique and body message", async () => {
    const response = await request(app)
      .post("/categories")
      .send({ name: "testing category" })
      .set("access_token", access_token);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message", expect.any(String));
  });

  it("should respon 200 and body message", async () => {
    const response = await request(app)
      .get("/categories")
      .set("access_token", access_token);
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);

    console.log(response.body);
    expect(response.body[0]).toHaveProperty("_id", expect.any(String));
    expect(response.body[0]).toHaveProperty("name", expect.any(String));
  });

  it("should respon 200 delete category and body message", async () => {
    const response = await request(app)
      .delete(`/categories/${tempId}`)
      .set("access_token", access_token);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("message", expect.any(String));
  });

  it("should respon 404 delete category not found and body message", async () => {
    const invalidId = "invalidObjectId12345";
    const response = await request(app)
      .delete(`/categories/${invalidId}`)
      .set("access_token", access_token);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message", expect.any(String));
  });

  it("should respon 404 delete category not found and body message", async () => {
    const response = await request(app)
      .delete(`/categories/${tempId}`)
      .set("access_token", access_token);

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("message", expect.any(String));
  });
});
