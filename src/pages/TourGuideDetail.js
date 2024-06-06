import React, { useState, useEffect } from "react";
import axios from "axios";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import { Container, ContentWithPaddingXl } from "components/misc/Layouts";
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro";
// import Header from "components/headers/light.js";
import Footer from "components/footers/PageFooter.js";
import { SectionHeading } from "components/misc/Headings";
import { PrimaryButton } from "components/misc/Buttons";
import { ReactComponent as LocationIcon } from "feather-icons/dist/icons/location.svg";
import { useForm, Controller } from "react-hook-form";

const HeadingRow = tw.div`flex`;
const Heading = tw(SectionHeading)`text-gray-900 text-3xl`;
const Posts = tw.div`mt-6 sm:-mr-8`;
const PostContainer = styled.div`
  ${props =>
    props.featured &&
    css`
      ${tw`w-full!`}
      ${Post} {
        ${tw`sm:flex-row! h-full sm:pr-4`}
      }
      ${Image} {
        ${tw`sm:h-[450px] sm:min-h-full sm:w-1/2 lg:w-2/3 sm:rounded-t-none sm:rounded-l-lg`}
      }
      ${Border} {
        ${tw`sm:-mr-4 sm:pl-8 sm:flex-1 sm:rounded-none sm:rounded-r-lg sm:border-t-2 sm:border-l-0`}
      }
      ${Description} {
        ${tw`text-sm mt-3 leading-loose text-gray-600 font-medium`}
      }
    `}
`;
const Post = tw.div`cursor-pointer flex flex-col rounded-lg`;
const Image = styled.div`
  ${props => css`background-image: url("${props.imageSrc}");`}
  ${tw`h-64 w-full bg-cover bg-center rounded-t-lg`}
`;
const Border = tw.div`p-8 border-2 border-t-0 rounded-lg rounded-t-none`;
const Description = tw.div``;
const Input = tw.input`w-full h-12 px-8 py-4 rounded-full font-medium bg-transparent border  border-primary-500 placeholder-gray-800 text-sm focus:outline-none focus:border-primary-500 mt-5 first:mt-0`;
const PriceText = tw.div`mt-8 text-black text-lg font-bold`;
const PriceBorder = tw.div`mt-10 block border-b-2 border-gray-300 w-80 mx-auto flex justify-center`;
const BookButton = tw(PrimaryButton)`mt-12 mx-auto flex justify-center border rounded-full w-full`;
const ChatButton = tw(PrimaryButton)`mx-auto border rounded-full w-40 mr-1 mt-6`;
const TourGuideName = tw.div`mt-10 mb-2 text-gray-900 text-2xl font-bold`
const Languages = tw.div`mb-12 text-gray-800 text-base font-normal text-justify`
const HeadingBorder = tw.div`mt-10 mb-10 block border-b-2 border-gray-300 w-full`
const Test = tw.div`flex flex-wrap items-center`;
const LocationCheckpoint = tw.span`ml-2 text-gray-800 text-base font-normal`;
const TextInformation = tw.span`ml-8`;

export default ({
  headingText = "Meet your tour guide, Jason",
  priceText = "Price: $100.000.000",
  posts = [
    {
      imageSrc:
        "https://images.unsplash.com/photo-1499678329028-101435549a4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1024&q=80",
      featured: true
    },
  ]
}) => {
  const [visible] = useState(7);
  const [aboutMe, setAboutMe] = useState("");
  const [image, setImage] = useState("");
  const [meetingLocation, setMeetingLocation] = useState("");
  const [languages, setLanguages] = useState("");
  const [tourGuideName, setTourGuideName] = useState("");

  useEffect(() => {
    // Fetch data using Axios
    axios.get("YOUR_ABOUT_ME_API_URL")
      .then(response => {
        setAboutMe(response.data.aboutMe);
        setImage(response.data.image);
        setMeetingLocation(response.data.meetingLocation);
        setLanguages(response.data.languages);
        setTourGuideName(response.data.tourGuideName);
      })
      .catch(error => {
        console.error("Error fetching about me data:", error);
      });
  }, []);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({});

  const onSubmit = (data) => console.log(data);
  return (
    <>
        <AnimationRevealPage>
        <Container>
            <ContentWithPaddingXl>
            <HeadingRow>
                <Heading>Meet your tour guide{tourGuideName}</Heading>
            </HeadingRow>
            <Posts>
                {posts.slice(0, visible).map((post, index) => (
                <PostContainer key={index} featured={post.featured}>
                    <Post>
                    <Image imageSrc={post.imageSrc} />
                    <Border>
                        <Controller
                        name="Datepicker"
                        rules={{
                            required: "Date is Required",
                        }}
                        control={control}
                        render={({ field }) => (
                            <Input
                            type="date"
                            fullWidth
                            {...field}
                            error={Boolean(errors?.Datepicker?.message)}
                            />
                        )}
                        />
                        {errors?.Datepicker?.message && (
                        <span style={{ color: "red", fontSize: "12px" }}>
                            {errors?.Datepicker?.message}
                        </span>
                        )}

                        <Controller
                        name="Timepicker"
                        rules={{
                            required: "Time is Required",
                        }}
                        control={control}
                        render={({ field }) => (
                            <Input
                            type="time"
                            fullWidth
                            {...field}
                            error={Boolean(errors?.Timepicker?.message)}
                            />
                        )}
                        />
                        {errors?.Timepicker?.message && (
                        <span style={{ color: "red", fontSize: "12px" }}>
                            {errors?.Timepicker?.message}
                        </span>
                        )}

                        <Controller
                        name="Qty"
                        rules={{
                            required: " is Required",
                        }}
                        control={control}
                        render={({ field }) => (
                            <Input
                            type="Number"
                            placeholder="Choose quantity"
                            fullWidth
                            {...field}
                            error={Boolean(errors?.Qty?.message)}
                            />
                        )}
                        />
                        {errors?.Qty?.message && (
                        <span style={{ color: "red", fontSize: "12px" }}>
                            {errors?.Qty?.message}
                        </span>
                        )}
                        <BookButton onClick={handleSubmit(onSubmit)}>
                        Book Now
                        </BookButton>
                        <PriceBorder></PriceBorder>
                        <PriceText>{priceText}</PriceText>
                    </Border>
                    </Post>
                </PostContainer>
                ))}
                <Test>
                <TourGuideName>{tourGuideName}, Your Tour Guide</TourGuideName>
                <ChatButton>Chat</ChatButton>
                </Test>
                <Languages>{languages}</Languages>
                <TourGuideName>About Me</TourGuideName>
                <Languages>{aboutMe}</Languages>
                <HeadingBorder></HeadingBorder>
                <TourGuideName>Meeting Point</TourGuideName>
                <Test>
                <LocationIcon />
                <LocationCheckpoint>{meetingLocation}</LocationCheckpoint>
                </Test>
                <TextInformation>(for detail location and time you can contact your tour guide)</TextInformation>
            </Posts>
            </ContentWithPaddingXl>
        </Container>
        </AnimationRevealPage>
        <Footer />
    </>
  );
};
