// const express = require('express');
// const route = express.Router();
// const controller = require('../controller/controller');
// const {auth,authRole} = require('../middleware/auth');

// // const Alien = require('../model/alien');

// const Register = require('../model/registers.js');
// const bcrypt =require("bcryptjs");
// const jwt =require("jsonwebtoken");
// const cookieParser =require("cookie-parser");
// const pdf =require("pdf-creator-node");
// const fs =require("fs");
// const Item = require('../model/item');
// const  Order = require('../model/order');
// const orderSummary_of_1= require('./orders_controller');
// const calc_finalanswer= require('./orders_controller');

// var temp = JSON.stringify(orderSummary_of_1);
// temp = JSON.parse(temp);


// // console.log("orderSummary_of_1="+orderSummary_of_1);
//  console.log("calc_finalanswer=temp="+temp);
//  console.log("calc_finalanswer=temp11="+temp.totalAmount);

// // console.log("calc_finalanswer="+Array.isArray(calc_finalanswer));

// let array=[];

// Array.from(calc_finalanswer).forEach(d => {
//     const prod={
//         name :d._id,
//         totalAmount:d.totalAmount,
//         total_quantity:d.total_quantity
//     }
//     array.push(prod);

    
// });

// const obj= {
//     prodlist:array
// }

// const products_d=[
//     {
//         "itemname":"a",
//         "price":200
//     },
       
//     {
//         "itemname":"b",
//         "price":50
       
//     },
//      {
//         "itemname":"c",
//         "price":200
//     },
       
//     {
//         "itemname":"d",
//         "price":50
       
//     }, {
//         "itemname":"e",
//         "price":200
//     },
       
//     {
//         "itemname":"f",
//         "price":50
       
//     }
    
// ];



// const options={
//     format: "A4",
//     orientation: "portrait",
//     format: "10mm"
// }
// const template = fs.readFileSync("./template/template.html","utf-8");



// const document= {
//     html: template,
//     data:{
//         products:obj
//     },
//     path:"./pdfs/mynewpdf1.pdf",

// };
// const var_pdfcreate= async(req,res)=>{


//     const pdfcreate= pdf.create(document,options).then((res)=>{
//         console.log(res);
//     })
//     .catch((err)=>{
//         console.log(err);
//     });
//   };





// module.exports = {var_pdfcreate,products_d};