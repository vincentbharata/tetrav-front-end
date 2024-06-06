import React from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import tw from "twin.macro";
import { css } from "styled-components/macro"; // eslint-disable-line
import { Link } from "react-router-dom";
import { SectionHeading } from "components/misc/Headings.js";
import { SectionDescription } from "components/misc/Typography.js";
import { Container, ContentWithPaddingXl } from "components/misc/Layouts.js";
import { ReactComponent as SvgDecoratorBlob1 } from "images/svg-decorator-blob-7.svg";
import { ReactComponent as SvgDecoratorBlob2 } from "images/svg-decorator-blob-8.svg";
import HeaderPage from "components/headers/header.js";
import Footer from "components/footers/PageFooter.js";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";

const Heading = tw(SectionHeading)`w-full`;
const Description = tw(SectionDescription)`w-full text-center`;

const Column = tw.div`flex flex-col items-center`;
const HeaderContent = tw.div``;

const CityListContainer = styled.dl`
  ${tw`mt-12 max-w-4xl relative`};
  min-width: 1000px;

  @media (max-width: 768px) {
    min-width: 100%;
  }
`;

const City = styled(Link)`
  ${tw`select-none mt-5 px-8 sm:px-10 py-5 sm:py-4 rounded-lg text-gray-800 bg-gray-200 transition duration-300 flex flex-col items-center`};
  text-decoration: none;
  &:hover {
    background-color: ${tw`bg-gray-300`};
  }
`;

const CityName = tw.dt`flex justify-center items-center`;
const CityNameText = tw.span`text-lg lg:text-xl font-semibold text-center`;
const Region = motion(
  tw.dd`pointer-events-none text-sm sm:text-base leading-relaxed mt-4 text-center`
);

const DecoratorBlob1 = styled(SvgDecoratorBlob1)`
  ${tw`pointer-events-none -z-20 absolute right-0 top-0 h-56 w-56 opacity-15 transform translate-x-2/3 -translate-y-12 text-teal-400`}
`;
const DecoratorBlob2 = styled(SvgDecoratorBlob2)`
  ${tw`pointer-events-none -z-20 absolute left-0 bottom-0 h-64 w-64 opacity-15 transform -translate-x-2/3 text-primary-500`}
`;

export default ({
  heading = "City List",
  description = "Choose your dream city and embark on a journey filled with excitement, culture, and unforgettable experiences.",
  cityList = [
    {
      cityName: "Bali",
      region: "Indonesia",
    },
    {
      cityName: "Jakarta",
      region: "Indonesia",
    },
    {
      cityName: "Yogyakarta",
      region: "Indonesia",
    },
    {
      cityName: "Surabaya",
      region: "Indonesia",
    },
  ],
}) => {
  return (
    <>
      <AnimationRevealPage>
        <Container>
          <HeaderPage roundedHeaderButton />
          <ContentWithPaddingXl>
            <Column>
              <HeaderContent>
                <Heading>{heading}</Heading>
                {description && <Description>{description}</Description>}
              </HeaderContent>
              <CityListContainer>
                {cityList.map((city, index) => (
                  <City key={index} to={`/destination/${city.cityName}`}>
                    <CityName>
                      <CityNameText>{city.cityName}</CityNameText>
                    </CityName>
                    <Region>{city.region}</Region>
                  </City>
                ))}
              </CityListContainer>
            </Column>
          </ContentWithPaddingXl>
          <DecoratorBlob1 />
          <DecoratorBlob2 />
        </Container>
      </AnimationRevealPage>
      <Footer />
    </>
  );
};
