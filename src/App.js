import React from "react";
import GlobalStyles from "./styles/GlobalStyles";
import { css } from "styled-components/macro"; //eslint-disable-line
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "pages/Landing";
import Login from "pages/Login";
import SignupTourist from "pages/Signup";
import Testimonial from "pages/Testimonial";
import Destination from "pages/Destination";



export default function App() {
  return (
    <>
      <GlobalStyles />
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/sign-up-tourist" element={<SignupTourist />} />
          <Route path="/testimonial" element={<Testimonial />} />
          <Route path="/destination" element={<Destination />} />
        </Routes>
      </Router>
    </>
  );
}
