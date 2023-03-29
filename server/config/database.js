const mongoose = require('mongoose');

const connectDatabase =()=>{

MONGODB_DATABASE = 'schoolmanagement'
MONGODB_DATABASE = 'schoolmanagement'
DB_URI= `mongodb+srv://${process.env.MONGODB_USERNAME}:${encodeURIComponent(process.env.MONGODB_PASSWORD)}@cluster0.gzy06ye.mongodb.net/${process.env.MONGODB_DATABASE}?retryWrites=true&w=majority`
    mongoose.connect(DB_URI,
        {
            useNewURlParser:true,
            useUnifiedTopology:true,
        }
        ).then((data)=>{
            console.log(`mongodb connected with server : ${data.connection.host}`)
        }).catch((err)=>{
            console.log(err);
        })
}

module.exports = connectDatabase
