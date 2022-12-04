const express = require("express");
const { getNews } = require("../controllers/newsControllers");

const newsRouter = express.Router();

newsRouter.get("/", getNews);

module.exports = newsRouter;
