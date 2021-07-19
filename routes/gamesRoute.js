const {Router} = require("express");
const route = Router();
const gamesController = require("../controllers/gamesController");
const authMidleware    = require('../middleware/auth');


route.get("/games", gamesController.getAll);
route.get("/game/:id", gamesController.getOne);
route.post("/game",authMidleware, gamesController.postGame);
route.put("/game/:id",authMidleware, gamesController.editGame);
route.delete("/game/:id",authMidleware, gamesController.deleteGame);

module.exports = route;