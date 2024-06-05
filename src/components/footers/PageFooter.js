import React from "react";
import tw from "twin.macro";
import styled from "styled-components";
import { PrimaryLink as PrimaryLinkBase } from "components/misc/Links.js"; // Make sure this path is correct
import LogoImage from "images/logo-light.svg";
import { ReactComponent as SvgDecoratorBlob1 } from "images/svg-decorator-blob-9.svg";

const Container = tw.div`relative bg-primary-500 text-gray-100 -mb-8 -mx-8 px-8 py-20 lg:py-24 max-w-full mx-auto`;
const PrimaryLink = styled(PrimaryLinkBase)`
  ${tw`inline-flex justify-center xl:justify-start items-center mt-8 text-2xl text-red-500 font-bold underline`}
  svg {
    ${tw`ml-2 w-5 h-5`}
  }
`;

const ThreeColRow = tw.div`flex flex-col md:flex-row items-center justify-between`;

const LogoContainer = tw.div`flex items-center justify-center md:justify-start`;
const LogoImg = tw.img`w-8`;
const LogoText = tw.h5`ml-2 text-xl font-black tracking-wider text-gray-100`;

const CopywrightNotice = tw.p`text-center text-sm sm:text-base mt-8 md:mt-0 font-medium text-gray-400`;


export default () => {
  return (
    <Container>
      <ThreeColRow>
        <LogoContainer>
          <LogoImg src={LogoImage} />
          <LogoText>TETRAV.</LogoText>
        </LogoContainer>
        <CopywrightNotice> Discover Your World With TETRAV</CopywrightNotice>

        <PrimaryLinkBase href="/signup-tourguide">
          <PrimaryLink>Careers</PrimaryLink>
        </PrimaryLinkBase>
      </ThreeColRow>
    </Container>
  );
};
