import {useState,useEffect} from "react";

import {Box,Grid} from "@mui/material";
import {useSearchParams,Link} from "react-router-dom";

import {API} from "../../../service/api"

//components
import Post from "./Post";

const Posts =()=>{
   
    const [posts,setPosts]=useState([]);
    
    const [searchParams] =useSearchParams();
    const category=searchParams.get("category");


    useEffect(()=>{
        const fetchData=async()=>{
        // calling api to get all posts from mongo 
        //and saving in the posts state
            try{
                let response=await API.getAllPosts({category:category||""});
                if(response.isSuccess){
                    // we successfully fetch the posts
                    // set the posts state 
                    setPosts(response.data);
                }
            }catch(err){
                console.log("Error while calling getAllPosts api",err);
            }
        
        }
        fetchData();
    },[category])

    return(
        <Grid container lg={12} sm={12} xs={12}>
        <>
            {
                posts&&posts.length>0?posts.map(post=>(
                  <Grid item lg={3} sm={4} xs={12}>
                      <Link to={`details/${post._id}`} style={{textDecoration:"none",color:"inherit"}}>
                         <Post post={post}/>
                      </Link>
                  </Grid>
                )):<Box style={{color:"#878787",margin:"30px 80px",fontSize:18}}>No data to display</Box>
            }
        </>
        </Grid> 
    );
}

export default Posts;

