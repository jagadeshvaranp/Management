import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Categories from "../pages/Categories";
import Sidebar from "../components/Sidebar";
import Products from "../pages/Products";
import Orders from "../pages/Orders";
import Header from "../components/Header";
import Footer from "../components/Footer";

function MainLayout() {
  return (
    <BrowserRouter>
     
      <div className="flex min-h-screen bg-gray-100">
        <Sidebar />

        <main className="flex-1  w-full md:w-4/5">
         <Header />
          <Routes>
             <Route path="cate"></Route>
            <Route path="/" element={<Navigate to="/products" />} />
            <Route path="/products" element={<Products />} />
            <Route path="/orders" element={<Orders />} />
           
          </Routes>
        </main>
      </div>
      
    </BrowserRouter>
  );
}
export default MainLayout;
