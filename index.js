const connectDB = require("./mongodb/connect.js");
const dotenv = require("dotenv");
const express=require('express');
const bodyParser=require('body-parser');
const app= express();
const port=8800
const ejsexpresslayout=require('express-ejs-layouts');
const sassMiddlWare=require('sass-middleware')
app.use(express.urlencoded());

dotenv.config();

// node-sass-middleware configuration
app.use(
    sassMiddlWare({
        src: "./assets/scss",
        dest: "./assets/css",
        debug: true,
        outputStyle: "extended",
        prefix: "/css",
    })
);
    
    
app.use(express.static('./assets'));
app.use(ejsexpresslayout);
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

const router=require('./routes/index');
app.use(bodyParser.urlencoded({extended:false}));
app.use('/',router);
app.set('view engine','ejs');
app.set('views','./views');

const startServer = async () => {
    try {
        connectDB(process.env.MONGODB_URL );

        app.listen(8080, () =>
            console.log("Server started on port http://localhost:8080"),
        );
    } catch (error) {
        console.log(error);
    }
};
startServer();
