const generateUniqueId = require('generate-unique-id');

const midtransClient = require('midtrans-client');


const prepareOrder = async (req,res) => {
    const id = generateUniqueId({
        includeSymbols: ['@','#','|'],
        excludeSymbols: ['0']
      });
  const {amount , first_name,last_name,email,phone} = req.body;
// Create Snap API instance
let snap = new midtransClient.Snap({
        // Set to true if you want Production Environment (accept real transaction).
        isProduction : true,
        serverKey : process.env.PAYMENT_SERVER_KEY,
        clientKey:process.env.PAYMENT_CLIENT_KEY
    });

let parameter = {
    "transaction_details": {
        "order_id": `${id}`,
        "gross_amount": amount
    },
    "credit_card":{
        "secure" : true
    },
    "customer_details": {
        "first_name": first_name,
        "last_name": last_name,
        "email": email,
        "phone": phone
    }
};

let token = "";


await snap.createTransaction(parameter)
    .then((transaction)=>{
        // transaction token
        
        
        let transactionToken = transaction.token;
       
        token = transactionToken;
    })



if(!token){
    return res.status(400).json({success:false,msg:"Token Not generated!"})
}


res.status(200).json({success:true , token:token})

}



module.exports = {
    prepareOrder
}