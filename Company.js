const mongoose = require("mongoose")
const {RatingSchema} = require("./Rating");
const {JobSchema} = require("./job");
const Schema = mongoose.Schema

const CompanySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    hrName: {
        type: String,
        required: true
    },
    rating : {
        type: [RatingSchema],
        default: []
    },


})

CompanySchema.pre('save',function(next){
    const company =this;
    if (!company.isModified('password')) return next();
    bcrypt.genSalt(10,function(err,salt){
        if(err)return  next(err);
        bcrypt.hash(company.password,salt,function (err,hash){
            if(err) return next(err);
            company.password=hash;
            next();
        });
    });
})


const Company = mongoose.model("Company", CompanySchema)

module.exports = {Company, CompanySchema}