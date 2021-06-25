const { User } = require("../models"),
  jwt = require("jsonwebtoken"),
  bcrypt = require("bcryptjs");

class Controller {
  static registerUser(req, res, next) {
    User.create({
      email: req.body.email,
      password: req.body.password,
    })
      .then((data) => {
        const token = jwt.sign(
          {
            id: data.id,
            email: data.email,
          },
          "rahasia"
        );
        res.status(201).json({
          access_token: token,
        });
      })
      .catch((err) => {
        next(err);
      });
  }

  static loginUser(req, res, next) {
    if (req.body.email == "" || req.body.password == "") {
      next({
        name: "notFound",
        error: {
          message: "not found",
        },
      });
    }
    User.findOne({
      where: { email: req.body.email },
    })
      .then((user) => {
        if (!user) {
          throw {
            name: "LoginError",
            message: `User with email: ${req.body.email} not found`,
          };
        }
        const checkPw = bcrypt.compareSync(req.body.password, user.password);
        if (!checkPw) {
          throw {
            name: "LoginError",
            message: `password for email: ${req.body.email} does not match`,
          };
        }
        const token = jwt.sign(
          {
            id: user.id,
            email: user.email,
          },
          "rahasia"
        );
        res.status(200).json({
          access_token: token,
        });
      })
      .catch((err) => {
        next(err);
      });
  }
}

module.exports = Controller;
