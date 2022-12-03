require("dotenv").config();
const debug = require("debug")("news-api:database:connection");
const chalk = require("chalk");
const mongoose = require("mongoose");

const connectDB = (connectionString) =>
  new Promise((resolve, reject) => {
    mongoose.set("debug", true);
    mongoose.set("toJSON", {
      virtuals: true,
      transform: (doc, ret) => {
        const newReturnedJSON = { ...ret };

        // eslint-disable-next-line no-underscore-dangle
        delete newReturnedJSON._id;
        // eslint-disable-next-line no-underscore-dangle
        delete newReturnedJSON.__v;

        return newReturnedJSON;
      },
    });
    mongoose.connect(connectionString, (error) => {
      if (error) {
        debug(chalk.bgRed("Error on connecting to database:", error.message));
        reject();
        return;
      }
      debug(chalk.green("Connected to database"));
      resolve();
    });
  });

module.exports = connectDB;
