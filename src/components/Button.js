import React from "react";
import styled from "styled-components/native";

export const Button = ({
  text,
  textColor = "#fff",
  backgroundColor = "#000",
  onPress,
}) => (
  <Root {...{ backgroundColor, onPress }}>
    <Text {...{ textColor }}>{text}</Text>
  </Root>
);

const Root = styled.TouchableOpacity`
  background: ${({ backgroundColor }) => backgroundColor};
  padding: 15px;
  border-radius: 10px;
  align-items: center;
  border: 1px solid #fff;
`;

const Text = styled.Text`
  color: ${({ textColor }) => textColor};
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
`;
