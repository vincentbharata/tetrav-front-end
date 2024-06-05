import React, { useState, useEffect } from "react";
import axios from "axios";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import { Container as ContainerBase } from "components/misc/Layouts";
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro"; //eslint-disable-line
import illustration from "images/signup-illustration.svg";
import logo from "images/logo.svg";
import { ReactComponent as SignUpIcon } from "feather-icons/dist/icons/user-plus.svg";

const Container = tw(
  ContainerBase
)`min-h-screen bg-primary-900 text-white font-medium flex justify-center -m-8`;
const Content = tw.div`max-w-screen-xl m-0 sm:mx-20 sm:my-16 bg-white text-gray-900 shadow sm:rounded-lg flex justify-center flex-1`;
const MainContainer = tw.div`lg:w-1/2 xl:w-5/12 p-6 sm:p-12`;
const LogoLink = tw.a``;
const LogoImage = tw.img`h-12 mx-auto`;
const MainContent = tw.div`mt-12 flex flex-col items-center`;
const Heading = tw.h1`text-2xl xl:text-3xl font-extrabold`;
const FormContainer = tw.div`w-full flex-1 mt-8`;
const InputContainer = tw.div`flex-auto my-5 px-1`;
const MiniForm = tw.form`mx-auto max-w-md flex justify-between`;
const Form = tw.form`mx-auto max-w-md`;
const Input = tw.input`w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5 first:mt-0`;
const Textarea = tw.textarea`w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5`;
const SubmitButton = styled.button`
  ${tw`mt-5 tracking-wide font-semibold bg-primary-500 text-gray-100 w-full py-4 rounded-lg hover:bg-primary-900 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none`}
  .icon {
    ${tw`w-6 h-6 -ml-2`}
  }
  .text {
    ${tw`ml-3`}
  }
`;
const NextButton = styled.button`
  ${tw`mt-5 tracking-wide font-semibold bg-primary-500 text-gray-100 w-full py-4 rounded-lg hover:bg-primary-900 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none`}
  ${({ disabled }) => disabled && tw`bg-gray-500 hover:bg-gray-500 cursor-not-allowed`}
`;
const IllustrationContainer = tw.div`sm:rounded-r-lg flex-1 bg-purple-100 text-center hidden lg:flex justify-center`;
const IllustrationImage = styled.div`
  ${(props) => `background-image: url("${props.imageSrc}");`}
  ${tw`m-12 xl:m-16 w-full max-w-lg bg-contain bg-center bg-no-repeat`}
`;
const cities = [
  { cityName: "Jogja" },
  { cityName: "Bali" },
  { cityName: "Bandung" },
  { cityName: "Malang" }
];
const languages = [
  { language: "Indonesia" },
  { language: "English" }
];
const useSignup = (initialState) => {
  const [formData, setFormData] = useState(initialState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [showDescription, setShowDescription] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    const { firstName, lastName, username, email, phoneNumber, location, password, confirmPassword } = formData;
    const isValidEmail = email.includes("@");
    const isPasswordMatch = password === confirmPassword;
    const isFormValid = firstName && lastName && username && isValidEmail && phoneNumber && location && password && isPasswordMatch;
    setIsFormValid(isFormValid);
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "phoneNumber") {
      const sanitizedValue = value.replace(/\D/g, '');
      setFormData({ ...formData, [name]: sanitizedValue });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (isFormValid) {
      setShowDescription(true);
    } else {
      setError("Please fill out all fields correctly.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    try {
      const response = await axios.post("api-link", formData);
      console.log("Signup successful:", response.data);
    } catch (error) {
      console.error("Signup failed:", error);
      setError(error.response?.data?.message || "Signup failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    formData,
    isSubmitting,
    error,
    showDescription,
    isFormValid,
    handleChange,
    handleNext,
    handleSubmit,
  };
};

export default ({
  logoLinkUrl = "/",
  illustrationImageSrc = illustration,
  headingText = "Sign Up Tour Guide",
  submitButtonText = "Sign Up",
  SubmitButtonIcon = SignUpIcon,
  tosUrl = "#",
  privacyPolicyUrl = "#",
  signInUrl = "/login",
}) => {
  const { formData, isSubmitting, error, showDescription, isFormValid, handleChange, handleNext, handleSubmit } =
    useSignup({
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      phoneNumber: "",
      location: "",
      price:"",
      description: ""
    });

  return (
    <AnimationRevealPage>
      <Container>
        <Content>
          <MainContainer>
            <LogoLink href={logoLinkUrl}>
              <LogoImage src={logo} />
            </LogoLink>
            <MainContent>
              <Heading>{headingText}</Heading>
              <FormContainer>
                {!showDescription ? (
                  <Form onSubmit={handleNext}>
                    <MiniForm>
                      <InputContainer>
                        <Input
                          type="text"
                          name="firstName"
                          placeholder="First Name"
                          value={formData.firstName}
                          onChange={handleChange}
                        />
                      </InputContainer>
                      <InputContainer>
                        <Input
                          type="text"
                          name="lastName"
                          placeholder="Last Name"
                          value={formData.lastName}
                          onChange={handleChange}
                        />
                      </InputContainer>
                    </MiniForm>
                    <Input
                      type="text"
                      name="username"
                      placeholder="Username"
                      value={formData.username}
                      onChange={handleChange}
                    />
                    <Input
                      type="email"
                      name="email"
                      placeholder="Email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                    <Input
                      type="text"
                      name="phoneNumber"
                      placeholder="Phone Number"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                    />
                    <select
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      tw="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 mt-5"
                    >
                      <option value="">Select City</option>
                      {cities.map((city, index) => (
                        <option key={index} value={city.cityName}>{city.cityName}</option>
                      ))}
                    </select>
                    <Input
                      type="password"
                      name="password"
                      placeholder="Password"
                      value={formData.password}
                      onChange={handleChange}
                    />
                    <Input
                      type="password"
                      name="confirmPassword"
                      placeholder="Confirm Password"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                    />
                    {error && <p tw="mt-4 text-red-500">{error}</p>}
                    <NextButton type="submit" disabled={!isFormValid}>
                      <span className="text">Next</span>
                    </NextButton>
                  </Form>
                ) : (
                  <Form onSubmit={handleSubmit}>
                      <Input
                      type="number"
                      name="price"
                      placeholder="Price (IDR)"
                      value={formData.price}
                      onChange={handleChange}
                    />
                      <select
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      tw="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 mt-5"
                    >
                      <option value="">Select Language</option>
                      {languages.map((languages, index) => (
                        <option key={index} value={languages.language}>{languages.language}</option>
                      ))}
                    </select>
                    <Textarea
                      name="description"
                      placeholder="Description"
                      value={formData.description}
                      onChange={handleChange}
                      rows="6"
                    />
                    {error && <p tw="mt-4 text-red-500">{error}</p>}
                    <SubmitButton type="submit" disabled={isSubmitting}>
                      <SubmitButtonIcon className="icon" />
                      <span className="text">
                        {isSubmitting ? "Signing Up..." : submitButtonText}
                      </span>
                    </SubmitButton>
                  </Form>
                )}
              </FormContainer>
            </MainContent>
          </MainContainer>
          <IllustrationContainer>
            <IllustrationImage imageSrc={illustrationImageSrc} />
          </IllustrationContainer>
        </Content>
      </Container>
    </AnimationRevealPage>
  );
};