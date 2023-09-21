import Post from "../model/post.js";


export const createPost=async (request,response)=>{
    try{
       const post=await new Post(request.body);
       post.save();

       return response.status(200).json("Post saved successfully");
    }catch(error){
        return response.status(500).json(error);
    }

}

export const getAllPosts=async(request,response)=>{
    
    // taking the category out from the params 
    let category=request.query.category; 
    let posts;
    try{
        if(category){
            // serach in db conditionally
            posts=await Post.find({categories:category});
        }
        else{
            //fetched all the posts from the mongo
            posts=await Post.find({});
        }
        return response.status(200).json(posts);

    }catch(error){
        console.log("error while fetching posts from mongo");
        return response.status(500).json({msg:error.message})
    }
}


export const getPost=async(request,response)=>{
    try{
       const post=await Post.findById(request.params.id);
       return response.status(200).json(post);
    }catch(error){
       console.log("Error in getPost callback function, ");
       return response.status(500).json({msg:`error in finding post by id in the database:${error.message}`});
    }
   

}