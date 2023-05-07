//app create
const express= require('express')
const app = express()

require('dotenv').config()

//port
const PORT= process.env.PORT

//middleware connect
app.use(express.json())
const fileupload = require('express-fileupload')
app.use(fileupload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}))

//db connect
const db = require('./config/database')
db.Connect()

//clodinary connect
const cloudinary= require('./config/cloudnary')
cloudinary.cloudinaryConnect()


//api route mount
const upload = require('./routes/Fileupload')
app.use('/api/v1/upload', upload)


//activate server
app.listen(PORT, ()=>{
    console.log("app is running on "+ PORT)
})
