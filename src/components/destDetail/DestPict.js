import React, { useState, useEffect } from "react";
import axios from "axios";
import Slider from "react-slick";
import styled from "styled-components";
import tw from "twin.macro";
import { css } from "styled-components/macro"; //eslint-disable-line
import { PrimaryButton } from "../misc/Buttons.js";
import { ReactComponent as ChevronLeftIcon } from "feather-icons/dist/icons/chevron-left.svg";
import { ReactComponent as ChevronRightIcon } from "feather-icons/dist/icons/chevron-right.svg";
import { ReactComponent as SvgDecoratorBlob1 } from "../../images/svg-decorator-blob-4.svg";
import { ReactComponent as SvgDecoratorBlob2 } from "../../images/svg-decorator-blob-5.svg";
import "slick-carousel/slick/slick.css";

const Container = tw.div`relative`;
const Content = tw.div`max-w-screen-xl mx-auto py-20 lg:py-24`;
const TestimonialImageSlider = tw(Slider)``;
const ImageAndControlContainer = tw.div`relative outline-none`;

const Image = styled.div(props => [
  `background-image: url("${props.imageSrc}");`,
  tw`rounded-2xl bg-cover bg-center lg:h-144`
]);

const ControlContainer = tw.div`absolute bottom-0 right-0 bg-gray-100 px-6 py-4 rounded-tl-3xl border`;
const ControlButton = styled(PrimaryButton)`
  ${tw`mx-3 rounded-full text-gray-100 p-2`}
  svg {
    ${tw`w-5 h-5`}
  }
`;

const DecoratorBlob1 = tw(
  SvgDecoratorBlob1
)`absolute w-32 top-0 left-0 -z-10 text-primary-500 opacity-25 transform -translate-x-full`;
const DecoratorBlob2 = tw(
  SvgDecoratorBlob2
)`absolute w-32 bottom-0 right-0 -z-10 text-pink-500 opacity-15 transform translate-x-2/3 translate-y-8`;


export default function DestPict() {
  const [pict, setPict] = useState([]);
  const [imageSliderRef, setImageSliderRef] = useState(null);
  
  useEffect(() => {
    axios.get('YOUR_API_ENDPOINT')
      .then(response => {
        setPict(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the data!", error);
      });
  }, []);

  return (
    <Container>
      <Content>
        <TestimonialImageSlider arrows={false} ref={setImageSliderRef}>
          {pict.map((image, index) => (
            <ImageAndControlContainer key={index}>
              <Image imageSrc={image.imageSrc} />
              <ControlContainer>
                <ControlButton onClick={() => imageSliderRef?.slickPrev()}>
                  <ChevronLeftIcon />
                </ControlButton>
                <ControlButton onClick={() => imageSliderRef?.slickNext()}>
                  <ChevronRightIcon />
                </ControlButton>
              </ControlContainer>
            </ImageAndControlContainer>
          ))}
        </TestimonialImageSlider>
      </Content>
      <DecoratorBlob1 />
      <DecoratorBlob2 />
    </Container>
  );
}