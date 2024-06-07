import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro"; // eslint-disable-line
import { ReactComponent as StarIcon } from "feather-icons/dist/icons/star.svg";
import {useLocationState} from "helpers/LocationContext";

const Container = tw.div`relative -mx-8 -mt-8`;
const TwoColumn = tw.div`flex flex-col lg:flex-row bg-gray-100`;
const LeftColumn = tw.div`ml-8 mr-8 xl:pl-10 py-8`;
const RightColumn = styled.div`
  ${tw`bg-green-500 bg-cover xl:ml-24 h-96 lg:h-auto lg:w-1/2 lg:flex-1`}
`;

const Content = tw.div`mt-24 lg:mt-24 lg:mb-24 flex flex-col sm:items-center lg:items-stretch`;
const Heading = tw.h1`text-3xl sm:text-5xl md:text-6xl lg:text-5xl font-black leading-none`;
const Paragraph = tw.p`max-w-md my-8 lg:my-5 lg:my-8 sm:text-lg lg:text-base xl:text-lg leading-loose`;
const RatingsInfo = styled.div`
  ${tw`flex items-center sm:mt-2 sm:mt-0`}
  svg {
    ${tw`w-6 h-6 text-yellow-500 fill-current`}
  }
`;
const Rating = tw.span`ml-2 font-bold`;
const OveralRating = tw.span`mr-2 font-bold`;

export default () => {
  const [destData, setDestData] = useState(null);
  const { location} = useLocationState();
  console.log(location);
  return (
    <Container>
      <TwoColumn>
        <LeftColumn>
          <Content>
            <Heading>
              <>
                Find Your Perfect Destination
                <wbr />
                <br />
                <span tw="text-primary-500">{location.location.cityName}</span>
              </>
            </Heading>
            <Paragraph>{location.location.cityDesc}</Paragraph>
            <RatingsInfo>
              <OveralRating>Overall Rating: </OveralRating>
              <StarIcon />
              <Rating>{location.star}({location.total}) reviews</Rating>
            </RatingsInfo>
          </Content>
        </LeftColumn>
        <RightColumn>
          <img src={location.location.cityImage} alt={`${location.location.cityName} Image`} />
        </RightColumn>
      </TwoColumn>
    </Container>
  );
};