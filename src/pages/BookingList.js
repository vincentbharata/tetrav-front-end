import React, { useContext, useEffect, useState } from "react";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import { Container, ContentWithPaddingXl } from "components/misc/Layouts";
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro";
import Header from "components/headers/header";
import Footer from "components/footers/PageFooter";
import { SectionHeading } from "components/misc/Headings";
import { PrimaryButton } from "components/misc/Buttons";
import Modal from "react-modal";
import ReactStars from "react-stars";
import { LoginContext } from "helpers/LoginContext";
import axios from "axios";

const HeadingRow = tw.div`flex`;
const Heading = tw(SectionHeading)`text-gray-900`;
const Posts = tw.div`mt-6 sm:-mr-8 flex flex-wrap`;
const PostContainer = styled.div`
  ${tw`mt-10 w-full sm:w-1/2 lg:w-1/3 sm:pr-8`}
  ${(props) =>
    props.featured &&
    css`
      ${tw`w-full!`}
      ${Post} {
        ${tw`sm:flex-row! h-full sm:pr-4`}
      }
      ${Image} {
        ${tw`sm:h-96 sm:min-h-full sm:w-1/2 lg:w-2/3 sm:rounded-t-none sm:rounded-l-lg`}
      }
      ${Info} {
        ${tw`sm:-mr-4 sm:pl-8 sm:flex-1 sm:rounded-none sm:rounded-r-lg sm:border-t-2 sm:border-l-0`}
      }
      ${Description} {
        ${tw`text-sm mt-3 leading-loose text-gray-600 font-medium`}
      }
    `}
`;
const Post = tw.div`cursor-pointer flex flex-col bg-gray-100 rounded-lg`;
const Image = styled.div`
  ${(props) =>
    css`
      background-image: url("${props.imageSrc}");
    `}
  ${tw`h-64 w-full bg-cover bg-center rounded-t-lg`}
`;
const Info = tw.div`p-8 border-2 border-t-0 rounded-lg rounded-t-none`;
const Category = tw.div`uppercase text-primary-500 text-xs font-bold tracking-widest leading-loose after:content after:block after:border-b-2 after:border-primary-500 after:w-8`;
const CreationDate = tw.div`mt-4 uppercase text-gray-600 italic font-semibold text-xs`;
const Title = tw.div`mt-1 font-black text-2xl text-gray-900 group-hover:text-primary-500 transition duration-300`;
const Description = tw.div``;

const ButtonContainer = tw.div`flex justify-center`;
const LoadMoreButton = tw(PrimaryButton)`mt-16 mx-auto`;
const ChatButton = tw(PrimaryButton)`mt-4 mx-2`;
const ReviewButton = tw(PrimaryButton)`mt-4 mx-2`;

const ModalContent = styled.div`
  ${tw`p-8 bg-white rounded-lg shadow-lg max-w-md mx-auto`}
`;

const ModalHeader = tw.div`mb-4 border-b border-gray-200 pb-4`;
const ModalTitle = tw.h2`text-2xl font-semibold text-gray-900`;
const ModalBody = tw.div`mb-4`;
const ModalFooter = tw.div`flex justify-end border-t border-gray-200 pt-4`;

export default ({ headingText = "Booking List" }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const { loginData } = useContext(LoginContext);
  const [posts, setPosts] = useState([]);
  const [visible, setVisible] = useState(3);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);

  useEffect(() => {
    if (isUserRole("USER")) {
      axios
        .get(`http://localhost:8080/api/transaction/${loginData.id}`)
        .then((response) => {
          setPosts(response.data);
        })
        .catch((error) => {
          console.error("There was an error fetching the data!", error);
        });
    } else if (isUserRole("TOURGUIDE")) {
      axios
        .get(`http://localhost:8080/api/transaction/tour-guide/${loginData.id}`)
        .then((response) => {
          setPosts(response.data);
        })
        .catch((error) => {
          console.error("There was an error fetching the data!", error);
        });
    }
  }, []);

  const isUserRole = (role) => {
    return loginData.roles && loginData.roles.includes(role);
  };

  const onLoadMoreClick = () => {
    setVisible((v) => v + 3);
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Rating:", rating);
    console.log("Review:", review);
    // Submit logic here
    closeModal();
  };

  return (
    <>
      <AnimationRevealPage>
        <Header />
        <Container>
          <ContentWithPaddingXl>
            <HeadingRow>
              <Heading>{headingText}</Heading>
            </HeadingRow>
            <Container>
              <Posts>
                {posts.slice(0, visible).map((post, index) => (
                  <PostContainer key={index} featured={true}>
                    <Post className="group" as="a" href={post.url}>
                      {/* <Image imageSrc={post.imageSrc} /> */}
                      <Info>
                        <Category>{post.transactionDate}</Category>
                        <CreationDate>
                          {post.location.cityName}, {post.locationcityRegion}
                        </CreationDate>
                        <Title>
                          {isUserRole("USER")
                            ? post.tourGuide.firstName +
                              " " +
                              post.tourGuide.lastName
                            : post.bookedBy.firstName +
                              " " +
                              post.bookedBy.lastName}
                        </Title>
                        <CreationDate>Book for {post.qty} person</CreationDate>
                        <Description>{post.location.cityDesc}</Description>
                        <ButtonContainer>
                          <ChatButton>Chat</ChatButton>
                          <ReviewButton onClick={openModal}>
                            Review
                          </ReviewButton>
                        </ButtonContainer>
                      </Info>
                    </Post>
                  </PostContainer>
                ))}
              </Posts>
            </Container>
            {visible < posts.length && (
              <ButtonContainer>
                <LoadMoreButton onClick={onLoadMoreClick}>
                  Load More
                </LoadMoreButton>
              </ButtonContainer>
            )}
          </ContentWithPaddingXl>
        </Container>

        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="Write a Review"
          ariaHideApp={false}
          style={{
            overlay: {
              backgroundColor: "rgba(0, 0, 0, 0.75)",
            },
            content: {
              inset: "50% auto auto 50%",
              transform: "translate(-50%, -50%)",
              padding: "0",
              border: "none",
              borderRadius: "8px",
              maxWidth: "500px",
              width: "100%",
            },
          }}
        >
          <ModalContent>
            <ModalHeader>
              <ModalTitle>Write a Review</ModalTitle>
            </ModalHeader>
            <form onSubmit={handleSubmit}>
              <ModalBody>
                <label tw="block mb-4">
                  Rating:
                  <ReactStars
                    count={5}
                    onChange={handleRatingChange}
                    size={24}
                    color2={"#ffd700"}
                    value={rating}
                    half={false}
                  />
                </label>
                <label tw="block mb-4">
                  Review:
                  <textarea
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                    required
                    tw="w-full mt-2 p-2 border border-gray-300 rounded"
                  />
                </label>
              </ModalBody>
              <ModalFooter>
                <button
                  type="button"
                  onClick={closeModal}
                  tw="mr-2 px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                >
                  Close
                </button>
                <button
                  type="submit"
                  tw="px-4 py-2 bg-primary-500 text-white rounded hover:bg-primary-700"
                >
                  Submit
                </button>
              </ModalFooter>
            </form>
          </ModalContent>
        </Modal>
      </AnimationRevealPage>
      <Footer />
    </>
  );
};
