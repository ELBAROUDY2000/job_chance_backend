const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const JobSchema = new Schema({
  company: {
    type: Schema.Types.ObjectId,
    ref: "Company"
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  salary: {
    type: String,
    required: true
  },
  applied : {
    type: [Schema.Types.ObjectId],
    ref : "Employee",
    default : []
  }

});

const Job = mongoose.model('Job', JobSchema);

module.exports = {JobSchema,Job}