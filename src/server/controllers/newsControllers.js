require("dotenv").config();
const debug = require("debug")("news-api:server:news-controllers");
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

const getArchived = async (req, res, next) => {
  try {
    const archivedNews = await New.find({ archived: true })
      .sort({ storageDate: -1 })
      .populate("author", null, Author);

    res.status(200).json({ archivedNews });
    debug(chalk.green(`Archived News delivered`));
  } catch (error) {
    next(error);
  }
};

const setNewToArchived = async (req, res, next) => {
  const { id } = req.params;
  try {
    const updatedNew = await New.findByIdAndUpdate(
      id,
      { $set: { archived: true, archiveDate: Date.now() } },
      {
        new: true,
      }
    );
    res.status(200).json({ updatedNew });
  } catch (error) {
    error.statusCode = 404;
    error.customMessage =
      "Error: new id does not exist in DB, impossible to update";
    next(error);
  }
};

module.exports = {
  getNews,
  getArchived,
  setNewToArchived,
};
