const app = require('./app');
const dotenv = require('dotenv');
const connectDatabase = require("./config/database")



// Handling uncaught Exception 
process.on("uncaughtException",(err)=>{
    console.log(`Error : ${err.message}`);
    console.log(`shutting down the server due to  uncaught Exception `);
    process.exit(1);
});




// config
dotenv.config({path:"server/config/config.env"});

//connecting to database
connectDatabase();

const server =app.listen(process.env.PORT,()=>{
    console.log(`Server is running on http://localhost:${process.env.PORT}`)
})


// unhandle promise Rejections

process.on("unhandledRejection",err=>{
    console.log(`Error: ${err.message}`);
    console.log(`shutting down the server due to unhandle promise rejection`);
    server.close(()=>{
        process.exist(1);
    });
})