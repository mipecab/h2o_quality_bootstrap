import React from "react";
 
// We use Route in order to define the different routes of our application
import { Route, Routes } from "react-router-dom";
 
// We import all the components we need in our app
import Navbar from "./components/navbar1";
import RecordList from "./components/proveedores/listaproveedores";
import Edit from "./components/proveedores/edit";
import Create from "./components/create";
import CrearProveedor from "./components/proveedores/createpr";
import Dashboard  from "./components/proveedores/dashboard";
import Login  from "./components/proveedores/login";
import Home  from "./components/proveedores/home.js";
const App = () => {
 return (
   <div>
     
     <Routes>
         <Route exact path="/" element={<Dashboard />}>
            <Route path="" element={<Home />} ></Route>
            <Route path="/edit/:id" element={<Edit />} ></Route>
            <Route path="/createpr" element={<CrearProveedor />} ></Route>
            <Route path="/create" element={<Create />} ></Route>
            <Route path="/recordList" element={<RecordList />} ></Route>
         </Route> 
    </Routes>

   </div>
 );
};
 
export default App;