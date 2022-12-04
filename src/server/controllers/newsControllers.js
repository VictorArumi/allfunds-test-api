require("dotenv").config();
const debug = require("debug")("news-api:server:booking-controllers");
const chalk = require("chalk");
const Author = require("../../database/models/Author");

const New = require("../../database/models/New");

const getNews = async (req, res, next) => {
  try {
    const news = await New.find({ archived: false })
      .sort({ storageDate: -1 })
      .populate("author", null, Author);

    res.status(200).json({ news });
    debug(chalk.green(`News delivered`));
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getNews,
};
