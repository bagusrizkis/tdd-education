const request = require("supertest");
const app = require("../app");
const bcrypt = require("bcryptjs");
const { sequelize } = require("../models");
const { queryInterface } = sequelize;
// require jwt

// const access_token = "";

beforeAll((done) => {
  // bersihin db
  // buat data
  // buat access_token
  queryInterface.bulkDelete("Users", null, {}).then(() => {
    // masukin user ke db untuk test get
    //   const salt = bcrypt.genSaltSync(10);
    //   const user = {
    //     email: "udinLogin@mail.com",
    //     password: bcrypt.hashSync("qwerty", salt),
    //     createdAt: new Date(),
    //     updatedAt: new Date(),
    //   };
    //   return queryInterface.bulkInsert("Users", [user]);
    done();
  });
  // .then(() => {
  // generate jwt
  //   const token = jwt.sign(
  //     {
  //       email: "udinLogin@mail.com",
  //     },
  //     "rahasia"
  //   );
  //   access_token = token;
  //   done();
  // });
});

afterAll((done) => {
  // bersihin db
  queryInterface.bulkDelete("Users", null, {}).then(() => {
    done();
  });
});
// beforeEach(() => {
//   console.log("beforeEach");
// });
// afterEach(() => {
//   console.log("afterEach");
// });

describe("POST /users/register", () => {
  it("Should create user and respone in JSON with access_token", function (done) {
    request(app)
      .post("/users/register")
      .set("Content-Type", "application/json")
      .send({ email: "udin@mail.com", password: "qwerty" })
      .then((response) => {
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty(
          "access_token",
          expect.any(String)
        );
        done();
      });
  });

  it("Should not create user and give response error if empty input", function (done) {
    request(app)
      .post("/users/register")
      .set("Content-Type", "application/json")
      .send({ email: "", password: "" })
      .then((response) => {
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty("error", expect.any(Object));
        done();
      });
  });
});

describe("POST /users/login", () => {
  it("User login success with access_token and id in JSON response", function (done) {
    request(app)
      .post("/users/login")
      .set("Content-Type", "application/json")
      .set("Content-Type", "application/json")
      .send({ email: "udin@mail.com", password: "qwerty" })
      .then((response) => {
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty(
          "access_token",
          expect.any(String)
        );
        done();
      });
  });

  it("Should not create user and give response error if empty input", function (done) {
    request(app)
      .post("/users/login")
      .set("Content-Type", "application/json")
      .send({ email: "", password: "" })
      .then((response) => {
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty("error", expect.any(Object));
        done();
      });
  });
});
