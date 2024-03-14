const mongoose = require('mongoose')
const connectionString = process.env.DATABASE
mongoose.connect(connectionString,{
    // useNewUrlParser:true,
    // useUnifiedTopology:true
}).then(()=>{
    console.log("Mongodb Atlas connected successfully..");
}).catch(()=>{
    console.log("Mongodb connection error",+error);
})