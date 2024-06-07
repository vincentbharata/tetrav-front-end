import React, { useEffect } from "react";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import DestinationDesc from "components/destDetail/DestDesc";
import DestInfo from "components/destDetail/DestTourInfo";
import TourGuideCard from "components/destDetail/ListTourGuide";
import Forecast from "components/destDetail/WeatherForecast";
import Footer from "components/footers/PageFooter.js";
import DestPict from "components/destDetail/DestPict";
import { useParams } from "react-router-dom";
import axios from "axios";
import {useLocationState}  from "helpers/LocationContext";

export default () => {
  const { location, setLocation } = useLocationState();
  const { id } = useParams();

  useEffect(() => {
    const fetchLocation = async (id) => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/location/${id}`
        );
        setLocation(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("There was an error fetching the data!", error);
      }
    };

    if (id) {
      fetchLocation(id);
    }
  }, [id, setLocation]);

  // Ensure location data is fetched before rendering components
  if (!location) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <AnimationRevealPage>
        <DestinationDesc location={location} />
        {/* <DestInfo /> */}
        <DestPict location={location} textOnLeft={false} />
        <Forecast location={location} textOnLeft={false} />
        <TourGuideCard location={location} />
      </AnimationRevealPage>
      <Footer />
    </>
  );
};