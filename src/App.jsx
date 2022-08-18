import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from 'pages/Home';
import Login from 'pages/Login';
import Admin from 'pages/admin/Admin';
import Doctor from 'pages/doctor/Doctor';
import SearchCase from 'pages/doctor/SearchCase';
import CaseMap from 'pages/doctor/CaseMap';
import Helper from 'pages/helper/Helper';
import RegisterCase from 'pages/helper/RegisterCase';
import NotFound from "pages/NotFound";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/doctor" element={<Doctor />} />
          <Route path="/doctor/searchcase" element={<SearchCase />} />
          <Route path="/doctor/casemap" element={<CaseMap />} />
          <Route path="/helper" element={<Helper />} />
          <Route path="/helper/registercase" element={<RegisterCase />} />
          <Route path="*" element={<NotFound />} />
        </Routes> 
      </BrowserRouter>
    </div>
  )
};

export default App;
