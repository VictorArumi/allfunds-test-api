const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const { notFoundError, generalError } = require("./middlewares/errors/errors");
const newsRouter = require("./routers/newsRouter");

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(helmet());

app.use("/news", newsRouter);

app.use(notFoundError);
app.use(generalError);

module.exports = app;
