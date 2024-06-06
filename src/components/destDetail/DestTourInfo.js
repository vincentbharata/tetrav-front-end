import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import tw from "twin.macro";
import { css } from "styled-components/macro"; //eslint-disable-line
import { Container, ContentWithPaddingXl } from "components/misc/Layouts.js";
import DurationIconImage from "components/icon/time_fill.svg";
import LocationIconImage from "components/icon/location.svg";
import CompassImage from "components/icon/compass_light.svg";
import { ReactComponent as SvgDecoratorBlob3 } from "images/svg-decorator-blob-3.svg";

const ThreeColumnContainer = styled.div`
  ${tw`mt-10 flex flex-col items-center lg:items-stretch lg:flex-row flex-wrap lg:justify-center max-w-screen-lg mx-auto`}
`;
const Column = styled.div`
  ${tw`lg:w-1/4 max-w-xs`}
`;

const Card = styled.a`
  ${tw`flex flex-col items-center text-center h-full mx-4 px-4 py-8 rounded transition-transform duration-300`}
  .imageContainer {
    ${tw`text-center rounded-full p-4 bg-gray-100`}
    img {
      ${tw`w-8 h-8`}
    }
  }

  .title {
    ${tw`mt-4 font-bold text-xl leading-none`}
  }

  .description {
    ${tw`mt-4 text-sm font-medium text-secondary-300`}
  }

  .link {
    ${tw`mt-auto inline-flex items-center pt-5 text-sm font-bold text-primary-300 leading-none hocus:text-primary-900 transition duration-300`}
    .icon {
      ${tw`ml-2 w-4`}
    }
  }
`;

const DecoratorBlob = styled(SvgDecoratorBlob3)`
  ${tw`pointer-events-none absolute right-0 bottom-0 w-64 opacity-25 transform translate-x-32 translate-y-40`}
`;

export default ({
  cards = [
    {
      imageSrc: LocationIconImage,
      title: "Bali",
    },
    {
      imageSrc: CompassImage,
      title: "Walking Tour",
    },
    {
      imageSrc: DurationIconImage,
      title: "5 hours",
    },
  ],
  imageContainerCss = null,
  imageCss = null
}) => {
  const [fetchedCards, setFetchedCards] = useState([]);

  useEffect(() => {
    axios.get('YOUR_API_ENDPOINT')
      .then(response => {
        setFetchedCards(response.data.cards);
      })
      .catch(error => {
        console.error("There was an error fetching the data!", error);
      });
  }, []);

  const cardsToDisplay = fetchedCards.length > 0 ? fetchedCards : cards;

  return (
    <Container>
      <ContentWithPaddingXl>
        <ThreeColumnContainer>
          {cardsToDisplay.map((card, i) => (
            <Column key={i}>
              <Card href={card.url}>
                <span className="imageContainer" css={imageContainerCss}>
                  <img src={card.imageSrc} css={imageCss} alt={card.title} />
                </span>
                <span className="title">{card.title}</span>
                {card.description && <span className="description">{card.description}</span>}
              </Card>
            </Column>
          ))}
        </ThreeColumnContainer>
      </ContentWithPaddingXl>
      <DecoratorBlob />
    </Container>
  );
};
