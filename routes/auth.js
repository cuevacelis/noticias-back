var express = require("express");
var router = express.Router();
const { login, register } = require("../controller/auth");

router.post("/login", function (req, res, next) {
  login(req, res);
});

router.post("/register", function (req, res, next) {
  register(req, res);
});

module.exports = router;
