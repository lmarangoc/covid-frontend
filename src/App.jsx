import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import Login from './pages/Login';
import Admin from './pages/admin/Admin';
import Doctor from './pages/doctor/Doctor';
import Helper from './pages/helper/Helper';
import NotFound from "./pages/NotFound";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/doctor" element={<Doctor />} />
          <Route path="/helper" element={<Helper />} />
          <Route path="*" element={<NotFound />} />
        </Routes> 
      </BrowserRouter>
    </div>
  )
};

export default App;
