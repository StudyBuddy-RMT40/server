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


describe("root with endpoint / ", () => {
  it("should respon 200 and body message", async () => {
    const response = await request(app)
      .get("/")

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("message", expect.any(String));
  });
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

  it("Register with unique email 400", async () => {
    const response = await request(app).post("/register").send({
      username: "najmi",
      email: "najmi@mail.com",
      password: "12345",
      phoneNumber: "082368273623",
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
      .post("/projects")
      .send({
        name: "Halo",
        studentId: 1,
        teacherId: 1,
        startDate: "2023-10-1",
        endDate: "2023-10-10",
        status: "Submitted",
        description: "Halo ini untuk test description",
        likes: 10,
        CategoryId: 1,
        published: false,
        goals: 'completed testing',
        feedback: 'nice testing'
      })
      .set("access_token", access_token);

    tempId = response.body.id;
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("message", expect.any(String));
  });

  it("should respon 200 and body message", async () => {
    const response = await request(app)
      .get("/projects")
      .set("access_token", access_token);

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);

    expect(response.body[0]).toHaveProperty("_id", expect.any(String));
    expect(response.body[0]).toHaveProperty("name", expect.any(String));
    expect(response.body[0]).toHaveProperty("studentId", expect.any(Number));
    expect(response.body[0]).toHaveProperty("teacherId", expect.any(Number));
    expect(response.body[0]).toHaveProperty("startDate", expect.any(String));
    expect(response.body[0]).toHaveProperty("endDate", expect.any(String));
    expect(response.body[0]).toHaveProperty("status", expect.any(String));
    expect(response.body[0]).toHaveProperty("description", expect.any(String));
    expect(response.body[0]).toHaveProperty("likes", expect.any(Number));
    expect(response.body[0]).toHaveProperty("CategoryId", expect.any(Number));
    expect(response.body[0]).toHaveProperty("published", expect.any(Boolean));
    expect(response.body[0]).toHaveProperty("goals", expect.any(String));
    expect(response.body[0]).toHaveProperty("feedback", expect.any(String));
  });

  it("should respon 200 project get by id and body message", async () => {
    const response = await request(app)
      .get(`/projects/${tempId}`)
      .set("access_token", access_token);

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Object);

    expect(response.body).toHaveProperty("_id", expect.any(String));
    expect(response.body).toHaveProperty("name", expect.any(String));
    expect(response.body).toHaveProperty("studentId", expect.any(Number));
    expect(response.body).toHaveProperty("teacherId", expect.any(Number));
    expect(response.body).toHaveProperty("startDate", expect.any(String));
    expect(response.body).toHaveProperty("endDate", expect.any(String));
    expect(response.body).toHaveProperty("status", expect.any(String));
    expect(response.body).toHaveProperty("description", expect.any(String));
    expect(response.body).toHaveProperty("likes", expect.any(Number));
    expect(response.body).toHaveProperty("CategoryId", expect.any(Number));
    expect(response.body).toHaveProperty("published", expect.any(Boolean));
    expect(response.body).toHaveProperty("goals", expect.any(String));
    expect(response.body).toHaveProperty("feedback", expect.any(String));
  });

  it("should respon 404 project not found and body message", async () => {
    const response = await request(app)
      .get(`/projects/6532ac436072c9bb720e3bcb`)
      .set("access_token", access_token);

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("message", expect.any(String));
  });

  it("should respon 400 name invalid and body message", async () => {
    const response = await request(app)
      .post("/projects")
      .send({
        studentId: 1,
        teacherId: 1,
        startDate: "2023-10-1",
        endDate: "2023-10-10",
        status: "Submitted",
        description: "Halo ini untuk test description",
        likes: 10,
        CategoryId: 1,
        published: false,
        goals: 'completed testing',
        feedback: 'nice testing'
      })
      .set("access_token", access_token);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message", expect.any(String));
  });

  it("should respon 400 description invalid and body message", async () => {
    const response = await request(app)
      .post("/projects")
      .send({
        name: "Halo",
        studentId: 1,
        teacherId: 1,
        startDate: "2023-10-1",
        endDate: "2023-10-10",
        status: "Submitted",
        likes: 10,
        CategoryId: 1,
        published: false,
        goals: 'completed testing',
        feedback: 'nice testing'
      })
      .set("access_token", access_token);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message", expect.any(String));
  });

  it("should respon 400 category id invalid and body message", async () => {
    const response = await request(app)
      .post("/projects")
      .send({
        name: "Halo",
        studentId: 1,
        teacherId: 1,
        startDate: "2023-10-1",
        endDate: "2023-10-10",
        status: "Submitted",
        description: "Halo ini untuk test description",
        likes: 10,
        published: false,
        goals: 'completed testing',
        feedback: 'nice testing'
      })
      .set("access_token", access_token);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message", expect.any(String));
  });

  it("should respon 400 goals invalid and body message", async () => {
    const response = await request(app)
      .post("/projects")
      .send({
        name: "Halo",
        studentId: 1,
        teacherId: 1,
        startDate: "2023-10-1",
        endDate: "2023-10-10",
        status: "Submitted",
        description: "Halo ini untuk test description",
        likes: 10,
        CategoryId: 1,
        published: false,
        feedback: 'nice testing'
      })
      .set("access_token", access_token);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message", expect.any(String));
  });

  it("should respon 200 update project with name and body message", async () => {
    const response = await request(app)
      .patch(`/projects/${tempId}`)
      .send({
        name: "patch new name",
      })
      .set("access_token", access_token);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("message", expect.any(String));
  });

  it("should respon 200 update project with description and body message", async () => {
    const response = await request(app)
      .patch(`/projects/${tempId}`)
      .send({
        description: "patch new description",
      })
      .set("access_token", access_token);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("message", expect.any(String));
  });

  it("should respon 200 update project with status and body message", async () => {
    const response = await request(app)
      .patch(`/projects/${tempId}`)
      .send({
        status: "Submitted",
      })
      .set("access_token", access_token);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("message", expect.any(String));
  });

  it("should respon 200 update project with categoryId and body message", async () => {
    const response = await request(app)
      .patch(`/projects/${tempId}`)
      .send({
        CategoryId: 1,
      })
      .set("access_token", access_token);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("message", expect.any(String));
  });

  it("should respon 400 delete project not found and body message", async () => {
    const response = await request(app)
      .delete(`/projects/652ff4ea907670325fb67333asd`)
      .set("access_token", access_token);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message", expect.any(String));
  });

  it("should respon 200 delete project and body message", async () => {
    const response = await request(app)
      .delete(`/projects/${tempId}`)
      .set("access_token", access_token);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("message", expect.any(String));
  });

  it("should respon 404 delete project not found and body message", async () => {
    const response = await request(app)
      .delete(`/projects/${tempId}`)
      .set("access_token", access_token);

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("message", expect.any(String));
  });
});

