import React from "react";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import DestinationDesc from "components/destDetail/DestDesc";
import DestInfo from "components/destDetail/DestTourInfo";
import TourGuideCard from "components/destDetail/ListTourGuide";
import DestinationPict from "components/destDetail/DestPict";
import Footer from "components/footers/PageFooter.js";

export default () => (
    <>
        <AnimationRevealPage>
            <DestinationDesc />
            <DestInfo />
            <DestinationPict textOnLeft={false}/>
            <TourGuideCard />
        </AnimationRevealPage>
        <Footer />
    </>
);