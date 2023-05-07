const File = require('../models/File')
const cloudinary = require('cloudinary').v2

//localFileUpload Handler function
exports.localFileUpload = async (req, res) => {
    try {
        //fetch file
        const file = req.files.file
        console.log("File is here : ", file)

        let path = __dirname + "/files/" + Date.now() + '.' + `${file.name.split('.')[1]}`
        console.log("Here is path: ", path)

        file.mv(path, (err) => {
            console.log("error whie uploaing", err)
        })

        res.json({
            success: true,
            message: "File upoaded to the server successfully✅"
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Unable to upoad file to server ⚠️, bcoz of :" + error
        })
    }
}

const dbEntry= async(name,imUrl,tags,email)=>{
    try {
            
        await File.create({
            name, imageUrl:imUrl, tags, email
        })
    } catch (error) {
        console.log(error)
        console.log("error occured while db entry")
    }
}

//ImageUploader Handler function
exports.imageUpload = async (req, res) => {
    try {

        const { name, tags, email } = req.body
        //fetch file
        const file = req.files.file
        console.log("File is here : ", file)

        let path = '/tmp/' + Date.now() + '.' + `${file.name.split('.')[1]}`
        console.log("Here is path: ", path)

        file.mv(path, (err) => {
            console.log("error whie uploaing", err)
        })

        const result =  cloudinary.uploader.upload(path, { public_id: path.split('/')[2].split('.')[0] })

        let imUrl=""

        result.then(async (data) => {
            console.log(data);
            console.log(data.secure_url);
            imUrl= data.secure_url
            dbEntry(name,imUrl,tags,email)
            res.json({
                success: true,
                message: "File upoaded to the cloudinary successfully✅"
            })

        }).catch((err) => {
            console.log(err);
            res.json({
                success: false,
                message: "error while upoading to the cloudinary successfully⚠️"+ err
            })
        });
        
       


    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Unable to upoad file to cloudinary ⚠️, bcoz of :" + error
        })
    }
}

//ImageReduceUploader Handler function
exports.imageReduceUpload = async (req, res) => {
    try {
        //fetch file
        const file = req.files.file
        console.log("File is here : ", file)

        // Check file size
        const maxSize = 2 * 1024 * 1024; // 2MB
        if (file.size > maxSize) {
            return res.status(400).json({
                success: false,
                message: "File size exceeds the limit of 2MB."
            });
        }

        let path = '/tmp/' + Date.now() + '.' + `${file.name.split('.')[1]}`
        console.log("Here is path: ", path)

        file.mv(path, (err) => {
            console.log("error whie uploaing", err)
        })

        const result = cloudinary.uploader.upload(path, { public_id: path.split('/')[2].split('.')[0] })

        result.then((data) => {
            console.log(data);
            console.log(data.secure_url);


        }).catch((err) => {
            console.log(err);
        });

        res.json({
            success: true,
            message: "File upoaded to the cloudinary successfully✅"
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Unable to upoad file to cloudinary ⚠️, bcoz of :" + error
        })
    }
}
