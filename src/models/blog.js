const mongoose = require("mongoose");
const Shema = mongoose.Schema;
// define the structure of documents
const blogSchema = new Shema(
  {
    title: {
      type: String,
      required: true,
    },
    snippet: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// model to surround documents and provide an interface by which to  communicate with db collection
const BLog = mongoose.model("Blog", blogSchema);
module.exports = BLog;
