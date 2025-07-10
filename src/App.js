import React from "react";
import "./App.css";
import Home from "./views/Home";
import Header from "./views/Header";
import Footer from "./views/Footer";
import Navbar from "./Navbar/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Skin from "./views/skin"
import Ayurveda from "./views/Ayurveda";
import Hair from "./views/Hair";
import Nutrition from "./views/Nutrition";
import Elderly from "./views/Elderly";
import Diabetes from "./views/Diabetes";
import JointPain from "./views/JointPain";
import Asthma from "./views/Asthma";
import Wellness from "./views/Wellness";

function App() {
  return (
    <div className="App">
     <Header />
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Skin" element={<Skin />} />
          <Route path="/Hair" element={<Hair />} />
          <Route path="/Ayurveda" element={<Ayurveda />} />
          <Route path="/Nutrition" element={<Nutrition />} />
          <Route path="/Elderly" element={<Elderly />} />
          <Route path="/Diabetes" element={<Diabetes />} />
          <Route path="/JointPain" element={<JointPain />} />
          <Route path="/Asthma" element={<Asthma />} />
          <Route path="/Wellness" element={<Wellness />} />
        </Routes>
      </BrowserRouter>
      {/* <Home />  */}
      <Footer />
    </div>
  );
}

export default App;
