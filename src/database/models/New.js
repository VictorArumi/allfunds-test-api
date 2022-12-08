const { Schema, model } = require("mongoose");

const NewSchema = new Schema({
  title: {
    type: String,
    required: true,
    default: "(empty)",
  },

  description: {
    type: String,
    required: true,
    default: "(empty)",
  },

  storageDate: {
    type: Date,
    required: true,
  },

  content: {
    type: String,
    required: true,
    default: "(empty)",
  },

  author: {
    type: Schema.Types.ObjectId,
    ref: "Author",
    required: true,
    default: "639277516361cd4071a3346b",
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
