const mongoose= require('mongoose');
// const mongoURI='mongodb://localhost:27017/Users'
const mongoURI='mongodb+srv://Simran:42863@cluster0.rmaepvi.mongodb.net/notebook?retryWrites=true&w=majority'

const connectToMongo=()=>{
    // mongoose.connect(mongoURI,()=>{
    //     console.log("connected to mongo successfully");
    // })
    mongoose.connect(mongoURI)
    .then(()=>{
        console.log("connected to mongo successfully");
    })
    .catch(err=>console.log("not connected"))
}
module.exports =connectToMongo; 