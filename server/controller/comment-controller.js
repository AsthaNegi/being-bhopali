
import Comment from "../model/comment.js"

export const newComment=async(request,response)=>{
    try{
      const comment=await new Comment(request.body);
      await comment.save();

      response.status(200).json({msg:"commet saved successfully"});
    }catch(error){
        console.log("Error while saving new comment in db in comment-controller.js");
        response.status(500).json({error:error.message});
    }
}

export const getComments=async(request,response)=>{
  try{
      const comments=await Comment.find({postId:request.params.id});
      response.status(200).json(comments); 

  }catch(error){
     console.log("error while find comments in the db in comment-controller.js");
     response.status(500).json({error:error.message});
  }
}

export const deleteComment=async(request,response)=>{
  try{
    const comment=await Comment.findById(request.params.id);
    await comment.deleteOne();

    response.status(200).json({msg:"comment deleted successfully"});
  }catch(error){
    console.log("error while deleting comment");
    response.status(500).json({error:error.message});

  }
}