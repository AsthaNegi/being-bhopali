
import {Box,Typography,styled} from "@mui/material";

const Image=styled(Box)`
  background:url(https://www.fabhotels.com/blog/wp-content/uploads/2018/07/1000x650-208.jpg
) center/55% repeat-x #000;
 width:100%;
 height:50vh;
 display:flex;
 align-items:center;
 justify-content:center;
 flex-direction:column;

`;

const Heading=styled(Typography)`
  font-size:70px;
  color:#ffffff;
  background:black;
  line-height:1;
`;

const SubHeading=styled(Typography)`
  font-size:20px;
  background:#ffffff;
`;

const Banner=()=>{
    return(
        <Image>
            <Heading>WELCOME TO BHOPAL</Heading>
            <SubHeading>Being Bhopali</SubHeading>
        </Image>
    );
}

export default Banner;