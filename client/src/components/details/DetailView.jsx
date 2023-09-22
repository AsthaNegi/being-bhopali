import {useEffect,useState,useContext} from "react";

import {Box,Typography,styled} from "@mui/material";
import {Edit,Delete} from '@mui/icons-material';

import {useParams,Link,useNavigate} from "react-router-dom";

import {API} from "../../service/api";
import {DataContext} from "../../context/DataProvider";

const Container=styled(Box)`
  margin:50px 100px;
`;

const Image=styled("img")({
    width:"100%",
    height:"50vh",
    objectFit:"cover"
})

const Heading =styled(Typography)`
   font-size:38px;
   font-weight:600;
   text-align:center;
   margin:50px 0 10px 0;
   word-break:break-word;
`;

const EditIcon=styled(Edit)`
  margin:5px;
  padding:5px;
  border:1px solid #878787;
  border-radius:10px;
`;

const DeleteIcon=styled(Delete)`
  margin:5px;
  padding:5px;
  border:1px solid #878787;
  border-radius:10px;
`;

const Author=styled(Box)`
  color:#878787;
  margin:20px 0;
  display:flex;
`;

const Description=styled(Typography)`
  word-break:break-word;
`;

const DetailView=()=>{
    const [post,setPost]=useState({});

    const {id}=useParams();
    const {account}=useContext(DataContext);

    const navigate=useNavigate();
   
    const url=post.picture?post.picture:"https://i.pinimg.com/originals/93/e3/fb/93e3fb501ed86c7d0f2b22f9d2ae6861.jpg";
    
    useEffect(()=>{
      const fetchData=async()=>{
         try{
             // we are calling the API and passing id as query 
             let response= await API.getPostById(id);
             if(response.isSuccess){
                setPost(response.data);
             }

          }catch(err){
             console.log("Error while calling getPostById api:",err);
          }
      }
      fetchData();

    },[]);

    const deleteBlog=async()=>{
      try{

        console.log(post);
        let response=await API.deletePost(post._id);
        console.log(response);
        if(response.isSuccess){
          navigate("/");
        }

      }catch(error){
         console.log("Error while calling deletePost api",error);
      }
    }
    // const deleteBlog = async () => {
    //   try {
    //     console.log(post);
    //     const response = await API.deletePost(post._id);
    //     console.log(response);
    
    //     // Check the response status code.
    //     if (response.status !== 200 && response.status !== 204) {
    //       throw new Error(`Failed to delete post: ${response.status}`);
    //     }
    
    //     // Navigate to the home page.
    //     navigate("/");
    //   } catch (error) {
    //     console.log("Error while calling deletePost api", error);
    //   }
    // };


    return(
        <Container>
             <Image src={url} alt="blog"/>
             {/* we will show edit and delete button only when we logged in user and post user is same  */}
             <Box style={{float:"right"}}>
              {
                account.username===post.username&&
                <>
                    <Link to={`/update/${post._id}`}><EditIcon color="primary"/></Link>
                    <DeleteIcon onClick={()=>deleteBlog()} color="error"/>
                </>
              }
             </Box>
             <Heading>{post.title}</Heading>

             <Author>
                <Typography>Author:<Box component="span" style={{fontWeight:600}}>{post.username}</Box></Typography>
                <Typography style={{marginLeft:"auto"}}>
                    {new Date(post.createdDate).toDateString()}
                </Typography>
             </Author>

             <Description>{post.description}</Description>
        </Container>
    );
}

export default DetailView;