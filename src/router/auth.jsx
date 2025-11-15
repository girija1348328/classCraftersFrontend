import { BrowserRouter, Routes, Route } from "react-router-dom";    
import React from "react";
import LoginPage from "../pages/login";

const AuthRoutes = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/auth" element={<LoginPage />} />
    </Routes>
  </BrowserRouter>
);

export default AuthRoutes;
