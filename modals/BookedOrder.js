const mongoose = require("mongoose");
var nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();

const mongooseSequence = require("mongoose-sequence")


const BookedOrderSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "You Must Provide name"],
        trim: true
    },

 
    phone: {
        type: String,
        required: [true, "You Must Provide Phone Number"],
        trim: true,
    },

    occasion: {
        type: String,
        required: [true, "You Must Provide Occasion"],
        trim: true,
    },

    address: {
        type: String,
        trim: true,
    },
   
    session_place:{
        type: String,
        trim: true,
        enum:["your place" , "our place"],
        default:"our place"
    },
   
    time:{
        type:String,
        required:[true , "PLEASE PROVIDE WHAT TIME FIELD"]
    },

    date:{
        type: String,
        required:[true , "PLEASE PROVIDE WHAT DATE FIELD"]
    },
    
    device_uid:{
        type: String,
        trim: true,
    }

}, {timestamps:true});


BookedOrderSchema.plugin(mongooseSequence(mongoose) , {inc_field:"order_num"})

BookedOrderSchema.post("save" , function () {
    var transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: process.env.GMAIL,
            pass: process.env.GMAIL_PASS,
        },
       
      });
      
      var mailOptions = {
        from: process.env.GMAIL,
        to: process.env.GMAIL,
        subject: 'NEW (BOOKED) MAKEUP SESSION IS MADE PLEASE NOTE IT DOWN (LOVE YOU BASBOSA)',
        html: `<p>(BOOKED) MAKEUP SESSION NUMBER: </p><h1>${this.order_num}</h1>, <p>(BOOKED) MAKEUP SESSION OWNER NAME: </p><h1>${this.name}</h1>,<p>(BOOKED) MAKEUP SESSION OWNER PHONE: </p><h1>${this.phone}</h1>,<p>(BOOKED) MAKEUP SESSION OCCASION: </p><h1>${this.occasion}</h1>,<p>(BOOKED) MAKEUP SESSION PLACE: </p><h1>${this.session_place}</h1>,<p>(BOOKED) MAKEUP SESSION OWNER ADDRESS: </p><h1>${this.address}</h1>,<p>(BOOKED) MAKEUP SESSION DATE: </p><h1>${this.date}</h1>,<p>(BOOKED) MAKEUP SESSION TIME: </p><h1>${this.time}</h1>`
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('');
        }
      });
})

module.exports = mongoose.model("BookedOrder", BookedOrderSchema);