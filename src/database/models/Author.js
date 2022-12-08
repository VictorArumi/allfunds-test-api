const { Schema, model } = require("mongoose");

const AuthorSchema = new Schema({
  authorName: {
    type: String,
    required: true,
  },
});

const Author = model("Author", AuthorSchema, "authors");

module.exports = Author;
