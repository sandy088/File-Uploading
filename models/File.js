const mongoose = require('mongoose')
const nodemailer = require('nodemailer')

const fileSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
       
    },
    tags: {
        type: String,
      
    },
    email: {
        type: String,
        
    },
})

//post hook
fileSchema.post("save", async function(doc){
    try {
        let transporter = nodemailer.createTransport({
            host:  process.env.Mail_Host,
            auth: {
                user: process.env.Mail_User,
                pass: process.env.Mail_Pass,
            }
        })

        let info = await transporter.sendMail({
            from: "DevMind",
            to: `${doc.email}`,
            subject: `${doc.name} Uploaded Successfully`,
            html: `<h1>Congrats🎉 File Uploaded Successfully</h1><br/> <p>You can access your file from here: </p> <a href="${doc.imageUrl}">${doc.imageUrl}</a> <br/> <img src="${doc.imageUrl}"/>`

        })
        console.log("Email sent successfully✅")

    } catch (error) {
        console.log("Error in sending e-mail")
        console.error(error)
        
    }
})

const File = mongoose.model("File", fileSchema)
module.exports = File