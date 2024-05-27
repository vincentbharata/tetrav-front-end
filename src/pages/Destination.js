import React, { useState } from "react";
import { motion } from "framer-motion";
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro";
import { Container, ContentWithPaddingXl } from "components/misc/Layouts.js";
import { SectionHeading } from "components/misc/Headings.js";
import { PrimaryButton as PrimaryButtonBase } from "components/misc/Buttons.js";
import { ReactComponent as StarIcon } from "images/star-icon.svg";
import { ReactComponent as SvgDecoratorBlob1 } from "images/svg-decorator-blob-5.svg";
import { ReactComponent as SvgDecoratorBlob2 } from "images/svg-decorator-blob-7.svg";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import HeaderPage from "components/headers/header.js";
import Footer from "components/footers/PageFooter.js";


const HeaderContainer = tw.div`text-center`;
const Header = tw(SectionHeading)``;

const TabContent = tw(
  motion.div
)`mt-6 flex flex-wrap sm:-mr-10 md:-mr-6 lg:-mr-12`;
const CardContainer = tw.div`mt-10 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 sm:pr-10 md:pr-6 lg:pr-12`;
const Card = tw(
  motion.a
)`bg-gray-200 rounded-b block max-w-xs mx-auto sm:max-w-none sm:mx-0`;
const CardImageContainer = styled.div`
  ${(props) =>
    css`
      background-image: url("${props.imageSrc}");
    `}
  ${tw`h-56 xl:h-64 bg-center bg-cover relative rounded-t`}
`;
const CardRatingContainer = tw.div`leading-none absolute inline-flex bg-gray-100 bottom-0 left-0 ml-4 mb-4 rounded-full px-5 py-2 items-end`;
const CardRating = styled.div`
  ${tw`mr-1 text-sm font-bold flex items-end`}
  svg {
    ${tw`w-4 h-4 fill-current text-orange-400 mr-1`}
  }
`;

const CardHoverOverlay = styled(motion.div)`
  background-color: rgba(255, 255, 255, 0.5);
  ${tw`absolute inset-0 flex justify-center items-center`}
`;
const CardButton = tw(PrimaryButtonBase)`text-sm`;

const CardReview = tw.div`font-medium text-xs text-gray-600`;

const CardText = tw.div`p-4 text-gray-900`;
const CardTitle = tw.h5`text-lg font-semibold group-hover:text-primary-500`;
const CardContent = tw.p`mt-1 text-sm font-medium text-gray-600`;
const CardPrice = tw.p`mt-4 text-xl font-bold`;

const DecoratorBlob1 = styled(SvgDecoratorBlob1)`
  ${tw`pointer-events-none -z-20 absolute right-0 top-0 h-64 w-64 opacity-15 transform translate-x-2/3 -translate-y-12 text-pink-400`}
`;
const DecoratorBlob2 = styled(SvgDecoratorBlob2)`
  ${tw`pointer-events-none -z-20 absolute left-0 bottom-0 h-80 w-80 opacity-15 transform -translate-x-2/3 text-primary-500`}
`;

const PaginationContainer = tw.div`flex mt-8 justify-center`;
const PageNumber = tw.span`cursor-pointer select-none px-3 py-1 mx-1 rounded-full text-gray-800 bg-gray-200 hover:bg-gray-300`;

