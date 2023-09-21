import grid from "gridfs-stream";
import mongoose from "mongoose";


const url="http://localhost:8000";

let gfs,gridfsBucket;
const conn=mongoose.connection;
conn.once("open",()=>{
    gridfsBucket=new mongoose.mongo.GridFSBucket(conn.db,{
        bucketName:"fs"
    });
    gfs=grid(conn.db,mongoose.mongo);
    gfs.collection("fs");
})



export const uploadImage=(request,response)=>{
    // if we did not receive file from the frontend api call 
    // it will return response as file not found 
    // console.log("printing req:",request);
    console.log(request);
    if (!request.file) {
        return response.status(400).json({ msg: "File not received" });
    }
    // if(!request.file){
    //     return response.status(404).json({msg:"file not found"})
    // }
    
    // if we received the file/image from the frontend api call
    // we need to send the url of the database where the file got uploaded 
    const imageUrl=`${url}/file/${request.file.filename}`;
    
    return response.status(200).json({imageUrl});

    // if(!request){
    //     return response.status(404).json({msg:"req not received"})
    // }

    // return response.status(200).json({msg:"req received"})
}

export const getImage=async(request,response)=>{

    try{
        const file=await gfs.files.fileOne({filename:request.params.filename});
        const readStream=gridfsBucket.openDownloadStream(file._id);
        readStream.pipe(response);

    }catch(error){
        return response.status(500).json({msg:error.message})
    }

}

