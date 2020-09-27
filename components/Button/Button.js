import React from "react";
import { Button } from "react-native-elements";

export default function(props) {
  return (
    <Button
      type={props.type}
      buttonStyle={props.buttonStyle}
      title={props.title}
      titleStyle={props.buttonText}
      onPress={props.onPress}
    />
  );
}
