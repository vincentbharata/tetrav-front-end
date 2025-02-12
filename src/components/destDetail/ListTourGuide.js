import React, { useState, useEffect, useContext } from "react";
import Slider from "react-slick";
import tw from "twin.macro";
import styled from "styled-components";
import { SectionHeading } from "components/misc/Headings";
import { PrimaryButton as PrimaryButtonBase } from "components/misc/Buttons";
import { ReactComponent as LocationIcon } from "feather-icons/dist/icons/map-pin.svg";
import { ReactComponent as ChevronLeftIcon } from "feather-icons/dist/icons/chevron-left.svg";
import { ReactComponent as ChevronRightIcon } from "feather-icons/dist/icons/chevron-right.svg";
import axios from "axios";
import { useLocationState } from "helpers/LocationContext";
import { useNavigate } from "react-router-dom";

const Container = tw.div`relative`;
const Content = tw.div`max-w-screen-xl mx-auto py-10`;

const HeadingWithControl = tw.div`flex flex-col items-center sm:items-stretch sm:flex-row justify-between`;
const Heading = tw(SectionHeading)``;
const Controls = tw.div`flex items-center`;
const ControlButton = styled(PrimaryButtonBase)`
  ${tw`mt-4 sm:mt-0 first:ml-0 ml-6 rounded-full p-2`}
  svg {
    ${tw`w-6 h-6`}
  }
`;
const PrevButton = tw(ControlButton)``;
const NextButton = tw(ControlButton)``;

const CardSlider = styled(Slider)`
  ${tw`mt-16`}
  .slick-track {
    ${tw`flex`}
  }
  .slick-slide {
    ${tw`h-auto flex justify-center mb-1`}
  }
`;
const Card = tw.div`h-full flex! flex-col sm:border max-w-sm sm:rounded-tl-4xl sm:rounded-br-5xl relative focus:outline-none`;
const CardImage = styled.div((props) => [
  `background-image: url("${props.imageSrc}");`,
  tw`w-full h-56 sm:h-64 bg-cover bg-center rounded sm:rounded-none sm:rounded-tl-4xl`,
]);

const TextInfo = tw.div`py-6 sm:px-10 sm:py-6`;
const TitleReviewContainer = tw.div`flex flex-col sm:flex-row sm:justify-between sm:items-center`;
const Title = tw.h5`text-2xl font-bold`;

const Description = tw.p`text-sm leading-loose mt-2 sm:mt-4`;
const IconWithText = tw.div`flex items-center mr-2 my-2 sm:my-0`;
const IconContainer = styled.div`
  ${tw`inline-block rounded-full p-2 bg-gray-700 text-gray-100`}
  svg {
    ${tw`w-3 h-3`}
  }
`;
const Text = tw.div`ml-2 text-sm font-semibold text-gray-800`;

const PrimaryButton = tw(
  PrimaryButtonBase
)`mt-auto sm:text-lg rounded-none w-full rounded sm:rounded-none sm:rounded-br-4xl py-3 sm:py-6`;

export default () => {
  const [sliderRef, setSliderRef] = useState(null);
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { location } = useLocationState();
  const navigate = useNavigate();
  console.log(location);
  

  const sliderSettings = {
    arrows: false,
    slidesToShow: 3,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };


  useEffect(() => {
    if (location && location.location && location.location.cityName) {
      axios
        .get(
          `http://localhost:8080/api/tour-guide/location/${location.location.cityName}`
        )
        .then((response) => {
          console.log(response.data);
          setCards(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("There was an error fetching the data!", error);
          setError(error);
          setLoading(false);
        });
    }
  }, [location]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading tour guides.</div>;

  return (
    <Container>
      <Content>
        {cards != null ? (
          <>
            <HeadingWithControl>
              <Heading>Select Your Tour Guide</Heading>
              <Controls>
                <PrevButton onClick={() => sliderRef?.slickPrev()}>
                  <ChevronLeftIcon />
                </PrevButton>
                <NextButton onClick={() => sliderRef?.slickNext()}>
                  <ChevronRightIcon />
                </NextButton>
              </Controls>
            </HeadingWithControl>
            <CardSlider ref={setSliderRef} {...sliderSettings}>
              {cards.map((card, index) => (
                <Card key={index}>
                  <CardImage imageSrc={card.imageSrc} />
                  <TextInfo>
                    <TitleReviewContainer>
                      <Title>
                        {card.user.firstName} {card.user.lastName}
                      </Title>
                      <IconWithText>
                        <IconContainer>
                          <LocationIcon />
                        </IconContainer>
                        <Text>{card.tourLocation}</Text>
                      </IconWithText>
                    </TitleReviewContainer>
                    <Description>{card.tourDesc}</Description>
                  </TextInfo>
                  <PrimaryButton onClick={()=> navigate(`/destination/tourguide/detail/${location.location.id}/${card.id}`)}>Book Now</PrimaryButton>
                </Card>
              ))}
            </CardSlider>
          </>
        ) : (
          <p
            css={tw`text-primary-500 text-center mt-20 text-3xl flex justify-center items-center font-bold`}
          >
            Oops! Looks like your destination or city wasn't found.
            <br />
            Please try searching for another destination or city.
          </p>
        )}
      </Content>
    </Container>
  );
};
