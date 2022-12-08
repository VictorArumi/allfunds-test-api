const express = require("express");
const {
  getNews,
  setNewToArchived,
  getArchivedNews,
  deleteNew,
} = require("../controllers/newsControllers");

const newsRouter = express.Router();

newsRouter.get("/", getNews);
newsRouter.get("/archived", getArchivedNews);
newsRouter.delete("/archived/:id", deleteNew);
newsRouter.put("/edit/:id", setNewToArchived);

module.exports = newsRouter;
