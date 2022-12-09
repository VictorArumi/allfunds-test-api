const express = require("express");
const { validate } = require("express-validation");
const {
  getNews,
  setNewToArchived,
  getArchivedNews,
  deleteNew,
  createNew,
} = require("../controllers/newsControllers");
const newSchema = require("../schemas/newSchema");

const newsRouter = express.Router();

newsRouter.get("/", getNews);
newsRouter.get("/archived", getArchivedNews);
newsRouter.delete("/archived/:id", deleteNew);
newsRouter.post("/create", validate(newSchema), createNew);
newsRouter.put("/edit/:id", setNewToArchived);

module.exports = newsRouter;
