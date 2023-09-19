import multer from "multer";
import {GridFsStorage} from "multer-gridfs-storage";
import dotenv from "dotenv";

dotenv.config();

const username=process.env.DB_USERNAME;
const password=process.env.DB_PASSWORD;


// we will store image/file with the help of multer-gridfs-storage's component GridFsStorage 

const storage=new GridFsStorage({
    // url of database where the file will be uploaded 
    url:`mongodb+srv://${username}:${password}@cluster0.xki5wr4.mongodb.net/blog?retryWrites=true&w=majority`,
    options:{useNewUrlParser:true},
    file:(request,file) => {
        // tyles of files that we will accept 
        const match=["image/png","image/jpg","image/jpeg"];
        
        // if the file extension did not match 
        if (match.indexOf(file.mimetype) === -1){
            return `${Date.now()}-blog-${file.originalname}`;
        }
         
        // if the file extention matched 
        return {
            bucketName:"photos",
            filename:`${Date.now()}-blog-${file.originalname}`
        }
    }
})

// we will upload file to the database with the help of multer module 
export default multer({storage});


// This is a middleware which has uploaded the image to mongoDB