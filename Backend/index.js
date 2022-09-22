const connectToMongo=require('./db')
connectToMongo();
const express=require('express');
const app=express();
const port=5000;
app.use(express.json())
var cors = require('cors')
app.use(cors());

app.get('/',(req,res)=>{
    res.send("Hello Simran")
})
app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes',require('./routes/notes'))
app.listen(port,()=>{
    console.log(`Listening to the port ${port}`);
})