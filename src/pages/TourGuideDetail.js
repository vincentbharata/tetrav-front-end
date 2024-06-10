import React, { useState, useEffect, useContext } from "react";
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
import { ReactComponent as LocationIcon } from "components/icon/location.svg";
import { useForm, Controller } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import Header from "components/headers/header.js";
import useTourGuideDetailHandler from "handler/TourGuideDetailHandler";
import { LoginContext } from "helpers/LoginContext";
import { Elements, useStripe } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const HeadingRow = tw.div`flex`;
const Heading = tw(SectionHeading)`text-gray-900 text-3xl`;
const Posts = tw.div`mt-6 sm:-mr-8`;
const PostContainer = styled.div`
  ${(props) =>
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
  ${(props) =>
    css`
      background-image: url("${props.imageSrc}");
    `}
  ${tw`h-64 w-full bg-cover bg-center rounded-t-lg`}
`;
const Border = tw.div`p-8 border-2 border-t-0 rounded-lg rounded-t-none`;
const Description = tw.div``;
const Input = tw.input`w-full h-12 px-8 py-4 rounded-full font-medium bg-transparent border  border-primary-500 placeholder-gray-800 text-sm focus:outline-none focus:border-primary-500 mt-5 first:mt-0`;
const PriceText = tw.div`mt-8 text-black text-lg font-bold`;
const PriceBorder = tw.div`mt-10 block border-b-2 border-gray-300 w-80 mx-auto flex justify-center`;
const BookButton = tw(
  PrimaryButton
)`mt-12 mx-auto flex justify-center border rounded-full w-full`;
const ChatButton = tw(
  PrimaryButton
)`mx-auto border rounded-full w-40 mr-1 mt-6`;
const TourGuideName = tw.div`mt-10 mb-2 text-gray-900 text-2xl font-bold`;
const Languages = tw.div`mb-12 text-gray-800 text-base font-normal text-justify`;
const HeadingBorder = tw.div`mt-10 mb-10 block border-b-2 border-gray-300 w-full`;
const Test = tw.div`flex flex-wrap items-center`;
const LocationCheckpoint = tw.span`ml-2 text-gray-800 text-base font-normal`;
const TextInformation = tw.span`ml-8`;
const Form = tw.form`mx-auto max-w-md`;

export default () => {
  const [visible] = useState(7);
  const stripePromise = loadStripe(
    "pk_test_51L0fDhGcs5kSb2FxB58ynuBgFpQl1hypWJFtT0VJT8Tq6MJXgZEWIkDscFFPDpuDvMhN5Kr50a8WMwvtNbQxzssT003szQG7E0"
  );
  const stripe = useStripe();
  const [total, setTotal] = useState(0);
  const [qty, setQty] = useState(1);
  const { tourGuide } = useTourGuideDetailHandler();
  const { userId, locationId } = useParams();
  const { loginData } = useContext(LoginContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    datePicker: "",
    timePicker: "",
    qty: 1,
  });
  const TotalText = ({ total }) => {
    const formatter = new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 2,
    });

    const formattedPrice = formatter.format(total);

    return <PriceText>Price: {formattedPrice}</PriceText>;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const finalForm = {
      tourGuideId: userId,
      locationId: locationId,
      userId: loginData.id,
      amount: total,
      qty: formData.qty,
      bookingDate: formData.datePicker + " " + formData.timePicker,
    };

    if (!stripe) {
      return;
    }
    const response = await axios.post(
      "https://api.stripe.com/v1/checkout/sessions",
      {
        payment_method_types: ["card"],
        line_items: [
          {
            price_data: {
              currency: "idr",
              product_data: {
                name: tourGuide.tourLocation,
              },
              unit_amount: tourGuide.tourPrice * 100, // Stripe expects amount in cents
            },
            quantity: finalForm.qty,
          },
        ],
        mode: "payment",
        success_url: "http://localhost:3000/success",
        cancel_url: "http://localhost:3000/cancel",
      },
      {
        headers: {
          Authorization: `Bearer sk_test_51L0fDhGcs5kSb2FxmqjiwT0PZSK3w0Sal10lG3zwJXNkjwtRR0z2hTgZOWZnGZZSk6YyCQB4x8yFkJ23ajGdvpZy00lTn7HAn3`, // Replace with your Stripe secret key
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    const sessionId = response.data.id;

    const { error } = await stripe.redirectToCheckout({ sessionId });
    if (error) {
      console.error(error);
      return;
    }
  };
  console.log(tourGuide);
  useEffect(() => {
    console.log(qty, tourGuide.tourPrice);
    setTotal(qty * tourGuide.tourPrice);
  }, [qty, tourGuide.tourPrice]);
  return (
    <>
      <Elements stripe={stripePromise}>
        <AnimationRevealPage>
          <Header roundedHeaderButton={true} />
          <Container>
            <ContentWithPaddingXl>
              <HeadingRow>
                <Heading>
                  Meet your tour guide {tourGuide.user.firstName}{" "}
                  {tourGuide.user.lastName}
                </Heading>
              </HeadingRow>
              <Posts>
                {/* {tourGuide.slice(0, visible).map((post, index) => ( */}
                <PostContainer key={tourGuide.id}>
                  <Post>
                    <Image imageSrc={tourGuide.user.image} />
                    <Border>
                      <Form onSubmit={handleSubmit}>
                        <Input
                          type="date"
                          fullWidth
                          value={formData.datePicker}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              datePicker: e.target.value,
                            })
                          }
                        />
                        <Input
                          type="time"
                          fullWidth
                          value={formData.timePicker}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              timePicker: e.target.value,
                            })
                          }
                        />
                        <Input
                          type="number"
                          placeholder="Choose quantity"
                          value={formData.qty}
                          onChange={(e) => {
                            setFormData({ ...formData, qty: e.target.value });
                            setQty(e.target.value);
                          }}
                        />
                        <BookButton onClick={handleSubmit}>Book Now</BookButton>
                      </Form>

                      <PriceBorder></PriceBorder>
                      <TotalText total={total} />
                    </Border>
                  </Post>
                </PostContainer>
                {/* ))} */}
                <Test>
                  <TourGuideName>
                    {tourGuide.user.firstName} {tourGuide.user.lastName}, Your
                    Tour Guide
                  </TourGuideName>
                  <ChatButton>Chat</ChatButton>
                </Test>
                <Languages>I can speak:{tourGuide.tourLanguage}</Languages>
                <TourGuideName>About Me</TourGuideName>
                <Languages>{tourGuide.tourDesc}</Languages>
                <HeadingBorder></HeadingBorder>
                <TourGuideName>Meeting Point</TourGuideName>
                <Test>
                  <LocationIcon />
                  <LocationCheckpoint>
                    {tourGuide.tourLocation}
                  </LocationCheckpoint>
                </Test>
                <TextInformation>
                  (for detail location and time you can contact your tour guide)
                </TextInformation>
              </Posts>
            </ContentWithPaddingXl>
          </Container>
        </AnimationRevealPage>
        <Footer />
      </Elements>
    </>
  );
};
