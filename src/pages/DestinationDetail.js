import React from "react";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import DestinationDesc from "components/destDetail/DestDesc";
import DestInfo from "components/destDetail/DestTourInfo";
import TourGuideCard from "components/destDetail/ListTourGuide";
import Forecast from "components/destDetail/WeatherForecast";
import Footer from "components/footers/PageFooter.js";
import DestPict from "components/destDetail/DestPict";

export default () => (
    <>
        <AnimationRevealPage>
            <DestinationDesc />
            {/* <DestInfo /> */}
            <DestPict textOnLeft={false}/>
            <Forecast textOnLeft={false}/>
            <TourGuideCard />
        </AnimationRevealPage>
        <Footer />
    </>
);