const cards = [
  {
    imageSrc:
      "https://images.unsplash.com/photo-1553194587-b010d08c6c56?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=768&q=80",
    placeName: "Taman Nasional Bromo",
    placeLocation: "Probolinggo, Jawa Timur",
    price: "  30",
    rating: "4.8",
    reviews: "120",
    url: "#",
  },
  {
    imageSrc:
      "https://images.unsplash.com/photo-1553194587-b010d08c6c56?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=768&q=80",
    placeName: "Kawah Ijen",
    placeLocation: "Banyuwangi, Jawa Timur",
    price: "  100",
    rating: "4.7",
    reviews: "98",
    url: "#",
  },
  {
    imageSrc:
      "https://images.unsplash.com/photo-1553194587-b010d08c6c56?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=768&q=80",
    placeName: "Pantai Kuta",
    placeLocation: "Bali",
    price: " 20",
    rating: "4.5",
    reviews: "150",
    url: "#",
  },
  {
    imageSrc:
      "https://images.unsplash.com/photo-1553194587-b010d08c6c56?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=768&q=80",
    placeName: "Gunung Rinjani",
    placeLocation: "Lombok, Nusa Tenggara Barat",
    price: "  150",
    rating: "4.9",
    reviews: "110",
    url: "#",
  },
  {
    imageSrc:
      "https://images.unsplash.com/photo-1553194587-b010d08c6c56?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=768&q=80",
    placeName: "Candi Borobudur",
    placeLocation: "Magelang, Jawa Tengah",
    price: "  30",
    rating: "4.8",
    reviews: "135",
    url: "#",
  },
  {
    imageSrc:
      "https://images.unsplash.com/photo-1553194587-b010d08c6c56?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=768&q=80",
    placeName: "Pantai Sanur",
    placeLocation: "Bali",
    price: " 20",
    rating: "4.4",
    reviews: "102",
    url: "#",
  },
  {
    imageSrc:
      "https://images.unsplash.com/photo-1553194587-b010d08c6c56?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=768&q=80",
    placeName: "Gunung Merapi",
    placeLocation: "Yogyakarta, Jawa Tengah",
    price: "  25",
    rating: "4.7",
    reviews: "105",
    url: "#",
  },
  {
    imageSrc:
      "https://images.unsplash.com/photo-1553194587-b010d08c6c56?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=768&q=80",
    placeName: "Pulau Tidung",
    placeLocation: "Kepulauan Seribu, Jakarta",
    price: "  200",
    rating: "4.5",
    reviews: "92",
    url: "#",
  },
  {
    imageSrc:
      "https://images.unsplash.com/photo-1553194587-b010d08c6c56?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=768&q=80",
    placeName: "Taman Safari Indonesia",
    placeLocation: "Bogor, Jawa Barat",
    price: "  250",
    rating: "4.6",
    reviews: "125",
    url: "#",
  },
  {
    imageSrc:
      "https://images.unsplash.com/photo-1553194587-b010d08c6c56?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=768&q=80",
    placeName: "Dieng Plateau",
    placeLocation: "Wonosobo, Jawa Tengah",
    price: "  50",
    rating: "4.7",
    reviews: "95",
    url: "#",
  },
  {
    imageSrc:
      "https://images.unsplash.com/photo-1553194587-b010d08c6c56?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=768&q=80",
    placeName: "Pulau Menjangan",
    placeLocation: "Bali",
    price: "  200",
    rating: "4.8",
    reviews: "110",
    url: "#",
  },
  {
    imageSrc:
      "https://images.unsplash.com/photo-1553194587-b010d08c6c56?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=768&q=80",
    placeName: "Candi Borobudur",
    placeLocation: "Magelang, Jawa Tengah",
    price: "  30",
    rating: "4.8",
    reviews: "135",
    url: "#",
  },
  {
    imageSrc:
      "https://images.unsplash.com/photo-1553194587-b010d08c6c56?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=768&q=80",
    placeName: "Pantai Sanur",
    placeLocation: "Bali",
    price: " 20",
    rating: "4.4",
    reviews: "102",
    url: "#",
  },
  {
    imageSrc:
      "https://images.unsplash.com/photo-1553194587-b010d08c6c56?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=768&q=80",
    placeName: "Gunung Merapi",
    placeLocation: "Yogyakarta, Jawa Tengah",
    price: "  25",
    rating: "4.7",
    reviews: "105",
    url: "#",
  },
  {
    imageSrc:
      "https://images.unsplash.com/photo-1553194587-b010d08c6c56?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=768&q=80",
    placeName: "Pulau Tidung",
    placeLocation: "Kepulauan Seribu, Jakarta",
    price: "  200",
    rating: "4.5",
    reviews: "92",
    url: "#",
  },
  {
    imageSrc:
      "https://images.unsplash.com/photo-1553194587-b010d08c6c56?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=768&q=80",
    placeName: "Taman Safari Indonesia",
    placeLocation: "Bogor, Jawa Barat",
    price: "  250",
    rating: "4.6",
    reviews: "125",
    url: "#",
  },
  {
    imageSrc:
      "https://images.unsplash.com/photo-1553194587-b010d08c6c56?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=768&q=80",
    placeName: "Dieng Plateau",
    placeLocation: "Wonosobo, Jawa Tengah",
    price: "  50",
    rating: "4.7",
    reviews: "95",
    url: "#",
  },
  {
    imageSrc:
      "https://images.unsplash.com/photo-1553194587-b010d08c6c56?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=768&q=80",
    placeName: "Pulau Menjangan",
    placeLocation: "Bali",
    price: "  200",
    rating: "4.8",
    reviews: "110",
    url: "#",
  },
  {
    imageSrc:
      "https://images.unsplash.com/photo-1553194587-b010d08c6c56?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=768&q=80",
    placeName: "Wisata Tawangmangu",
    placeLocation: "Karanganyar, Jawa Tengah",
    price: "  20",
    rating: "4.6",
    reviews: "80",
    url: "#",
  },
];

