import React, { useCallback, useEffect } from "react";

import { Button } from "./Button";
import gql from "graphql-tag";
import styled from "styled-components/native";
import { useLazyQuery } from "@apollo/client";

const JOKE_QUERY = gql`
  query {
    joke {
      text
    }
  }
`;

export const Joke = ({ onJokeFetchCompleted }) => {
  const [fetchJoke, { loading, error, data }] = useLazyQuery(JOKE_QUERY, {
    fetchPolicy: "no-cache",
  });

  useEffect(() => {
    handleFetchJoke();
  }, []);

  const handleFetchJoke = useCallback(() => {
    fetchJoke();
    onJokeFetchCompleted();
  }, []);

  return (
    <>
      <QuoteWrapper>
        <Quote>{loading ? "Loading..." : data?.joke?.text}</Quote>
      </QuoteWrapper>
      <ButtonWrapper>
        <Button onPress={() => handleFetchJoke()} text={"Next Quote"} />
      </ButtonWrapper>
    </>
  );
};

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
