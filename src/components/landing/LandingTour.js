import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, ContentWithPaddingXl } from "components/misc/Layouts";
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro";
import { SectionHeading } from "components/misc/Headings";
import { SectionDescription } from "components/misc/Typography";
import { ReactComponent as SvgDotPatternIcon } from "images/dot-pattern.svg";

const HeadingContainer = tw.div`text-center`;
const Heading = tw(SectionHeading)``;
const Description = tw(SectionDescription)`mx-auto`;

const Guides = tw.div`mt-12 flex flex-wrap -mr-3 relative`;
const Guide = tw.a`flex flex-col h-full bg-gray-200 rounded overflow-hidden shadow-lg transition duration-300 transform hover:scale-105`;
const GuideImage = styled.div`
  ${(props) =>
    css`
      background-image: url("${props.imageSrc}");
    `}
  ${tw`h-64 sm:h-80 bg-center bg-cover`}
`;
const GuideText = tw.div`flex-1 p-6`;
const GuideName = tw.h6`font-bold group-hover:text-primary-500 transition duration-300`;
const GuideDescription = tw.p``;
const GuideTextInfo = tw.div`text-sm text-gray-600`;
const GuideInfo = tw.div`flex items-center mt-4`;
const GuideProfileImage = tw.img`w-10 h-10 rounded-full mr-3`;
const Location = tw.div`font-semibold text-gray-900`;

const GuideContainer = styled.div`
  ${tw`relative z-20 mt-10 sm:pt-3 pr-3 w-full sm:w-1/2 lg:w-1/3 max-w-sm mx-auto sm:max-w-none sm:mx-0`}

  ${(props) =>
    props.featured &&
    css`
      ${tw`w-full lg:w-2/3`}
      ${Guide} {
        ${tw`sm:flex-row items-center sm:pr-3`}
      }
      ${GuideImage} {
        ${tw`sm:h-80 sm:min-h-full w-full sm:w-1/2 rounded-t sm:rounded-t-none sm:rounded-l`}
      }
      ${GuideText} {
        ${tw`pl-8 pr-5`}
      }
      ${GuideName} {
        ${tw`text-2xl`}
      }
      ${GuideDescription} {
        ${tw`mt-4 text-sm font-semibold text-gray-600 leading-relaxed`}
      }
      ${GuideInfo} {
        ${tw`mt-8 flex items-center`}
      }
      ${Location} {
        ${tw`mt-0 font-bold text-gray-700 text-sm`}
      }
    `}
`;

const DecoratorBlob1 = tw(
  SvgDotPatternIcon
)`absolute bottom-0 left-0 w-32 h-32 mb-3 ml-3 transform -translate-x-1/2 translate-y-1/2 fill-current text-gray-500 opacity-50`;
const DecoratorBlob2 = tw(
  SvgDotPatternIcon
)`absolute top-0 right-0 w-32 h-32 mt-16 mr-6 transform translate-x-1/2 -translate-y-1/2 fill-current text-gray-500 opacity-50`;

const useWindowSize = () => {
  const [size, setSize] = useState([0, 0]);
  useEffect(() => {
    const updateSize = () => {
      setSize([window.innerWidth, window.innerHeight]);
    };
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);
  return size;
};

const GuideSection = ({
  subheading = "",
  heading = "We love writing.",
  description = "",
}) => {
  const [guides, setGuides] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/tour-guide/list")
      .then((response) => {
        console.log(response.data);
        setGuides(response.data);
      })
      .catch((error) => {
        console.error("Error fetching guides: ", error);
      });
    
  }, []);

  const [currentGuides, setCurrentGuides] = useState(guides);
  const [width] = useWindowSize();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentGuides((prevGuides) => {
        let shuffledGuides = [...prevGuides].sort(() => Math.random() - 0.5);
        return shuffledGuides;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [guides]);

  const getDisplayedGuides = () => {
    if (width < 640) {
      return guides.slice(0, 1);
    } else if (width < 1024) {
      return guides.slice(0, 2);
    } else {
      return guides.slice(0, 3);
    }
  };

  return (
    <Container>
      <ContentWithPaddingXl>
        <HeadingContainer>
          {heading && <Heading>{heading}</Heading>}
          {description && <Description>{description}</Description>}
        </HeadingContainer>
        <Guides>
          {getDisplayedGuides().map((guide, index) => (
            <GuideContainer
              featured={guide.featured}
              key={index}
              className={`w-full sm:w-1/2 lg:w-1/3`}
            >
              <Guide className="group" href={guide.url}>
                <GuideImage imageSrc={guide.guideProfile} />
                <GuideText>
                  <GuideName>{guide.user.firstName} {guide.user.lastName}</GuideName>
                  <GuideInfo>
                    {guide.featured && (
                      <GuideProfileImage src={guide.GuideProfileImageSrc} />
                    )}
                    <GuideTextInfo>
                      <Location>{guide.tourLocation}</Location>
                    </GuideTextInfo>
                  </GuideInfo>
                </GuideText>
              </Guide>
            </GuideContainer>
          ))}
          <DecoratorBlob1 />
          <DecoratorBlob2 />
        </Guides>
      </ContentWithPaddingXl>
    </Container>
  );
};

export default GuideSection;
