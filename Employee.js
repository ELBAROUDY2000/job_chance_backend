const mongoose = require("mongoose");
const {recommendationSchema} = require("./Recomendations");
const Schema = mongoose.Schema;

const employeeSchema = new Schema({
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
    jobTitle: {
        type: String,
        required: true
    },
    password : {
        type: String,
        required: true
    },
    dateOfBirth: {
        type: Date,
        required: true
    },
    gender:{
        type: String,
        enum : ["male","female"]
    },
    nationality:{
        type: String,
        required:true,
    },
    country:{
        type:String,
        required:true
    },
    city: {
        type:String,
        required:true
    },
    skills: {
        type: [String],
        default : []
    },
    courses: {
        type: [String],
        default : []
    },
    workExperience: {
        type: [String],
        default : []
    },
    cvLink : {
        type:String,
        required:true
    },
    recommendations : {
        type: [recommendationSchema],
        default: []
    }
});

employeeSchema.pre('save',function(next){
    const employee =this;
    if (!employee.isModified('password')) return next();
    bcrypt.genSalt(10,function(err,salt){
        if(err)return  next(err);
        bcrypt.hash(employee.password,salt,function (err,hash){
            if(err) return next(err);
            employee.password=hash;
            next();
        });
    });
})

const Employee = mongoose.model("Employee", employeeSchema);

module.exports = {Employee, employeeSchema};
