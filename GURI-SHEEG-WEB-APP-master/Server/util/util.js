const multer=require('multer');
const path=require('path');
const cr = require("crypto");


module.exports.uploadSingleImage=()=>{
    const storage=multer.diskStorage({
        destination: "./public/landImages",
        filename: (req,file,cb)=>{
            cb(null, `${cr.randomUUID()}${path.extname(file.originalname)}`);
        }
    })

    const upload=multer({
        storage: storage
    })

    return upload;

}