const AllDestinations = ({ heading = "All Destinations" }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 12;
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isNotFound, setIsNotFound] = useState(false);

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearch = (event) => {
    event.preventDefault();
    const query = searchQuery.trim();
    if (query) {
      const filtered = cards.filter(
        (card) =>
          card.placeName.toLowerCase().includes(query.toLowerCase()) ||
          card.placeLocation.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(filtered);
      setIsSearching(true);
      setIsNotFound(filtered.length === 0);
    } else {
      setSearchResults([]);
      setIsSearching(false);
      setIsNotFound(false);
    }
    setCurrentPage(1);
  };

  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = isSearching
    ? searchResults.slice(indexOfFirstCard, indexOfLastCard)
    : cards.slice(indexOfFirstCard, indexOfLastCard);

  const renderCards = () => {
    return currentCards.map((card, index) => (
      <CardContainer key={index}>
        <Card
          className="group"
          href={card.url}
          initial="rest"
          whileHover="hover"
          animate="rest"
        >
          <CardImageContainer imageSrc={card.imageSrc}>
            <CardRatingContainer>
              <CardRating>
                <StarIcon />
                {card.rating}
              </CardRating>
              <CardReview>({card.reviews})</CardReview>
            </CardRatingContainer>
            <CardHoverOverlay
              variants={{
                hover: {
                  opacity: 1,
                  height: "auto",
                },
                rest: {
                  opacity: 0,
                  height: 0,
                },
              }}
              transition={{ duration: 0.3 }}
            >
              <CardButton>Book Now</CardButton>
            </CardHoverOverlay>
          </CardImageContainer>
          <CardText>
            <CardTitle>{card.placeName}</CardTitle>
            <CardContent>{card.placeLocation}</CardContent>
            <CardPrice>From ${card.price}</CardPrice>
          </CardText>
        </Card>
      </CardContainer>
    ));
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const renderPagination = () => {
    const totalCards = isSearching ? searchResults.length : cards.length;
    const pageCount = Math.ceil(totalCards / cardsPerPage);
    return (
      <PaginationContainer>
        {Array.from({ length: pageCount }, (_, index) => (
          <PageNumber
            key={index}
            onClick={() => paginate(index + 1)}
            css={
              currentPage === index + 1 ? tw`bg-primary-500 text-white` : null
            }
          >
            {index + 1}
          </PageNumber>
        ))}
      </PaginationContainer>
    );
  };

  return (
    <>
      <AnimationRevealPage>
        <HeaderPage roundedHeaderButton />
        <Container>
          <ContentWithPaddingXl>
            <HeaderContainer>
              <Header>{heading}</Header>
              <form onSubmit={handleSearch} css={tw`mt-4 flex items-center`}>
                <input
                  type="text"
                  name="search"
                  placeholder="Type City or Place"
                  value={searchQuery}
                  onChange={handleInputChange}
                  css={tw`border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:border-primary-500 mx-auto w-full sm:w-2/3 lg:w-1/2 mb-4`}
                />
              </form>
              <form onSubmit={handleSearch} css={tw`flex items-center`}>
                <button
                  type="submit"
                  css={tw`block mx-auto mt-4 px-24 py-3 bg-primary-500 text-white rounded-full hover:bg-primary-700 focus:outline-none focus:bg-primary-700`}
                >
                  Search
                </button>
              </form>
            </HeaderContainer>

            {isNotFound ? (
              <p
                css={tw`text-primary-500 text-center mt-20 text-3xl flex justify-center items-center font-bold`}
              >
                Oops! Looks like your destination or city wasn't found.
                <br />
                Please try searching for another destination or city.
              </p>
            ) : (
              <>
                <TabContent>{renderCards()}</TabContent>
                {renderPagination()}
              </>
            )}
          </ContentWithPaddingXl>
          <DecoratorBlob1 />
          <DecoratorBlob2 />
        </Container>
      </AnimationRevealPage>
      <Footer />
    </>
  );
};

export default AllDestinations;
