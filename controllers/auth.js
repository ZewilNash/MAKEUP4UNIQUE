const User = require("../modals/User");
const bcrypt = require("bcryptjs");
const BookedOrder = require("../modals/BookedOrder");
var random_name = require('node-random-name');

var nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();

const getSessions = async (req,res) => {
    const {id} = req.params;

    process.env['MAKEUP_SESSION'] = id;
    const sessions = await BookedOrder.find({device_uid:id})

    res.status(200).json({ success: true, sessions });

}

const bookMakeupSession = async (req, res) => {

    const {time , date} = req.body;

    const check_date = await BookedOrder.find({time , date});

    const check_limit = await BookedOrder.find({date});


    const get_latest = await BookedOrder.find({date}).sort({ createdAt: -1 });

    if(get_latest.length > 0){
        let time_split = time.split(" ")[0];
        let time_str = time_split.split(":")[0];
        let time_number = Number(time_str);
    
        let time_latest = get_latest[0].time.split(" ")[0];
        let time_latest_str = time_latest.split(":")[0];
        let time_latest_number = Number(time_latest_str);
    
        if(time_latest_number - time_number < 4){
            console.log(time_latest_number - time_number);
            
            return res.status(400).json({
                success:false,
                msg:`WE ARE WORKING ON A MAKEUP SESSION FOR THIS TIME ,  YOU CAN SPECIFY A TIME 4 HOURSE FROM NOW OR YOU CAN BOOK FOR ANOTHER DAY!`
            })
        }
    }
    

   
    

    if(check_date.length === 1){
        return res.status(400).json({
            success:false,
            msg:"WE HAVE A SESSION AT THIS TIME , PLEASE CHOOSE ANOTHER TIME (4 hours later from this time) IN THIS DAY OR CHOOSE ANOTHER DAY"
        })
    }


    if(check_limit.length >= 3){
        return res.status(400).json({
            success:false,
            msg:"THIS DAY IS COMPLETE PLEASE BOOKE A SESSION IN ANOTHER DAY"
        })
    }

    const order = await BookedOrder.create({ ...req.body });



    res.status(200).json({ success: true, msg: `WE BOOK A MAKEUP SESSION FOR YOU SUCCESSFULLY!`, order: order });
}


module.exports = {
    bookMakeupSession,
    getSessions
}