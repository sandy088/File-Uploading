const mongoose = require('mongoose')

require('dotenv').config()
exports.Connect = ()=>{
    mongoose.connect(process.env.MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(()=>console.log("DB Connected Successfully✅"))
    .catch((error)=> {
        console.log("error occured")
        console.error(error)
        process.exit(1)
    })
}