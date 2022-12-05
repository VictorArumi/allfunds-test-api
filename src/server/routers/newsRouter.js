const express = require("express");
const { getNews, setNewToArchived } = require("../controllers/newsControllers");

const newsRouter = express.Router();

newsRouter.get("/", getNews);
newsRouter.put("/edit/:id", setNewToArchived);

module.exports = newsRouter;
