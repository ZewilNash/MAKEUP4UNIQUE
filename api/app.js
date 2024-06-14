// unshift function add upfront element to array

require("express-async-errors");
require("dotenv").config()
const { readFileSync } = require("fs");
const {createServer} = require("http")
const User = require("../modals/User");
const BOOKOrder = require("../modals/BookedOrder");
var expressPublicIp = require('express-public-ip');
var serialNumber = require('serial-number');



const authRouter = require("../routes/auth");
const { Server } = require('socket.io');
const productRouter = require("../routes/product");

//security packages
const helmet = require("helmet");
const xss = require("xss-clean");
const rateLimiter = require('express-rate-limit');



const express = require("express");
const app = express();

const server = createServer(app);

const io = new Server(server);
global.io = io;

const cors = require("cors");

const errorhandlerMiddleware = require("../middleware/errorHandler");

const authenticatedRoute = require("../middleware/auth");

const isAdminMiddleWare = require("../middleware/isAdmin");

const bodyParser = require("body-parser")



const connectDB = require("../db/connection");



const PORT = process.env.PORT || 3000


app.use(express.json());
app.use(bodyParser());
app.use(express.static("public"));
app.set("view engine", "ejs");

app.set("trust proxy", 1);

app.use(expressPublicIp());

app.use(
    rateLimiter({
        windowMs: 15 * 60 * 1000, // 15 minutes
        max: 100, // limit each IP to 100 requests per windowMs
    })
);

// hemlet prevents the other urls to load in our page for security reasons

// we will modify hemlet to accept only https to load scripts in our page

// app.use(helmet());

app.use(
    helmet.contentSecurityPolicy({
        useDefaults: true,
        directives: {
            "img-src": ["'self'", "https: data:"],
            "script-src": ["'self'", "https: data:"],
            "default-src": ["'self'", "https: data:"],
            
        }
    })
)

app.use(xss());

app.use(cors());




// MAIN APP ROUTES

app.get("/", async (req, res) => {
   const id =  process.env.MAKEUP_SESSION
    const sessions = await BOOKOrder.find({device_uid:id})
    res.render("pages/landing/index" , {sessions});
});



app.get("/notfound", (req, res) => {
    res.render("pages/notfound/index");
});





// app.get("/4unique-admin/:name" ,async (req,res) => {
//     const product = await Product.findOne({name:req.params.name});
//     // check passwords
//     res.render("pages/4unique-admin/index");
// });



// END MAIN APP ROUTES

app.use("/api/v1/auth", authRouter);

app.use("/api/v1/products", productRouter);

app.all("*", (req, res) => {
    res.render("pages/notfound/index");
});


app.use(errorhandlerMiddleware);



const start = async () => {
    try {
        await connectDB(process.env.MONGO_URL);
        server.listen(PORT, () => {
            console.log(`Server is listening on port: ${PORT}`);
        })

    } catch (err) {
        console.log(err);
    }
}


start();

// app.use("/.netlify/functions/app", router);
// module.exports.handler = serverless(app);

// https://www.appmysite.com/web-to-app-pricing/

// r%vfbISG&6RNrU$gyFQE

module.exports = app;