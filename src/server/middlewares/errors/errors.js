const chalk = require("chalk");
const debug = require("debug")("news-api:server:middlewares:errors");

const notFoundError = (req, res) => {
  res.status(404).json({ msg: "Endpoint not found" });
};

// eslint-disable-next-line no-unused-vars
const generalError = (error, req, res, next) => {
  debug(chalk.red(`Error: general error`));

  res.status(500).json({ msg: "General error" });
};

module.exports = {
  notFoundError,
  generalError,
};
