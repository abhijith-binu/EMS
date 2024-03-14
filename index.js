require('dotenv').config()
const express = require("express")
const cors = require('cors')
require('./db/connection')
const router = require('./Routes/router')

const server = express()
const PORT = 4000 || process.env.PORT

server.use(cors())
server.use(express.json())
server.use(router)

// expoxt uploads
server.use('/uploads',express.static('./uploads'))

server.listen(PORT,()=>{
    console.log(`port number is ${PORT}`);
})

server.get('/',(req,res)=>{
    res.send('ems server started...')
})