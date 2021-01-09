import React, { useCallback, useEffect, useState } from "react";

import { ApolloProvider } from "@apollo/react-hooks";
import { Joke } from "./src/components/Joke";
import { StatusBar } from "expo-status-bar";
import { client } from "./ApolloClient";
import styled from "styled-components/native";

export default function App() {
  const [backgroundColor, setBackgroundColor] = useState("#fff");

  const handleFetchJoke = useCallback(() => {
    const color = generateColor();

    setBackgroundColor(color);
  }, []);

  const generateColor = useCallback(() => {
    const red = Math.floor(Math.random() * 256);
    const green = Math.floor(Math.random() * 256);
    const blue = Math.floor(Math.random() * 256);
    return `rgb(${red},${green},${blue})`;
  }, []);

  return (
    <ApolloProvider {...{ client }}>
      <Root {...{ backgroundColor }}>
        <Joke onJokeFetchCompleted={handleFetchJoke} />
        <StatusBar style='auto' />
      </Root>
    </ApolloProvider>
  );
}

const Root = styled.View`
  flex: 1;
  background-color: ${({ backgroundColor }) => backgroundColor};
  padding: 50px 20px;
`;
