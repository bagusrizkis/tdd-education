const request = require("supertest");
const app = require("../app");
const { sequelize } = require("../models");
const { queryInterface } = sequelize;

// beforeEach(() => {
//   console.log("before Each");
// });

// afterEach(() => {
//   console.log("after Each");
// });

let access_token = "";

beforeAll((done) => {
  // console.log("before All");
  // bersihin database
  queryInterface.bulkDelete("Users", null, {}).then(() => done());

  // contoh endpoint lain
  // insert user baru pakai sequelize
  // buat token pakai jwt
  // pakai access token, assign valuenya ke var access_token
  // perlu data: seed
});

afterAll((done) => {
  // bersihin database
  queryInterface.bulkDelete("Users", null, {}).then(() => done());

  // contoh endpoint lain
  // hapus tadi yang dibuat
  // user
  // data dihapus
});

describe("POST /users/register", () => {
  // positive
  test("Success Created new user", (done) => {
    request(app)
      .post("/users/register")
      .send({
        email: "user@mail.com",
        password: "qweqwe",
      })
      // .set("access_token", access_token)
      .then((response) => {
        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty("success", true);
        done();
      });
  });

  describe("Failed", () => {
    test("Failed Create new user : empty email", (done) => {
      request(app)
        .post("/users/register")
        .send({
          email: "",
          password: "qweqwe",
        })
        .then((response) => {
          expect(response.statusCode).toBe(400);
          expect(response.body).toHaveProperty("success", false);
          done();
        });
    });
  });
});

describe("POST /users/login", () => {
  // positive
  test("Success Login", (done) => {
    request(app)
      .post("/users/login")
      .send({
        email: "user@mail.com",
        password: "qweqwe",
      })
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty("success", true);
        expect(response.body).toHaveProperty(
          "access_token",
          expect.any(String)
        );
        done();
      });
  });
});
