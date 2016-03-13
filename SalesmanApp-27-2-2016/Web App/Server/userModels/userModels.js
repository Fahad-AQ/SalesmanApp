/// <reference path="../typings/tsd.d.ts" />
var mongoose = require("mongoose");
var bcrypt = require('bcrypt-nodejs');
var userSchema = new mongoose.Schema({
    name: { type: String, require: true },
    email: { type: String, require: true, unique: true },
    password: { type: String, require: true },
    FirebaseToken: String
});
var companySchema = new mongoose.Schema({
    userId: String,
    companyName: String,
    Location: String,
    PhoneNumber: Number,
    Salesman: [{ companyId: String, name: String, location: String, phoneNumber: Number, email: String, password: String }],
    Product: [{ salesmanId: String, salesmanName: String, location: { latitude: Number, longitude: Number }, productName: String, productPrice: String, productQuantity: String }]
});
// methods ======================
// generating a hash
userSchema.methods.generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};
// checking if password is valid
userSchema.methods.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};
// create the model for users and expose it to our app
var users = mongoose.model('Persons', userSchema);
exports.users = users;
var company = mongoose.model('userCompanies', companySchema);
exports.company = company;
