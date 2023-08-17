require('dotenv').config({ path: "./config.env" });
//express app
const express = require("express");
const app = express();
const cookieParser = require('cookie-parser');

//path
const path = require('path')
//modal
const URL = require('./model/url');
//routes imported
const urlRoute = require('./routes/url');
const redirecturl = require('./routes/redirecturl')
const staticRoute = require('./routes/staticroute')
const userRoute = require('./routes/user')

//mongodb connection imported
const { connectMongoDB } = require('./connection');

//middleware imported
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 8001;
const { restrictTo, checkForAuthentication } = require('./middleware/auth')

//templating Engine 
app.set("view engine", "ejs");
app.set("veiws", path.resolve("./views"));

//middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(checkForAuthentication);
app.use('/url', restrictTo(["NORMAL", "admin"]), urlRoute);
app.use('/jsly', redirecturl);
app.use('/user', userRoute);
app.use('/', staticRoute);
process.setMaxListeners(0)

//connection 
connectMongoDB(process.env.MONGO_URI)
    .then(console.log("MongoDB Database is connected"))
    .catch((err) => {
        console.log("MongoDB err", err);
    })


app.listen(PORT, () => {
    console.log(`server is running on Port: ${PORT}`);
});