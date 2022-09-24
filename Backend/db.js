// require('dotenv').config();
const { parsed, error } = require("dotenv").config();

const mongoose= require('mongoose');
// const mongoURI='mongodb://localhost:27017/Users'
const mongoURI=parsed.MONGO_URI;
// const mongoURI='mongodb+srv://Simran:42863@cluster0.rmaepvi.mongodb.net/notebook?retryWrites=true&w=majority'
//  console.log(error); 
// console.log(parsed.MONGO_URI);

const connectToMongo=()=>{
    // mongoose.connect(mongoURI,()=>{
    //     console.log("connected to mongo successfully");
    // })
    mongoose.connect(mongoURI)
    .then(()=>{
        console.log("connected to mongo successfully",mongoURI);
    })
    .catch(err=>console.log("not connected",mongoURI))
}
module.exports =connectToMongo; 