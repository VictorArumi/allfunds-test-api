const { Joi } = require("express-validation");

const newSchema = {
  body: Joi.object({
    title: Joi.string()
      .min(1)
      .max(120)
      .messages({ message: "Title is required" })
      .required(),
    description: Joi.string()
      .min(1)
      .max(240)
      .messages({ message: "Description is required" })
      .required(),
    content: Joi.string()
      .min(1)
      .max(40000)
      .messages({ message: "Content is required" })
      .required(),
    author: Joi.string(),
  }),
};

module.exports = newSchema;
