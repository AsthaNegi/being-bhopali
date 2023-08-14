import {Button,Table,TableHead,TableBody, TableRow,TableCell,styled} from "@mui/material";

import {Link,useSearchParams} from "react-router-dom";

import { categories } from "../../constants/data";

const styledTable=styled(Table)`
 border:1px solid rgba(224,224,224,1);
`;

const StyledButton=styled(Button)`
  margin:20px;
  width:85%;
  background:#6495ED;
  color:#fff;
`;

const StyledLink=styled(Link)`
   text-decoration:none;
   color:inherit;
`;

const Categories=()=>{
    //taking the parameters out of url using useSearchParams hook 
    const [searchParams]=useSearchParams();
    const category=searchParams.get("category");

    return(
        <>
         <StyledLink to={`/create?category=${category || ""}`} >
            <StyledButton variant="contained">Create Blog</StyledButton>
         </StyledLink>
         <styledTable>
             <TableHead>
                <TableRow>
                    <TableCell>
                       <StyledLink to="/">
                           All Categories
                        </StyledLink> 
                    </TableCell>
                </TableRow>
             </TableHead>
             <TableBody>
              {/* looping through each category  */}
               {
                categories.map(category=>(
                    <TableRow key={category.id}>
                        <TableCell>
                               <StyledLink to={`/?category=${category.type}`}>
                                    {category.type}
                                </StyledLink>  
                        </TableCell>
                    </TableRow>
                ))
               }
                
             </TableBody>
         </styledTable>
        </>
    );
}

export default Categories;