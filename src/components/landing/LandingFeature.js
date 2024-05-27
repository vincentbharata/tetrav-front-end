import React from "react";
import styled from "styled-components";
import tw from "twin.macro";
//eslint-disable-next-line
import { css } from "styled-components/macro";
import { SectionHeading } from "components/misc/Headings.js";
import { SectionDescription } from "components/misc/Typography.js";

import defaultCardImage from "images/shield-icon.svg";

import { ReactComponent as SvgDecoratorBlob3 } from "images/svg-decorator-blob-3.svg";
import IconChat from "images/icon-chat.png";
import IconWeather from "images/icon-weather.png";
import IconRating from "images/Icon-rating.png";
import IconAir from "images/icon-air-quality.png";
import IconPlanning from "images/icon-planning.png";
import IconHistory from "images/Icon-history.png";

const Container = tw.div`relative`;

const ThreeColumnContainer = styled.div`
  ${tw`flex flex-col items-center md:items-stretch md:flex-row flex-wrap md:justify-center max-w-screen-lg mx-auto py-20 md:py-24`}
`;

const Heading = tw(SectionHeading)`w-full`;
const Description = tw(SectionDescription)`w-full text-center`;

const VerticalSpacer = tw.div`mt-10 w-full`;

const Column = styled.div`
  ${tw`md:w-1/2 lg:w-1/3 max-w-sm`}
`;

const Card = styled.div`
  ${tw`flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left h-full mx-4 px-2 py-8`}
  .imageContainer {
    ${tw`border text-center rounded-full p-5 flex-shrink-0`}
    img {
      ${tw`w-6 h-6`}
    }
  }

  .textContainer {
    ${tw`sm:ml-4 mt-4 sm:mt-2`}
  }

  .title {
    ${tw`mt-4 tracking-wide font-bold text-lg leading-none`}
  }

  .description {
    ${tw`mt-1 sm:mt-4 font-medium text-secondary-100 leading-loose`}
  }
`;

const DecoratorBlob = styled(SvgDecoratorBlob3)`
  ${tw`pointer-events-none absolute right-0 bottom-0 w-64 opacity-25 transform translate-x-32 translate-y-48 `}
`;

export default ({
  cards = null,
  heading = "",
  description = "Discover our impressive features!",
}) => {
  /*
   * This componets has an array of object denoting the cards defined below. Each object in the cards array can have the key (Change it according to your need, you can also add more objects to have more cards in this feature component) or you can directly pass this using the cards prop:
   *  1) imageSrc - the image shown at the top of the card
   *  2) title - the title of the card
   *  3) description - the description of the card
   *  If a key for a particular card is not provided, a default value is used
   */

  const defaultCards = [
    {
      imageSrc: IconChat,
      title: "Live Chat",
      description:
        "Stay connected with our Live Chat feature, where you can engage directly with your personal Tour Guide in real-time.",
    },
    {
      imageSrc: IconRating,
      title: "Reviews & Rating",
      description:
        "Elevate your travel experience with our Rating Feature, empowering you to share valuable feedback on your tour guides and destinations.",
    },
    {
      imageSrc: IconAir,
      title: "Air Quality",
      description:
        "Elevate your travel experience with our Air Quality Index feature. Stay informed and safeguard your health by monitoring air quality levels at your destination in real-time",
    },
    {
      imageSrc: IconPlanning,
      title: "Custom Itinerary",
      description:
        "Empower your wanderlust with our Custom Itinerary feature, putting the reins of your travel experience firmly in your hands",
    },
    {
      imageSrc: IconWeather,
      title: "Weather Forecast",
      description:
        "Plan your adventures with confidence using our Weather Forecast feature, stay informed about current and upcoming weather conditions for your chosen destinations.",
    },
    {
      imageSrc: IconHistory,
      title: "Travel Tracker",
      description:
        "Document every adventure with our Travel Tracker feature, an essential tool for travelers to keep track of and immortalize every detail of their journeys.",
    },
  ];

  if (!cards) cards = defaultCards;

  return (
    <Container>
      <ThreeColumnContainer>
        <Heading>{heading}</Heading>
        {description && <Description>{description}</Description>}
        <VerticalSpacer />
        {cards.map((card, i) => (
          <Column key={i}>
            <Card>
              <span className="imageContainer">
                <img src={card.imageSrc || defaultCardImage} alt="" />
              </span>
              <span className="textContainer">
                <span className="title">{card.title || "Fully Secure"}</span>
                <p className="description">{card.description}</p>
              </span>
            </Card>
          </Column>
        ))}
      </ThreeColumnContainer>
      <DecoratorBlob />
    </Container>
  );
};
