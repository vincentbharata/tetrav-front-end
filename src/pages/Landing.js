import React from "react";
import styled from "styled-components";
import tw from "twin.macro";
//eslint-disable-next-line
import { css } from "styled-components/macro";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import Header from "components/headers/header.js";
import Features from "components/landing/LandingFeature.js";
import { ReactComponent as SvgDecoratorBlob1 } from "images/svg-decorator-blob-1.svg";
import DesignIllustration from "images/LandingHeaderImage.png";
import SliderCity from "components/landing/SliderCity.js";
import SliderPlace from "components/landing/PopularPlace.js";
import TourGuide from "components/landing/LandingTour";
import LandingTestimonial from "components/landing/LandingTestimonial";
import Footer from "components/footers/PageFooter.js";
import { Container } from "components/misc/Layouts";
// const Container = tw.div`relative`;
const TwoColumn = tw.div`flex flex-col lg:flex-row lg:items-center max-w-screen-xl mx-auto py-20 md:py-24`;
const LeftColumn = tw.div`relative lg:w-5/12 text-center max-w-lg mx-auto lg:max-w-none lg:text-left`;
const RightColumn = tw.div`relative mt-12 lg:mt-0 flex-1 flex flex-col justify-center lg:self-end`;

const Heading = tw.h1`font-bold text-3xl md:text-3xl lg:text-4xl xl:text-5xl text-gray-900 leading-tight`;
const Paragraph = tw.p`my-5 lg:my-8 text-base xl:text-lg`;

const Actions = styled.div`
  ${tw`relative max-w-md text-center mx-auto lg:mx-0`}
  input {
    ${tw`sm:pr-48 pl-8 py-4 sm:py-5 rounded-full border-2 w-full font-medium focus:outline-none transition duration-300  focus:border-primary-500 hover:border-gray-500`}
  }
  button {
    ${tw`w-full sm:absolute right-0 top-0 bottom-0 bg-primary-500 text-gray-100 font-bold mr-2 my-4 sm:my-2 rounded-full py-4 flex items-center justify-center sm:w-40 sm:leading-none focus:outline-none hover:bg-primary-900 transition duration-300`}
  }
`;

const IllustrationContainer = tw.div`flex justify-center lg:justify-end items-center`;

// Random Decorator Blobs (shapes that you see in background)
const DecoratorBlob1 = styled(SvgDecoratorBlob1)`
  ${tw`pointer-events-none opacity-5 absolute left-0 bottom-0 h-64 w-64 transform -translate-x-2/3 -z-10`}
`;

export default ({ roundedHeaderButton }) => {
  const HighlightedText = tw.span`text-primary-500`;
  return (
    <>
      <AnimationRevealPage>
        <Header roundedHeaderButton={roundedHeaderButton} />
        <Container>
          <TwoColumn>
            <LeftColumn>
              <Heading>
                Discover Your World With{" "}
                <span tw="text-primary-500">TETRAV</span>
              </Heading>
              <Paragraph>
                Unlock New Destinations, Embrace Every Adventure With Ultimate
                Personalized Tour Guide for Memorable Journeys!
              </Paragraph>
              <Actions>
                <input
                  type="text"
                  placeholder="Type City, Place, Tour Guide "
                />
                <button>Search</button>
              </Actions>
            </LeftColumn>
            <RightColumn>
              <IllustrationContainer>
                <img
                  tw="min-w-0 w-full max-w-lg xl:max-w-3xl"
                  src={DesignIllustration}
                  alt="Design Illustration"
                />
              </IllustrationContainer>
            </RightColumn>
          </TwoColumn>
          <DecoratorBlob1 />
          <SliderCity />

          <Features
            heading={
              <>
                We Have <HighlightedText>Amazing</HighlightedText> Features.
              </>
            }
          />
          <SliderPlace />
          <TourGuide
            heading={
              <>
                Meet Your<HighlightedText> Tour Guides </HighlightedText>
              </>
            }
          />
          <LandingTestimonial />
        </Container>
      </AnimationRevealPage>
      <Footer />
    </>
  );
};