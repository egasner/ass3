const mongoose = require("mongoose");
const ReactFormDataSchema = new mongoose.Schema(
  {
    _id: { type: Number },
    title: { type: String },
    points: { type: Number },
    question: { type: String },
    answer: { type: String },
    image: { type: String },
  },
  { collection: "fakestore_catalog" }
);
const Product = mongoose.model("Product", ReactFormDataSchema);
module.exports = Product;