describe("Reviews with endpoint /reviews", () => {
  let tempId = "";
  it("should respon 201 and body message", async () => {
    const responseProject = await request(app)
      .post("/projects")
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

    tempId = response.body.id;
    console.log(tempId)
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
    console.log(tempId, '<<<<')
    const response = await request(app)
      .put(`/reviews/${tempId}`)
      .send({
        comment: "update comment testing",
      })
      .set("access_token", access_token);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("message", expect.any(String));
  });

  it("should respon 400 update review id not found and body message", async () => {
    const response = await request(app)
      .put(`/reviews/${tempId}ads`)
      .send({
        comment: "update comment testing id not found",
      })
      .set("access_token", access_token);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message", expect.any(String));
  });

  it("should respon 400 update review comment < 1 and body message", async () => {
    const response = await request(app)
      .post(`/reviews/${tempId}`)
      .send({
        comment: "",
      })
      .set("access_token", access_token);

      console.log(response, '<<<<<')
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message", expect.any(String));
  });

  it("should respon 400 update review comment < 1 and body message", async () => {
    const response = await request(app)
      .put(`/reviews/${tempId}`)
      .send({
        comment: "",
      })
      .set("access_token", access_token);

      console.log(response, '<<<<<')
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

  it("should respon 404 delete review id not found and body message", async () => {
    const response = await request(app)
      .delete(`/reviews/${tempId}`)
      .set("access_token", access_token);

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("message", expect.any(String));

    await request(app)
      .delete(`/projects/${tempIdProject}`)
      .set("access_token", access_token);
  });
});

describe("Rating with endpoint /rating", () => {
  let tempId = "";
  it("should respon 201 and body message", async () => {
    const response = await request(app)
      .post("/ratings")
      .send({
        rating: 4,
      })
      .set("access_token", access_token);

    tempId = response.body.id;
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

  it("should respon 400 update rating and body message", async () => {
    const response = await request(app)
      .put(`/ratings/${tempId}asd`)
      .send({
        rating: 2,
      })
      .set("access_token", access_token);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message", expect.any(String));
  });
});

describe("Category with endpoint /categories", () => {
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

      console.log(response, '<<<< AAA')
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message", expect.any(String));
  });

  it("should respon 400 name unique and body message", async () => {
    const response = await request(app)
      .post("/categories")
      .send({ name: "testing category" })
      .set("access_token", access_token);

      console.log(response, '<<<< BBB')
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

describe("User with endpoint /users", () => {
  it("should respon 200 and body message", async () => {
    const response = await request(app)
      .patch("/users")
      .send({
        role: "student testing",
      })
      .set("access_token", access_token);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("message", expect.any(String));
  });

  it("should respon 200 and body message", async () => {
    const response = await request(app)
      .put("/users")
      .send({
        username: "Halo 1", 
        phoneNumber: "0999", 
        address: "mawar testing"
      })
      .set("access_token", access_token);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("message", expect.any(String));
  });
});

describe("Authentication with endpoint /users and /project", () => {
    it("should respon 403 and body message", async () => {
      const response = await request(app)
        .patch("/users")
        .send({
          role: "student testing invalid token",
        })
        .set("access_token", "");
  
      expect(response.status).toBe(403);
      expect(response.body).toHaveProperty("message", expect.any(String));
    });

    it("should respon 400 user not found and body message", async () => {
        const response = await request(app)
          .get("/users/6532c858dc90996ec3ae9e3")
          .set("access_token", access_token);
    
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty("message", expect.any(String));
    });

    // belum selesai
    it("should respon 403 user invalid token and body message", async () => {
        const response = await request(app)
          .get("/users/6532c858dc90106ec3zx9e3")
          .set("access_token", 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MzJjODU4ZGM5MDk5NmVjM3p4OWUzIiwiaWF0IjoxNjk3NzI4NDY1fQ.RyaTP53n_1OYr69sXwJLGBVLC19FeMD3UaBAdx09dX8');
    
          console.log(response.status, '<<<< halo')
        expect(response.status).toBe(403);
        expect(response.body).toHaveProperty("message", expect.any(String));
    });

});
