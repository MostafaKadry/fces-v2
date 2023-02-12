import React from 'react';
import './App.css';
import Home from "./components/Home";
import ResponsiveAppBar from "./components/NavBar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AllRes from "./components/all-res"
import Sign from "./components/Sign";
import Register from "./components/Register";
import TreasuryDashbord from "./components/TreasuryDashbord";
import StickyHeadTable from "./components/ResDashbord";
import AdminDashbord from "./components/AdminDashbord";
function App() {
  return (
    <div className="App">     
          <Router>
      <ResponsiveAppBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/allres" element={<AllRes />} />
        <Route path="/sign" element={<Sign />} />
        <Route path="/register" element={<Register />} />
        <Route path="/res-dashbord" element={ <StickyHeadTable />}/>
        <Route path="/treasury" element={ <TreasuryDashbord /> } />
        <Route path="/admin-dashbord" element={ <AdminDashbord /> } />
        <Route path="*" element="Not Found" />
      </Routes>
      {/* <Footer /> */}
    </Router>
    </div>
  );
}

export default App;
