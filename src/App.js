import React, { useContext } from "react";
import { Navigate, Route, Routes, BrowserRouter, useLocation } from "react-router-dom";
import { LoginContext, LoginProvider } from "helpers/LoginContext";
import GlobalStyles from "./styles/GlobalStyles";
import Landing from "pages/Landing";
import Login from "pages/Login";
import SignupTourist from "pages/Signup";
import Testimonial from "pages/Testimonial";
import Destination from "pages/Destination";
import SignupTourGuide from "pages/SignupTourGuide";
import DestDetail from "pages/DestinationDetail";
import TourGuideDetail from "pages/TourGuideDetail";
import CityList from "pages/CityList";
import Payment from "pages/Payment";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import BookingList from "pages/BookingList";

function PrivateRoute({ element, ...props }) {
  const { loginData } = useContext(LoginContext);
  const location = useLocation();
  return loginData.isLoggedIn ? element : <Navigate to="/login" replace state={{ from: location.pathname }} />;
}

export default function App() {
  const stripePromise = loadStripe(
    "pk_test_51L0fDhGcs5kSb2FxB58ynuBgFpQl1hypWJFtT0VJT8Tq6MJXgZEWIkDscFFPDpuDvMhN5Kr50a8WMwvtNbQxzssT003szQG7E0"
  );
  return (
    <>
      <Elements stripe={stripePromise}>
        <LoginProvider>
          <GlobalStyles />
          <BrowserRouter>
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
              <Route path="/destination/tourguide/detail/:locationId/:userId" element={<PrivateRoute element={<TourGuideDetail />} />} />
              <Route path="/booking" element={<PrivateRoute element={<BookingList />} />} />
            </Routes>
          </BrowserRouter>
        </LoginProvider>
      </Elements>
    </>
  );
}