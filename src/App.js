import React from "react";
import GlobalStyles from "./styles/GlobalStyles";
import { css } from "styled-components/macro"; //eslint-disable-line
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "pages/Landing";
import Login from "pages/Login";
import SignupTourist from "pages/Signup";
import Testimonial from "pages/Testimonial";
import Destination from "pages/Destination";
import SignupTourGuide from "pages/SignupTourGuide";
import DestDetail from "pages/DestinationDetail.js";
import TourGuideDetail from "pages/TourGuideDetail";
import CityList from "pages/CityList";
import { LoginProvider } from "helpers/LoginContext";
import CheckoutFormDetail from "pages/Payment";
import Payment from "pages/Payment";
import CheckoutForm from "pages/CheckoutForm";

export default function App() {
  return (
    <>
      <LoginProvider>
        <GlobalStyles />
        <Router>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup-tourist" element={<SignupTourist />} />
            <Route path="/signup-tourguide" element={<SignupTourGuide />} />
            <Route path="/testimonial" element={<Testimonial />} />
            <Route path="/destination" element={<Destination />} />

            <Route path="/city" element={<CityList />} />
            <Route path="/city/:cityName" element={<Destination />} />
            <Route path="/destination/detail/:id" element={<DestDetail />} />
            <Route
              path="/destination/tourguide/detail/:locationId/:userId"
              element={<TourGuideDetail />}
            />
            <Route path="/paymentDetail" element={<Payment />} />

          </Routes>
        </Router>
      </LoginProvider>
    </>
  );
}
