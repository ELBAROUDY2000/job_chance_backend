const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const recommendationSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "Employee",
    required: true
  },
  rating: {
    type: Number,
    required: true
  },
  comment: {
    type: String,
    required: true
  }
});

const Recommendation = mongoose.model("Recommendation", recommendationSchema);

module.exports = {recommendationSchema , Recommendation}