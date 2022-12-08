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

  storageDate: {
    type: Date,
    required: true,
  },

  content: {
    type: String,
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
});

const New = model("New", NewSchema, "news");

module.exports = New;
