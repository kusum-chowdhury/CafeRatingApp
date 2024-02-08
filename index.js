const express = require('express');
const dotenv = require('dotenv').config();
const bodyParser = require('body-parser');
const db = require("./config/dbConnection");
const session = require('express-session');
const app = express();
const port = process.env.PORT;

db();
app.use(
    session({
        secret: "my secret key",
        saveUninitialized: true,
        resave: false,
    })
);
app.use((req, res, next)=> {
    res.locals.message = req.session.message;
    delete req.session.message;  
    next();
});
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.json());
app.use("/", require("./routes/route"));
app.set("view engine", "ejs");

app.listen(port, ()=>{
    console.log('app is live on port 4000');
})