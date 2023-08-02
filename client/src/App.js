import {useState} from "react";

//importing DataProvider for global context 
import DataProvider from './context/DataProvider';

//importing for routing 
import {BrowserRouter,Routes,Route, Outlet,Navigate} from "react-router-dom"

//components 
import Login from './components/account/Login';
import Home from './components/home/Home';
import Header from './components/header/Header';


const PrivateRoute=({isAuthenticated,...props})=>{
  return isAuthenticated?
         <> 
           {/* header will appear only when user is authenticated  */}
            <Header/>
            <Outlet/>
         </>
         :<Navigate replace to="/login"/>
}

function App() {

  const [isAuthenticated,isUserAuthenticated]=useState(false);

  return (
    //  wrapping whole application with BrowserRouter wille nable routing for whole app 
      <DataProvider>
       <BrowserRouter>
                
                <div style={{marginTop:64}}>
                  <Routes>
                    {/* wrapping all the components inside routes and provide them we seperate Route  */}
                    <Route path="/login" element={<Login isUserAuthenticated={isUserAuthenticated}/>}/>


                     {/* wrapping Home Route inside PrivateRoute  */}
                    <Route path="/" element={<PrivateRoute isAuthenticated={isAuthenticated}/>}>
                        <Route path="/" element={<Home/>}/>
                    </Route>


                   </Routes> 

                </div>
         </BrowserRouter>
      </DataProvider>
      
    
  );
}

export default App;
