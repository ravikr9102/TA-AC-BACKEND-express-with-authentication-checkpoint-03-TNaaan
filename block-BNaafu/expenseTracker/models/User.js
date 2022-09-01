const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

let userSchema = new Schema ({
    name: { type: String, required: true},
    email: { type: String},
    password: { type: String, minlength: 6},
    age: { type: Number, default: 18},
    phone: { type: Number},
    country: { type: String}
},{ timestamps: true});


userSchema.pre('save',function(next){
    if(this.password && this.isModified('password')){
        bcrypt.hash(this.password, 10, (err,hashed) => {
            if(err) return next(err)
            this.password = hashed;
            return next()
        });
    } else{
        next();
    }
});


userSchema.methods.verifyPassword = function(password,cb){
    bcrypt.compare(password, this.password,(err,result) => {
        return cb(err,result)
    })
}

module.exports = mongoose.model('User',userSchema);