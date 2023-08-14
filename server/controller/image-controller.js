
const url="http://localhost:8000";

export const uploadImage=(request,response)=>{
    // if we did not receive file from the frontend api call 
    // it will return response as file not found 
    if(!request.file){
        return response.status(404).json({msg:"file not found"})
    }
    
    // if we received the file/image from the frontend api call
    // we need to send the url of the database where the file got uploaded 
    const imageUrl=`${url}/file/${request.file.filename}`;
    
    return response.status(200).json({imageUrl});
}