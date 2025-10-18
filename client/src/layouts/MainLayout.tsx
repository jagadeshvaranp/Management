import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Products from "../pages/Products";
import Invortry from "../pages/Invortry";
import Header from "../components/Header";
import Dashboard from "../pages/Dashboard";
import Addnew from "../pages/Addnew";

function MainLayout() {
  return (

    <BrowserRouter>
     
      <div className="flex min-h-screen bg-gray-100">
        <Sidebar />

        <main className="flex-1  w-full md:w-4/5">
         <Header />
          <Routes>
             <Route path="/Dashboard" element={< Dashboard/>}></Route>
            <Route path="/" element={<Navigate to="/products" />} />
            
            <Route path="/products" element={<Products />} />
            <Route path="/Invortry" element={<Invortry />} />
            <Route path="/Addnew" element={<Addnew />} />
           
          </Routes>
        </main>
      </div>
      
    </BrowserRouter>
  );
}
export default MainLayout;
