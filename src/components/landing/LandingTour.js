import React, { useState, useEffect } from "react";
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

const Posts = tw.div`mt-12 flex flex-wrap -mr-3 relative`;
const Post = tw.a`flex flex-col h-full bg-gray-200 rounded overflow-hidden shadow-lg transition duration-300 transform hover:scale-105`;
const PostImage = styled.div`
  ${(props) =>
    css`
      background-image: url("${props.imageSrc}");
    `}
  ${tw`h-64 sm:h-80 bg-center bg-cover`}
`;
const PostText = tw.div`flex-1 p-6`;
const PostTitle = tw.h6`font-bold group-hover:text-primary-500 transition duration-300`;
const PostDescription = tw.p``;
const AuthorInfo = tw.div`flex items-center mt-4`;
const AuthorImage = tw.img`w-10 h-10 rounded-full mr-3`;
const AuthorTextInfo = tw.div`text-sm text-gray-600`;
const AuthorName = tw.div`font-semibold text-gray-900`;
const AuthorProfile = tw.div`text-xs`;

const PostContainer = styled.div`
  ${tw`relative z-20 mt-10 sm:pt-3 pr-3 w-full sm:w-1/2 lg:w-1/3 max-w-sm mx-auto sm:max-w-none sm:mx-0`}

  ${(props) =>
    props.featured &&
    css`
      ${tw`w-full lg:w-2/3`}
      ${Post} {
        ${tw`sm:flex-row items-center sm:pr-3`}
      }
      ${PostImage} {
        ${tw`sm:h-80 sm:min-h-full w-full sm:w-1/2 rounded-t sm:rounded-t-none sm:rounded-l`}
      }
      ${PostText} {
        ${tw`pl-8 pr-5`}
      }
      ${PostTitle} {
        ${tw`text-2xl`}
      }
      ${PostDescription} {
        ${tw`mt-4 text-sm font-semibold text-gray-600 leading-relaxed`}
      }
      ${AuthorInfo} {
        ${tw`mt-8 flex items-center`}
      }
      ${AuthorName} {
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

export default ({
  subheading = "",
  heading = "We love writing.",
  description = "",
  posts = [
    {
      postImageSrc:
        "https://images.unsplash.com/photo-1503220317375-aaad61436b1b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=768&q=80",
      title: "Jason Sumanto",
      authorName: "BALI",
      url: "https://timerse.com",
    },
    {
      postImageSrc:
        "https://images.unsplash.com/photo-1503220317375-aaad61436b1b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=768&q=80",
      title: "Bryan Sumanto",
      authorName: "BALI",
      url: "https://timerse.com",
    },
    {
      postImageSrc:
        "https://images.unsplash.com/photo-1503220317375-aaad61436b1b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=768&q=80",
      title: "Kevin Sumanto",
      authorName: "BALI",
      url: "https://timerse.com",
    },
  ],
}) => {
  const [currentPosts, setCurrentPosts] = useState(posts);
  const [width] = useWindowSize();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPosts((prevPosts) => {
        
        let shuffledPosts = [...prevPosts].sort(() => Math.random() - 0.5);
        return shuffledPosts;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [posts]);

  const getDisplayedPosts = () => {
    if (width < 640) {
      return currentPosts.slice(0, 1);
    } else if (width < 1024) {
      return currentPosts.slice(0, 2);
    } else {
      return currentPosts.slice(0, 3);
    }
  };

  return (
    <Container>
      <ContentWithPaddingXl>
        <HeadingContainer>
          {heading && <Heading>{heading}</Heading>}
          {description && <Description>{description}</Description>}
        </HeadingContainer>
        <Posts>
          {getDisplayedPosts().map((post, index) => (
            <PostContainer featured={post.featured} key={index} className={`w-full sm:w-1/2 lg:w-1/3`}>
              <Post className="group" href={post.url}>
                <PostImage imageSrc={post.postImageSrc} />
                <PostText>
                  <PostTitle>{post.title}</PostTitle>
                  {post.featured && (
                    <PostDescription>{post.description}</PostDescription>
                  )}
                  <AuthorInfo>
                    {post.featured && <AuthorImage src={post.authorImageSrc} />}
                    <AuthorTextInfo>
                      <AuthorName>{post.authorName}</AuthorName>
                      {post.featured && (
                        <AuthorProfile>{post.authorProfile}</AuthorProfile>
                      )}
                    </AuthorTextInfo>
                  </AuthorInfo>
                </PostText>
              </Post>
            </PostContainer>
          ))}
          <DecoratorBlob1 />
          <DecoratorBlob2 />
        </Posts>
      </ContentWithPaddingXl>
    </Container>
  );
};