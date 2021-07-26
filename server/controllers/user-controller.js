const { User } = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const PRIVATE_KEY = process.env.PRIVATE_KEY || "kucing";

class UserController {
  static register(req, res, next) {
    User.create({
      email: req.body.email,
      password: req.body.password,
    })
      .then((user) => {
        res.status(201).json({
          success: true,
          message: `${user.email} created`,
        });
      })
      .catch((err) => {
        next(err);
      });
  }

  static login(req, res, next) {
    User.findOne({
      where: { email: req.body.email },
    })
      .then((user) => {
        if (!user) {
          throw { name: "UserNotFound" };
        } else {
          const checkpw = bcrypt.compareSync(req.body.password, user.password);
          const token = jwt.sign(
            {
              id: user.id,
              email: user.email,
            },
            PRIVATE_KEY
          );
          if (checkpw) {
            res.status(200).json({ success: true, access_token: token });
          } else {
            throw { name: "WrongPassword" };
          }
        }
      })
      .catch((err) => {
        next(err);
      });
  }
}

module.exports = UserController;
