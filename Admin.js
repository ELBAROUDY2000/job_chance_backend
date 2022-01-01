const mongoose = require("mongoose")
const Schema = mongoose.Schema ;

const AdminSchema = new Schema({
    user_name: {
        type: String,
        required: true
    },
    apass: {
        type: String,
        required: true
    }
});

AdminSchema.pre('save',function(next){
    const admin =this;
    if (!admin.isModified('password')) return next();
    bcrypt.genSalt(10,function(err,salt){
        if(err)return  next(err);
        bcrypt.hash(admin.password,salt,function (err,hash){
            if(err) return next(err);
            admin.password=hash;
            next();
        });
    });
})


const Admin = mongoose.model("Admin", AdminSchema)

module.exports = {Admin, AdminSchema}
