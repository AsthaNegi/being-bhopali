import {useState,useEffect,useContext} from "react";

import {Box,styled,FormControl,InputBase,Button,TextareaAutosize} from "@mui/material";
import {AddCircle as Add} from '@mui/icons-material';

// for fetching the params from url 
import { useLocation,useNavigate} from "react-router-dom";

 // username will be fetched from global context 
 import {DataContext} from "../../context/DataProvider";

 //importing API 
 import {API} from "../../service/api"

const Container=styled(Box)`
  margin:50px 100px;
`;

const Image=styled("img")({
    width:"100%",
    height:"50vh",
    objectFit:"cover"
})

const StyledFormControl=styled(FormControl)`
  margin-top:10px;
  display:flex;
  flex-direction:row;
`;

const InputTextField=styled(InputBase)`
  flex:1;
  margin:0 30px;
  font-size:25px;
`;

const Textarea=styled(TextareaAutosize)`
  width:100%;
  margin-top:50px;
  font-size:18px;
  border:none;
  ${'' /* psuedo class to avoid outline on click  */}
  &:focus-visible{
    outline:none;
  }

`;

// initial object for blog data to be stored in DB 
const initialPost={
    title:"",
    description:"",
    picture:"",
    username:"",
    categories:"",
    createdDate:new Date()
}


const CreatePost=()=>{
   
    //setting post 
    const [post,setPost]=useState(initialPost);
    //setting image 
    const [file,setFile]=useState("");
    
    //fetching account value from global context that we set in Login.jsx 
    // which contains user's name and his username 
    const {account}=useContext(DataContext);

    // initializing the useLocation hook for fetching category value from the url
    const location=useLocation();

    //initializing navigate 
    const navigate=useNavigate();
    
    // when post object has uploaded picture's url then show uploaded picture
    const url=post.picture?post.picture:'https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80';


    //handling username , date , etc when the "/create" or <CreatePost/> is loaded

    useEffect(()=>{
        const getImage=async ()=>{
            console.log("get image called",file);
            if(file){
              
              const data=new FormData();
              data.append("name",file.name);
              console.log(data.name);
              data.append("file",file);
              console.log(data.file);
              console.log(data);
              for (const pair of data.entries()) {
                console.log(pair[0], pair[1]);
              }
             
              let response;
              //calling API for uploading image to database
              try{
                console.log(data);
                 response=await API.uploadFile(data);
              }
              catch(error){
                   console.log(error);
                  //  return error;

              }
              

              console.log(response);
              // mongodb will give us url of image which we have to set in post.picture
              // post.picture=response.data;

            }
        }
        getImage();
        // setting up category of post with the help of useLocation hook
        post.categories=location.search?.split("=")[1] || "All";
        //fetching username from the global context that we set in Login.jsx
        post.username=account.username;
    },[file])



    // handling change in the title and description 

    const handleChange=(e)=>{
        setPost({...post,[e.target.name]:e.target.value});
    }

    const savePost=async()=>{
      try{
        let response=await API.createPost(post);
        if(response.isSuccess){
          navigate("/");
        }
      }catch(err){
        console.log(err);
      }
    }

    return(
        <Container>
            <Image src={url} alt="banner"/>
             
             {/* for inputting image and blog title and publish button  */}
            <StyledFormControl>
                <label htmlFor="fileInput">
                   <Add fontSize="large" color="action"/>
                </label>
                {/* we are adding file with this file type   */}
                <input 
                   type="file" 
                   id="fileInput"
                   style={{display:"none"}}
                   onChange={(e)=>{
                    console.log(e.target.files[0]);
                    console.log(e.target);
                    setFile(e.target.files[0])
                    
                    }
                 }
                  
                />
                <InputTextField placeholder="Title" onChange={(e)=>handleChange(e)} name="title" />
                <Button variant="contained" onClick={()=>savePost()}>Publish</Button>
            </StyledFormControl>
              
     {/* for writing the blog content  */}

              {/* text area  */}
              <Textarea 
                    minRows={5}
                    placeholder="Tell your story......." 
                    onChange={(e)=>handleChange(e)} 
                    name="description"   
               />
        </Container>
    );
}

export default CreatePost;