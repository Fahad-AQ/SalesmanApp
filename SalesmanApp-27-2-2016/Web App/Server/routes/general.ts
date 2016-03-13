/// <reference path="../typings/tsd.d.ts" />
import express = require('express')
import Firebase = require('firebase')
import {users,company} from "../userModels/userModels";
let ref = new Firebase('https://salesmanapp.firebaseio.com/');

let router = express.Router()

router
.post('/signup', function(req, res) {
         let newUser             = new users();
                newUser.name     = req.body.name;
                newUser.email    = req.body.email;
                newUser.password = newUser.generateHash(req.body.password);                           
        ref.createUser({
        email: newUser.email,
        password: newUser.password
        }, function(error, userData) {
            if (error) {
                 res.json({status : 404});   
            } 
            else {     
                    newUser.FirebaseToken     = userData.uid;                                            
                    newUser.save((err,data)=>{
                    if(err){
                        console.log(err)
                    }
                    else{                   
                        console.log("Save Company Successfulyy")           
                        console.log(data)
                        res.json(data);
                    }
     })
      
  }
});
 

})
.post('/login', function(req, res) {
      let newUser            = new users();
      newUser.email    = req.body.email;   
        users.findOne({email : newUser.email},(err,data)=>{
         if(err){
              console.log(err)
               res.json({status : 404});   
         }
         else{
             if(data == null){
                 console.log(data)
                  res.json({status : 404});   
             }
             else{
                  newUser.password = data.password
             if(newUser.validPassword(req.body.password)){
             console.log("Get Save Successfulyy")
             console.log(data)
             res.json(data);   
             }
            else {
                   res.json(null);   
            }
             }
            
         }
     })
})
.get('/getUser/:key', function(req, res) {
        let userKey = req.params.key;
        users.findOne({ FirebaseToken : userKey},(err,data)=>{
         if(err){
              console.log(err)
               res.json({status : 404});   
         }
         else{
            console.log("Get User Successfulyy")
             console.log(data)
             res.json(data);   
         }
     })
})
.get('/getCompany/:id', function(req, res) {
        let getId = req.params.id;
        company.findOne({ userId : getId},(err,data)=>{
         if(err){
              console.log(err)
               res.json({status : 404});   
         }
         else{
            console.log("Get User Successfulyy")
             console.log(data)
             res.json(data);   
         }
     })
})
.post('/addCompany',function(req,res){
    let companyData = req.body.companyData;
     let newCompany      = new company();
             newCompany.userId = companyData.uid;
             newCompany.companyName = companyData.companyName,
             newCompany.Location = companyData.Location,
             newCompany.PhoneNumber = companyData.PhoneNumber,
             newCompany.save((err,datas)=>{
                    if(err){
                        console.log(err)
                         res.json({status : 404});   
                    }
                    else{
                       res.json(datas);   
                    }
     })
})
.post('/addSalesmans',function(req,res){
    let SalesmanData = req.body.salesmanData;
  company.findByIdAndUpdate(
       SalesmanData.companyId,
        {$push: {"Salesman": {companyId : SalesmanData.companyId,name: SalesmanData.name, location: SalesmanData.location, phoneNumber: SalesmanData.phoneNumber, email: SalesmanData.email, password: SalesmanData.password, Order : []}}},
        function(err, model) {
          res.json({Status : "Done" , message : model});
        }
    );   
})
.post('/getSalesman',function(req,res){
    let getSalemanData = req.body.getSalesmanData;
    if(req.body.getSalesmanData == null||req.body.getSalesmanData == 'null') {
         res.json({Status : 404});  
    }
    else {
        var datas = null;
  company.find( { "Salesman.email": getSalemanData.email}, function(err, data) {
         res.json(data);
         console.log(data) 
         })              
    }
            
})
.post('/addOrder',function(req,res){
    let getOrderData = req.body.getOrderData;
    let refOrder = new Firebase('https://salesmanapp.firebaseio.com/'+getOrderData._id+'/Order/');
    var refNewOrder = new Firebase('https://salesmanapp.firebaseio.com/Orders'); 
     refNewOrder.push({salesmanId :getOrderData._id ,salesmanName :getOrderData.name ,location : getOrderData.salesmanOrder.OrderLocation,productName: getOrderData.salesmanOrder.productName, productPrice: getOrderData.salesmanOrder.productPrice,productQuantity : getOrderData.salesmanOrder.productQuantity}) 
    refOrder.push({salesmanId :getOrderData._id ,salesmanName :getOrderData.name ,location : getOrderData.salesmanOrder.OrderLocation,productName: getOrderData.salesmanOrder.productName, productPrice: getOrderData.salesmanOrder.productPrice,productQuantity : getOrderData.salesmanOrder.productQuantity}) 
})
.post('/addOrderD2',function(req,res){
    let getOrderData = req.body.getOrderData2;
company.findByIdAndUpdate(
       getOrderData.companyId,
        {$push: {"Product": {salesmanId :getOrderData.salesmanId,salesmanName :getOrderData.salesmanName ,location : getOrderData.location,productName: getOrderData.productName, productPrice: getOrderData.productPrice,productQuantity : getOrderData.productQuantity}}},
        function(err, model) {
          res.json({Status : "Done" , message : model});
        }
    );
        let refOrder = new Firebase('https://salesmanapp.firebaseio.com/'+getOrderData.salesmanId+'/Order/'+getOrderData.orderId);
        refOrder.remove()
})
export {router}