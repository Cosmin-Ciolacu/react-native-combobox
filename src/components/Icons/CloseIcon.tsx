import React from "react";
import { ImageStyle } from "react-native";
import { Image } from "react-native";

export default function CloseIcon({
  color = "black",
  size = 24,
  style,
}: {
  color?: string;
  size?: number;
  style?: ImageStyle;
}) {
  return (
    <Image
      source={require("../../assets/images/close.png")}
      style={[
        {
          width: size,
          height: size,
          tintColor: color,
        },
        style,
      ]}
    />
  );
}
