import React, { useCallback, useEffect, useState } from "react";

import { Button } from "./src/components/Button";
import { StatusBar } from "expo-status-bar";
import styled from "styled-components/native";

export default function App() {
  const [backgroundColor, setBackgroundColor] = useState("#000000");
  const [quote, setQuote] = useState();
  const [isLoadingQuote, setIsLoadingQuote] = useState("false");

  const generateColor = () => {
    const red = Math.floor(Math.random() * 256);
    const green = Math.floor(Math.random() * 256);
    const blue = Math.floor(Math.random() * 256);
    return `rgb(${red},${green},${blue})`;
  };
  const handleFetchQuote = useCallback(() => {
    setIsLoadingQuote(true);
    fetch("https://icanhazdadjoke.com/", {
      headers: {
        Accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setQuote(data.joke);
        setBackgroundColor(generateColor());
        setIsLoadingQuote(false);
      });
  }, []);

  useEffect(() => {
    handleFetchQuote();
    return () => {};
  }, [handleFetchQuote]);

  return (
    <Root {...{ backgroundColor }}>
      {!quote ? (
        <QuoteWrapper>
          <Quote>Loading...</Quote>
        </QuoteWrapper>
      ) : (
        <>
          <QuoteWrapper>
            <Quote>{quote}</Quote>
          </QuoteWrapper>
          <ButtonWrapper>
            <Button
              text={isLoadingQuote ? "Loading..." : " Next Quote"}
              onPress={handleFetchQuote}
            />
          </ButtonWrapper>
          <StatusBar style='auto' />
        </>
      )}
    </Root>
  );
}

const Root = styled.View`
  flex: 1;
  background-color: ${({ backgroundColor }) => backgroundColor};
  padding: 50px 20px;
`;

const QuoteWrapper = styled.View`
  align-items: center;
  flex: 1;
  justify-content: center;
  border-radius: 30px;
`;

const ButtonWrapper = styled.View``;

const Quote = styled.Text`
  color: #fff;
  font-weight: 600;
  font-size: 20px;
  background-color: #000;
  padding: 10px;
  border-radius: 30px;
`;
