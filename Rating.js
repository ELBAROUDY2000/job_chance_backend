const mongoose = require("mongoose")
const Schema = mongoose.Schema

const RatingSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "Employee"
    },
    rating: {
        type: Number,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
})

const Rating = mongoose.model("Rating", RatingSchema)

module.exports = {RatingSchema, Rating}