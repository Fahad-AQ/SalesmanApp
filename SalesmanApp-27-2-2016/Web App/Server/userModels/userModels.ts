/// <reference path="../typings/tsd.d.ts" />
let mongoose = require("mongoose");
let bcrypt   = require('bcrypt-nodejs');
let userSchema  = new mongoose.Schema({     
       name :{ type: String,require : true },
       email : { type: String,require : true, unique: true },
       password : { type: String,require : true},
       FirebaseToken : String
});
let companySchema  = new mongoose.Schema({
       userId  : String,
       companyName : String,
       Location : String,
       PhoneNumber : Number,    
       Salesman : [{companyId : String,name: String, location: String, phoneNumber: Number,  email : String,password : String}],
       Product : [{salesmanId :String,salesmanName :String,location : { latitude : Number,longitude : Number} ,productName: String, productPrice: String,productQuantity : String}],
});

// methods ======================
// generating a hash
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

// create the model for users and expose it to our app
let users = mongoose.model('Persons', userSchema);
let company = mongoose.model('userCompanies', companySchema);
export {users,company}