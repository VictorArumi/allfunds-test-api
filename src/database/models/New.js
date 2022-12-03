const { Schema, model } = require("mongoose");

const NewSchema = new Schema({
  title: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  date: {
    type: Date,
    required: true,
  },

  content: {
    type: Object,
    default: {},
    required: true,
  },

  author: {
    type: Schema.Types.ObjectId,
    ref: "Author",
    required: true,
  },

  archived: {
    type: Boolean,
    default: false,
    required: true,
  },

  archiveDate: {
    type: Date,
  },

  // title, description, date, content, author, archiveDate.
});

const New = model("New", NewSchema, "news");

module.exports = New;
