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

const getArchivedNews = async (req, res, next) => {
  try {
    const archivedNews = await New.find({ archived: true })
      .sort({ archiveDate: -1 })
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

const deleteNew = async (req, res, next) => {
  try {
    const { id } = req.params;
    const newToDelete = await New.findByIdAndDelete(id);

    if (newToDelete === null) {
      const error = new Error();
      error.statusCode = 404;
      error.customMessage = "Couldn't delete: new id does not exist";
      next(error);
      return;
    }

    res.status(200).json({ msg: `New with id ${id} has been deleted` });
    debug(chalk.green(`Deleted new: ${id} `));
  } catch (error) {
    error.statusCode = 400;
    error.customMessage = "Bad request";
    next(error);
  }
};

const createNew = async (req, res, next) => {
  try {
    const newData = req.body;

    const createdNew = await New.create({
      ...newData,
      storageDate: Date.now(),
    });

    debug(chalk.red(createdNew));

    res.status(201).json({ createdNew });
    debug(chalk.green(`Created new with id ${createdNew.id}`));
  } catch (error) {
    error.statusCode = 400;
    error.customMessage = "Bad request";
    next(error);
  }
};

module.exports = {
  getNews,
  getArchivedNews,
  setNewToArchived,
  deleteNew,
  createNew,
};
