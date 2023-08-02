import {Button,Table,TableHead,TableBody, TableRow,TableCell,styled} from "@mui/material";

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

const Categories=()=>{
    return(
        <>
         <StyledButton variant="contained">Create Blog</StyledButton>

         <styledTable>
             <TableHead>
                <TableRow>
                    <TableCell>
                        All Categories
                    </TableCell>
                </TableRow>
             </TableHead>
             <TableBody>
              {/* looping through each category  */}
               {
                categories.map(category=>(
                    <TableRow key={category.id}>
                        <TableCell>
                                {category.type}
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