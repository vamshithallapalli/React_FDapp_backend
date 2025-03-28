import React from "react";
import LandingPage from "./merchantDashboard/pages/LandingPage";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import NotFound from "./merchantDashboard/components/NotFound";
const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default App;
