import React, { useState } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { SectionHeading } from "components/misc/Headings.js";
import { SectionDescription } from "components/misc/Typography.js";
import { Container, ContentWithPaddingXl } from "components/misc/Layouts.js";
import { ReactComponent as StarIcon } from "images/star-icon.svg";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import Header from "components/headers/header.js";
import Footer from "components/footers/PageFooter.js";

const Heading = tw(SectionHeading)`w-full`;
const Description = tw(SectionDescription)`w-full text-center`;

const Column = tw.div`flex flex-col items-center`;
const HeaderContent = tw.div``;
const CardRatingContainer = tw.div`inline-flex absolute right-0  rounded-full px-10 py-2 items-center ml-auto`;

const CardRating = styled.div`
  ${tw`mr-1 text-sm font-bold flex items-center`}
  svg {
    ${tw`w-4 h-4 fill-current text-orange-400 mr-1`}
  }
`;


const TestimonialSContainer = tw.dl`mt-12 min-w-full max-w-4xl relative p-4 mx-2`;
const CustomerProfilePicture = tw.img`rounded-full w-8 h-8 sm:w-10 sm:h-10`;

const Testimonial = tw.div`cursor-pointer select-none mt-5 px-8 sm:px-10 py-5 sm:py-4 rounded-lg text-gray-800 hover:text-gray-900 bg-gray-200 hover:bg-gray-300 transition duration-300`;
const Customer = tw.dt`flex  items-center space-x-4`;
const CustomerText = tw.span`text-lg lg:text-xl font-semibold`;
const Answer = tw.dd`pointer-events-none text-sm sm:text-base leading-relaxed mt-4`;

const DecoratorBlob1 = tw.div`pointer-events-none -z-20 absolute right-0 top-0 h-56 w-56 opacity-15 transform translate-x-2/3 -translate-y-12 text-teal-400`;
const DecoratorBlob2 = tw.div`pointer-events-none -z-20 absolute left-0 bottom-0 h-64 w-64 opacity-15 transform -translate-x-2/3 text-primary-500`;

const PaginationContainer = tw.div`flex mt-8`;
const PageNumber = tw.span`cursor-pointer select-none px-3 py-1 mx-1 rounded-full text-gray-800 bg-gray-200 hover:bg-gray-300`;

export default ({
  heading = "What Our Customers Say",
  description = "We value our customers' feedback. Here are some of their testimonials.",
  testimonials = [
    {
      "customerName": "Alice Johnson",
      "quote": "Outstanding product quality and fast delivery!",
      "stars": 5,
      "profileImageSrc": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=512&h=512&q=80",
    },
    {
      "customerName": "Alice Johnson",
      "quote": "Outstanding product quality and fast delivery!",
      "stars": 5,
      "profileImageSrc": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=512&h=512&q=80",
    },
    {
      "customerName": "Michael Brown",
      "quote": "Very satisfied with the customer service.",
      "stars": 4,
      "profileImageSrc": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=512&h=512&q=80",
    },
    {
      "customerName": "Emily Davis",
      "quote": "Great value for money, highly recommend!",
      "stars": 5,
      "profileImageSrc": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=512&h=512&q=80",
    },
    {
      "customerName": "Daniel Wilson",
      "quote": "Friendly staff and excellent support.",
      "stars": 4,
      "profileImageSrc": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=512&h=512&q=80",
    },
    {
      "customerName": "Sophia Martinez",
      "quote": "The best shopping experience I've had!",
      "stars": 5,
      "profileImageSrc": "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=512&h=512&q=80",
    },
    {
      "customerName": "David Anderson",
      "quote": "Quick and easy purchase process.",
      "stars": 4,
      "profileImageSrc": "https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=512&h=512&q=80",
    },
    {
      "customerName": "Olivia Thomas",
      "quote": "Highly professional and reliable service.",
      "stars": 5,
      "profileImageSrc": "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=512&h=512&q=80",
    },
    {
      "customerName": "James Garcia",
      "quote": "Amazing deals and great discounts.",
      "stars": 4,
      "profileImageSrc": "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=512&h=512&q=80",
    }
  ]
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 5;
  const totalReviews = testimonials.length;
  const totalPages = Math.ceil(totalReviews / reviewsPerPage);

  // Get current reviews
  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentReviews = testimonials.slice(indexOfFirstReview, indexOfLastReview);

  // Change page
  const handleClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Generate pagination numbers
  const renderPageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNumber => (
    <PageNumber
      key={pageNumber}
      onClick={() => handleClick(pageNumber)}
      css={currentPage === pageNumber ? tw`bg-primary-500 text-white` : tw`bg-gray-200`}
    >
      {pageNumber}
    </PageNumber>
  ));

  return (
    <>
    <AnimationRevealPage>
      <Header roundedHeaderButton />
    <Container>
      <ContentWithPaddingXl>
        <Column>
          <HeaderContent>
            <Heading>{heading}</Heading>
            {description && <Description>{description}</Description>}
          </HeaderContent>
          <TestimonialSContainer>
            {currentReviews.map((testimonial, index) => (
              <Testimonial key={index} className="group">
                <Customer>
                <CustomerProfilePicture src={testimonial.profileImageSrc} alt={testimonial.customerName} />
                  <CustomerText>{testimonial.customerName}</CustomerText>
                  <CardRatingContainer>
                    <CardRating>
                      <StarIcon />
                      {testimonial.stars}
                    </CardRating>
                  </CardRatingContainer>
                </Customer>
                <Answer>
                  {testimonial.quote}
                </Answer>
              </Testimonial>
            ))}
          </TestimonialSContainer>
          <PaginationContainer>
            {renderPageNumbers}
          </PaginationContainer>
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
