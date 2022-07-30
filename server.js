require('dotenv').config();
const express = require('express');

const morgan = require('morgan');
const bodyParser = require("body-parser");
const Item= require('./server/model/item');
var XLSX = require('xlsx');
var nodemailer = require("nodemailer")
//var client = require("@sendgrid/mail")



const path = require('path');
const cookieParser =require("cookie-parser");
var pdf        = require('html-pdf');
var fs         = require('fs');
 var options={
    format: "A4",
    orientation: "portrait",
    format: "10mm"
}



const connectDB = require('./server/database/connection');

const app = express();

//dotenv.config( { path : 'config.env'} )
const PORT = process.env.PORT || 9000
//const PORT = 9000
console.log(process.env.SECRET_KEY);


// log requests
app.use(morgan('tiny'));
app.use(express.json());
app.use(cookieParser());


// mongodb connection
connectDB();

// parse request to body-parser
app.use(bodyParser.urlencoded({extended:false}));
//app.use(express.urlencoded({extended:true}));


// set view engine
app.set("view engine", "ejs")
//app.set("views", path.resolve(__dirname, "views/ejs"))



// load routers
app.use('/', require('./server/routes/router'))
app.use(express.static(path.resolve(__dirname,'public')));


// app.get('/',(req,res)=>{
//     res.render('home')
// });
var today = new Date();
var date_name = today.getFullYear()+'_'+(today.getMonth()+1)+'_'+today.getDate()+'_'+today.getHours() + "_" + today.getMinutes() + "_" + today.getSeconds();

app.post('/export_pdf',(req,res)=>{
    Item.find((err,data)=>{
        if(err){
            console.log(err)
        }else{
    
    res.render('home_pdf1',{data},function(err,html){
        pdf.create(html, options).toFile('./public/pdf_downloads/demopdf'+date_name+'.pdf', function(err, result) {
            if (err){
                return console.log(err);
            }
             else{
            console.log(res);
            var datafile = fs.readFileSync('./public/pdf_downloads/demopdf'+date_name+'.pdf');
            res.header('content-type','application/pdf');
            res.send(datafile);
             }
          });
    })
///
}
});

})




//default page
app.get('/',(req,res)=>{
    Item.find((err,data)=>{
             if(err){
                console.log(err)
             }else{
                 if(data!=''){
                     res.render('home_pdf1',{data:data});
                 }else{
                     res.render('home',{data:''});
                 }
             }
    })
});



app.post('/export_xlsx',(req,res)=>{
    var wb = XLSX.utils.book_new(); //new workbook
    Item.find((err,data)=>{
        if(err){
            console.log(err)
        }else{
            var temp = JSON.stringify(data);
            temp = JSON.parse(temp);
            var ws = XLSX.utils.json_to_sheet(temp);
            var down = __dirname+'/public/xl_downloads/exportdata.xlsx'
           XLSX.utils.book_append_sheet(wb,ws,"sheet1");
           XLSX.writeFile(wb,down);
           res.download(down);
        }
    });
});


app.post('/send_email1', async (req, res) => {
 app.use(bodyParser.urlencoded({ extended : true}))


    var from = req.body.from
    var to = req.body.to
    var subject = req.body.subject
    var message = req.body.message
  

    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.MY_SECRET_EMAILID, // generated ethereal user
        pass: process.env.MY_SECRET_PASSWORD, // generated ethereal password
      },
    });
    
 
        let mailOptions = {
            from: from,
            to:to,
            subject:subject,
            text:message
        
    

    };
    
    transporter.sendMail(mailOptions, function (err, info) {
      if (err) {
        res.json(err);
      } else {
        console.log("Email Sent: " + info.response)
        res.json(info);
      }
    });
  });
  


app.listen(PORT, ()=> { console.log(`Server is running on http://localhost:${PORT}`)});