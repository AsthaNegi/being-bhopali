import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

import User from "../model/user.js";
import Token from "../model/token.js";

dotenv.config();

// this is our api for the path "signup"
export const signupUser=async (request,response)=>{
    try{
        //const salt =await bcrypt.genSalt();
        const hashedPassword=await bcrypt.hash(request.body.password,10);

        //  new user object that was passed through post req 
        const user={username:request.body.username,name:request.body.name,password:hashedPassword};

        
        // newUser is validated user by User() model 
        const newUser=User(user);
        // newUser is saved in db 
        await newUser.save();

        return response.status(200).json({msg:"signup successful"})

    }catch(error){
         return response.status(500).json({msg:"Error while signing up the user"})
    }
  
}

//defining login api 

export const loginUser=async(request,response)=>{
    // searching for user in the DB through username
    let user =await User.findOne({username:request.body.username});
    if(!user){
        // user not found
        return response.status(400).json({msg:"Username does not match"});
    }

    try{
        //user found , now decrypting stored password and ////comparing it with the entered one 
        let match=await bcrypt.compare(request.body.password,user.password);
        if(match){
            //password matched
            const accessToken=jwt.sign(user.toJSON(),process.env.ACCESS_SECRET_KEY,{expiresIn:"15m"});
            const refreshToken=jwt.sign(user.toJSON(),process.env.REFRESH_SECRET_KEY);

            //storing refresh token in database 
            const newToken=new Token({token:refreshToken});
            await newToken.save();

            return response.status(200).json({accessToken:accessToken,refreshToken:refreshToken,name:user.name,username:user.username})

        }else{
            //passwords not matched
           return  response.status(400).json({msg:"password does not match"});
        }

    }catch(error){
        // if there is some issue connecting with database
          return response.status(500).json({msg:"Error while login in user"})
    }
}


