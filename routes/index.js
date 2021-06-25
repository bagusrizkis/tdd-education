const router = require("express").Router();
const Controller = require("../controllers");

router.post("/users/register", Controller.registerUser);
router.post("/users/login", Controller.loginUser);

module.exports = router;
