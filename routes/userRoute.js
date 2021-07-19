const {Router} = require("express");
const userController = require("../controllers/userController");
const route = Router();
const authMidleware = require('../middleware/auth');


route.post("/auth", userController.auth);
route.post("/user",authMidleware, userController.user);

module.exports = route;