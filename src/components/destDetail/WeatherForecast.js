import React, { useState, useEffect, useContext } from "react";
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
import {useLocationState}  from "helpers/LocationContext";

const Text = tw.div`text-[50px] font-bold ml-8 mt-4`;
const TextTemp = tw.div`text-[65px] font-bold ml-8 mt-4`;
const SubText = tw.div`text-[19px] text-gray-300 font-light ml-8`;
const SubText1 = tw.div`text-[25px] text-gray-300 font-light ml-4`;
const SubText2 = tw.div`text-[16px] text-gray-800 font-medium ml-8`;
const SectionHeading = tw.h2`mt-[-60px]text-4xl sm:text-5xl font-black tracking-wide mb-16`;
const Box = tw.div`w-[660px] h-[400px] rounded-tl-lg bg-primary-500 text-gray-100`;
const BoxForecast = tw.div`w-[960px] h-full rounded-b-lg bg-white shadow-lg`;
const BoxWeatherIcon = tw.div`w-[300px] h-[400px] rounded-tr-lg bg-primary-600 text-gray-100 grid justify-center items-center`;
const Container = tw.div`relative`;
const Containers = tw.div`flex`;
const ForecastContainer = tw.div`grid justify-items-center`;
const Content = tw.div`max-w-screen-xl mx-auto py-20 lg:py-24`;
const WeatherIcon = styled.img`${tw`ml-8 w-[40px] h-[40px]`}`;
const WeatherIcon2 = styled.img`${tw`ml-8 mt-4 mb-4 w-[60px] h-[60px]`}`;
const WeatherIconBig = styled.img`${tw`w-[300px] h-[300px]`}`;
const HeadingBorder = tw.div`mt-2 ml-8 block border-b-2 border-gray-300 w-[530px] mb-4`;
const HeadingBorder1 = tw.div`ml-8 block border-r-[1px] border-gray-600 h-[158px] mt-4 mb-4`;
const Container1 = tw.div`flex items-center`;

const DecoratorBlob1 = tw(
  SvgDecoratorBlob1
)`absolute w-32 top-0 left-0 -z-10 text-primary-500 opacity-25 transform -translate-x-full`;
const DecoratorBlob2 = tw(
  SvgDecoratorBlob2
)`absolute w-32 bottom-0 right-0 -z-10 text-pink-500 opacity-15 transform translate-x-2/3 translate-y-8`;

export default function WeatherApp() {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const {location} = useLocationState()

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const apiKey = "990e5659d920b604e3357ec4172ba684"; // Replace with your OpenWeather API key
        const city = location.location.cityName; // Replace with your desired city
        const weatherResponse = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
        const forecastResponse = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`);

        console.log(weatherResponse);
        setWeatherData(weatherResponse.data);
        setForecastData(forecastResponse.data);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };

    fetchWeatherData();
  }, []);

  const getDailyForecasts = (forecastData) => {
    const dailyData = {};
    const today = new Date().toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    forecastData.list.forEach((forecast) => {
      const date = new Date(forecast.dt * 1000).toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });

      if (date !== today) {
        if (!dailyData[date]) {
          dailyData[date] = {
            temp: [],
            weather: forecast.weather[0],
            date: date,
          };
        }

        dailyData[date].temp.push(forecast.main.temp);
      }
    });

    return Object.values(dailyData).slice(0, 4).map(day => ({
      ...day,
      temp: (day.temp.reduce((a, b) => a + b) / day.temp.length).toFixed(2)
    }));
  };

  return (
    <Container>
      <Content>
        <SectionHeading>Weather forecast & air quality index</SectionHeading>
        {weatherData && (
          <Containers>
            <Box>
              <Text>{weatherData.name}</Text>
              <SubText>{new Date(weatherData.dt * 1000).toLocaleString()}</SubText>
              <HeadingBorder />
              <TextTemp>{Math.round(weatherData.main.temp)}°C</TextTemp>
              <Containers>
                <WeatherIcon
                  src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
                  alt={weatherData.weather[0].description}
                />
                <SubText1>{weatherData.weather[0].description}</SubText1>
              </Containers>
              <HeadingBorder />
              <SubText>Wind: {weatherData.wind.speed} km/h</SubText>
              <SubText>Humidity: {weatherData.main.humidity} %</SubText>
            </Box>
            <BoxWeatherIcon>
              <WeatherIconBig
                src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@4x.png`}
                alt={weatherData.weather[0].description}
              />
            </BoxWeatherIcon>
          </Containers>
        )}
        {forecastData && (
          <BoxForecast>
            <Containers>
              {getDailyForecasts(forecastData).map((forecast, index) => (
                <Container1 key={index}>
                  <ForecastContainer>
                    <SubText2>{forecast.date}</SubText2>
                    <WeatherIcon2
                      src={`http://openweathermap.org/img/wn/${forecast.weather.icon}@2x.png`}
                      alt={forecast.weather.description}
                    />
                    <SubText2>{forecast.weather.description}</SubText2>
                    <SubText2>{forecast.temp}°C</SubText2>
                  </ForecastContainer>
                  {index < 3 && <HeadingBorder1 />}
                </Container1>
              ))}
            </Containers>
          </BoxForecast>
        )}
      </Content>
      <DecoratorBlob1 />
      <DecoratorBlob2 />
    </Container>
  );
}