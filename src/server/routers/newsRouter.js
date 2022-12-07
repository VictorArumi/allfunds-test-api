const express = require("express");
const {
  getNews,
  setNewToArchived,
  getArchived,
} = require("../controllers/newsControllers");

const newsRouter = express.Router();

newsRouter.get("/", getNews);
newsRouter.get("/archived", getArchived);

newsRouter.put("/edit/:id", setNewToArchived);

module.exports = newsRouter;
